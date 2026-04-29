import { createPortal } from 'react-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarBlank, CaretLeft, CaretRight } from 'phosphor-react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const toInputDate = (date) => {
  const normalized = new Date(date);
  normalized.setMinutes(normalized.getMinutes() - normalized.getTimezoneOffset());
  return normalized.toISOString().slice(0, 10);
};

const parseInputDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const formatDisplayDate = (value) => {
  if (!value) return 'Choose a date';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parseInputDate(value));
};

const buildCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(year, month, 1 - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      date,
      value: toInputDate(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isSunday: date.getDay() === 0,
    };
  });
};

const CustomDatePicker = ({ value, min, onChange, required = false }) => {
  const selectedDate = parseInputDate(value);
  const minDate = parseInputDate(min);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selectedDate || minDate || new Date());
  const [floatingStyle, setFloatingStyle] = useState(null);
  const rootRef = useRef(null);
  const panelRef = useRef(null);

  const updateFloatingPosition = useCallback(() => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;

    const viewportPadding = 16;
    const preferredWidth = window.innerWidth >= 768 ? 384 : rect.width;
    const width = Math.min(preferredWidth, window.innerWidth - viewportPadding * 2);
    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - width - viewportPadding,
    );

    setFloatingStyle({
      left,
      top: rect.bottom + 12,
      width,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      const clickedTrigger = rootRef.current?.contains(event.target);
      const clickedPanel = panelRef.current?.contains(event.target);

      if (!clickedTrigger && !clickedPanel) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const handleReposition = () => updateFloatingPosition();

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen, updateFloatingPosition]);

  const days = useMemo(() => buildCalendarDays(viewDate), [viewDate]);

  const monthLabel = useMemo(() => (
    new Intl.DateTimeFormat('en-IN', {
      month: 'long',
      year: 'numeric',
    }).format(viewDate)
  ), [viewDate]);

  const moveMonth = (amount) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  const calendarPanel = isOpen && floatingStyle ? createPortal(
    <div
      ref={panelRef}
      style={{
        left: floatingStyle.left,
        top: floatingStyle.top,
        width: floatingStyle.width,
      }}
      className="fixed z-[9999] overflow-hidden rounded-[1.5rem] border border-white/80 bg-bg p-4 shadow-2xl shadow-primary/20"
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => moveMonth(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 transition hover:bg-accent/25"
          aria-label="Previous month"
        >
          <CaretLeft size={17} />
        </button>
        <p className="font-heading text-3xl uppercase leading-none text-primary">{monthLabel}</p>
        <button
          type="button"
          onClick={() => moveMonth(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 transition hover:bg-accent/25"
          aria-label="Next month"
        >
          <CaretRight size={17} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-primary/35">
            {day}
          </div>
        ))}

        {days.map((item) => {
          const isSelected = item.value === value;
          const isToday = item.value === toInputDate(new Date());
          const isDisabled = minDate && item.date < minDate;

          return (
            <button
              key={item.value}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                onChange(item.value);
                setViewDate(item.date);
                setIsOpen(false);
              }}
              className={[
                'aspect-square rounded-full text-sm font-bold transition-all duration-200',
                item.isCurrentMonth ? 'text-primary' : 'text-primary/25',
                item.isSunday && !isSelected ? 'text-primary/45' : '',
                isToday && !isSelected ? 'ring-1 ring-primary/15' : '',
                isSelected ? 'bg-accent text-bg shadow-lg shadow-primary/10' : 'hover:bg-accent/35',
                isDisabled ? 'pointer-events-none text-primary/15 opacity-40 ring-0' : '',
              ].filter(Boolean).join(' ')}
            >
              {item.day}
            </button>
          );
        })}
      </div>
    </div>,
    document.body,
  ) : null;

  return (
    <div ref={rootRef} className="relative">
      <input className="sr-only" value={value} required={required} readOnly />
      <button
        type="button"
        onClick={() => {
          if (!isOpen && selectedDate) setViewDate(selectedDate);
          if (!isOpen) updateFloatingPosition();
          setIsOpen((current) => !current);
        }}
        className="flex w-full items-center justify-between gap-4 rounded-full border border-primary/10 bg-bg px-5 py-4 text-left text-base font-medium text-primary outline-none transition hover:border-accent/70 focus:border-accent"
        aria-expanded={isOpen}
      >
        <span>{formatDisplayDate(value)}</span>
        <CalendarBlank size={20} className="shrink-0 text-primary/55" />
      </button>

      {calendarPanel}
    </div>
  );
};

export default CustomDatePicker;
