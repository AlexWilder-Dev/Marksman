import { booking } from '../content';
import { toMinutes, type CalendarDay, type LondonClock } from './time';

export interface Slot {
  time: string;
  available: boolean;
}

/** Small deterministic hash so mock availability is stable between renders. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/** Mock availability: sittings from content.ts, with some slots already taken. */
export function slotsFor(day: CalendarDay, guests: number, clock: LondonClock | null): Slot[] {
  const ranges = booking.sittings[day.dayKey];
  const isToday = clock !== null && day.iso === `${clock.year}-${pad(clock.month)}-${pad(clock.day)}`;
  const slots: Slot[] = [];
  for (const [start, end] of ranges) {
    for (let m = toMinutes(start); m <= toMinutes(end); m += 30) {
      const time = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
      if (isToday && clock && m < clock.minutes + 45) continue;
      // Bigger tables are harder to place, and peak times fill first.
      const peak = m >= toMinutes('19:00') && m <= toMinutes('20:30') ? 18 : 0;
      const sizePressure = guests >= 6 ? 22 : guests >= 4 ? 10 : 0;
      const roll = hash(`${day.iso}|${time}|${guests >= 6 ? 'L' : guests >= 4 ? 'M' : 'S'}`) % 100;
      slots.push({ time, available: roll >= 22 + peak + sizePressure });
    }
  }
  return slots;
}
