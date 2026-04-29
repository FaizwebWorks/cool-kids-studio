import { BOOKING_DRAFT_KEY, FALLBACK_PACKAGES, initialBookingForm } from '../constants/bookingFlow';

export const getTodayInputValue = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
};

export const addDays = (value, amount) => {
  const date = value ? new Date(`${value}T00:00:00`) : new Date();
  date.setDate(date.getDate() + amount);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
};

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const formatDisplayDate = (value) => {
  if (!value) return 'Not selected';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
};

export const durationLabel = (minutes) => {
  const value = Number(minutes || 60);
  if (value < 60) return `${value} min`;
  if (value % 60 === 0) return `${value / 60} hr`;
  return `${Math.floor(value / 60)} hr ${value % 60} min`;
};

export const packageNote = (item) => item.description || item.note || 'A polished session shaped around your story.';

export const priceLabel = (value) => {
  const amount = Number(value || 0);
  if (!amount) return 'Custom quote';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const normalizeService = (service) => ({
  id: service._id || service.id || service.slug || service.title || service.name,
  title: service.title || service.name,
  subtitle: service.subtitle || '',
  description: service.description || service.desc || '',
  startingPrice: service.startingPrice || service.price || 0,
  packages: (service.availablePackages || []).map((item) => ({
    name: item.name,
    price: item.price || 0,
    durationMinutes: item.durationMinutes || service.defaultDurationMinutes || 60,
    description: item.description || '',
  })),
});

export const loadBookingDraft = () => {
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(BOOKING_DRAFT_KEY) || 'null');
    return parsed ? { ...initialBookingForm, ...parsed } : initialBookingForm;
  } catch {
    return initialBookingForm;
  }
};

export const persistBookingDraft = (form) => {
  window.sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(form));
};

export const clearBookingDraft = () => {
  window.sessionStorage.removeItem(BOOKING_DRAFT_KEY);
};

export const servicePackages = (service) => (
  service?.packages?.length ? service.packages : FALLBACK_PACKAGES
);

export const groupSlots = (items) => items.reduce((groups, slot) => {
  const hourMatch = String(slot.time || '').match(/(\d{1,2}):/);
  const isPm = /PM/i.test(slot.time || '');
  const rawHour = hourMatch ? Number(hourMatch[1]) : 0;
  const hour = isPm && rawHour !== 12 ? rawHour + 12 : rawHour === 12 && !isPm ? 0 : rawHour;
  const key = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';

  return {
    ...groups,
    [key]: [...(groups[key] || []), slot],
  };
}, {});
