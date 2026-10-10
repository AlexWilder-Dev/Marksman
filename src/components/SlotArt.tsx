import type { ReactNode } from 'react';
import type { ImageSlotId } from '../content';

const INK = '#1f1a16';

function Art({ children, wash }: { children: ReactNode; wash: string }) {
  return (
    <svg className="slot-art" viewBox="0 0 200 150" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="150" fill="#fbf8f1" />
      <ellipse cx="100" cy="78" rx="86" ry="62" fill={wash} opacity="0.35" />
      <g stroke={INK} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        {children}
      </g>
    </svg>
  );
}

function Bun() {
  return (
    <Art wash="#f2c55c">
      <path d="M18 112h150a8 8 0 0 1 0 16H18a8 8 0 0 1 0-16z" fill="#c8995f" />
      <path d="M168 117h18a4 4 0 0 1 0 6h-18" fill="#c8995f" />
      <path d="M44 112c0-6 4-9 10-9h92c6 0 10 3 10 9z" fill="#c47a36" />
      <path d="M42 104c8-3 14 2 22-1s14 2 22-1 14 2 22-1 14 2 22-1 14 2 26 0v5H42z" fill="#6b2a14" />
      <path d="M44 100c0-30 24-48 56-48s56 18 56 48c0 3-2 4-5 4H49c-3 0-5-1-5-4z" fill="#d9934a" />
      <path d="M64 70c8-9 20-13 30-13" stroke="#fbe3b2" strokeWidth="4" fill="none" />
      <g fill="#f3d79a" strokeWidth="1">
        <ellipse cx="88" cy="66" rx="3" ry="1.8" transform="rotate(-20 88 66)" />
        <ellipse cx="108" cy="62" rx="3" ry="1.8" transform="rotate(15 108 62)" />
        <ellipse cx="122" cy="72" rx="3" ry="1.8" transform="rotate(30 122 72)" />
        <ellipse cx="98" cy="78" rx="3" ry="1.8" />
        <ellipse cx="76" cy="82" rx="3" ry="1.8" transform="rotate(-30 76 82)" />
      </g>
      <path d="M156 98c0-6 7-9 14-9s14 3 14 9l-2 14h-24z" fill="#f3ead8" />
      <path d="M160 92c4-8 16-8 20 0" fill="#fffaf0" />
    </Art>
  );
}

function Tart() {
  return (
    <Art wash="#d29a34">
      <ellipse cx="100" cy="104" rx="84" ry="26" fill="#fbf8f1" />
      <ellipse cx="100" cy="102" rx="64" ry="18" fill="none" strokeOpacity=".35" />
      <path d="M50 92l92-26 6 30-88 12z" fill="#c9772f" />
      <path d="M60 108l88-12v10l-88 13z" fill="#e8c48a" />
      <path d="M60 108l88-12v4l-88 12z" fill="#e0a050" strokeWidth="1" />
      <path d="M142 66c8 4 10 18 6 30" stroke="#e2b06a" strokeWidth="7" fill="none" />
      <path d="M142 66c8 4 10 18 6 30" fill="none" />
      <path d="M72 92c18-5 38-10 52-14" stroke="#f6d39a" strokeWidth="3" fill="none" />
      <g fill="#7a3a12" stroke="none">
        <circle cx="90" cy="90" r="1.2" />
        <circle cx="104" cy="84" r="1.2" />
        <circle cx="118" cy="88" r="1.2" />
        <circle cx="80" cy="98" r="1.2" />
        <circle cx="128" cy="80" r="1.2" />
      </g>
      <path d="M152 108c0-6 8-10 16-10s14 4 14 8-6 7-15 7-15-1-15-5z" fill="#fffaf0" />
      <path d="M158 104c4-2 10-3 14-1" fill="none" strokeOpacity=".4" />
    </Art>
  );
}

