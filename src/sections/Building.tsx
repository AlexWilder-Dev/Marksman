import { motion, type MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  pub: MotionValue<number>;
  dining: MotionValue<number>;
  roof: MotionValue<number>;
}

/**
 * Cut-away section of the building. Each floor is drawn twice: as a gilt
 * line drawing (always visible) and as a full-colour lit layer whose
 * opacity is driven by scroll.
 */
export function Building({ pub, dining, roof }: Props) {
  return (
    <svg className="building" viewBox="0 0 400 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b100e" />
          <stop offset="0.6" stopColor="#141410" />
          <stop offset="1" stopColor="#1a120d" />
        </linearGradient>
        <linearGradient id="b-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3ede3" stopOpacity="0" />
          <stop offset="0.45" stopColor="#6e1f1b" stopOpacity="0.85" />
          <stop offset="0.8" stopColor="#c9773a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#e7b765" />
        </linearGradient>
        <radialGradient id="b-glow">
          <stop offset="0" stopColor="#fff3d0" stopOpacity="1" />
          <stop offset="0.25" stopColor="#ffcf80" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ff9a40" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="b-shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe6b0" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffd090" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="b-wall-dining" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8c6a0" />
          <stop offset="1" stopColor="#ecdfc4" />
        </linearGradient>
        <linearGradient id="b-wall-pub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a1a16" />
          <stop offset="1" stopColor="#7a2a20" />
        </linearGradient>
        <linearGradient id="b-mahogany" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a2f1a" />
          <stop offset="1" stopColor="#2b1a12" />
        </linearGradient>
        <linearGradient id="b-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2633" />
          <stop offset="1" stopColor="#0d141b" />
        </linearGradient>
      </defs>

      {/* Street and lamp */}
      <rect x="0" y="580" width="400" height="40" fill="#ddd3c2" />
      <rect x="0" y="580" width="400" height="1.5" fill="#1f1a16" />
      <g className="b-lamp">
        <circle className="glow-only" cx="16" cy="462" r="30" fill="url(#b-glow)" opacity="0.6" />
        <rect x="15" y="466" width="2" height="114" fill="#1f1a16" />
        <path d="M9 458h14l-3 8h-8z" fill="#1f1a16" />
        <rect x="12" y="460" width="8" height="5" fill="#f2c55c" />
      </g>

      {/* Building mass */}
      <path d="M40 170h260v190h80v220H40z" fill="#fbf8f1" />

      <Floor lit={roof}>
        <RoofShapes />
      </Floor>
      <Floor lit={dining}>
        <DiningShapes />
      </Floor>
      <Floor lit={pub}>
        <PubShapes />
      </Floor>

      {/* Structure drawn last: walls, slabs, fascia */}
      <g className="b-structure">
        <rect x="36" y="168" width="268" height="10" />
        <rect x="36" y="352" width="348" height="8" />
        <rect x="36" y="168" width="10" height="412" />
        <rect x="294" y="168" width="10" height="192" />
        <rect x="374" y="352" width="10" height="228" />
        <rect x="36" y="576" width="348" height="6" />
      </g>
      <g className="b-fascia">
        <rect x="36" y="360" width="268" height="20" fill="#233a2f" />
        <rect x="40" y="363" width="260" height="14" fill="none" stroke="#d29a34" strokeWidth="0.8" />
        <text x="170" y="374.5" textAnchor="middle" fill="#e9c56f" fontSize="11" letterSpacing="5" fontFamily="'Fraunces', serif" fontWeight="600">
          MARKSMAN
        </text>
      </g>
    </svg>
  );
}

function Floor({ lit, children }: { lit: MotionValue<number>; children: ReactNode }) {
  return (
    <g>
      <motion.g className="b-lit" style={{ opacity: lit }}>
        {children}
      </motion.g>
      <g className="b-lines">{children}</g>
    </g>
  );
}

