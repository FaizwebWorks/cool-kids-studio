export const cx = (...classes) => classes.filter(Boolean).join(' ');

export const formatDate = (value) => {
  if (!value) return 'Not set';

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

export const getBookingId = (booking) => booking?._id || booking?.id;

export const getServiceId = (service) => service?._id || service?.id;

export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (error?.message) return error.message;
  return fallback;
};
