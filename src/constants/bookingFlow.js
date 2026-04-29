export const BOOKING_DRAFT_KEY = 'the-cool-kids-booking-draft';

export const FALLBACK_SERVICES = ['Newborn', 'Maternity', 'Birthday', 'Wedding', 'Portrait', 'Fashion'];

export const FALLBACK_PACKAGES = [
  { name: 'Starter Package', durationMinutes: 60, note: 'A focused session for simple stories.', price: 0 },
  { name: 'Popular Package', durationMinutes: 120, note: 'More room for outfits, moods, and moments.', price: 0 },
  { name: 'Premium Package', durationMinutes: 480, note: 'A full-day story with space to breathe.', price: 0 },
  { name: 'Custom Package', durationMinutes: 60, note: 'Start light, then shape it with us.', price: 0 },
];

export const initialBookingForm = {
  service: 'Newborn',
  packageName: 'Starter Package',
  preferredDate: '',
  preferredTime: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  location: '',
  message: '',
};

export const bookingSteps = [
  {
    key: 'story',
    label: 'Story',
    title: 'Choose your session type',
    hint: 'Start by picking the kind of shoot you want to book.',
  },
  {
    key: 'package',
    label: 'Package',
    title: 'Pick the right package',
    hint: 'Compare duration and coverage, then continue with the one that fits best.',
  },
  {
    key: 'date',
    label: 'Date',
    title: 'Select date and time',
    hint: 'Choose a preferred day first, then select one of the live available slots.',
  },
  {
    key: 'details',
    label: 'Details',
    title: 'Add your contact details',
    hint: 'Share the details we need to confirm the booking with you.',
  },
  {
    key: 'review',
    label: 'Confirm',
    title: 'Review before sending',
    hint: 'Check everything once, then submit your booking request.',
  },
];

export const slotPeriods = ['Morning', 'Afternoon', 'Evening'];
