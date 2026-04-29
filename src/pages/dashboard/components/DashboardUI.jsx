import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  CaretDown,
  Image,
  SpinnerGap,
  UploadSimple,
  WarningCircle,
} from 'phosphor-react';
import { cx, formatDate } from '../utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

export const PageHeader = ({ eyebrow, title, description }) => (
  <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-primary/45">{eyebrow}</p>
      <h2 className="mt-2 max-w-full break-words font-heading text-4xl uppercase leading-[0.92] text-primary sm:text-5xl md:text-6xl xl:text-7xl">
        {title}
      </h2>
    </div>
    <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base xl:max-w-xl">{description}</p>
  </div>
);

export const Panel = ({ title, children, icon, actionLabel, actionTo }) => (
  <section className="min-w-0 rounded-[1.5rem] border border-white/70 bg-white/50 p-4 shadow-sm backdrop-blur-xl sm:rounded-[2rem] sm:p-5 md:p-6">
    <div className="mb-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {icon && <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/30">{icon}</div>}
        <h3 className="min-w-0 break-words font-heading text-3xl uppercase leading-none">{title}</h3>
      </div>
      {actionTo && (
        <NavLink to={actionTo} className="shrink-0 rounded-full border border-primary/10 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.14em]">
          {actionLabel}
        </NavLink>
      )}
    </div>
    {children}
  </section>
);

export const MetricCard = ({ label, value, tone, isLoading }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={cx(
      'min-w-0 rounded-[1.5rem] border p-5 shadow-sm transition sm:rounded-[2rem] sm:p-6',
      tone === 'dark' && 'border-primary bg-primary text-bg',
      tone === 'accent' && 'border-accent bg-accent text-primary',
      tone === 'light' && 'border-white/70 bg-white/50 text-primary',
    )}
  >
    <p className={cx('text-[10px] font-bold uppercase tracking-[0.22em]', tone === 'dark' ? 'text-bg/45' : 'text-primary/45')}>
      {label}
    </p>
    <div className="mt-6 break-words font-heading text-5xl uppercase leading-none sm:text-6xl md:text-7xl">
      {isLoading ? <span className="block h-16 w-24 animate-pulse rounded bg-current/10" /> : value}
    </div>
  </motion.div>
);

export const BookingRow = ({ booking, compact = false }) => (
  <div className="rounded-[1.5rem] border border-primary/5 bg-bg/70 p-4 transition hover:border-accent/50 hover:bg-white">
    <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="break-words font-bold text-primary">{booking.clientName || 'Unnamed client'}</h4>
          <StatusPill status={booking.status} />
        </div>
        <p className="mt-1 break-words text-sm text-text-secondary">
          {booking.service || 'Service'} · {booking.package || 'Package'} · {formatDate(booking.preferredDate)} at {booking.preferredTime || 'Time'}
        </p>
      </div>
      {!compact && (
        <p className="break-words text-sm text-text-secondary md:max-w-56 md:text-right">{booking.clientEmail || booking.clientPhone || 'No contact'}</p>
      )}
    </div>
  </div>
);

export const StatusPill = ({ status = 'pending' }) => {
  const tone = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-accent/50 text-primary',
    rescheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-primary text-bg',
    cancelled: 'bg-red-100 text-red-700',
  }[status] || 'bg-card text-primary';

  return (
    <span className={cx('rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]', tone)}>
      {status}
    </span>
  );
};

export const SelectField = ({ label, value, onChange, children }) => {
  const options = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child))
    .map((child) => ({
      value: child.props.value ?? '',
      label: child.props.children,
    }));
  const selectedOption = options.find((option) => String(option.value) === String(value)) || options[0];

  return (
    <div className="block min-w-0">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">{label}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex w-full min-w-0 items-center justify-between gap-3 rounded-full border border-primary/10 bg-bg px-4 py-3 text-left text-sm font-bold capitalize outline-none transition hover:border-accent focus:border-accent"
          >
            <span className="truncate">{selectedOption?.label || 'Select'}</span>
            <CaretDown size={16} className="shrink-0 text-primary/45" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
          <DropdownMenuGroup>
            {options.map((option) => (
              <DropdownMenuItem
                key={`${label}-${option.value}`}
                onSelect={() => onChange(option.value)}
                className={String(option.value) === String(value) ? 'bg-accent/35' : ''}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const TextField = ({ label, value, onChange, type = 'text', placeholder = '', required = false, className = '' }) => (
  <label className={cx('block min-w-0', className)}>
    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-3 outline-none transition focus:border-accent"
      placeholder={placeholder}
      required={required}
    />
  </label>
);

export const ImageUploadField = ({
  value,
  onChange,
  onUpload,
  isUploading = false,
  className = '',
  label = 'Image',
  placeholder = '/images/img2.webp',
  previewAlt = 'Preview image',
}) => (
  <div className={cx('block min-w-0', className)}>
    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">{label}</span>
    <div className="grid gap-3 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
      <div className="h-[5.5rem] overflow-hidden rounded-[1rem] border border-primary/10 bg-bg">
        {value ? (
          <img src={value} alt={previewAlt} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary/35">
            <Image size={24} />
          </div>
        )}
      </div>

      <div className="min-w-0 space-y-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full min-w-0 rounded-[1rem] border border-primary/10 bg-bg px-4 py-3 outline-none transition focus:border-accent"
          placeholder={placeholder}
        />

        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/10 bg-bg px-4 py-3 text-center text-sm font-bold transition hover:border-accent hover:bg-accent/20">
          {isUploading ? <SpinnerGap size={17} className="animate-spin" /> : <UploadSimple size={17} />}
          {isUploading ? 'Uploading Photo' : 'Upload Photo'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            disabled={isUploading}
            onChange={(event) => {
              onUpload(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
        </label>
      </div>
    </div>
  </div>
);

export const ServiceImageField = (props) => (
  <ImageUploadField
    label="Image"
    placeholder="/images/img2.webp"
    previewAlt="Service preview"
    {...props}
  />
);

export const InfoTile = ({ label, value }) => (
  <div className="rounded-[1.25rem] border border-primary/5 bg-white/55 p-4">
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/40">{label}</p>
    <p className="mt-2 break-words text-sm font-bold text-primary/85">{value || 'Not set'}</p>
  </div>
);

export const EmptyState = ({ title, text }) => (
  <div className="rounded-[1.5rem] border border-dashed border-primary/15 bg-bg/60 p-8 text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/30">
      <WarningCircle size={22} />
    </div>
    <h4 className="font-heading text-3xl uppercase leading-none">{title}</h4>
    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">{text}</p>
  </div>
);

export const ErrorNotice = ({ message }) => (
  <div className="flex items-start gap-3 rounded-[1.25rem] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    <WarningCircle size={18} className="mt-0.5 shrink-0" />
    <span>{message}</span>
  </div>
);

export const SkeletonRows = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="h-20 animate-pulse rounded-[1.5rem] bg-primary/5" />
    ))}
  </div>
);

export const FullPageLoader = ({ label }) => (
  <div className="flex min-h-screen items-center justify-center bg-bg">
    <div className="flex items-center gap-3 rounded-full border border-primary/10 bg-white/50 px-5 py-3 text-sm font-bold text-primary">
      <SpinnerGap size={18} className="animate-spin" />
      {label}
    </div>
  </div>
);
