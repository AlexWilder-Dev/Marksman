/**
 * Renders the app to static HTML after the client + SSR builds, so text is
 * present on first paint, then injects meta, Open Graph and structured data.
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const { site, venue, hours } = ssr;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ogImage = new URL(site.ogImage, site.url).href;

const dayNames = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };
const structured = {
  '@context': 'https://schema.org',
  '@type': 'BarOrPub',
  name: site.name,
  url: site.url,
  image: ogImage,
  description: site.description,
  telephone: venue.phone.tel,
  email: venue.email.bookings,
  servesCuisine: 'Modern British',
  acceptsReservations: 'True',
  address: {
    '@type': 'PostalAddress',
    streetAddress: venue.address.line1,
    addressLocality: venue.address.city,
    postalCode: venue.address.postcode,
    addressCountry: 'GB',
  },
  sameAs: [venue.instagram.url],
  openingHoursSpecification: hours.days
    .filter((d) => d.open && d.close)
    .map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${dayNames[d.key]}`,
      opens: d.open,
      closes: d.close === '24:00' ? '23:59' : d.close,
    })),
};

const head = [
  `<meta name="description" content="${esc(site.description)}" />`,
  `<link rel="canonical" href="${esc(site.url)}" />`,
  `<meta property="og:type" content="website" />`,
  `<meta property="og:site_name" content="${esc(site.name)}" />`,
  `<meta property="og:locale" content="en_GB" />`,
  `<meta property="og:title" content="${esc(site.title)}" />`,
  `<meta property="og:description" content="${esc(site.description)}" />`,
  `<meta property="og:url" content="${esc(site.url)}" />`,
  `<meta property="og:image" content="${esc(ogImage)}" />`,
  `<meta property="og:image:width" content="1200" />`,
  `<meta property="og:image:height" content="630" />`,
  `<meta property="og:image:alt" content="${esc(`${site.name}, ${venue.address.line1}, ${venue.address.city}`)}" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${esc(site.title)}" />`,
  `<meta name="twitter:description" content="${esc(site.description)}" />`,
  `<meta name="twitter:image" content="${esc(ogImage)}" />`,
  `<script type="application/ld+json">${JSON.stringify(structured).replace(/</g, '\\u003c')}</script>`,
].join('\n    ');

const file = path.join(dist, 'index.html');
let html = await readFile(file, 'utf8');
for (const marker of ['<!--head-meta-->', '<!--app-html-->']) {
  if (!html.includes(marker)) throw new Error(`Template marker missing: ${marker}`);
}
html = html
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(site.title)}</title>`)
  .replace('<!--head-meta-->', head)
  .replace('<!--app-html-->', ssr.render());

// Inline the stylesheet: one fewer render-blocking request on first load.
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = await readFile(path.join(dist, cssLink[1]), 'utf8');
  html = html.replace(cssLink[0], () => `<style>${css}</style>`);
  await rm(path.join(dist, cssLink[1]));
}

// The page is fully prerendered, so the app bundle is fetched after first
// paint instead of competing with fonts and HTML for the first frame.
const entry = html.match(/<script type="module" crossorigin src="(\.\/assets\/[^"]+\.js)"><\/script>/);
if (entry) {
  const loader = `<script type="module">const go=()=>import('${entry[1]}');requestAnimationFrame(()=>setTimeout(go,0));</script>`;
  html = html.replace(entry[0], '').replace('</body>', () => `${loader}\n  </body>`);
}

await writeFile(file, html);
await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${path.relative(root, file)} (${(html.length / 1024).toFixed(1)} kB)`);
