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
import CustomDatePicker from '../components/common/CustomDatePicker';
import {
  CollapsedStep,
  ConfirmationPanel,
  FieldError,
  LoadingSlots,
  MobileBookingBar,
  SectionLabel,
  StepGuide,
  StepActions,
  StepProgress,
  SubmitError,
  SummaryTile,
} from '../components/booking/BookingFlowParts';
import { bookingSteps, FALLBACK_PACKAGES, FALLBACK_SERVICES, slotPeriods } from '../constants/bookingFlow';
import {
  BookingApiError,
  createPublicBooking,
  getBookingAvailability,
  getPublicServices,
} from '../services/bookingApi';
import {
  addDays,
  clearBookingDraft,
  durationLabel,
  formatDisplayDate,
  getTodayInputValue,
  groupSlots,
  isValidEmail,
  loadBookingDraft,
  normalizeService,
  packageNote,
  persistBookingDraft,
  priceLabel,
  servicePackages,
} from '../utils/bookingFlow';

const BookSession = () => {
  const [form, setForm] = useState(loadBookingDraft);
  const [activeStep, setActiveStep] = useState(0);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [servicesError, setServicesError] = useState('');
  const [slots, setSlots] = useState([]);
  const [availabilityMeta, setAvailabilityMeta] = useState(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [touched, setTouched] = useState({});

  const today = useMemo(() => getTodayInputValue(), []);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const data = await getPublicServices();
        const nextServices = (data || []).map(normalizeService).filter((item) => item.title);
        if (isMounted) {
          setServiceOptions(nextServices);
          setForm((current) => {
            const nextService = nextServices.find((item) => item.title === current.service) || nextServices[0];
            if (!nextService) return current;

            const nextPackages = servicePackages(nextService);
            const packageExists = nextPackages.some((item) => item.name === current.packageName);

            if (nextService.title === current.service && packageExists) return current;

            return {
              ...current,
              service: nextService.title,
              packageName: packageExists ? current.packageName : nextPackages[0]?.name || '',
              preferredTime: '',
            };
          });
        }
      } catch (error) {
        if (isMounted) setServicesError(error.message || 'Using default services for now.');
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    persistBookingDraft(form);
  }, [form]);

  const services = useMemo(() => (
    serviceOptions.length
      ? serviceOptions
      : FALLBACK_SERVICES.map((title) => ({ id: title, title, packages: FALLBACK_PACKAGES }))
  ), [serviceOptions]);

  const selectedService = useMemo(
    () => services.find((item) => item.title === form.service) || services[0],
    [form.service, services],
  );

  const packages = useMemo(() => {
    const dynamicPackages = servicePackages(selectedService);
    return dynamicPackages.map((item) => ({
      ...item,
      durationMinutes: item.durationMinutes || 60,
      note: packageNote(item),
    }));
  }, [selectedService]);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.name === form.packageName) || packages[0],
    [form.packageName, packages],
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

  const completedSteps = [
    Boolean(form.service),
    Boolean(form.packageName),
    Boolean(form.preferredDate && form.preferredTime),
    Boolean(form.clientName.trim().length >= 2 && isValidEmail(form.clientEmail) && form.clientPhone.trim().length >= 7),
    canSubmit,
  ];

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === 'service'
        ? { packageName: '', preferredTime: '' }
        : null),
      ...(key === 'packageName' || key === 'preferredDate'
        ? { preferredTime: '' }
        : null),
    }));
    setSubmitError('');
    if (confirmation) setConfirmation(null);
  };

  const chooseService = (service) => {
    const nextPackages = servicePackages(service);
    setForm((current) => ({
      ...current,
      service: service.title,
      packageName: nextPackages[0]?.name || '',
      preferredTime: '',
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

  const goToStep = (index) => {
    if (index <= activeStep || completedSteps[index]) {
      setActiveStep(index);
    }
  };

  const goNext = () => {
    setActiveStep((current) => Math.min(current + 1, bookingSteps.length - 1));
  };

  const goBack = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const tryNextDate = () => {
    let nextDate = addDays(form.preferredDate || today, 1);

    while (new Date(`${nextDate}T00:00:00`).getDay() === 0) {
      nextDate = addDays(nextDate, 1);
    }

    updateForm('preferredDate', nextDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ clientName: true, clientEmail: true, clientPhone: true });

    if (!canSubmit) {
      setActiveStep(3);
      return;
    }

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
      clearBookingDraft();
      await fetchAvailability({ preserveSelectedTime: false });
    } catch (error) {
      if (error instanceof BookingApiError && error.status === 409) {
        setSubmitError('This slot was just booked. Please choose another time.');
        setActiveStep(2);
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

  const slotGroups = useMemo(() => groupSlots(slots), [slots]);
  const activeStepConfig = bookingSteps[activeStep];

  return (
    <main className="min-h-screen bg-bg pb-24 text-primary/95 lg:pb-0">
      <section className="px-4 pb-10 pt-28 sm:px-5 md:px-10 md:pb-16 md:pt-40 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="min-w-0 lg:sticky lg:top-28 lg:h-fit"
          >
            <span className="mb-5 inline-flex rounded-full border border-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
              Public Booking
            </span>
            <h1 className="max-w-full break-words font-heading text-4xl uppercase leading-[0.92] tracking-tight text-primary min-[390px]:text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
              Book Your Session
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base md:mt-6 md:text-lg">
              Follow the steps in order to choose your session, check live availability, and send your booking request.
            </p>

            <div className="mt-8">
              <StepProgress activeStep={activeStep} completedSteps={completedSteps} onStepClick={goToStep} />
            </div>

            <div className="mt-4 rounded-[1.75rem] border border-primary/5 bg-white/45 p-4 shadow-sm sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Current step</p>
              <h2 className="mt-2 text-xl font-bold text-primary">{activeStepConfig.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{activeStepConfig.hint}</p>
            </div>

            <div className="mt-4 grid gap-3 min-[520px]:grid-cols-3 lg:grid-cols-1">
              <SummaryTile icon={<Package size={18} />} title="Package" text={selectedPackage?.name || 'Choose package'} />
              <SummaryTile icon={<CalendarBlank size={18} />} title="Date" text={form.preferredDate ? formatDisplayDate(form.preferredDate) : 'Choose a day'} />
              <SummaryTile icon={<Clock size={18} />} title="Slot" text={form.preferredTime || 'Select time'} />
            </div>

            <div className="mt-4 rounded-[1.75rem] border border-primary/5 bg-white/45 p-4 shadow-sm sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">What happens next</p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-text-secondary">
                <p>Choose your session and package.</p>
                <p>Select a date, then pick one of the available time slots.</p>
                <p>Send your details and we will confirm everything by email.</p>
              </div>
            </div>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            onSubmit={handleSubmit}
            className="min-w-0 flex flex-col gap-5"
          >
            {confirmation && (
              <ConfirmationPanel confirmation={confirmation} form={form} formatDisplayDate={formatDisplayDate} />
            )}

            {activeStep > 0 && completedSteps[0] && (
              <CollapsedStep eyebrow="Step 01" title="Choose Story" summary={form.service} onEdit={() => goToStep(0)} />
            )}

            {activeStep === 0 && (
              <section className="rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-sm backdrop-blur-md sm:p-5 md:p-8">
                <SectionLabel eyebrow="Step 01" title="Choose Story" icon={<Package size={14} weight="bold" />}>
                  {servicesError && <span className="text-xs text-primary/40">{servicesError}</span>}
                </SectionLabel>
                <StepGuide
                  title="Pick the session type that matches your shoot."
                  hint="This helps us show the most relevant packages and availability for your request."
                  tips={[
                    'Choose the closest session type now. You can still adjust small details later.',
                    'If you are unsure, pick the option that best matches the main purpose of the shoot.',
                  ]}
                />
                <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => chooseService(service)}
                      className={`min-w-0 rounded-[1.25rem] border px-4 py-4 text-left transition-all duration-300 ${
                        form.service === service.title
                          ? 'border-accent bg-accent text-primary shadow-sm'
                          : 'border-primary/5 bg-bg/70 text-primary/70 hover:border-accent/60'
                      }`}
                    >
                      <span className="block break-words font-heading text-2xl uppercase leading-none">{service.title}</span>
                      {service.subtitle && <span className="mt-2 block text-xs font-medium text-primary/55">{service.subtitle}</span>}
                    </button>
                  ))}
                </div>
                <StepActions canContinue={completedSteps[0]} onNext={goNext} nextLabel="Continue to Package" />
              </section>
            )}

            {activeStep > 1 && completedSteps[1] && (
              <CollapsedStep
                eyebrow="Step 02"
                title="Pick Package"
                summary={`${form.packageName} · ${durationLabel(selectedPackage?.durationMinutes)} · ${priceLabel(selectedPackage?.price || selectedService?.startingPrice)}`}
                onEdit={() => goToStep(1)}
              />
            )}

            {activeStep === 1 && (
              <section className="rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-sm backdrop-blur-md sm:p-5 md:p-8">
                <SectionLabel eyebrow="Step 02" title="Pick Package" icon={<CheckCircle size={14} weight="bold" />} />
                <StepGuide
                  title="Compare how much time and coverage you need."
                  hint="Packages mainly affect session length and how much room we have for outfit changes, setups, and extra moments."
                  tips={[
                    'Shorter packages are good for focused sessions.',
                    'Longer packages give you more flexibility for styling, pacing, and variety.',
                  ]}
                />
                <div className="grid gap-3 md:grid-cols-2">
                  {packages.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => updateForm('packageName', item.name)}
                      className={`min-w-0 rounded-[1.5rem] border p-4 text-left transition-all duration-300 sm:p-5 ${
                        form.packageName === item.name
                          ? 'border-accent bg-primary text-bg shadow-xl shadow-primary/10'
                          : 'border-primary/5 bg-bg/70 text-primary hover:border-accent/60'
                      }`}
                    >
                      <div className="flex flex-col gap-4 min-[520px]:flex-row min-[520px]:items-start min-[520px]:justify-between">
                        <div className="min-w-0">
                          <h3 className="break-words font-heading text-3xl uppercase leading-none">{item.name}</h3>
                          <p className={`mt-3 text-sm ${form.packageName === item.name ? 'text-bg/70' : 'text-text-secondary'}`}>
                            {item.note}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-row flex-wrap gap-2 min-[520px]:flex-col min-[520px]:items-end">
                          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                            {durationLabel(item.durationMinutes)}
                          </span>
                          <span className={`text-xs font-bold ${form.packageName === item.name ? 'text-bg/60' : 'text-primary/45'}`}>
                            {priceLabel(item.price || selectedService?.startingPrice)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <StepActions canContinue={completedSteps[1]} onBack={goBack} onNext={goNext} nextLabel="Continue to Date" />
              </section>
            )}

            {activeStep > 2 && completedSteps[2] && (
              <CollapsedStep
                eyebrow="Step 03"
                title="Date & Time"
                summary={`${formatDisplayDate(form.preferredDate)} at ${form.preferredTime}`}
                onEdit={() => goToStep(2)}
              />
            )}

            {activeStep === 2 && (
              <section className="rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-sm backdrop-blur-md sm:p-5 md:p-8">
                <SectionLabel eyebrow="Step 03" title="Date & Time" icon={<CalendarBlank size={14} weight="bold" />} />
                <StepGuide
                  title="Choose a preferred date first, then lock a visible slot."
                  hint="Time slots update from live availability. If a slot disappears, it means it is no longer open."
                  tips={[
                    'Past dates are disabled automatically.',
                    'If your selected day has no openings, try the next available day button.',
                  ]}
                />
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">
                    Preferred date
                  </span>
                  <CustomDatePicker
                    min={today}
                    value={form.preferredDate}
                    onChange={(date) => updateForm('preferredDate', date)}
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
                      <p>
                        {selectedDateIsSunday
                          ? 'Sunday is closed. Please choose another date.'
                          : 'No slots are available for this selection. Try another date or package.'}
                      </p>
                      <button
                        type="button"
                        onClick={tryNextDate}
                        className="mt-4 rounded-full bg-accent px-5 py-3 text-sm font-bold text-primary transition hover:bg-accent-hover"
                      >
                        Try next available day
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {slotPeriods.filter((group) => slotGroups[group]?.length).map((group) => (
                        <div key={group}>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary/40">{group}</p>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                            {slotGroups[group].map((slot) => (
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <StepActions canContinue={completedSteps[2]} onBack={goBack} onNext={goNext} nextLabel="Continue to Details" />
              </section>
            )}

            {activeStep > 3 && completedSteps[3] && (
              <CollapsedStep
                eyebrow="Step 04"
                title="Your Details"
                summary={`${form.clientName} · ${form.clientEmail}`}
                onEdit={() => goToStep(3)}
              />
            )}

            {activeStep === 3 && (
              <section className="rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-sm backdrop-blur-md sm:p-5 md:p-8">
                <SectionLabel eyebrow="Step 04" title="Your Details" icon={<MapPin size={14} weight="bold" />} />
                <StepGuide
                  title="Add the contact details we should use for confirmation."
                  hint="We use these details to send booking updates and reach you if anything needs to be confirmed."
                  tips={[
                    'Use an email address you actively check.',
                    'Phone number and location help if we need to coordinate quickly.',
                  ]}
                />
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
                <StepActions canContinue={completedSteps[3]} onBack={goBack} onNext={goNext} nextLabel="Review Booking" />
              </section>
            )}

            {activeStep === 4 && (
              <section className="rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-sm backdrop-blur-md sm:p-5 md:p-8">
                <SectionLabel eyebrow="Step 05" title="Confirm Request" icon={<CheckCircle size={14} weight="bold" />} />
                <StepGuide
                  title="Review everything once before sending."
                  hint="After you submit, we create the booking request and send the confirmation details to your email."
                  tips={[
                    'Double-check the date, time, and contact details.',
                    'If something looks off, go back and edit the step before submitting.',
                  ]}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Service', form.service],
                    ['Package', form.packageName],
                    ['Duration', durationLabel(selectedPackage?.durationMinutes)],
                    ['Date', formatDisplayDate(form.preferredDate)],
                    ['Time', form.preferredTime],
                    ['Name', form.clientName],
                    ['Email', form.clientEmail],
                    ['Phone', form.clientPhone],
                    ['Location', form.location || 'Not added'],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-0 rounded-[1.25rem] border border-primary/5 bg-bg/70 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/40">{label}</p>
                      <p className="mt-1 break-words text-sm font-bold text-primary/85">{value}</p>
                    </div>
                  ))}
                </div>
                {form.message && (
                  <div className="mt-3 rounded-[1.25rem] border border-primary/5 bg-bg/70 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/40">Message</p>
                    <p className="mt-1 text-sm leading-relaxed text-primary/70">{form.message}</p>
                  </div>
                )}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-full border border-primary/10 px-6 py-4 text-sm font-bold transition hover:bg-primary hover:text-bg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex flex-1 items-center justify-center gap-3 rounded-full bg-accent px-8 py-5 font-bold text-primary transition-all duration-300 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting && <SpinnerGap size={20} className="animate-spin" />}
                    {isSubmitting ? 'Creating Booking' : 'Submit Booking Request'}
                  </button>
                </div>
              </section>
            )}

            <SubmitError message={submitError} />
          </motion.form>
        </div>
      </section>

      <MobileBookingBar
        activeStep={activeStep}
        canSubmit={canSubmit}
        completedSteps={completedSteps}
        confirmation={confirmation}
        form={form}
        onNext={goNext}
        onSubmit={handleSubmit}
        selectedPackage={selectedPackage}
        formatDisplayDate={formatDisplayDate}
      />

      <Footer />
    </main>
  );
};

export default BookSession;
