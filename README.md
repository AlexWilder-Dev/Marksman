# Marksman Public House: concept site

A speculative redesign for the Marksman, 254 Hackney Road, London E2. It is a
single static page with anchored sections, built to deploy on GitHub Pages.

**This is a demo.** There is no CMS, backend, booking integration, analytics or
email sending. Forms validate and show a success state but submit nowhere.
"Confirm on OpenTable", Google Maps, Instagram, `tel:` and `mailto:` are plain
links.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check, build, prerender to dist/
npm run preview   # serve dist/ at http://localhost:4173
```

`npm run build` builds the client bundle and an SSR bundle, then
`scripts/prerender.mjs` renders the page to static HTML (text is there on first
paint), injects meta, Open Graph and structured data, inlines the CSS and loads
the app bundle after first paint.

The base path is relative (`./`), so `dist/` works from any sub-path.
`.github/workflows/deploy.yml` publishes to GitHub Pages on every push to
`main` (enable Pages → "GitHub Actions" in the repo settings).

## Editing content

Everything the page says lives in **`src/content.ts`**: venue details, hours,
menus, prices, story beats, floors, booking rules, occasions, Christmas, footer
and section meta.

- **Hours** are marked `toConfirm: true`. Check them with the venue; the live
  open/closed status and the hours table are both computed from them in
  Europe/London time.
- **Christmas**: set `christmas.enabled` to `false` to hide the seasonal band
  and its nav link.
- **Menus**: the Today tab uses the menu of Tue 6 Oct 2026. The Sunday and
  Feasting tabs are clearly labelled sample menus.

## Photography

Each image slot shows a line drawing in a frame until a photo is supplied. To
add one, put the file in `public/img/` and set its `src` in `images` in
`src/content.ts`, e.g. `src: 'img/bar_interior.jpg'`.

| Slot | Where it appears |
| --- | --- |
| `hero_facade` | Hero (replaces the illustrated façade) |
| `bar_interior` | Three Floors: the Pub |
| `dining_room` | Three Floors: the Dining Room |
| `roof_terrace` | Three Floors: the Roof Terrace |
| `bun_closeup` | Signatures: Beef & Barley Bun |
| `tart_closeup` | Signatures: Brown Butter & Honey Tart |

## Stack

Vite, React, TypeScript and Framer Motion. Every animation uses the shared
spring presets in `src/lib/motion.ts`. Scroll scenes collapse to static,
readable layouts under `prefers-reduced-motion`.

Fonts (Fraunces, Libre Caslon Text, Cabin) are self-hosted, subset WOFF2 files
under the SIL Open Font License; see `public/fonts/OFL.txt`.

`public/menu/marksman-todays-menu.pdf` is printed from the page's own print
stylesheet (printing the page gives just the menu).

---

Concept site by AlexWilder-Dev.
