/**
 * Procedural textures from the building's own materials: glazed tile, oak,
 * menu paper, worn stamp ink and the octagon-and-square floor pattern.
 * Each is a small SVG data URI, rasterised once by the browser and tiled.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const uri = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ------------------------------------------------------------------ */
/* Glazed tile wall                                                    */
/* ------------------------------------------------------------------ */

export const TILE_COLS = 7;
export const TILE_ROWS = 5;
const T = 100;
const GAP = 5;

const GLAZES: [string, string][] = [
  ['#7d4526', '#4a2511'],
  ['#6b3a1e', '#3e1f0e'],
  ['#86502c', '#552b14'],
  ['#5c3019', '#341a0c'],
  ['#74401f', '#4f2a14'],
  ['#8d5631', '#5a2f16'],
];

function tileWall(): string {
  const rand = mulberry32(1865);
  const w = TILE_COLS * T;
  const h = TILE_ROWS * T;
  let defs = '';
  GLAZES.forEach(([a, b], i) => {
    const x2 = (0.7 + rand() * 0.3).toFixed(2);
    defs += `<linearGradient id='g${i}' x1='0' y1='0' x2='${x2}' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient>`;
  });
  defs +=
    "<radialGradient id='pool' cx='.4' cy='.36' r='.8'><stop offset='0' stop-color='#ffd6a0' stop-opacity='.13'/><stop offset='.5' stop-color='#000' stop-opacity='0'/><stop offset='1' stop-color='#000' stop-opacity='.42'/></radialGradient>";

  let body = `<rect width='${w}' height='${h}' fill='#140b06'/>`;
  for (let r = 0; r < TILE_ROWS; r++) {
    for (let c = 0; c < TILE_COLS; c++) {
      const x = c * T + GAP / 2;
      const y = r * T + GAP / 2;
      const s = T - GAP;
      const g = Math.floor(rand() * GLAZES.length);
      body += `<rect x='${x}' y='${y}' width='${s}' height='${s}' rx='3' fill='url(#g${g})'/>`;
      body += `<rect x='${x}' y='${y}' width='${s}' height='${s}' rx='3' fill='url(#pool)'/>`;
      body += `<path d='M${x + 1.5} ${y + s - 3}V${y + 1.5}H${x + s - 3}' stroke='#ffd9b0' stroke-opacity='.2' stroke-width='2' fill='none'/>`;
      body += `<path d='M${x + s - 1} ${y + 3}V${y + s - 1}H${x + 3}' stroke='#000' stroke-opacity='.45' stroke-width='2.5' fill='none'/>`;
      // Fine crazing in the glaze on some tiles.
      if (rand() < 0.45) {
        let d = '';
        const lines = 2 + Math.floor(rand() * 3);
        for (let i = 0; i < lines; i++) {
          let px = x + 8 + rand() * (s - 16);
          let py = y + 8 + rand() * (s - 16);
          d += `M${r1(px)} ${r1(py)}`;
          for (let k = 0; k < 4; k++) {
            px = Math.min(x + s - 4, Math.max(x + 4, px + (rand() - 0.5) * 28));
            py = Math.min(y + s - 4, Math.max(y + 4, py + (rand() - 0.5) * 28));
            d += `L${r1(px)} ${r1(py)}`;
          }
        }
        body += `<path d='${d}' stroke='#170a03' stroke-opacity='.35' stroke-width='.7' fill='none'/>`;
      }
    }
  }
  return uri(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><defs>${defs}</defs>${body}</svg>`);
}

/* ------------------------------------------------------------------ */
/* Wood, paper, leather                                                */
/* ------------------------------------------------------------------ */

function woodGrain(): string {
  return uri(
    "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='420'>" +
      "<filter id='w' x='0' y='0' width='100%' height='100%'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='0.0028 0.11' numOctaves='4' seed='11' stitchTiles='stitch'/>" +
      "<feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.08  0 0 0 0 0.04  2.4 0 0 0 -0.95'/>" +
      '</filter>' +
      "<filter id='l' x='0' y='0' width='100%' height='100%'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='0.0045 0.035' numOctaves='3' seed='4' stitchTiles='stitch'/>" +
      "<feColorMatrix values='0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.3  1.6 0 0 0 -0.78'/>" +
      '</filter>' +
      "<rect width='100%' height='100%' fill='#5a3220'/>" +
      "<rect width='100%' height='100%' filter='url(#l)' opacity='.55'/>" +
      "<rect width='100%' height='100%' filter='url(#w)'/>" +
      '</svg>',
  );
}

function paperGrain(): string {
  return uri(
    "<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'>" +
      "<filter id='p' x='0' y='0' width='100%' height='100%'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' seed='6' stitchTiles='stitch'/>" +
      "<feColorMatrix values='0 0 0 0 0.36  0 0 0 0 0.26  0 0 0 0 0.16  1.2 0 0 0 -0.52'/>" +
      '</filter>' +
      "<filter id='f' x='0' y='0' width='100%' height='100%'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='0.012 0.03' numOctaves='2' seed='9' stitchTiles='stitch'/>" +
      "<feColorMatrix values='0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0.8 0 0 0 -0.36'/>" +
      '</filter>' +
      "<rect width='100%' height='100%' filter='url(#f)' opacity='.45'/>" +
      "<rect width='100%' height='100%' filter='url(#p)' opacity='.5'/>" +
      '</svg>',
  );
}

/** Worn rubber-stamp ink, used as a mask. */
function stampWear(): string {
  return uri(
    "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>" +
      "<filter id='s' x='0' y='0' width='100%' height='100%'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' seed='3'/>" +
      "<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -7 0 0 0 4.6'/>" +
      '</filter>' +
      "<rect width='100%' height='100%' filter='url(#s)'/>" +
      '</svg>',
  );
}

/* ------------------------------------------------------------------ */
/* Octagon-and-square floor pattern (Victorian encaustic tiles)        */
/* ------------------------------------------------------------------ */

function octagonLattice(stroke: string, opacity: number): string {
  const p = 60;
  const c = p / (2 + Math.SQRT2);
  const pts = [
    [c, 0], [p - c, 0], [p, c], [p, p - c], [p - c, p], [c, p], [0, p - c], [0, c],
  ]
    .map(([x, y]) => `${r1(x)},${r1(y)}`)
    .join(' ');
  return uri(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${p}' height='${p}' viewBox='0 0 ${p} ${p}'>` +
      `<polygon points='${pts}' fill='none' stroke='${stroke}' stroke-opacity='${opacity}' stroke-width='1'/>` +
      `<polygon points='${pts}' transform='translate(30 30) scale(.5) translate(-30 -30)' fill='none' stroke='${stroke}' stroke-opacity='${opacity * 0.5}' stroke-width='1.6'/>` +
      '</svg>',
  );
}

export function textureVars(): Record<string, string> {
  return {
    '--tx-tiles': tileWall(),
    '--tx-wood': woodGrain(),
    '--tx-paper': paperGrain(),
    '--tx-stamp': stampWear(),
    '--tx-lattice': octagonLattice('#F3EAD8', 0.18),
  };
}
