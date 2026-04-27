const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export class BookingApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'BookingApiError';
    this.status = status;
  }
}

const parseResponse = async (response) => {
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new BookingApiError(
      payload?.message || 'Something went wrong. Please try again.',
      response.status,
    );
  }

  if (payload?.success === false) {
    throw new BookingApiError(payload?.message || 'Request failed.', response.status);
  }

  return payload;
};

export const getBookingAvailability = async ({ date, service, packageName, signal }) => {
  const params = new URLSearchParams({
    date,
    service,
    package: packageName,
  });

  const response = await fetch(`${API_BASE_URL}/bookings/availability?${params.toString()}`, {
    method: 'GET',
    signal,
  });

  const payload = await parseResponse(response);
  return payload.data;
};

export const createPublicBooking = async (booking) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });

  const payload = await parseResponse(response);
  return payload.data;
};
