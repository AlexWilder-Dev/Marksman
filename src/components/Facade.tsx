import { motion, type MotionValue } from 'framer-motion';

interface Props {
  /** Horizontal position of the sun glint across the glaze, in SVG units. */
  glintX: MotionValue<number>;
}

const SASH_X = [118, 250, 382];

/**
 * Illustrated front of the pub: brown glazed tiles, signwritten fascia,
 * London stock brick above and the roof terrace on top. Stands in for the
 * hero_facade photograph until one is supplied.
 */
export function Facade({ glintX }: Props) {
  return (
    <svg className="facade" viewBox="0 0 560 600" role="img" aria-labelledby="facade-title">
      <title id="facade-title">Illustration of the Marksman: a Victorian corner pub with brown glazed tiles and a roof terrace</title>
      <defs>
        <pattern id="f-tiles" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#3d1f10" />
          <rect x="0.8" y="0.8" width="14.4" height="14.4" rx="1.2" fill="url(#f-glaze)" />
          <path d="M2 13V2.2h10.8" stroke="#e7b48a" strokeOpacity=".35" strokeWidth="1" fill="none" />
        </pattern>
        <linearGradient id="f-glaze" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8d4d29" />
          <stop offset="1" stopColor="#5e2f17" />
        </linearGradient>
        <pattern id="f-brick" width="28" height="12" patternUnits="userSpaceOnUse">
          <rect width="28" height="12" fill="#cdb78d" />
          <path d="M0 0.5h28M0 6.5h28M7 0.5v6M21 6.5v6" stroke="#e9dcc1" strokeWidth="1" />
          <rect x="8" y="1.5" width="12" height="4" fill="#c3aa7c" opacity=".55" />
          <rect x="0" y="7.5" width="6" height="4" fill="#d8c49c" opacity=".7" />
        </pattern>
        <linearGradient id="f-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d58d" />
          <stop offset="0.6" stopColor="#e2a352" />
          <stop offset="1" stopColor="#b8692c" />
        </linearGradient>
        <linearGradient id="f-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3cf86" />
          <stop offset="1" stopColor="#c47a36" />
        </linearGradient>
        <radialGradient id="f-lamp">
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset="0.3" stopColor="#ffd98f" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd98f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="f-glint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fffaf0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="f-glazed">
          <rect x="70" y="340" width="28" height="220" />
          <rect x="246" y="384" width="16" height="176" />
          <rect x="318" y="384" width="16" height="176" />
          <rect x="462" y="340" width="28" height="220" />
          <rect x="98" y="530" width="148" height="30" />
          <rect x="334" y="530" width="128" height="30" />
          <rect x="102" y="394" width="140" height="132" />
          <rect x="338" y="394" width="120" height="132" />
        </clipPath>
      </defs>

      {/* Roof terrace */}
      <g className="f-roof">
        <rect x="104" y="18" width="42" height="80" fill="url(#f-brick)" stroke="#1f1a16" strokeWidth="1.5" />
        <rect x="100" y="14" width="50" height="8" fill="#e8dcc4" stroke="#1f1a16" strokeWidth="1.5" />
        <rect x="110" y="2" width="11" height="13" fill="#a6361f" stroke="#1f1a16" strokeWidth="1.5" />
        <rect x="129" y="5" width="11" height="10" fill="#a6361f" stroke="#1f1a16" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x0 = 344 + i * 16;
          return (
            <path
              key={i}
              d={`M392 34 L${x0} 60 L${x0 + 16} 60 Z`}
              fill={i % 2 ? '#f3ead8' : '#a6361f'}
              stroke="#1f1a16"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          );
        })}
        <path d="M344 60 q8 5 16 0 q8 5 16 0 q8 5 16 0 q8 5 16 0 q8 5 16 0 q8 5 16 0" fill="none" stroke="#1f1a16" strokeWidth="1" />
        <rect x="391" y="58" width="2.5" height="34" fill="#1f1a16" />
        <path d="M80 70 Q180 92 280 72 Q380 54 480 74" fill="none" stroke="#1f1a16" strokeWidth="1" />
        <g fill="#f2c55c" stroke="#1f1a16" strokeWidth="0.8">
          {[100, 130, 160, 190, 220, 250, 310, 340, 370, 420, 450].map((x) => {
            const y = x < 280 ? 70 + Math.sin(((x - 80) / 200) * Math.PI) * 14 : 72 - Math.sin(((x - 280) / 200) * Math.PI) * 12;
            return <circle key={x} cx={x} cy={y + 4} r="3" />;
          })}
        </g>
        <g fill="#3f6b4f" stroke="#1f1a16" strokeWidth="1.2">
          <circle cx="182" cy="78" r="10" />
          <circle cx="198" cy="72" r="12" />
          <circle cx="214" cy="79" r="9" />
          <circle cx="458" cy="77" r="10" />
        </g>
        <path d="M70 92V66h420v26" fill="none" stroke="#1f1a16" strokeWidth="2.5" />
        <g stroke="#1f1a16" strokeWidth="1.4">
          {Array.from({ length: 29 }, (_, i) => (
            <line key={i} x1={76 + i * 14.4} y1="67" x2={76 + i * 14.4} y2="92" />
          ))}
        </g>
      </g>

      {/* Cornice */}
      <rect x="62" y="92" width="436" height="20" fill="#ece2cd" stroke="#1f1a16" strokeWidth="1.5" />
      <g fill="#d5c6a8">
        {Array.from({ length: 27 }, (_, i) => (
          <rect key={i} x={68 + i * 16} y="104" width="8" height="6" />
        ))}
      </g>

      {/* First floor: stock brick and lit sash windows of the Dining Room */}
      <rect x="70" y="112" width="420" height="214" fill="url(#f-brick)" stroke="#1f1a16" strokeWidth="1.5" />
      {SASH_X.map((x) => (
        <g key={x}>
          <rect x={x - 8} y="140" width="76" height="12" fill="#ece2cd" stroke="#1f1a16" strokeWidth="1.5" />
          <rect x={x} y="152" width="60" height="134" fill="#efe6d2" stroke="#1f1a16" strokeWidth="1.5" />
          <rect x={x + 5} y="157" width="50" height="124" fill="url(#f-warm)" />
          <circle cx={x + 30} cy="186" r="22" fill="url(#f-lamp)" />
          <path d={`M${x + 30} 157v14`} stroke="#3a2416" strokeWidth="1" />
          <path d={`M${x + 21} 179h18l-4-8h-10z`} fill="#d29a34" stroke="#3a2416" strokeWidth="1" />
          <rect x={x + 5} y="216" width="50" height="5" fill="#efe6d2" />
          <rect x={x + 28} y="157" width="4" height="124" fill="#efe6d2" />
          <rect x={x + 5} y="244" width="50" height="37" fill="#5a2a14" opacity=".25" />
          <rect x={x - 6} y="286" width="72" height="8" fill="#ece2cd" stroke="#1f1a16" strokeWidth="1.5" />
        </g>
      ))}

      {/* String course */}
      <rect x="62" y="326" width="436" height="12" fill="#ece2cd" stroke="#1f1a16" strokeWidth="1.5" />

      {/* Ground floor: glazed tile pilasters and stall risers */}
      <rect x="70" y="338" width="420" height="222" fill="url(#f-tiles)" stroke="#1f1a16" strokeWidth="1.5" />

      {/* Fascia */}
      <rect x="98" y="342" width="364" height="42" fill="#233a2f" stroke="#1f1a16" strokeWidth="1.5" />
      <rect x="103" y="347" width="354" height="32" fill="none" stroke="#d29a34" strokeWidth="1.2" />
      <text x="280" y="373.5" textAnchor="middle" className="f-sign">
        MARKSMAN
      </text>
      <circle cx="122" cy="363" r="3" fill="#d29a34" />
      <circle cx="438" cy="363" r="3" fill="#d29a34" />

      {/* Windows */}
      {[
        { x: 98, w: 148, etch: 'Public Bar' },
        { x: 334, w: 128, etch: 'Wines & Spirits' },
      ].map(({ x, w, etch }) => (
        <g key={x}>
          <rect x={x} y="388" width={w} height="142" fill="#2a1a10" stroke="#1f1a16" strokeWidth="1.5" />
          <rect x={x + 4} y="394" width={w - 8} height="132" fill="url(#f-glass)" />
          <circle cx={x + w * 0.3} cy="410" r="26" fill="url(#f-lamp)" />
          <circle cx={x + w * 0.72} cy="404" r="20" fill="url(#f-lamp)" />
          <rect x={x + 10} y="426" width={w - 20} height="3" fill="#5a2a14" opacity=".7" />
          <g fill="#5a2a14" opacity=".55">
            {Array.from({ length: Math.floor((w - 24) / 10) }, (_, i) => {
              const bx = x + 13 + i * 10;
              const h = 9 + (i % 3) * 2;
              return <path key={i} d={`M${bx} 426v-${h}h5v${h}z M${bx + 1.6} ${426 - h}v-4h1.8v4z`} />;
            })}
          </g>
          <rect x={x + 4} y="470" width={w - 8} height="56" fill="#f6ead2" opacity=".78" />
          <rect x={x + 4} y="466" width={w - 8} height="5" fill="#2a1a10" />
          <rect x={x + w / 2 - 2} y="394" width="4" height="72" fill="#2a1a10" />
          <text x={x + w / 2} y="503" textAnchor="middle" className="f-etch">
            {etch}
          </text>
        </g>
      ))}

      {/* Door with fanlight */}
      <rect x="262" y="384" width="56" height="176" fill="#233a2f" stroke="#1f1a16" strokeWidth="1.5" />
      <path d="M266 412a24 24 0 0 1 48 0z" fill="url(#f-glass)" stroke="#1f1a16" strokeWidth="1.2" />
      <path d="M290 388v24M273 395l17 17M307 395l-17 17" stroke="#1f1a16" strokeWidth="1" />
      <rect x="270" y="420" width="40" height="52" fill="url(#f-glass)" stroke="#1f1a16" strokeWidth="1.2" />
      <rect x="270" y="482" width="40" height="70" fill="none" stroke="#3f6b4f" strokeWidth="1.5" />
      <circle cx="306" cy="478" r="2.5" fill="#d29a34" />

      {/* Wall lantern */}
      <circle cx="254" cy="404" r="26" fill="url(#f-lamp)" />
      <path d="M248 392h12l-2 16h-8z" fill="#f8e1a0" stroke="#1f1a16" strokeWidth="1.2" />
      <path d="M246 391h16l-8-6z" fill="#1f1a16" />

      {/* Sun glint across the glaze */}
      <g clipPath="url(#f-glazed)" className="f-glint-layer">
        <motion.rect y="300" width="70" height="320" fill="url(#f-glint)" style={{ x: glintX, skewX: -18 }} />
      </g>

      {/* Hanging sign: a marksman's target */}
      <g className="f-sign-bracket">
        <path d="M70 352H16M28 352q-6 10 6 12" stroke="#1f1a16" strokeWidth="2.5" fill="none" />
        <g className="f-hanging">
          <path d="M24 352v8M58 352v8" stroke="#1f1a16" strokeWidth="1.5" />
          <rect x="12" y="360" width="56" height="70" rx="3" fill="#233a2f" stroke="#1f1a16" strokeWidth="1.5" />
          <rect x="16" y="364" width="48" height="62" rx="2" fill="none" stroke="#d29a34" strokeWidth="1" />
          <circle cx="40" cy="390" r="17" fill="#f3ead8" />
          <circle cx="40" cy="390" r="12" fill="#a6361f" />
          <circle cx="40" cy="390" r="7" fill="#f3ead8" />
          <circle cx="40" cy="390" r="3" fill="#a6361f" />
          <text x="40" y="420" textAnchor="middle" className="f-sign-small">
            1865
          </text>
        </g>
      </g>

      {/* Pavement */}
      <rect x="0" y="560" width="560" height="40" fill="#ddd3c2" />
      <path d="M0 560h560" stroke="#1f1a16" strokeWidth="1.5" />
      <path d="M0 592h560" stroke="#b9ab95" strokeWidth="1.5" />
      <g stroke="#c7baa4" strokeWidth="1">
        {[40, 120, 200, 280, 360, 440, 520].map((x) => (
          <line key={x} x1={x} y1="562" x2={x - 6} y2="592" />
        ))}
      </g>

      {/* A-board */}
      <g className="f-aboard">
        <path d="M6 562l8-62h44l8 62" fill="#b0814f" stroke="#1f1a16" strokeWidth="1.5" />
        <rect x="17" y="506" width="38" height="44" fill="#1f2421" />
        <text x="36" y="522" textAnchor="middle" className="f-chalk">
          Sunday
        </text>
        <text x="36" y="537" textAnchor="middle" className="f-chalk">
          Roast
        </text>
      </g>

      {/* Columbia Road buckets */}
      <g className="f-flowers">
        {[
          { x: 470, c: ['#a6361f', '#d9573c', '#a6361f'] },
          { x: 500, c: ['#f2c55c', '#f6e2a0', '#d29a34'] },
          { x: 530, c: ['#f3ead8', '#e9b8b0', '#f3ead8'] },
        ].map(({ x, c }) => (
          <g key={x}>
            <path d={`M${x - 3} 540v-18M${x + 3} 540v-22M${x} 540v-26`} stroke="#3f6b4f" strokeWidth="1.5" />
            <circle cx={x - 5} cy="520" r="6" fill={c[0]} stroke="#1f1a16" strokeWidth="1" />
            <circle cx={x + 5} cy="516" r="6" fill={c[1]} stroke="#1f1a16" strokeWidth="1" />
            <circle cx={x} cy="511" r="6" fill={c[2]} stroke="#1f1a16" strokeWidth="1" />
            <path d={`M${x - 11} 534h22l-3 26h-16z`} fill="#a9b0ac" stroke="#1f1a16" strokeWidth="1.2" />
          </g>
        ))}
      </g>
    </svg>
  );
}
