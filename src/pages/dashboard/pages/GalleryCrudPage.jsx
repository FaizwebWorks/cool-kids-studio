import { useCallback, useEffect, useState } from 'react';
import {
  CaretLeft,
  CaretRight,
  CheckCircle,
  DotsThreeVertical,
  Eye,
  EyeSlash,
  Image,
  PencilSimple,
  SpinnerGap,
  Trash,
} from 'phosphor-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { adminGalleryApi, adminUploadsApi } from '../../../services/adminApi';
import { getErrorMessage } from '../utils';
import {
  EmptyState,
  ErrorNotice,
  ImageUploadField,
  PageHeader,
  Panel,
  SelectField,
  SkeletonRows,
  TextField,
} from '../components/DashboardUI';
import {
  emptyGalleryForm,
  galleryPayload,
  GALLERY_CATEGORIES,
  GALLERY_IMAGE_TYPES,
  MAX_GALLERY_IMAGE_BYTES,
  normalizeGalleryForm,
} from '../services/galleryForm';

const getGalleryItemId = (item) => item?._id || item?.id;

export const GalleryCrudPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyGalleryForm);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState({ category: '', isActive: '', page: 1, limit: 20 });
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await adminGalleryApi.list(filters);
      setItems(data.items);
      setPagination(data.pagination);
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load gallery items.'));
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = window.setTimeout(loadItems, 0);
    return () => window.clearTimeout(timer);
  }, [loadItems]);

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage('');
    setError('');
  };

  const toggleCategory = (category) => {
    setForm((current) => {
      const exists = current.categories.includes(category);
      return {
        ...current,
        categories: exists
          ? current.categories.filter((item) => item !== category)
          : [...current.categories, category],
      };
    });
    setMessage('');
    setError('');
  };

  const resetForm = () => {
    setEditingItem(null);
    setForm(emptyGalleryForm);
    setMessage('');
    setError('');
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    if (!GALLERY_IMAGE_TYPES.has(file.type)) {
      setError('Please upload a JPG, PNG, WEBP, or AVIF image.');
      return;
    }

    if (file.size > MAX_GALLERY_IMAGE_BYTES) {
      setError('Image must be smaller than 10MB.');
      return;
    }

    setIsUploadingImage(true);
    setMessage('');
    setError('');

    try {
      const asset = await adminUploadsApi.uploadImage(file, 'gallery');
      updateForm('image', asset.secureUrl || '');
      updateForm('imageAsset', asset._id || '');
      setMessage('Gallery image uploaded successfully.');
    } catch (err) {
      setError(getErrorMessage(err, 'Could not upload gallery image.'));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const submitItem = async (event) => {
    event.preventDefault();

    if (form.title.trim().length < 2) {
      setError('Title is required.');
      return;
    }

    if (!form.image.trim()) {
      setError('Image is required.');
      return;
    }

    if (form.altText.trim().length < 3) {
      setError('Alt text is required.');
      return;
    }

    if (form.categories.length === 0) {
      setError('Select at least one category.');
      return;
    }

    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      const payload = galleryPayload(form);

      if (editingItem) {
        await adminGalleryApi.update(getGalleryItemId(editingItem), payload);
        setMessage('Gallery item updated successfully.');
      } else {
        await adminGalleryApi.create(payload);
        setMessage('Gallery item created successfully.');
      }

      resetForm();
      await loadItems();
    } catch (err) {
      setError(getErrorMessage(err, 'Could not save gallery item.'));
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setForm(normalizeGalleryForm(item));
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleItemStatus = async (item) => {
    setMessage('');
    setError('');

    try {
      await adminGalleryApi.updateStatus(getGalleryItemId(item), item.isActive === false);
      setMessage('Gallery item visibility updated.');
      await loadItems();
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update gallery item.'));
    }
  };

  const deleteItem = async (item) => {
    if (!window.confirm(`Delete ${item.title || 'this gallery item'}?`)) return;

    setMessage('');
    setError('');

    try {
      await adminGalleryApi.remove(getGalleryItemId(item));
      setMessage('Gallery item deleted successfully.');
      if (editingItem && getGalleryItemId(editingItem) === getGalleryItemId(item)) {
        resetForm();
      }
      await loadItems();
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete gallery item.'));
    }
  };

  const activeItems = items.filter((item) => item.isActive !== false).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Gallery CMS"
        title="Manage gallery"
        description="Upload, curate, and publish homepage gallery images without changing the existing public gallery behavior."
      />

      {message && (
        <div className="flex items-center gap-3 rounded-[1.25rem] border border-accent/40 bg-accent/20 p-4 text-sm font-bold">
          <CheckCircle size={18} />
          {message}
        </div>
      )}
      {error && <ErrorNotice message={error} />}

      <div className="grid min-w-0 gap-3 sm:grid-cols-3">
        {[
          ['Total items', pagination.total || items.length],
          ['Visible', activeItems],
          ['Hidden', Math.max((pagination.total || items.length) - activeItems, 0)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.35rem] border border-white/70 bg-white/45 p-4 shadow-sm backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/40">{label}</p>
            <p className="mt-2 font-heading text-5xl uppercase leading-none text-primary">{isLoading ? '-' : value}</p>
          </div>
        ))}
      </div>

      <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(26rem,0.82fr)_minmax(32rem,1.18fr)]">
        <Panel title={editingItem ? 'Edit gallery item' : 'Create gallery item'} icon={<Image size={18} />}>
          <form onSubmit={submitItem} className="flex flex-col gap-4">
            <div className="grid min-w-0 gap-4 md:grid-cols-2">
              <TextField label="Title" value={form.title} onChange={(value) => updateForm('title', value)} required placeholder="Tiny Toes" />
              <TextField label="Alt text" value={form.altText} onChange={(value) => updateForm('altText', value)} required placeholder="Newborn baby portrait" />
              <ImageUploadField
                className="md:col-span-2"
                value={form.image}
                onChange={(value) => updateForm('image', value)}
                onUpload={handleImageUpload}
                isUploading={isUploadingImage}
                label="Gallery image"
                previewAlt="Gallery preview"
                placeholder="https://res.cloudinary.com/..."
              />
              <TextField label="Display order" type="number" value={form.displayOrder} onChange={(value) => updateForm('displayOrder', value)} placeholder="1" />
            </div>

            <div className="rounded-[1.25rem] border border-primary/5 bg-bg/70 p-4">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Categories</span>
              <div className="flex flex-wrap gap-2">
                {GALLERY_CATEGORIES.map((category) => {
                  const isSelected = form.categories.includes(category);

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                        isSelected
                          ? 'border-accent bg-accent text-primary'
                          : 'border-primary/10 bg-white/50 text-primary/70 hover:border-accent/60'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Description</span>
              <textarea
                value={form.description}
                onChange={(event) => updateForm('description', event.target.value)}
                rows={4}
                className="min-h-28 w-full resize-none rounded-[1rem] border border-primary/10 bg-bg px-4 py-3 outline-none transition focus:border-accent"
                placeholder="A soft newborn portrait session."
              />
            </label>

            <label className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-primary/5 bg-bg px-4 py-3">
              <span>
                <span className="block text-sm font-bold">Public visibility</span>
                <span className="block text-xs text-text-secondary">Show this item on the public homepage gallery</span>
              </span>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => updateForm('isActive', event.target.checked)}
                className="h-5 w-5 shrink-0 accent-[var(--color-accent)]"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="accent" className="flex-1 py-4" disabled={isSaving || isUploadingImage}>
                {isSaving && <SpinnerGap size={17} className="animate-spin" />}
                {editingItem ? 'Save Gallery Item' : 'Create Gallery Item'}
              </Button>
              {editingItem && (
                <Button type="button" variant="outline" className="py-4" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Panel>

        <Panel title="Gallery items">
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <SelectField label="Category" value={filters.category} onChange={(value) => setFilters((current) => ({ ...current, category: value, page: 1 }))}>
              <option value="">All categories</option>
              {GALLERY_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </SelectField>
            <SelectField label="Status" value={filters.isActive} onChange={(value) => setFilters((current) => ({ ...current, isActive: value, page: 1 }))}>
              <option value="">All statuses</option>
              <option value="true">Active</option>
              <option value="false">Hidden</option>
            </SelectField>
            <SelectField label="Per page" value={filters.limit} onChange={(value) => setFilters((current) => ({ ...current, limit: Number(value), page: 1 }))}>
              {[12, 20, 40].map((limit) => <option key={limit} value={limit}>{limit} per page</option>)}
            </SelectField>
          </div>

          {isLoading ? (
            <SkeletonRows />
          ) : items.length === 0 ? (
            <EmptyState title="No gallery items found" text="Upload an image and create your first gallery item." />
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const normalized = normalizeGalleryForm(item);
                const isHidden = item.isActive === false;

                return (
                  <div key={getGalleryItemId(item) || item.title} className="rounded-[1.5rem] border border-primary/5 bg-bg/75 p-4 transition hover:border-accent/60 hover:bg-white">
                    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                      <div className="grid min-w-0 gap-4 sm:grid-cols-[6rem_minmax(0,1fr)]">
                        <div className="h-24 w-24 overflow-hidden rounded-[1.25rem] bg-card shadow-sm">
                          {normalized.image ? (
                            <img src={normalized.image} alt={normalized.altText || normalized.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-primary/35">
                              <Image size={24} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="break-words font-heading text-4xl uppercase leading-none">
                              {normalized.title || 'Untitled'}
                            </h3>
                            <Badge variant={isHidden ? 'destructive' : 'accent'}>
                              {isHidden ? 'Hidden' : 'Active'}
                            </Badge>
                          </div>

                          <p className="mt-2 break-words text-sm font-medium text-primary/75">{normalized.altText || 'No alt text'}</p>
                          <p className="mt-1 line-clamp-2 break-words text-sm text-text-secondary">{normalized.description || 'No description'}</p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {normalized.categories.map((category) => (
                              <Badge key={`${getGalleryItemId(item)}-${category}`} variant="secondary">
                                {category}
                              </Badge>
                            ))}
                          </div>

                          <div className="mt-3 text-xs font-bold text-primary/45">
                            Order {normalized.displayOrder === '' ? 0 : normalized.displayOrder}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button type="button" variant="outline" size="icon" aria-label={`Open actions for ${normalized.title || 'gallery item'}`}>
                              <DotsThreeVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem onSelect={() => startEdit(item)}>
                                <PencilSimple size={16} />
                                Edit item
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => toggleItemStatus(item)}>
                                {isHidden ? <Eye size={16} /> : <EyeSlash size={16} />}
                                {isHidden ? 'Show publicly' : 'Hide item'}
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem destructive onSelect={() => deleteItem(item)}>
                              <Trash size={16} />
                              Delete item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 border-t border-primary/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text-secondary">
              Page {pagination.page || filters.page} of {pagination.totalPages || 1}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={Number(filters.page) <= 1}
                onClick={() => setFilters((current) => ({ ...current, page: Math.max(1, Number(current.page) - 1) }))}
              >
                <CaretLeft size={16} />
                Prev
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={Number(filters.page) >= Number(pagination.totalPages || 1)}
                onClick={() => setFilters((current) => ({ ...current, page: Number(current.page) + 1 }))}
              >
                Next
                <CaretRight size={16} />
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};
