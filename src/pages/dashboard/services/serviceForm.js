export const emptyServiceForm = {
  title: '',
  subtitle: '',
  desc: '',
  img: '',
  startingPrice: '',
  slug: '',
  displayOrder: '',
  defaultDurationMinutes: '',
  isActive: true,
};

export const MAX_SERVICE_IMAGE_BYTES = 10 * 1024 * 1024;
export const SERVICE_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

export const normalizeServiceForm = (service = {}) => ({
  title: service.title || service.name || '',
  subtitle: service.subtitle || '',
  desc: service.desc || service.description || '',
  img: service.img || service.image || service.coverImage || '',
  startingPrice: service.startingPrice || service.price || '',
  slug: service.slug || '',
  displayOrder: service.displayOrder ?? service.order ?? service.sortOrder ?? '',
  defaultDurationMinutes: service.defaultDurationMinutes ?? '',
  isActive: service.isActive !== false,
});

export const servicePayload = (form) => ({
  title: form.title.trim(),
  subtitle: form.subtitle.trim(),
  description: form.desc.trim(),
  coverImage: form.img.trim(),
  startingPrice: form.startingPrice === '' ? undefined : Number(form.startingPrice),
  slug: form.slug.trim(),
  displayOrder: form.displayOrder === '' ? undefined : Number(form.displayOrder),
  defaultDurationMinutes: form.defaultDurationMinutes === '' ? undefined : Number(form.defaultDurationMinutes),
  isActive: form.isActive,
});
