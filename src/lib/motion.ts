import type { SpringOptions, Transition } from 'framer-motion';

/** Shared spring presets: every animated element on the site uses one of these. */
export const springs = {
  /** Booking sheet entering / leaving. */
  sheet: { type: 'spring', stiffness: 340, damping: 36, mass: 0.9 },
  /** Sheet morphing between table booking and group enquiry. */
  morph: { type: 'spring', stiffness: 220, damping: 28, mass: 1 },
  /** Small UI responses (chips, steppers, tabs). */
  snappy: { type: 'spring', stiffness: 520, damping: 34, mass: 0.6 },
  /** Menu lines printing in, critically damped so nothing overshoots. */
  print: { type: 'spring', stiffness: 300, damping: 40, mass: 0.8 },
} satisfies Record<string, Transition>;

/** Options for useSpring() motion values. */
export const springValues = {
  /** Hero light following the pointer. */
  light: { stiffness: 42, damping: 16, mass: 1.1 },
  /** Scroll-linked scenes: removes jitter without feeling laggy. */
  scroll: { stiffness: 120, damping: 30, mass: 0.6, restDelta: 0.0005 },
  /** Camera climbing the building. */
  camera: { stiffness: 70, damping: 20, mass: 1 },
} satisfies Record<string, SpringOptions>;
