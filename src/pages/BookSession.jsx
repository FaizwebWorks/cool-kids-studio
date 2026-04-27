import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarBlank,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  SpinnerGap,
  WarningCircle,
} from 'phosphor-react';
import Footer from '../components/common/Footer';
import { BookingApiError, createPublicBooking, getBookingAvailability } from '../services/bookingApi';

const SERVICES = ['Newborn', 'Maternity', 'Birthday', 'Wedding', 'Portrait', 'Fashion'];

const PACKAGES = [
  { name: 'Starter Package', duration: '60 min', note: 'A focused session for simple stories.' },
  { name: 'Popular Package', duration: '120 min', note: 'More room for outfits, moods, and moments.' },
  { name: 'Premium Package', duration: '480 min', note: 'A full-day story with space to breathe.' },
  { name: 'Custom Package', duration: '60 min', note: 'Start light, then shape it with us.' },
];

const initialForm = {
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

const getTodayInputValue = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const formatDisplayDate = (value) => {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
};

const FieldError = ({ children }) => {
  if (!children) return null;
  return <p className="mt-2 text-xs font-medium text-red-600">{children}</p>;
};

const SectionLabel = ({ icon, eyebrow, title, children }) => (
  <div className="mb-5 flex items-start justify-between gap-4">
    <div>
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-heading text-4xl uppercase leading-none text-primary/95 md:text-5xl">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const LoadingSlots = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-12 animate-pulse rounded-full bg-primary/5" />
    ))}
  </div>
);

