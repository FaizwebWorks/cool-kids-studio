import { useEffect, useMemo, useState } from 'react';
import { adminBookingsApi } from '../../../services/adminApi';
import { STATUSES } from '../config';
import { getBookingId, getErrorMessage } from '../utils';
import {
  BookingRow,
  EmptyState,
  ErrorNotice,
  MetricCard,
  PageHeader,
  Panel,
  SkeletonRows,
} from '../components/DashboardUI';

export const OverviewPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await adminBookingsApi.list({ page: 1, limit: 50 });
        if (isMounted) setBookings(data.items);
      } catch (err) {
        if (isMounted) setError(getErrorMessage(err, 'Could not load dashboard data.'));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const counts = STATUSES.reduce((acc, status) => ({ ...acc, [status]: 0 }), {});
    bookings.forEach((booking) => {
      if (counts[booking.status] !== undefined) counts[booking.status] += 1;
    });

    return [
      { label: 'Total Loaded', value: bookings.length, tone: 'dark' },
      { label: 'Pending', value: counts.pending, tone: 'accent' },
      { label: 'Confirmed', value: counts.confirmed, tone: 'light' },
      { label: 'Cancelled', value: counts.cancelled, tone: 'light' },
    ];
  }, [bookings]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Today in the studio"
        description="A clean operational view for requests, priorities, and the current studio queue."
      />

      {error && <ErrorNotice message={error} />}

      <div className="grid min-w-0 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => (
          <MetricCard key={stat.label} {...stat} isLoading={isLoading} />
        ))}
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <Panel title="Latest bookings" actionLabel="View all" actionTo="/dashboard/bookings">
          {isLoading ? (
            <SkeletonRows />
          ) : bookings.length === 0 ? (
            <EmptyState title="No bookings loaded" text="Once customers book sessions, recent requests will show here." />
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 6).map((booking) => (
                <BookingRow key={getBookingId(booking)} booking={booking} compact />
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Studio notes">
          <div className="space-y-3">
            {[
              'Review pending bookings before the end of the day.',
              'Keep service cards active only when sessions are available.',
              'Use notes in booking details for internal coordination.',
              'Check cancelled or rescheduled requests weekly.',
            ].map((item) => (
              <div key={item} className="rounded-[1rem] bg-bg/70 p-4 text-sm leading-relaxed text-text-secondary">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};
