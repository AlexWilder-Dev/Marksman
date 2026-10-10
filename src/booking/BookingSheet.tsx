import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { booking, occasions, sectionMeta, site, venue, type Occasion, type OccasionId } from '../content';
import { Button } from '../components/Button';
import { CheckIcon, CloseIcon, ExternalIcon, MinusIcon, PlusIcon } from '../components/Icons';
import { slotsFor } from '../lib/availability';
import { useMediaQuery, useReducedMotion } from '../lib/hooks';
import { applyMeta } from '../lib/meta';
import { springs } from '../lib/motion';
import { calendarFromIso, formatLongDate, formatShortDate, formatSlot, londonClock, upcomingDays } from '../lib/time';
import { isEmail, isPhone } from '../lib/validate';
import type { BookingRequest } from './BookingContext';

interface Props {
  open: boolean;
  request: BookingRequest;
  session: number;
  onClose: () => void;
  onClosed: () => void;
}

export default function BookingSheet({ open, request, session, onClose, onClosed }: Props) {
  return (
    <AnimatePresence onExitComplete={onClosed}>
      {open && <Sheet key={session} request={request} onClose={onClose} />}
    </AnimatePresence>
  );
}

const occasionById = (id: OccasionId): Occasion => occasions.find((o) => o.id === id) ?? occasions[0];

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Sheet({ request, onClose }: { request: BookingRequest; onClose: () => void }) {
  const desktop = useMediaQuery('(min-width: 900px)');
  const reduced = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dragControls = useDragControls();
  const titleId = useId();

  const preset = request.occasion ? occasionById(request.occasion) : null;
  const [guests, setGuests] = useState(preset ? preset.defaultGuests : 2);
  const [occasion, setOccasion] = useState<OccasionId | null>(preset ? preset.id : null);
  const [autoRouted, setAutoRouted] = useState(false);
  const [announce, setAnnounce] = useState('');
  const [date, setDate] = useState<string | null>(null);

  const mode: 'table' | 'enquiry' = occasion ? 'enquiry' : 'table';
  const current = occasion ? occasionById(occasion) : null;

  // Groups of 9+ are routed to the enquiry form automatically, and back again.
  const changeGuests = (n: number) => {
    const next = Math.max(1, Math.min(booking.maxGuests, n));
    setGuests(next);
    if (next > booking.maxOnline && !occasion) {
      setOccasion('feasting');
      setAutoRouted(true);
      setAnnounce(`${next} guests. Groups of 9 or more: switched to the group enquiry form.`);
    } else if (next <= booking.maxOnline && occasion && autoRouted) {
      setOccasion(null);
      setAutoRouted(false);
      setAnnounce(`${next} guests. Back to booking a table online.`);
    }
  };

  // Scroll lock, inert background, Esc to close, focus trap.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, paddingRight: document.body.style.paddingRight };
    html.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const chrome = Array.from(document.querySelectorAll<HTMLElement>('[data-chrome], .skip-link'));
    chrome.forEach((el) => (el.inert = true));
    headingRef.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.paddingRight;
      chrome.forEach((el) => (el.inert = false));
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !sheetRef.current) return;
      const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Title and description follow the occasion (a wedding enquiry is never "Christmas").
  useEffect(() => {
    applyMeta(current ? { title: `${current.title} · ${site.name}`, description: current.intro } : { title: `${booking.copy.title} · ${site.name}`, description: booking.copy.onlineNote });
    return () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      applyMeta(sectionMeta[id] ?? null);
    };
  }, [current]);

  const title = current ? current.title : booking.copy.title;
  const enter = desktop ? { x: '100%' } : { y: '100%' };

  return (
    <>
      <motion.div
        className="sheet-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.3 }}
        onClick={onClose}
      />
      <motion.div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`sheet is-${mode}`}
        initial={reduced ? { opacity: 0 } : enter}
        animate={reduced ? { opacity: 1 } : { x: 0, y: 0, width: desktop ? (mode === 'enquiry' ? 600 : 480) : '100%' }}
        exit={reduced ? { opacity: 0 } : enter}
        transition={springs.sheet}
        drag={desktop || reduced ? false : 'y'}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 700) onClose();
        }}
      >
        {!desktop && (
          <div className="sheet-handle" onPointerDown={(e) => dragControls.start(e)} aria-hidden="true">
            <span />
          </div>
        )}

        <motion.header
          className="sheet-head"
          animate={{ backgroundColor: mode === 'enquiry' ? '#a6361f' : '#233a2f' }}
          transition={springs.morph}
        >
          <div className="sheet-head-text">
            <p className="label sheet-kicker">{mode === 'enquiry' ? 'Groups & occasions' : 'Up to 8 guests'}</p>
            <h2 id={titleId} ref={headingRef} tabIndex={-1} className="sheet-title">
              {title}
            </h2>
          </div>
          <button type="button" className="sheet-close" onClick={onClose}>
            <CloseIcon />
            <span className="vh">Close</span>
          </button>
        </motion.header>

        <div className="sheet-body">
          <AutoHeight reduced={reduced}>
            <Stepper value={guests} onChange={changeGuests} mode={mode} />
            <p className="vh" aria-live="polite">
              {announce}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              {mode === 'table' ? (
                <Morph key="table" reduced={reduced}>
                  <TableFlow guests={guests} date={date} setDate={setDate} />
                </Morph>
              ) : (
                <Morph key="enquiry" reduced={reduced}>
                  <EnquiryForm
                    guests={guests}
                    occasion={current!}
                    autoRouted={autoRouted}
                    initialDate={date}
                    onOccasion={(id) => {
                      setOccasion(id);
                      setAutoRouted(false);
                    }}
                    onDone={onClose}
                  />
                </Morph>
              )}
            </AnimatePresence>
          </AutoHeight>
        </div>
      </motion.div>
    </>
  );
}

