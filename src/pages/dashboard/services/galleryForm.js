export const GALLERY_CATEGORIES = ['Newborn', 'Maternity', 'Wedding', 'Birthday', 'Portrait', 'Fashion'];

export const MAX_GALLERY_IMAGE_BYTES = 10 * 1024 * 1024;
export const GALLERY_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

export const emptyGalleryForm = {
  title: '',
  image: '',
  imageAsset: '',
  categories: [],
  altText: '',
  description: '',
  displayOrder: '',
  isActive: true,
};

export const normalizeGalleryForm = (item = {}) => ({
  title: item.title || '',
  image: item.image || item.secureUrl || '',
  imageAsset: item.imageAsset || item.assetId || '',
  categories: Array.isArray(item.categories) ? item.categories : [],
  altText: item.altText || '',
  description: item.description || '',
  displayOrder: item.displayOrder ?? '',
  isActive: item.isActive !== false,
});

export const galleryPayload = (form) => ({
  title: form.title.trim(),
  image: form.image.trim(),
  imageAsset: form.imageAsset || undefined,
  categories: form.categories,
  altText: form.altText.trim(),
  description: form.description.trim(),
  displayOrder: form.displayOrder === '' ? undefined : Number(form.displayOrder),
  isActive: form.isActive,
});
