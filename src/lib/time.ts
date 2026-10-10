import { hours, type DayHours, type DayKey } from '../content';

/** JS getDay() order. */
const JS_DAY_KEYS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const WEEKDAY_TO_KEY: Record<string, DayKey> = {
  Mon: 'mon', Tue: 'tue', Wed: 'wed', Thu: 'thu', Fri: 'fri', Sat: 'sat', Sun: 'sun',
};

export interface LondonClock {
  dayKey: DayKey;
  /** Minutes since local midnight in London. */
  minutes: number;
  year: number;
  month: number;
  day: number;
}

let formatter: Intl.DateTimeFormat | null = null;

export function londonClock(date: Date = new Date()): LondonClock {
  formatter ??= new Intl.DateTimeFormat('en-GB', {
    timeZone: hours.timeZone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  const hour = Number(get('hour')) % 24;
  return {
    dayKey: WEEKDAY_TO_KEY[get('weekday')] ?? 'mon',
    minutes: hour * 60 + Number(get('minute')),
    year: Number(get('year')),
    month: Number(get('month')),
    day: Number(get('day')),
  };
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** "16:00" -> "4pm", "17:30" -> "5.30pm", "12:00" -> "noon", "24:00" -> "midnight". */
export function formatTime(hhmm: string): string {
  const mins = toMinutes(hhmm);
  if (mins === 0 || mins === 1440) return 'midnight';
  if (mins === 720) return 'noon';
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const suffix = h24 < 12 ? 'am' : 'pm';
  return m === 0 ? `${h12}${suffix}` : `${h12}.${String(m).padStart(2, '0')}${suffix}`;
}

export function hoursFor(key: DayKey): DayHours {
  return hours.days.find((d) => d.key === key) ?? hours.days[0];
}

export function formatRange(d: DayHours): string {
  if (!d.open || !d.close) return 'Closed';
  return `${formatTime(d.open)} – ${formatTime(d.close)}`;
}

export interface OpenStatus {
  open: boolean;
  /** e.g. "Open now · until midnight" or "Opens Tuesday at 4pm". */
  label: string;
}

export function openStatus(clock: LondonClock): OpenStatus {
  const today = hoursFor(clock.dayKey);
  if (today.open && today.close) {
    const o = toMinutes(today.open);
    const c = toMinutes(today.close);
    if (clock.minutes >= o && clock.minutes < c) {
      return { open: true, label: `Open now · until ${formatTime(today.close)}` };
    }
    if (clock.minutes < o) {
      return { open: false, label: `Opens today at ${formatTime(today.open)}` };
    }
  }
  const startIdx = JS_DAY_KEYS.indexOf(clock.dayKey);
  for (let i = 1; i <= 7; i++) {
    const key = JS_DAY_KEYS[(startIdx + i) % 7];
    const d = hoursFor(key);
    if (d.open) {
      const when = i === 1 ? 'tomorrow' : d.day;
      return { open: false, label: `Opens ${when} at ${formatTime(d.open)}` };
    }
  }
  return { open: false, label: 'Closed' };
}

/* ------------------------------------------------------------------ */
/* Calendar helpers (pure Y-M-D arithmetic, no local-time surprises)   */
/* ------------------------------------------------------------------ */

export interface CalendarDay {
  iso: string;
  dayKey: DayKey;
  weekdayShort: string;
  weekdayLong: string;
  dayOfMonth: number;
  monthShort: string;
  monthLong: string;
  year: number;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function calendarDay(year: number, month: number, day: number): CalendarDay {
  const d = new Date(Date.UTC(year, month - 1, day));
  const dow = d.getUTCDay();
  const y = d.getUTCFullYear();
  const mo = d.getUTCMonth();
  const dd = d.getUTCDate();
  return {
    iso: `${y}-${String(mo + 1).padStart(2, '0')}-${String(dd).padStart(2, '0')}`,
    dayKey: JS_DAY_KEYS[dow],
    weekdayShort: WEEKDAYS[dow].slice(0, 3),
    weekdayLong: WEEKDAYS[dow],
    dayOfMonth: dd,
    monthShort: MONTHS[mo].slice(0, 3),
    monthLong: MONTHS[mo],
    year: y,
  };
}

export function calendarFromIso(iso: string): CalendarDay {
  const [y, m, d] = iso.split('-').map(Number);
  return calendarDay(y, m, d);
}

export function upcomingDays(clock: LondonClock, count: number): CalendarDay[] {
  return Array.from({ length: count }, (_, i) => calendarDay(clock.year, clock.month, clock.day + i));
}

/** "Saturday 10 October 2026" */
export function formatLongDate(c: CalendarDay): string {
  return `${c.weekdayLong} ${c.dayOfMonth} ${c.monthLong} ${c.year}`;
}

/** "Sat 10 Oct" */
export function formatShortDate(c: CalendarDay): string {
  return `${c.weekdayShort} ${c.dayOfMonth} ${c.monthShort}`;
}

/** "19:30" -> "7.30pm" */
export const formatSlot = formatTime;
