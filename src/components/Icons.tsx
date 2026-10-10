import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function base({ title, ...rest }: IconProps) {
  return {
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
    focusable: false,
    ...rest,
  } as const;
}

/** Marksman's reticle: used for section markers and the map pin. */
export function ReticleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...base(props)}>
      {props.title && <title>{props.title}</title>}
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <path d="M12 1.5v6M12 16.5v6M1.5 12h6M16.5 12h6" />
    </svg>
  );
}

/** Octagon-and-M monogram (also the favicon). */
export function Monogram(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(props)}>
      {props.title && <title>{props.title}</title>}
      <polygon points="18.7,2 45.3,2 62,18.7 62,45.3 45.3,62 18.7,62 2,45.3 2,18.7" fill="#A6361F" />
      <polygon points="20.4,6.5 43.6,6.5 57.5,20.4 57.5,43.6 43.6,57.5 20.4,57.5 6.5,43.6 6.5,20.4" fill="none" stroke="#F3EAD8" strokeOpacity=".7" strokeWidth="1.2" />
      <g fill="#F3EAD8">
        <rect x="19.5" y="18" width="2.6" height="28" />
        <polygon points="19.5,18 25.8,18 33.6,46 27.3,46" />
        <polygon points="31.2,46 33.6,46 45.4,18 43,18" />
        <rect x="40.2" y="18" width="5.8" height="28" />
        <rect x="15.6" y="17" width="10.6" height="1.8" />
        <rect x="15.6" y="45" width="10.2" height="1.8" />
        <rect x="38.4" y="17" width="10.8" height="1.8" />
        <rect x="37" y="45" width="12.4" height="1.8" />
      </g>
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...base(props)}>
      <path d="M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4" />
    </svg>
  );
}

export function MenuCardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...base(props)}>
      <path d="M6 3.5h12v17H6zM9 8h6M9 11.5h6M9 15h4" />
    </svg>
  );
}

export function DirectionsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...base(props)}>
      <path d="M12 21s6.5-6.1 6.5-11.2A6.5 6.5 0 0 0 5.5 9.8C5.5 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...base(props)}>
      <path d="M7.2 3.5h-2.7a1 1 0 0 0-1 1.1c.6 8.4 6.5 14.3 14.9 14.9a1 1 0 0 0 1.1-1v-2.7l-3.9-1.6-2 2.1a11 11 0 0 1-5-5l2.1-2z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...base(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...base(props)}>
      <path d="M14 4.5h5.5V10M19.5 4.5L11 13M17 14v5.5H4.5V7H10" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...base(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...base(props)}>
      <path d="M6 12h12" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...base(props)}>
      <path d="M6 12h12M12 6v12" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...base(props)}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