const BookSession = () => {
  const [form, setForm] = useState(initialForm);
  const [slots, setSlots] = useState([]);
  const [availabilityMeta, setAvailabilityMeta] = useState(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [touched, setTouched] = useState({});

  const today = useMemo(() => getTodayInputValue(), []);

  const selectedPackage = useMemo(
    () => PACKAGES.find((item) => item.name === form.packageName) || PACKAGES[0],
    [form.packageName],
  );

  const errors = useMemo(() => ({
    clientName:
      form.clientName.trim().length > 0 && form.clientName.trim().length < 2
        ? 'Name must be at least 2 characters.'
        : '',
    clientEmail:
      form.clientEmail.trim().length > 0 && !isValidEmail(form.clientEmail)
        ? 'Enter a valid email address.'
        : '',
    clientPhone:
      form.clientPhone.trim().length > 0 && form.clientPhone.trim().length < 7
        ? 'Phone number must be at least 7 characters.'
        : '',
  }), [form.clientEmail, form.clientName, form.clientPhone]);

  const canSubmit = Boolean(
    form.service
      && form.packageName
      && form.preferredDate
      && form.preferredDate >= today
      && form.preferredTime
      && form.clientName.trim().length >= 2
      && isValidEmail(form.clientEmail)
      && form.clientPhone.trim().length >= 7
      && !isSubmitting,
  );

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === 'service' || key === 'packageName' || key === 'preferredDate'
        ? { preferredTime: '' }
        : null),
    }));
    setSubmitError('');
    if (confirmation) setConfirmation(null);
  };

  const fetchAvailability = useCallback(async ({ signal, preserveSelectedTime = false } = {}) => {
    if (!form.preferredDate || !form.service || !form.packageName) {
      setSlots([]);
      setAvailabilityMeta(null);
      setSlotError('');
      return;
    }

    setIsLoadingSlots(true);
    setSlotError('');

    try {
      const data = await getBookingAvailability({
        date: form.preferredDate,
        service: form.service,
        packageName: form.packageName,
        signal,
      });
      const availableSlots = (data?.slots || []).filter((slot) => slot.available);

      setSlots(availableSlots);
      setAvailabilityMeta(data);

      setForm((current) => {
        if (!current.preferredTime) return current;
        const selectedSlotStillExists = availableSlots.some((slot) => slot.time === current.preferredTime);

        if (preserveSelectedTime && selectedSlotStillExists) return current;

        return { ...current, preferredTime: '' };
      });
    } catch (error) {
      if (error.name === 'AbortError') return;
      setSlots([]);
      setAvailabilityMeta(null);
      setSlotError(error.message || 'Could not fetch availability. Please try again.');
      setForm((current) => ({ ...current, preferredTime: '' }));
    } finally {
      setIsLoadingSlots(false);
    }
  }, [form.packageName, form.preferredDate, form.service]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetchAvailability({ signal: controller.signal });
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [fetchAvailability]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ clientName: true, clientEmail: true, clientPhone: true });

    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const booking = await createPublicBooking({
        clientName: form.clientName.trim(),
        clientEmail: form.clientEmail.trim(),
        clientPhone: form.clientPhone.trim(),
        service: form.service,
        package: form.packageName,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        location: form.location.trim(),
        message: form.message.trim(),
      });

      setConfirmation(booking);
      await fetchAvailability({ preserveSelectedTime: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      if (error instanceof BookingApiError && error.status === 409) {
        setSubmitError('This slot was just booked. Please choose another time.');
        await fetchAvailability({ preserveSelectedTime: false });
      } else {
        setSubmitError(error.message || 'Could not create booking. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDateIsSunday = form.preferredDate
    ? new Date(`${form.preferredDate}T00:00:00`).getDay() === 0
    : false;

  return (
    <main className="min-h-screen bg-bg text-primary/95">
      <section className="px-5 pb-10 pt-32 md:px-10 md:pb-16 md:pt-40 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            <span className="mb-5 inline-flex rounded-full border border-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
              Public Booking
            </span>
            <h1 className="font-heading text-6xl uppercase leading-[0.92] tracking-tight text-primary md:text-8xl lg:text-9xl">
              Book Your Session
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              Choose a service, package, date, and an available time. No login needed.
              We will send the confirmation once your request is placed.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: <CalendarBlank size={18} />, title: 'Pick date', text: form.preferredDate ? formatDisplayDate(form.preferredDate) : 'Choose a day' },
                { icon: <Package size={18} />, title: 'Package', text: selectedPackage.duration },
                { icon: <Clock size={18} />, title: 'Slot', text: form.preferredTime || 'Select time' },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-primary/5 bg-white/45 p-5 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent/25 text-primary">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/45">{item.title}</p>
                  <p className="mt-1 font-medium text-primary/90">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {confirmation && (
              <div className="rounded-[2rem] border border-accent/40 bg-accent/20 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle size={30} weight="fill" className="mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/55">
                      Booking Created
                    </p>
                    <h2 className="mt-2 font-heading text-4xl uppercase leading-none md:text-5xl">
                      We got your request.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-primary/70">
                      Your booking request is pending. We will send the details to your email.
                    </p>
                    <div className="mt-5 grid gap-2 text-sm text-primary/75 sm:grid-cols-2">
                      <p><strong>Date:</strong> {formatDisplayDate(form.preferredDate)}</p>
                      <p><strong>Time:</strong> {confirmation.preferredTime}</p>
                      <p><strong>Service:</strong> {confirmation.service}</p>
                      <p><strong>Package:</strong> {confirmation.package}</p>
                      <p><strong>Status:</strong> {confirmation.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <section className="rounded-[2rem] border border-white/70 bg-white/45 p-5 shadow-sm backdrop-blur-md md:p-8">
              <SectionLabel eyebrow="Step 01" title="Choose Story" icon={<Package size={14} weight="bold" />} />
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {SERVICES.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => updateForm('service', service)}
                    className={`rounded-[1.25rem] border px-4 py-4 text-left font-heading text-2xl uppercase transition-all duration-300 ${
                      form.service === service
                        ? 'border-accent bg-accent text-primary shadow-sm'
                        : 'border-primary/5 bg-bg/70 text-primary/70 hover:border-accent/60'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white/45 p-5 shadow-sm backdrop-blur-md md:p-8">
              <SectionLabel eyebrow="Step 02" title="Pick Package" icon={<CheckCircle size={14} weight="bold" />} />
              <div className="grid gap-3 md:grid-cols-2">
                {PACKAGES.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => updateForm('packageName', item.name)}
                    className={`rounded-[1.5rem] border p-5 text-left transition-all duration-300 ${
                      form.packageName === item.name
                        ? 'border-accent bg-primary text-bg shadow-xl shadow-primary/10'
                        : 'border-primary/5 bg-bg/70 text-primary hover:border-accent/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-3xl uppercase leading-none">{item.name}</h3>
                        <p className={`mt-3 text-sm ${form.packageName === item.name ? 'text-bg/70' : 'text-text-secondary'}`}>
                          {item.note}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                        {item.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white/45 p-5 shadow-sm backdrop-blur-md md:p-8">
              <SectionLabel eyebrow="Step 03" title="Date & Time" icon={<CalendarBlank size={14} weight="bold" />} />
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">
                  Preferred date
                </span>
                <input
                  type="date"
                  min={today}
                  value={form.preferredDate}
                  onChange={(event) => updateForm('preferredDate', event.target.value)}
                  className="w-full rounded-full border border-primary/10 bg-bg px-5 py-4 text-base font-medium text-primary outline-none transition focus:border-accent"
                  required
                />
              </label>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary/45">
                    Available slots
                  </span>
                  {availabilityMeta?.timezone && (
                    <span className="text-xs text-text-secondary">{availabilityMeta.timezone}</span>
                  )}
                </div>

                {!form.preferredDate ? (
                  <div className="rounded-[1.5rem] border border-primary/5 bg-bg/70 p-5 text-sm text-text-secondary">
                    Select a date to see available times.
                  </div>
                ) : isLoadingSlots ? (
                  <LoadingSlots />
                ) : slotError ? (
                  <div className="flex items-start gap-3 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                    <WarningCircle size={20} className="mt-0.5 shrink-0" />
                    <span>{slotError}</span>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-primary/5 bg-bg/70 p-5 text-sm text-text-secondary">
                    {selectedDateIsSunday
                      ? 'Sunday is closed. Please choose another date.'
                      : 'No slots are available for this selection. Try another date or package.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {slots.map((slot) => (
                      <button
                        key={slot.start || slot.time}
                        type="button"
                        onClick={() => updateForm('preferredTime', slot.time)}
                        className={`rounded-full border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                          form.preferredTime === slot.time
                            ? 'border-primary bg-primary text-bg shadow-lg shadow-primary/10'
                            : 'border-primary/5 bg-bg text-primary/70 hover:border-accent hover:bg-accent/30'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white/45 p-5 shadow-sm backdrop-blur-md md:p-8">
              <SectionLabel eyebrow="Step 04" title="Your Details" icon={<MapPin size={14} weight="bold" />} />
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Name</span>
                  <input
                    value={form.clientName}
                    onBlur={() => setTouched((current) => ({ ...current, clientName: true }))}
                    onChange={(event) => updateForm('clientName', event.target.value)}
                    className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
                    placeholder="John Doe"
                    required
                  />
                  <FieldError>{touched.clientName && errors.clientName}</FieldError>
                </label>
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Email</span>
                  <input
                    type="email"
                    value={form.clientEmail}
                    onBlur={() => setTouched((current) => ({ ...current, clientEmail: true }))}
                    onChange={(event) => updateForm('clientEmail', event.target.value)}
                    className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
                    placeholder="you@example.com"
                    required
                  />
                  <FieldError>{touched.clientEmail && errors.clientEmail}</FieldError>
                </label>
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Phone</span>
                  <input
                    value={form.clientPhone}
                    onBlur={() => setTouched((current) => ({ ...current, clientPhone: true }))}
                    onChange={(event) => updateForm('clientPhone', event.target.value)}
                    className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
                    placeholder="1234567890"
                    required
                  />
                  <FieldError>{touched.clientPhone && errors.clientPhone}</FieldError>
                </label>
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Location</span>
                  <input
                    value={form.location}
                    onChange={(event) => updateForm('location', event.target.value)}
                    className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
                    placeholder="Navsari, Gujarat"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">
                  Message
                </span>
                <textarea
                  value={form.message}
                  onChange={(event) => updateForm('message', event.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-[1.25rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
                  placeholder="Tell us anything useful before the shoot."
                />
              </label>
            </section>

            {submitError && (
              <div className="flex items-start gap-3 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
                <WarningCircle size={20} className="mt-0.5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-5 font-bold text-primary transition-all duration-300 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && <SpinnerGap size={20} className="animate-spin" />}
              {isSubmitting ? 'Creating Booking' : 'Submit Booking Request'}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BookSession;