function RoofShapes() {
  return (
    <>
      <rect className="glow-only" x="40" y="40" width="260" height="130" fill="url(#b-dusk)" />
      {/* String lights */}
      <path d="M46 112 Q120 136 196 114 Q252 98 298 116" fill="none" stroke="#2a1e15" strokeWidth="1" />
      <g className="b-bulbs" fill="#ffe7a8">
        {[[60, 117], [80, 123], [100, 126], [120, 127], [140, 125], [160, 121], [180, 117], [200, 113], [220, 108], [240, 106], [260, 107], [280, 111]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y + 3} r="2.2" />
        ))}
      </g>
      <g className="glow-only">
        {[[80, 126], [140, 128], [200, 116], [260, 110]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="22" fill="url(#b-glow)" opacity="0.55" />
        ))}
      </g>
      {/* Parasol + table */}
      <path d="M168 120 Q206 92 244 120 Z" fill="#6e1f1b" />
      <rect x="205" y="118" width="2" height="50" fill="#1a120d" />
      <rect x="190" y="150" width="34" height="3" fill="#3a2416" />
      <rect x="196" y="153" width="2" height="15" fill="#3a2416" />
      <rect x="216" y="153" width="2" height="15" fill="#3a2416" />
      {/* Planters */}
      <rect x="52" y="150" width="46" height="18" fill="#3a2416" />
      <g fill="#2f5a43">
        <circle cx="60" cy="146" r="9" />
        <circle cx="74" cy="141" r="11" />
        <circle cx="90" cy="146" r="9" />
      </g>
      <rect x="250" y="150" width="40" height="18" fill="#3a2416" />
      <g fill="#2f5a43">
        <circle cx="258" cy="145" r="9" />
        <circle cx="272" cy="140" r="10" />
        <circle cx="284" cy="146" r="8" />
      </g>
      {/* Cocktail glasses on the table */}
      <path d="M198 144l5 5 5-5z M212 144l5 5 5-5z" fill="#f2eadb" />
      {/* Railing */}
      <rect x="40" y="132" width="260" height="2.5" fill="#1a120d" />
      <g fill="#1a120d">
        {Array.from({ length: 27 }, (_, i) => (
          <rect key={i} x={42 + i * 9.8} y="134" width="1.6" height="34" />
        ))}
      </g>
    </>
  );
}

function DiningShapes() {
  return (
    <>
      <rect x="46" y="178" width="248" height="174" fill="url(#b-wall-dining)" />
      <rect x="46" y="186" width="248" height="2" fill="#a88a5c" />
      {/* Sash windows */}
      {[64, 148, 232].map((x) => (
        <g key={x}>
          <rect x={x} y="198" width="44" height="104" fill="#5b4128" />
          <rect x={x + 3} y="201" width="38" height="98" fill="url(#b-night)" />
          <rect x={x + 3} y="248" width="38" height="3" fill="#5b4128" />
          <rect x={x + 21} y="201" width="2" height="98" fill="#5b4128" />
        </g>
      ))}
      {/* Pendants */}
      {[106, 190, 274].map((x) => (
        <g key={x}>
          <rect x={x - 0.5} y="178" width="1" height="40" fill="#3a2416" />
          <path d={`M${x - 9} 226h18l-5-8h-8z`} fill="#c9a24b" />
          <circle className="glow-only" cx={x} cy="232" r="34" fill="url(#b-glow)" opacity="0.7" />
        </g>
      ))}
      {/* Tables and chairs */}
      {[70, 154, 238].map((x) => (
        <g key={x} fill="#3a2416">
          <rect x={x} y="314" width="56" height="4" fill="#f2eadb" />
          <rect x={x + 6} y="318" width="3" height="34" />
          <rect x={x + 47} y="318" width="3" height="34" />
          <path d={`M${x - 10} 352v-38h3v20h12v18h-3v-15h-9v15z`} />
          <path d={`M${x + 66} 352v-38h-3v20h-12v18h3v-15h9v15z`} />
          <circle cx={x + 18} cy="309" r="3.5" fill="#f2eadb" />
          <circle cx={x + 40} cy="309" r="3.5" fill="#f2eadb" />
        </g>
      ))}
    </>
  );
}

