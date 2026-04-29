import { useCallback, useEffect, useState } from 'react';
import {
  CheckCircle,
  DotsThreeVertical,
  Eye,
  EyeSlash,
  Image,
  PencilSimple,
  SpinnerGap,
  Storefront,
  Trash,
} from 'phosphor-react';
import { adminServicesApi, adminUploadsApi } from '../../../services/adminApi';
import { getErrorMessage, getServiceId } from '../utils';
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
import {
  EmptyState,
  ErrorNotice,
  PageHeader,
  Panel,
  ServiceImageField,
  SkeletonRows,
  TextField,
} from '../components/DashboardUI';
import {
  emptyServiceForm,
  MAX_SERVICE_IMAGE_BYTES,
  normalizeServiceForm,
  servicePayload,
  SERVICE_IMAGE_TYPES,
} from '../services/serviceForm';

export const ServicesCrudPage = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyServiceForm);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await adminServicesApi.list();
      setServices(data.items);
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load services.'));
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(loadServices, 0);
    return () => window.clearTimeout(timer);
  }, [loadServices]);

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError('');
    setMessage('');
  };

  const resetForm = () => {
    setEditingService(null);
    setForm(emptyServiceForm);
    setError('');
  };

  const getUploadedImageUrl = (result) => {
    const asset = result?.asset || result;
    return asset?.secureUrl || asset?.url || result?.service?.coverImage || '';
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    if (!SERVICE_IMAGE_TYPES.has(file.type)) {
      setError('Please upload a JPG, PNG, WEBP, or AVIF image.');
      return;
    }

    if (file.size > MAX_SERVICE_IMAGE_BYTES) {
      setError('Image must be smaller than 10MB.');
      return;
    }

    setIsUploadingImage(true);
    setError('');
    setMessage('');

    try {
      if (editingService) {
        const result = await adminServicesApi.updateCoverImage(getServiceId(editingService), file);
        const imageUrl = getUploadedImageUrl(result);

        if (!imageUrl) {
          throw new Error('Upload completed, but no image URL was returned.');
        }

        updateForm('img', imageUrl);
        setEditingService(result.service || editingService);
        setMessage('Service cover image uploaded successfully.');
        await loadServices();
      } else {
        const asset = await adminUploadsApi.uploadImage(file, 'service_cover');
        const imageUrl = getUploadedImageUrl(asset);

        if (!imageUrl) {
          throw new Error('Upload completed, but no image URL was returned.');
        }

        updateForm('img', imageUrl);
        setMessage('Image uploaded. Create the service to use it as cover.');
      }
    } catch (err) {
      setError(getErrorMessage(err, 'Could not upload image.'));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const startEdit = (service) => {
    setEditingService(service);
    setForm(normalizeServiceForm(service));
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitService = async (event) => {
    event.preventDefault();

    if (form.title.trim().length < 2) {
      setError('Service title must be at least 2 characters.');
      return;
    }

    setIsSaving(true);
    setError('');
    setMessage('');

    try {
      const payload = servicePayload(form);

      if (editingService) {
        await adminServicesApi.update(getServiceId(editingService), payload);
        setMessage('Service updated successfully.');
      } else {
        await adminServicesApi.create(payload);
        setMessage('Service created successfully.');
      }

      resetForm();
      await loadServices();
    } catch (err) {
      setError(getErrorMessage(err, 'Could not save service.'));
    } finally {
      setIsSaving(false);
    }
  };

  const toggleService = async (service) => {
    setError('');
    setMessage('');

    try {
      await adminServicesApi.updateStatus(getServiceId(service), service.isActive === false);
      setMessage('Service visibility updated.');
      await loadServices();
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update service.'));
    }
  };

  const deleteService = async (service) => {
    if (!window.confirm(`Delete ${service.title || service.name || 'this service'}?`)) return;

    setError('');
    setMessage('');

    try {
      await adminServicesApi.remove(getServiceId(service));
      setMessage('Service deleted successfully.');
      if (editingService && getServiceId(editingService) === getServiceId(service)) resetForm();
      await loadServices();
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete service.'));
    }
  };

  const activeServices = services.filter((service) => service.isActive !== false).length;
  const hiddenServices = services.length - activeServices;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Services CMS"
        title="Manage services"
        description="Create, edit, reorder, activate, and remove public service cards."
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
          ['Total services', services.length],
          ['Active', activeServices],
          ['Hidden', hiddenServices],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.35rem] border border-white/70 bg-white/45 p-4 shadow-sm backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/40">{label}</p>
            <p className="mt-2 font-heading text-5xl uppercase leading-none text-primary">{isLoading ? '-' : value}</p>
          </div>
        ))}
      </div>

      <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(26rem,0.82fr)_minmax(32rem,1.18fr)]">
        <Panel title={editingService ? 'Edit service' : 'Create service'} icon={<Storefront size={18} />}>
          <form onSubmit={submitService} className="flex flex-col gap-4">
            <div className="grid min-w-0 gap-4 md:grid-cols-2">
              <TextField label="Title" value={form.title} onChange={(value) => updateForm('title', value)} required placeholder="Newborn" />
              <TextField label="Slug" value={form.slug} onChange={(value) => updateForm('slug', value)} placeholder="newborn" />
              <TextField label="Subtitle" value={form.subtitle} onChange={(value) => updateForm('subtitle', value)} placeholder="Tiny Humans, Big Cuteness" />
              <ServiceImageField
                className="md:col-span-2"
                value={form.img}
                onChange={(value) => updateForm('img', value)}
                onUpload={handleImageUpload}
                isUploading={isUploadingImage}
              />
              <TextField label="Starting price" type="number" value={form.startingPrice} onChange={(value) => updateForm('startingPrice', value)} placeholder="5999" />
              <TextField label="Display order" type="number" value={form.displayOrder} onChange={(value) => updateForm('displayOrder', value)} placeholder="1" />
              <TextField label="Default duration" type="number" value={form.defaultDurationMinutes} onChange={(value) => updateForm('defaultDurationMinutes', value)} placeholder="60" />
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Description</span>
              <textarea
                value={form.desc}
                onChange={(event) => updateForm('desc', event.target.value)}
                className="min-h-28 w-full resize-none rounded-[1rem] border border-primary/10 bg-bg px-4 py-3 outline-none transition focus:border-accent"
                placeholder="Short service description"
              />
            </label>

            <label className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-primary/5 bg-bg px-4 py-3">
              <span>
                <span className="block text-sm font-bold">Public visibility</span>
                <span className="block text-xs text-text-secondary">Show this service on the website</span>
              </span>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => updateForm('isActive', event.target.checked)}
                className="h-5 w-5 shrink-0 accent-[var(--color-accent)]"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                disabled={isSaving}
                variant="accent"
                className="flex-1 py-4"
              >
                {isSaving && <SpinnerGap size={17} className="animate-spin" />}
                {editingService ? 'Save Service' : 'Create Service'}
              </Button>
              {editingService && (
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="py-4"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Panel>

        <Panel title="Services list">
          {isLoading ? (
            <SkeletonRows />
          ) : services.length === 0 ? (
            <EmptyState title="No services found" text="Create the first service to publish it on the website." />
          ) : (
            <div className="flex flex-col gap-3">
              {services.map((service) => {
                const normalized = normalizeServiceForm(service);
                const isHidden = service.isActive === false;

                return (
                  <div
                    key={getServiceId(service) || service.title}
                    className="group rounded-[1.5rem] border border-primary/5 bg-bg/75 p-4 transition hover:border-accent/60 hover:bg-white"
                  >
                    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                      <div className="grid min-w-0 gap-4 sm:grid-cols-[6rem_minmax(0,1fr)]">
                        <div className="h-24 w-24 overflow-hidden rounded-[1.25rem] bg-card shadow-sm">
                          {normalized.img ? (
                            <img src={normalized.img} alt={normalized.title} className="h-full w-full object-cover" />
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
                          <p className="mt-2 break-words text-sm text-text-secondary">{normalized.subtitle || 'No subtitle'}</p>
                          <p className="mt-1 line-clamp-2 break-words text-sm text-primary/60">{normalized.desc || 'No description'}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-primary/45">
                            <span>Order {normalized.displayOrder || 0}</span>
                            <span>/</span>
                            <span>{normalized.defaultDurationMinutes || 60} min</span>
                            {normalized.startingPrice ? (
                              <>
                                <span>/</span>
                                <span>₹{Number(normalized.startingPrice).toLocaleString('en-IN')}</span>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button type="button" variant="outline" size="icon" aria-label={`Open actions for ${normalized.title || 'service'}`}>
                              <DotsThreeVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem onSelect={() => startEdit(service)}>
                                <PencilSimple size={16} />
                                Edit service
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => toggleService(service)}>
                                {isHidden ? <Eye size={16} /> : <EyeSlash size={16} />}
                                {isHidden ? 'Show publicly' : 'Hide service'}
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem destructive onSelect={() => deleteService(service)}>
                              <Trash size={16} />
                              Delete service
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
        </Panel>
      </div>
    </div>
  );
};
