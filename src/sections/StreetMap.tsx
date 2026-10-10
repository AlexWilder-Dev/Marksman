/** Hand-drawn street plan around the pub. Stylised, not to scale. */
export function StreetMap() {
  const ink = '#1f1a16';
  return (
    <svg className="streetmap" viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">Map of the streets around the Marksman</title>
      <desc id="map-desc">
        The Marksman is on Hackney Road at the corner of Horatio Street. Hoxton Overground station is to the west, and
        Columbia Road flower market is just to the south. The Nelson’s Head is about fifty feet down Horatio Street.
      </desc>
      <rect width="600" height="520" fill="#fbf8f1" />
      {/* City blocks */}
      <g fill="#ebe2d3">
        <path d="M100 0h160l-8 172-148 22z" />
        <path d="M290 0h150l-4 150-150 18z" />
        <path d="M470 0h130v116l-128 16z" />
        <path d="M104 236l270-36 10 88-120 40-160 26z" />
        <path d="M430 196l170-24v100l-90 30-70-30z" />
        <path d="M104 372l160-28 24 70-184 40z" />
        <path d="M340 380l120-60 140-10v210H330z" />
      </g>
      {/* Railway */}
      <g stroke={ink} fill="none">
        <path d="M150 -10C146 120 150 300 172 530" strokeWidth="5" />
        <path d="M150 -10C146 120 150 300 172 530" strokeWidth="3" stroke="#fbf8f1" strokeDasharray="8 8" />
      </g>
      {/* Roads */}
      <g fill="none" strokeLinecap="round">
        <path d="M-10 222L610 136" stroke={ink} strokeWidth="26" />
        <path d="M-10 222L610 136" stroke="#fbf8f1" strokeWidth="22" />
        <path d="M70 -10L86 530" stroke={ink} strokeWidth="20" />
        <path d="M70 -10L86 530" stroke="#fbf8f1" strokeWidth="16" />
        <path d="M150 440C300 410 420 360 470 310S560 190 585 138" stroke={ink} strokeWidth="14" />
        <path d="M150 440C300 410 420 360 470 310S560 190 585 138" stroke="#fbf8f1" strokeWidth="10" />
        <path d="M404 172L414 372" stroke={ink} strokeWidth="11" />
        <path d="M404 172L414 372" stroke="#fbf8f1" strokeWidth="7" />
        <g stroke={ink} strokeWidth="1.2" opacity=".55">
          <path d="M230 0l-4 200M330 0l-2 182M520 0l-6 146M250 214l6 120M300 330l20 100M520 310l40 210M190 230l-4 200" />
        </g>
      </g>
      {/* Labels */}
      <g className="map-label">
        <text transform="translate(176 205) rotate(-7.9)">HACKNEY ROAD</text>
        <text transform="translate(62 330) rotate(88.3)">KINGSLAND ROAD</text>
        <text transform="translate(226 432) rotate(-10)">COLUMBIA ROAD</text>
        <text transform="translate(423 262) rotate(87)">HORATIO ST</text>
      </g>
      {/* Flower market */}
      <g stroke={ink} strokeWidth="1">
        {[
          [250, 416, '#a6361f'],
          [268, 412, '#f2c55c'],
          [286, 408, '#e9b8b0'],
          [304, 403, '#a6361f'],
        ].map(([x, y, c]) => (
          <circle key={x} cx={x as number} cy={(y as number) - 22} r="5" fill={c as string} />
        ))}
      </g>
      <text x="222" y="368" className="map-note">
        Flower market, Sundays
      </text>
      {/* Hoxton station */}
      <g>
        <circle cx="149" cy="70" r="11" fill="#fbf8f1" stroke={ink} strokeWidth="3" />
        <path d="M134 70h30" stroke={ink} strokeWidth="5" />
        <text x="170" y="64" className="map-place">
          Hoxton
        </text>
        <text x="170" y="80" className="map-note">
          Overground
        </text>
      </g>
      {/* Nelson's Head and the fifty feet */}
      <path d="M404 166L409 222" stroke="#a6361f" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="409" cy="226" r="6" fill="#233a2f" stroke={ink} strokeWidth="1.5" />
      <text x="396" y="250" textAnchor="end" className="map-note">
        Nelson’s Head
      </text>
      <text x="416" y="200" className="map-small">
        50 ft
      </text>
      {/* The Marksman */}
      <g transform="translate(404 162)">
        <circle r="30" fill="#a6361f" opacity=".12" />
        <polygon points="-9.4,-22.7 9.4,-22.7 22.7,-9.4 22.7,9.4 9.4,22.7 -9.4,22.7 -22.7,9.4 -22.7,-9.4" fill="#a6361f" stroke={ink} strokeWidth="1.5" />
        <text y="7" textAnchor="middle" className="map-pin">
          M
        </text>
      </g>
      <g className="map-callout">
        <path d="M384 144l-24-28h-100" stroke={ink} strokeWidth="1" fill="none" />
        <text x="262" y="108" className="map-place">
          The Marksman
        </text>
      </g>
      {/* North arrow */}
      <g transform="translate(462 470)" stroke={ink} strokeWidth="1.2">
        <circle r="20" fill="#fbf8f1" />
        <path d="M0-16L6 6 0 2-6 6z" fill={ink} />
        <text y="-24" textAnchor="middle" className="map-small" stroke="none">
          N
        </text>
      </g>
    </svg>
  );
}
