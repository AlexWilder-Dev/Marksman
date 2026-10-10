import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { londonClock, type LondonClock } from './time';

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  };
}

/** Media query that is always false on the server and during hydration. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useMemo(() => subscribeMedia(query), [query]);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** London clock, null until mounted (keeps server and client markup identical). */
export function useLondonClock(intervalMs = 30_000): LondonClock | null {
  const [clock, setClock] = useState<LondonClock | null>(null);
  useEffect(() => {
    const tick = () => setClock(londonClock());
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return clock;
}