function Bar() {
  return (
    <Art wash="#a6361f">
      <path d="M24 20h152v44H24z" fill="#7a2a20" />
      <path d="M60 24c0-6 80-6 80 0v30H60z" fill="#d8c08a" />
      <path d="M64 30c0-4 72-4 72 0v20H64z" fill="#4a3428" />
      <path d="M24 64h152" />
      <g fill="#3f6b4f">
        <path d="M34 62v-12h4v-4h2v4h4v12z" />
        <path d="M152 62v-14h4v-4h2v4h4v14z" fill="#c8902b" />
        <path d="M164 62v-10h3v-4h2v4h3v10z" />
        <path d="M44 62v-9h3v-3h2v3h3v9z" fill="#a6361f" />
      </g>
      <path d="M100 4v10" />
      <path d="M90 22h20l-4-8h-12z" fill="#d29a34" />
      <path d="M14 92h172v40H14z" fill="#5a3220" />
      <path d="M10 86h180v8H10z" fill="#c8995f" />
      <g fill="none" strokeOpacity=".6">
        <path d="M24 100h40v26H24zM80 100h40v26H80zM136 100h40v26h-40z" />
      </g>
      <path d="M14 136h172" stroke="#d29a34" strokeWidth="2.5" />
      <g>
        <path d="M62 86V68" strokeWidth="3" />
        <path d="M57 62h10v10H57z" fill="#a6361f" />
        <path d="M78 86V66" strokeWidth="3" />
        <path d="M73 60h10v10H73z" fill="#233a2f" />
        <path d="M94 86V68" strokeWidth="3" />
        <path d="M89 62h10v10H89z" fill="#d29a34" />
      </g>
      <path d="M128 86l-3-24h18l-3 24z" fill="#d9a441" />
      <path d="M125 62h18l-0.5 5h-17z" fill="#fffaf0" />
    </Art>
  );
}

function Dining() {
  return (
    <Art wash="#3f6b4f">
      <path d="M24 14h38v72H24z" fill="#efe6d2" />
      <path d="M28 18h30v64H28z" fill="#9db4c0" />
      <path d="M28 50h30M43 18v64" />
      <path d="M120 0v24" />
      <path d="M108 32h24l-5-9h-14z" fill="#d29a34" />
      <path d="M76 98h88" strokeWidth="2" />
      <path d="M74 98c0-4 4-6 8-6h76c4 0 8 2 8 6v14H74z" fill="#fbf8f1" />
      <path d="M92 112v26M148 112v26" />
      <path d="M100 92v-14M100 78c-4 0-6-4-6-8h12c0 4-2 8-6 8z" fill="#f6e2b8" />
      <path d="M134 92v-12" />
      <path d="M131 80h6v-6h-6z" fill="#fbf8f1" />
      <path d="M133.5 74v-4" stroke="#d29a34" />
      <path d="M58 140v-30c0-10 4-24 12-24" fill="none" strokeWidth="3" stroke="#5a3220" />
      <path d="M52 112h22v4H52zM54 116v24M72 116v24" stroke="#5a3220" strokeWidth="2.5" />
      <path d="M182 140v-30c0-10-4-24-12-24" fill="none" strokeWidth="3" stroke="#5a3220" />
      <path d="M166 112h22v4h-22zM168 116v24M186 116v24" stroke="#5a3220" strokeWidth="2.5" />
    </Art>
  );
}

function Roof() {
  return (
    <svg className="slot-art" viewBox="0 0 200 150" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="roof-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e2b8" />
          <stop offset="1" stopColor="#f0b874" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#roof-sky)" />
      <g stroke={INK} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M0 96h20v-14h12v14h18v-24h14v24h30v-10h16v10h22v-30h10v-6h4v6h6v30h48v54H0z" fill="#d8c4a2" strokeOpacity=".5" />
        <path d="M0 30q50 26 100 10t100 6" fill="none" strokeWidth="1" />
        <g fill="#f2c55c" strokeWidth="1">
          {[16, 36, 56, 76, 96, 116, 136, 156, 176].map((x, i) => (
            <circle key={x} cx={x} cy={36 + Math.sin(i * 0.7) * 6} r="3" />
          ))}
        </g>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M140 48L${110 + i * 10} 68h10z`} fill={i % 2 ? '#f3ead8' : '#a6361f'} strokeWidth="1" />
        ))}
        <path d="M140 66v46" />
        <path d="M124 104h32M128 104v20M152 104v20" />
        <path d="M134 98l4 6 4-6zM144 96l3 8 3-8z" fill="#fffaf0" strokeWidth="1" />
        <path d="M20 112h36v20H20z" fill="#7a4325" />
        <circle cx="28" cy="104" r="9" fill="#3f6b4f" />
        <circle cx="42" cy="98" r="11" fill="#3f6b4f" />
        <circle cx="52" cy="106" r="7" fill="#3f6b4f" />
        <path d="M0 118h200M0 150V118" strokeWidth="2.5" />
        {Array.from({ length: 21 }, (_, i) => (
          <path key={i} d={`M${i * 10} 118v32`} />
        ))}
      </g>
    </svg>
  );
}

export function SlotArt({ slot }: { slot: ImageSlotId }) {
  switch (slot) {
    case 'bun_closeup':
      return <Bun />;
    case 'tart_closeup':
      return <Tart />;
    case 'dining_room':
      return <Dining />;
    case 'roof_terrace':
      return <Roof />;
    case 'bar_interior':
    case 'hero_facade':
    default:
      return <Bar />;
  }
}
