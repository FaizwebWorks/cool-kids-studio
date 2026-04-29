import {
  ArrowRight,
  CheckCircle,
  PencilSimple,
  SpinnerGap,
  WarningCircle,
} from 'phosphor-react';
import { bookingSteps } from '../../constants/bookingFlow';

export const FieldError = ({ children }) => {
  if (!children) return null;
  return <p className="mt-2 text-xs font-medium text-red-600">{children}</p>;
};

export const SectionLabel = ({ icon, eyebrow, title, children }) => (
  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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

export const LoadingSlots = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-12 animate-pulse rounded-full bg-primary/5" />
    ))}
  </div>
);

export const StepProgress = ({ activeStep, completedSteps, onStepClick }) => (
  <div className="rounded-[1.75rem] border border-primary/5 bg-white/45 p-3 shadow-sm sm:p-4">
    <div className="flex gap-2 overflow-x-auto no-scrollbar sm:grid sm:grid-cols-5">
      {bookingSteps.map((step, index) => {
        const isActive = activeStep === index;
        const isComplete = completedSteps[index];
        const isReachable = isComplete || index <= activeStep;

        return (
          <button
            key={step.key}
            type="button"
            disabled={!isReachable}
            onClick={() => onStepClick(index)}
            className={`min-w-24 rounded-full px-3 py-3 text-[10px] font-bold uppercase tracking-[0.12em] transition sm:min-w-0 ${
              isActive
                ? 'bg-primary text-bg'
                : isComplete
                  ? 'bg-accent text-primary'
                  : 'bg-bg/70 text-primary/35'
            } disabled:cursor-not-allowed`}
          >
            {`${String(index + 1).padStart(2, '0')} ${step.label}`}
          </button>
        );
      })}
    </div>
  </div>
);

export const StepGuide = ({ title, hint, tips = [] }) => (
  <div className="mb-5 rounded-[1.5rem] border border-primary/5 bg-bg/65 p-4 sm:p-5">
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/40">What to do here</p>
    <h3 className="mt-2 text-lg font-bold text-primary/90">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{hint}</p>
    {tips.length > 0 && (
      <div className="mt-4 flex flex-col gap-2">
        {tips.map((tip) => (
          <p key={tip} className="text-xs font-medium leading-relaxed text-primary/55">
            {tip}
          </p>
        ))}
      </div>
    )}
  </div>
);

export const SummaryTile = ({ icon, title, text }) => (
  <div className="min-w-0 rounded-[1.5rem] border border-primary/5 bg-white/45 p-4 shadow-sm sm:p-5">
    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent/25 text-primary">
      {icon}
    </div>
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/45">{title}</p>
    <p className="mt-1 truncate font-medium text-primary/90">{text}</p>
  </div>
);

export const CollapsedStep = ({ eyebrow, title, summary, onEdit }) => (
  <section className="rounded-[1.75rem] border border-white/70 bg-white/35 p-4 shadow-sm sm:p-5">
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">{eyebrow}</p>
        <h3 className="mt-1 font-heading text-3xl uppercase leading-none text-primary">{title}</h3>
        <p className="mt-2 truncate text-sm text-text-secondary">{summary}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/10 transition hover:bg-accent/30"
        aria-label={`Edit ${title}`}
      >
        <PencilSimple size={16} />
      </button>
    </div>
  </section>
);

export const StepActions = ({ canContinue, onBack, onNext, nextLabel = 'Continue' }) => (
  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    {onBack && (
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-primary/10 px-6 py-4 text-sm font-bold transition hover:bg-primary hover:text-bg"
      >
        Back
      </button>
    )}
    <button
      type="button"
      disabled={!canContinue}
      onClick={onNext}
      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold text-primary transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
    >
      {nextLabel}
      <ArrowRight size={17} />
    </button>
  </div>
);

export const SubmitError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
      <WarningCircle size={20} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export const ConfirmationPanel = ({ confirmation, form, formatDisplayDate }) => {
  if (!confirmation) return null;

  return (
    <div className="rounded-[2rem] border border-accent/40 bg-accent/20 p-5 md:p-8">
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
  );
};

export const MobileBookingBar = ({
  activeStep,
  canSubmit,
  completedSteps,
  confirmation,
  form,
  onNext,
  onSubmit,
  selectedPackage,
  formatDisplayDate,
}) => {
  if (confirmation) return null;

  const bottomCtaLabel = activeStep === 4 ? 'Submit Request' : 'Continue';
  const activeStepConfig = bookingSteps[activeStep];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/5 bg-bg/90 p-3 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-primary">{form.service} · {form.preferredTime || activeStepConfig.label}</p>
          <p className="truncate text-[11px] text-text-secondary">{form.preferredDate ? formatDisplayDate(form.preferredDate) : selectedPackage?.name}</p>
        </div>
        <button
          type="button"
          disabled={activeStep === 4 ? !canSubmit : !completedSteps[activeStep]}
          onClick={activeStep === 4 ? onSubmit : onNext}
          className="shrink-0 rounded-full bg-accent px-4 py-3 text-xs font-bold text-primary transition hover:bg-accent-hover disabled:opacity-50"
        >
          {bottomCtaLabel}
        </button>
      </div>
    </div>
  );
};