function PubShapes() {
  return (
    <>
      <rect x="46" y="380" width="328" height="196" fill="url(#b-wall-pub)" />
      {/* Panelling */}
      <rect x="46" y="470" width="328" height="106" fill="url(#b-mahogany)" />
      <g fill="none" stroke="#c9a24b" strokeOpacity="0.35" strokeWidth="1">
        {[54, 104, 154, 204, 254, 304].map((x) => (
          <rect key={x} x={x} y="478" width="42" height="40" />
        ))}
      </g>
      {/* Octagonal skylight lantern and light shaft */}
      <path className="glow-only" d="M318 362h44l18 214h-80z" fill="url(#b-shaft)" />
      <path d="M312 352l8-20h40l8 20z" fill="#e8c27a" />
      <path d="M320 332h40M330 332v20M340 332v20M350 332v20" stroke="#2b1a12" strokeWidth="1.2" />
      {/* Mirror + back bar */}
      <rect x="140" y="392" width="110" height="26" fill="#c9a24b" />
      <rect x="143" y="395" width="104" height="20" fill="#3d2a20" />
      <rect x="138" y="424" width="114" height="3" fill="#2b1a12" />
      <rect x="138" y="452" width="114" height="3" fill="#2b1a12" />
      <g className="b-bottles">
        {[144, 151, 157, 165, 172, 180, 186, 194, 201, 209, 216, 224, 231, 239, 245].map((x, i) => (
          <rect key={x} x={x} y={424 - (10 + (i % 3) * 3)} width="4" height={10 + (i % 3) * 3} fill={i % 4 === 0 ? '#2f5a43' : i % 3 === 0 ? '#c9a24b' : '#7a3a16'} />
        ))}
        {[146, 154, 163, 171, 178, 188, 196, 205, 213, 221, 229, 238, 245].map((x, i) => (
          <rect key={x} x={x} y={452 - (11 + (i % 2) * 4)} width="5" height={11 + (i % 2) * 4} fill={i % 3 === 0 ? '#c9a24b' : '#5a2a14'} />
        ))}
      </g>
      {/* Bar counter */}
      <rect x="122" y="498" width="146" height="78" fill="#3a1e10" />
      <rect x="118" y="494" width="154" height="6" fill="#c9a24b" />
      <g fill="none" stroke="#c9a24b" strokeOpacity="0.45">
        <rect x="132" y="508" width="36" height="50" />
        <rect x="177" y="508" width="36" height="50" />
        <rect x="222" y="508" width="36" height="50" />
      </g>
      <rect x="120" y="566" width="150" height="2" fill="#e3c477" />
      {/* Pumps */}
      <g fill="#f2eadb">
        <rect x="150" y="478" width="3" height="16" />
        <rect x="160" y="480" width="3" height="14" />
        <rect x="170" y="478" width="3" height="16" />
      </g>
      {/* Banquette */}
      <rect x="50" y="514" width="62" height="62" fill="#1f3a2e" />
      <rect x="50" y="514" width="62" height="4" fill="#2c5442" />
      <g fill="#10211a">
        {[60, 76, 92, 104].map((x) => (
          <circle key={x} cx={x} cy="530" r="1.6" />
        ))}
        {[68, 84, 100].map((x) => (
          <circle key={x} cx={x} cy="544" r="1.6" />
        ))}
      </g>
      <rect x="62" y="548" width="44" height="4" fill="#3a2416" />
      <rect x="82" y="552" width="3" height="24" fill="#3a2416" />
      {/* Pendants */}
      {[84, 196, 300].map((x) => (
        <g key={x}>
          <rect x={x - 0.5} y="380" width="1" height="22" fill="#2b1a12" />
          <path d={`M${x - 8} 408h16l-4-7h-8z`} fill="#c9a24b" />
          <circle className="glow-only" cx={x} cy="414" r="40" fill="url(#b-glow)" opacity="0.75" />
        </g>
      ))}
    </>
  );
}
