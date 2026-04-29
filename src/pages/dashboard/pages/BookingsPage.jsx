import { useCallback, useEffect, useState } from 'react';
import {
  CaretLeft,
  CaretRight,
  CheckCircle,
  SlidersHorizontal,
} from 'phosphor-react';
import { adminBookingsApi } from '../../../services/adminApi';
import { SERVICES, STATUSES } from '../config';
import { getBookingId, getErrorMessage } from '../utils';
import { BookingDrawer } from '../components/BookingDrawer';
import {
  BookingRow,
  EmptyState,
  ErrorNotice,
  PageHeader,
  Panel,
  SelectField,
  SkeletonRows,
} from '../components/DashboardUI';

export const BookingsPage = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10, status: '', service: '' });
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await adminBookingsApi.list(filters);
      setBookings(data.items);
      setPagination(data.pagination);
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load bookings.'));
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = window.setTimeout(loadBookings, 0);
    return () => window.clearTimeout(timer);
  }, [loadBookings]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  };

  const openBooking = async (booking) => {
    const id = getBookingId(booking);
    setSelectedBooking({ ...booking, isLoadingDetails: true });
    setError('');

    try {
      const details = await adminBookingsApi.get(id);
      setSelectedBooking(details);
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load full booking details. Showing list data.'));
      setSelectedBooking(booking);
    }
  };

  const closeDrawer = () => setSelectedBooking(null);

  const handleStatusUpdate = async (booking, values) => {
    const id = getBookingId(booking);
    await adminBookingsApi.updateStatus(id, values);
    setActionMessage('Booking status updated.');
    await loadBookings();
    closeDrawer();
  };

  const handleBookingUpdate = async (booking, values) => {
    const id = getBookingId(booking);
    await adminBookingsApi.update(id, values);
    setActionMessage('Booking details updated.');
    await loadBookings();
    closeDrawer();
  };

  const handleDelete = async (booking) => {
    const id = getBookingId(booking);
    await adminBookingsApi.remove(id);
    setActionMessage('Booking deleted.');
    await loadBookings();
    closeDrawer();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Bookings"
        title="Manage requests"
        description="Filter, review, update, confirm, reschedule, complete, cancel, or delete customer booking requests."
      />

      <Panel title="Filters" icon={<SlidersHorizontal size={18} />}>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SelectField label="Status" value={filters.status} onChange={(value) => updateFilter('status', value)}>
            <option value="">All statuses</option>
            {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </SelectField>
          <SelectField label="Service" value={filters.service} onChange={(value) => updateFilter('service', value)}>
            <option value="">All services</option>
            {SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
          </SelectField>
          <SelectField label="Limit" value={filters.limit} onChange={(value) => updateFilter('limit', Number(value))}>
            {[10, 20, 50].map((limit) => <option key={limit} value={limit}>{limit} per page</option>)}
          </SelectField>
          <button
            type="button"
            onClick={() => setFilters({ page: 1, limit: 10, status: '', service: '' })}
            className="rounded-full border border-primary/10 px-4 py-3 text-sm font-bold transition hover:bg-primary hover:text-bg md:self-end"
          >
            Reset filters
          </button>
        </div>
      </Panel>

      {actionMessage && (
        <div className="flex items-center gap-3 rounded-[1.25rem] border border-accent/40 bg-accent/20 p-4 text-sm font-bold">
          <CheckCircle size={18} />
          {actionMessage}
        </div>
      )}

      {error && <ErrorNotice message={error} />}

      <Panel title="Booking queue">
        {isLoading ? (
          <SkeletonRows />
        ) : bookings.length === 0 ? (
          <EmptyState title="No bookings found" text="Try changing filters or wait for the next public booking request." />
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <button
                key={getBookingId(booking)}
                type="button"
                onClick={() => openBooking(booking)}
                className="w-full text-left"
              >
                <BookingRow booking={booking} />
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3 border-t border-primary/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            Page {pagination.page || filters.page} of {pagination.totalPages || 1}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              type="button"
              disabled={Number(filters.page) <= 1}
              onClick={() => setFilters((current) => ({ ...current, page: Math.max(1, Number(current.page) - 1) }))}
              className="flex items-center gap-2 rounded-full border border-primary/10 px-4 py-2 text-sm font-bold disabled:opacity-40"
            >
              <CaretLeft size={16} />
              Prev
            </button>
            <button
              type="button"
              disabled={Number(filters.page) >= Number(pagination.totalPages || 1)}
              onClick={() => setFilters((current) => ({ ...current, page: Number(current.page) + 1 }))}
              className="flex items-center gap-2 rounded-full border border-primary/10 px-4 py-2 text-sm font-bold disabled:opacity-40"
            >
              Next
              <CaretRight size={16} />
            </button>
          </div>
        </div>
      </Panel>

      <BookingDrawer
        booking={selectedBooking}
        onClose={closeDrawer}
        onStatusUpdate={handleStatusUpdate}
        onBookingUpdate={handleBookingUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};
