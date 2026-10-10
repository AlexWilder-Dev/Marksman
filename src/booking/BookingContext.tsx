import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { OccasionId } from '../content';

export interface BookingRequest {
  /** Null opens the table-booking flow; an occasion opens the enquiry form. */
  occasion: OccasionId | null;
}

interface BookingApi {
  open: (request?: BookingRequest) => void;
  preload: () => void;
}

const BookingContext = createContext<BookingApi>({ open: () => {}, preload: () => {} });

export const useBooking = () => useContext(BookingContext);

const loadSheet = () => import('./BookingSheet');
const BookingSheet = lazy(loadSheet);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [request, setRequest] = useState<BookingRequest>({ occasion: null });
  const [session, setSession] = useState(0);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((req: BookingRequest = { occasion: null }) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setRequest(req);
    setSession((s) => s + 1);
    setMounted(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const onClosed = useCallback(() => {
    // Wait a frame so the page is no longer inert before restoring focus.
    window.requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }));
  }, []);

  const preload = useCallback(() => {
    void loadSheet();
  }, []);

  // Fetch the sheet in the background once the page has settled.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(preload, { timeout: 4000 }) : preload()), 2500);
    return () => window.clearTimeout(id);
  }, [preload]);

  const api = useMemo(() => ({ open, preload }), [open, preload]);

  return (
    <BookingContext.Provider value={api}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <BookingSheet open={isOpen} request={request} session={session} onClose={close} onClosed={onClosed} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
}
