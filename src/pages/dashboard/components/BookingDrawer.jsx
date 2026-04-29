import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PencilSimple, SpinnerGap, Trash, X } from 'phosphor-react';
import { STATUSES } from '../config';
import { formatDate, getErrorMessage } from '../utils';
import { ErrorNotice, InfoTile, SelectField } from './DashboardUI';

export const BookingDrawer = ({ booking, onClose, onStatusUpdate, onBookingUpdate, onDelete }) => {
  const [status, setStatus] = useState('pending');
  const [adminNotes, setAdminNotes] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!booking) return;

    const timer = window.setTimeout(() => {
      setStatus(booking.status || 'pending');
      setAdminNotes(booking.adminNotes || '');
      setPreferredDate(booking.preferredDate ? String(booking.preferredDate).slice(0, 10) : '');
      setPreferredTime(booking.preferredTime || '');
      setError('');
    }, 0);

    return () => window.clearTimeout(timer);
  }, [booking]);

  if (!booking) return null;

  const runAction = async (action) => {
    setIsWorking(true);
    setError('');

    try {
      await action();
    } catch (err) {
      setError(getErrorMessage(err, 'Action failed.'));
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] overflow-hidden bg-primary/35 backdrop-blur-sm"
      >
        <motion.aside
          data-lenis-prevent
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="ml-auto h-dvh w-full max-w-xl overflow-y-auto overscroll-contain bg-bg p-4 pb-8 shadow-2xl sm:p-5 sm:pb-8 md:p-7 md:pb-10"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/45">Booking Detail</p>
              <h2 className="mt-2 break-words font-heading text-4xl uppercase leading-none sm:text-5xl">{booking.clientName || 'Customer'}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10"
              aria-label="Close booking detail"
            >
              <X size={18} />
            </button>
          </div>

          {booking.isLoadingDetails && (
            <div className="mt-5 flex items-center gap-3 text-sm text-text-secondary">
              <SpinnerGap size={18} className="animate-spin" />
              Loading full booking details
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InfoTile label="Email" value={booking.clientEmail} />
            <InfoTile label="Phone" value={booking.clientPhone} />
            <InfoTile label="Service" value={booking.service} />
            <InfoTile label="Package" value={booking.package} />
            <InfoTile label="Date" value={formatDate(booking.preferredDate)} />
            <InfoTile label="Time" value={booking.preferredTime} />
            <InfoTile label="Payment" value={booking.paymentStatus || 'unpaid'} />
            <InfoTile label="Status" value={booking.status} />
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-primary/5 bg-white/55 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Customer message</p>
            <p className="text-sm leading-relaxed text-text-secondary">{booking.message || 'No message added.'}</p>
          </div>

          <div className="mt-5 space-y-4 rounded-[1.5rem] border border-primary/5 bg-white/55 p-5">
            <SelectField label="Status" value={status} onChange={setStatus}>
              {STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
            </SelectField>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">
                Admin notes
              </span>
              <textarea
                value={adminNotes}
                onChange={(event) => setAdminNotes(event.target.value)}
                className="min-h-28 w-full resize-none rounded-[1rem] border border-primary/10 bg-bg px-4 py-3 outline-none transition focus:border-accent"
                placeholder="Internal note for this booking"
              />
            </label>
            <button
              type="button"
              disabled={isWorking}
              onClick={() => runAction(() => onStatusUpdate(booking, { status, adminNotes }))}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold transition hover:bg-accent-hover disabled:opacity-60"
            >
              {isWorking && <SpinnerGap size={16} className="animate-spin" />}
              Update Status
            </button>
          </div>

          <div className="mt-5 space-y-4 rounded-[1.5rem] border border-primary/5 bg-white/55 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Date</span>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(event) => setPreferredDate(event.target.value)}
                  className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-3 outline-none transition focus:border-accent"
                />
              </label>
              <label>
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Time</span>
                <input
                  value={preferredTime}
                  onChange={(event) => setPreferredTime(event.target.value)}
                  className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-3 outline-none transition focus:border-accent"
                  placeholder="09:30 AM"
                />
              </label>
            </div>
            <button
              type="button"
              disabled={isWorking}
              onClick={() => runAction(() => onBookingUpdate(booking, { preferredDate, preferredTime, adminNotes }))}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/10 px-5 py-3 text-sm font-bold transition hover:bg-primary hover:text-bg disabled:opacity-60"
            >
              <PencilSimple size={16} />
              Save Booking Fields
            </button>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-700">Danger zone</p>
            <p className="mt-1 text-sm text-red-600">Deleting removes this booking from the admin queue.</p>
            <button
              type="button"
              disabled={isWorking}
              onClick={() => {
                if (window.confirm('Delete this booking? This cannot be undone.')) {
                  runAction(() => onDelete(booking));
                }
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              <Trash size={16} />
              Delete Booking
            </button>
          </div>

          {error && <div className="mt-5"><ErrorNotice message={error} /></div>}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
};