function Morph({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
      transition={springs.morph}
    >
      {children}
    </motion.div>
  );
}

/** Springs the sheet's height as its content changes. */
function AutoHeight({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');
  useLayoutEffect(() => {
    if (!inner.current) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div className="autoheight" animate={{ height }} transition={reduced ? { duration: 0 } : springs.morph} initial={false}>
      <div ref={inner}>{children}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Guests stepper                                                      */
/* ------------------------------------------------------------------ */

function Stepper({ value, onChange, mode }: { value: number; onChange: (n: number) => void; mode: 'table' | 'enquiry' }) {
  const id = useId();
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);

  return (
    <div className="stepper" role="group" aria-labelledby={`${id}-label`}>
      <label id={`${id}-label`} htmlFor={`${id}-input`} className="label stepper-label">
        Guests
      </label>
      <div className="stepper-row">
        <button type="button" className="stepper-btn" onClick={() => onChange(value - 1)} disabled={value <= 1}>
          <MinusIcon />
          <span className="vh">One fewer guest</span>
        </button>
        <span className="stepper-value">
          <input
            id={`${id}-input`}
            className="stepper-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            value={text}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d]/g, '').slice(0, 3);
              setText(v);
              const n = Number(v);
              if (v && n >= 1) onChange(n);
            }}
            onBlur={() => setText(String(value))}
            aria-describedby={`${id}-hint`}
          />
          <motion.span
            key={value}
            className="stepper-pop"
            aria-hidden="true"
            initial={{ scale: 0.7, opacity: 0.9 }}
            animate={{ scale: 1.25, opacity: 0 }}
            transition={springs.snappy}
          />
        </span>
        <button type="button" className="stepper-btn" onClick={() => onChange(value + 1)} disabled={value >= booking.maxGuests}>
          <PlusIcon />
          <span className="vh">One more guest</span>
        </button>
      </div>
      <p id={`${id}-hint`} className="stepper-hint">
        {mode === 'table' ? booking.copy.onlineNote : booking.copy.enquiryNote}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1–8 guests: date, time, then OpenTable                              */
/* ------------------------------------------------------------------ */

function TableFlow({ guests, date, setDate }: { guests: number; date: string | null; setDate: (d: string | null) => void }) {
  const clock = useMemo(() => londonClock(), []);
  const days = useMemo(() => upcomingDays(clock, booking.daysAhead), [clock]);
  const [time, setTime] = useState<string | null>(null);
  const day = date ? calendarFromIso(date) : null;
  const slots = useMemo(() => (day ? slotsFor(day, guests, clock) : []), [day, guests, clock]);
  const nameId = useId();

  useEffect(() => {
    if (time && !slots.some((s) => s.time === time && s.available)) setTime(null);
  }, [slots, time]);

  const ready = Boolean(day && time);

  return (
    <div className="flow">
      <fieldset className="chips-field">
        <legend className="label">Date</legend>
        <div className="date-chips">
          {days.map((d) => {
            const closed = booking.sittings[d.dayKey].length === 0;
            return (
              <label key={d.iso} className={`date-chip${closed ? ' is-closed' : ''}`}>
                <input
                  type="radio"
                  name={`${nameId}-date`}
                  value={d.iso}
                  checked={date === d.iso}
                  disabled={closed}
                  onChange={() => setDate(d.iso)}
                />
                <span className="date-chip-face">
                  <span className="dc-wd">{d.weekdayShort}</span>
                  <span className="dc-d">{d.dayOfMonth}</span>
                  <span className="dc-m">{closed ? 'Closed' : d.monthShort}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="chips-field">
        <legend className="label">Time</legend>
        {!day && <p className="flow-hint">Choose a date to see tables.</p>}
        {day && slots.length > 0 && !slots.some((s) => s.available) && (
          <p className="flow-hint">No tables left online that day. Try another date, or walk in: the pub always keeps space.</p>
        )}
        {day && slots.length === 0 && <p className="flow-hint">No more sittings today. Try another date.</p>}
        {day && slots.length > 0 && (
          <div className="time-chips">
            {slots.map((s) => (
              <label key={s.time} className={`time-chip${s.available ? '' : ' is-taken'}`}>
                <input
                  type="radio"
                  name={`${nameId}-time`}
                  value={s.time}
                  checked={time === s.time}
                  disabled={!s.available}
                  onChange={() => setTime(s.time)}
                />
                <span className="time-chip-face">
                  {formatSlot(s.time)}
                  {!s.available && <span className="vh"> (fully booked)</span>}
                </span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <div className="flow-summary">
        <p className="flow-summary-line" aria-live="polite">
          {ready && day && time
            ? `${guests} ${guests === 1 ? 'guest' : 'guests'} · ${formatShortDate(day)} · ${formatSlot(time)}`
            : `${guests} ${guests === 1 ? 'guest' : 'guests'} · pick a date and time`}
        </p>
        {ready ? (
          <Button href={booking.openTableUrl} target="_blank" rel="noopener noreferrer" className="flow-confirm">
            {booking.copy.confirm} <ExternalIcon />
          </Button>
        ) : (
          <Button className="flow-confirm" disabled>
            {booking.copy.confirm}
          </Button>
        )}
        <p className="flow-note">{booking.copy.confirmNote}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 9+ and occasions: the enquiry form                                  */
/* ------------------------------------------------------------------ */

interface EnquiryProps {
  guests: number;
  occasion: Occasion;
  autoRouted: boolean;
  initialDate: string | null;
  onOccasion: (id: OccasionId) => void;
  onDone: () => void;
}

type Field = 'name' | 'email' | 'phone' | 'date' | 'occasion' | 'notes';

function EnquiryForm({ guests, occasion, autoRouted, initialDate, onOccasion, onDone }: EnquiryProps) {
  const id = useId();
  const clock = useMemo(() => londonClock(), []);
  const minDate = `${clock.year}-${String(clock.month).padStart(2, '0')}-${String(clock.day).padStart(2, '0')}`;
  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    email: '',
    phone: '',
    date: initialDate ?? '',
    occasion: occasion.id,
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => setValues((v) => ({ ...v, occasion: occasion.id })), [occasion.id]);

  const validate = useCallback(
    (v: Record<Field, string>) => {
      const e: Partial<Record<Field, string>> = {};
      if (!v.name.trim()) e.name = 'Please tell us your name.';
      if (!v.email.trim()) e.email = 'We need an email address to reply to.';
      else if (!isEmail(v.email)) e.email = 'That email address doesn’t look quite right.';
      if (v.phone.trim() && !isPhone(v.phone)) e.phone = 'Please check the phone number, or leave it blank.';
      if (!v.date) e.date = 'Pick a date, even a rough one.';
      else if (v.date < minDate) e.date = 'That date has already passed.';
      if (v.notes.length > 1000) e.notes = 'Please keep notes under 1,000 characters.';
      return e;
    },
    [minDate],
  );

  const set = (field: Field) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onBlur = (field: Field) => () => {
    const e = validate(values);
    setErrors((prev) => ({ ...prev, [field]: values[field] || field === 'date' ? e[field] : prev[field] }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    const first = (Object.keys(e) as Field[]).find((k) => e[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(true);
  };

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const chosen = occasionById(values.occasion as OccasionId);
  const mailto = `mailto:${venue.email.bookings}?subject=${encodeURIComponent(chosen.emailSubject)}&body=${encodeURIComponent(
    `Name: ${values.name}\nGuests: ${guests}\nDate: ${values.date}\nOccasion: ${chosen.label}\nPhone: ${values.phone}\n\n${values.notes}`,
  )}`;

  if (sent) {
    const day = values.date ? formatLongDate(calendarFromIso(values.date)) : '';
    return (
      <div className="enquiry-done" role="status">
        <span className="done-mark" aria-hidden="true">
          <CheckIcon />
        </span>
        <h3 ref={doneRef} tabIndex={-1} className="done-title">
          Thank you, {values.name.trim().split(/\s+/)[0]}.
        </h3>
        <p>
          Your {chosen.label.toLowerCase()} enquiry for {guests} guests on {day} is with the team. They’ll reply to{' '}
          <strong>{values.email}</strong> from {venue.email.bookings}.
        </p>
        <p className="done-demo">Concept demo: nothing has actually been sent.</p>
        <div className="done-actions">
          <Button variant="green" onClick={onDone}>
            Done
          </Button>
          <a className="text-link" href={mailto}>
            Email it instead
          </a>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="enquiry" noValidate onSubmit={submit}>
      <p className="enquiry-intro">{autoRouted ? booking.copy.groupSwitch : chosen.intro}</p>

      <FormField id={`${id}-name`} label="Name" error={errors.name}>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => set('name')(e.target.value)}
          onBlur={onBlur('name')}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          required
        />
      </FormField>
      <div className="field-pair">
        <FormField id={`${id}-email`} label="Email" error={errors.email}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => set('email')(e.target.value)}
            onBlur={onBlur('email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            required
          />
        </FormField>
        <FormField id={`${id}-phone`} label="Phone" optional error={errors.phone}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => set('phone')(e.target.value)}
            onBlur={onBlur('phone')}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
          />
        </FormField>
      </div>
      <div className="field-pair">
        <FormField id={`${id}-date`} label="Date" error={errors.date}>
          <input
            id={`${id}-date`}
            name="date"
            type="date"
            min={minDate}
            value={values.date}
            onChange={(e) => set('date')(e.target.value)}
            onBlur={onBlur('date')}
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={errors.date ? `${id}-date-error` : undefined}
            required
          />
        </FormField>
        <FormField id={`${id}-occasion`} label="Occasion">
          <select
            id={`${id}-occasion`}
            name="occasion"
            value={values.occasion}
            onChange={(e) => {
              set('occasion')(e.target.value);
              onOccasion(e.target.value as OccasionId);
            }}
          >
            {occasions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField id={`${id}-notes`} label="Anything else?" optional error={errors.notes}>
        <textarea
          id={`${id}-notes`}
          name="notes"
          rows={3}
          value={values.notes}
          placeholder="Timings, dietary needs, the occasion…"
          onChange={(e) => set('notes')(e.target.value)}
          aria-invalid={errors.notes ? true : undefined}
          aria-describedby={errors.notes ? `${id}-notes-error` : undefined}
        />
      </FormField>

      <div className="enquiry-actions">
        <Button type="submit">Send enquiry</Button>
        <p className="enquiry-note">
          Guests: <strong>{guests}</strong>. Or email{' '}
          <a href={mailto}>{venue.email.bookings}</a>
        </p>
      </div>
    </form>
  );
}

function FormField({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id} className="label field-label">
        {label}
        {optional && <span className="field-optional"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
