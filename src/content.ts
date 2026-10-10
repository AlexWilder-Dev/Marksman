/**
 * All site content lives here. Every section reads from this file, so copy,
 * prices, hours and image slots can be edited without touching components.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface DayHours {
  key: DayKey;
  day: string;
  /** 24h "HH:MM", or null when closed all day. */
  open: string | null;
  /** 24h "HH:MM"; "24:00" means midnight. */
  close: string | null;
}

export type ImageSlotId =
  | 'hero_facade'
  | 'bar_interior'
  | 'dining_room'
  | 'roof_terrace'
  | 'bun_closeup'
  | 'tart_closeup';

export interface ImageSlot {
  /** Path relative to /public, e.g. "img/hero_facade.jpg". Null shows the designed frame. */
  src: string | null;
  alt: string;
  caption: string;
}

export interface MenuItem {
  name: string;
  price?: number;
  /** Short qualifier shown after the price column, e.g. "each", "for two". */
  per?: string;
  description?: string;
  signature?: boolean;
}

export interface MenuSection {
  title: string;
  note?: string;
  signature?: boolean;
  items: MenuItem[];
}

export type MenuTabId = 'today' | 'sunday' | 'feasting' | 'drinks';

export interface MenuTab {
  id: MenuTabId;
  label: string;
  heading: string;
  /** Placeholder content, flagged visibly on the menu. */
  sample?: boolean;
  intro?: string;
  priceLine?: string;
  sections: MenuSection[];
}

export type OccasionId = 'feasting' | 'hire' | 'wedding' | 'christmas' | 'catering' | 'other';

export interface Occasion {
  id: OccasionId;
  label: string;
  /** Heading on the enquiry sheet. */
  title: string;
  /** Subject line used for the email fallback link. */
  emailSubject: string;
  defaultGuests: number;
  intro: string;
}

export type FloorCta =
  | { kind: 'book'; label: string; note?: string }
  | { kind: 'anchor'; label: string; href: string; note?: string };

export interface Floor {
  id: 'pub' | 'dining' | 'roof';
  level: string;
  levelName: string;
  name: string;
  lines: [string, string];
  cta: FloorCta;
  image: ImageSlotId;
}

export interface StoryBeat {
  id: string;
  year: string;
  kicker: string;
  title: string;
  body: string;
}

export interface SectionMeta {
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/* Site + venue                                                        */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'Marksman Public House',
  shortName: 'Marksman',
  /** Absolute URL of the deployed site (used for canonical + Open Graph). */
  url: 'https://alexwilder-dev.github.io/Marksman/',
  title: 'Marksman Public House · Pub, Dining Room & Roof Terrace, Hackney Road E2',
  description:
    'A Victorian pub on Hackney Road, E2, run by chef-owners Tom Harris and Jon Rotheram. Seasonal British cooking, a menu that changes daily, natural wines and London beer. Michelin Pub of the Year 2017.',
  ogImage: 'og.png',
  credit: 'Concept site by AlexWilder-Dev',
} as const;

export const venue = {
  address: {
    line1: '254 Hackney Road',
    city: 'London',
    postcode: 'E2 7SJ',
    corner: 'Corner of Horatio Street',
  },
  established: 'c.1865',
  station: 'Hoxton',
  stationLine: 'Overground',
  phone: { display: '020 7739 7393', tel: '+442077397393' },
  email: {
    bookings: 'bookings@marksmanpublichouse.com',
    press: 'press@marksmanpublichouse.com',
    jobs: 'jack@marksmanpublichouse.com',
  },
  instagram: { handle: '@marksman_pub', url: 'https://www.instagram.com/marksman_pub/' },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Marksman+Public+House%2C+254+Hackney+Road%2C+London+E2+7SJ',
  owners: 'Tom Harris and Jon Rotheram',
  sister: { name: 'Lasdun', where: 'at the National Theatre' },
  tagline: 'First and foremost a pub. Pop in for a pint, or stay for dinner.',
} as const;

/* ------------------------------------------------------------------ */
/* Hours                                                               */
/* ------------------------------------------------------------------ */

export const hours = {
  /** TO CONFIRM with the venue before launch. */
  toConfirm: true,
  timeZone: 'Europe/London',
  days: [
    { key: 'mon', day: 'Monday', open: null, close: null },
    { key: 'tue', day: 'Tuesday', open: '16:00', close: '24:00' },
    { key: 'wed', day: 'Wednesday', open: '12:00', close: '24:00' },
    { key: 'thu', day: 'Thursday', open: '12:00', close: '24:00' },
    { key: 'fri', day: 'Friday', open: '12:00', close: '24:00' },
    { key: 'sat', day: 'Saturday', open: '12:00', close: '24:00' },
    { key: 'sun', day: 'Sunday', open: '12:00', close: '24:00' },
  ] satisfies DayHours[],
  roofTerrace: 'Roof Terrace: Tue–Sat in good weather, walk-in only',
};

/* ------------------------------------------------------------------ */
/* Image slots (drop photography into /public/img and set src)         */
/* ------------------------------------------------------------------ */

export const images: Record<ImageSlotId, ImageSlot> = {
  hero_facade: {
    src: null,
    alt: 'The brown-tiled Victorian façade of the Marksman on Hackney Road',
    caption: 'Hackney Road, after dark',
  },
  bar_interior: {
    src: null,
    alt: 'The ground-floor pub: mahogany bar, panelling and green leather banquettes',
    caption: 'The public bar',
  },
  dining_room: {
    src: null,
    alt: 'The first-floor Dining Room designed by Martino Gamper',
    caption: 'The Dining Room',
  },
  roof_terrace: {
    src: null,
    alt: 'The Roof Terrace above Hackney Road at dusk',
    caption: 'The Roof Terrace',
  },
  bun_closeup: {
    src: null,
    alt: 'Beef & Barley Bun with horseradish',
    caption: 'Beef & Barley Bun',
  },
  tart_closeup: {
    src: null,
    alt: 'A slice of Brown Butter & Honey Tart',
    caption: 'Brown Butter & Honey Tart',
  },
};

/* ------------------------------------------------------------------ */
/* Navigation + per-section meta                                       */
/* ------------------------------------------------------------------ */

export const nav = [
  { href: '#story', label: 'The Name' },
  { href: '#floors', label: 'Three Floors' },
  { href: '#menu', label: 'Menu' },
  { href: '#groups', label: 'Groups & Weddings' },
  { href: '#christmas', label: 'Christmas' },
  { href: '#find-us', label: 'Find Us' },
] as const;

/** Document title + description applied when a section is navigated to. */
export const sectionMeta: Record<string, SectionMeta> = {
  story: {
    title: 'The Name · Marksman Public House',
    description: 'Why a Hackney Road pub is named after the man who shot Nelson, fifty feet from the Nelson’s Head.',
  },
  floors: {
    title: 'Pub, Dining Room & Roof Terrace · Marksman Public House',
    description: 'Three floors: the ground-floor pub, the first-floor Dining Room by Martino Gamper, and the Roof Terrace.',
  },
  menu: {
    title: 'Today’s Menu · Marksman Public House',
    description: 'Today’s menu at the Marksman: seasonal British cooking that changes daily, plus Sunday roasts, the Feasting Menu and drinks.',
  },
  groups: {
    title: 'Groups, Private Hire & Weddings · Marksman Public House',
    description: 'Feasting Menu for 9 or more, full-venue private hire, and weddings from an intimate breakfast to a full takeover.',
  },
  christmas: {
    title: 'Christmas 2026 · Marksman Public House',
    description: 'Christmas 2026 bookings are open in the Pub and the Dining Room. Roast Norfolk Bronze Turkey, Chicken & Preserved Cep Pie and more.',
  },
  'find-us': {
    title: 'Find Us · Marksman Public House',
    description: '254 Hackney Road, London E2 7SJ, on the corner of Horatio Street. Nearest station: Hoxton (Overground).',
  },
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  kicker: 'Public House · Hackney Road, E2',
  established: 'est. c.1865',
  title: 'The Marksman',
  sub: 'Seasonal British cooking from a menu that changes daily, natural wine and London beer.',
  stamp: 'Pub of the Year · Hackney Road · London E2 ·',
  ctaPrimary: 'Book a table',
  ctaSecondary: 'Today’s menu',
};

/* ------------------------------------------------------------------ */
/* Fifty Feet (story of the name)                                      */
/* ------------------------------------------------------------------ */

export const story = {
  label: 'The name',
  heading: 'Fifty Feet',
  from: 'The Marksman',
  to: 'Nelson’s Head',
  distanceFt: 50,
  beats: [
    {
      id: 'trafalgar',
      year: '1805',
      kicker: 'Trafalgar',
      title: 'One shot from the rigging',
      body: 'High in the rigging of the Redoutable, a French marksman takes aim at Admiral Lord Nelson. The wound is fatal.',
    },
    {
      id: 'victorian',
      year: 'c.1865',
      kicker: 'Victorian Hackney Road',
      title: 'Two pubs, fifty feet apart',
      body: 'Off Hackney Road stand the Nelson’s Head and, about fifty feet away, the Marksman. Draw your own line.',
    },
    {
      id: 'relaunch',
      year: '2015',
      kicker: 'New hands',
      title: 'Tom & Jon take over',
      body: 'Chef-owners Tom Harris and Jon Rotheram, both St. JOHN alumni, relaunch the pub: seasonal British cooking, a menu that changes every day.',
    },
    {
      id: 'michelin',
      year: '2017',
      kicker: 'Michelin Guide',
      title: 'Pub of the Year',
      body: 'Michelin names the Marksman its Pub of the Year. It is still, first and foremost, a pub.',
    },
    {
      id: 'nelson',
      year: 'Tonight',
      kicker: 'Last word',
      title: 'The Pickled Nelson',
      body: 'ELLC rum, Manzanilla, Noilly Prat and a pickled onion. £12 at the bar. Raise one to the admiral.',
    },
  ] satisfies StoryBeat[],
};

/* ------------------------------------------------------------------ */
/* Three Floors                                                        */
/* ------------------------------------------------------------------ */

export const floors = {
  label: 'The building',
  heading: 'Three Floors',
  items: [
    {
      id: 'pub',
      level: 'G',
      levelName: 'Ground floor',
      name: 'The Pub',
      lines: [
        'The original mahogany bar, wood panelling, green leather banquettes and an octagonal skylight.',
        'Walk in for a pint and a bun, or stay for the full menu.',
      ],
      cta: { kind: 'anchor', label: 'Walk in', href: '#find-us', note: 'No booking needed' },
      image: 'bar_interior',
    },
    {
      id: 'dining',
      level: '1',
      levelName: 'First floor',
      name: 'The Dining Room',
      lines: [
        'Upstairs, a dining room designed by Martino Gamper.',
        'Seasonal British cooking from a menu that changes daily.',
      ],
      cta: { kind: 'book', label: 'Book a table', note: 'Up to 8 online' },
      image: 'dining_room',
    },
    {
      id: 'roof',
      level: 'R',
      levelName: 'Roof',
      name: 'The Roof Terrace',
      lines: [
        'Cocktails and snacks above Hackney Road.',
        'Tuesday to Saturday, in good weather.',
      ],
      cta: { kind: 'anchor', label: 'Walk-in only · Tue–Sat', href: '#find-us' },
      image: 'roof_terrace',
    },
  ] satisfies Floor[],
};

/* ------------------------------------------------------------------ */
/* Menus                                                               */
/* ------------------------------------------------------------------ */

export const menu = {
  label: 'Eat & drink',
  heading: 'Today’s Menu',
  changesDaily: 'Today’s menu, changes daily',
  /** The date the "today" menu data was taken from. */
  sourceDate: '2026-10-06',
  currency: '£',
  signatureLegend: 'House signature',
  pdf: { href: 'menu/marksman-todays-menu.pdf', label: 'Download PDF' },
  notes: [
    'Please tell us about any allergies or dietary requirements before you order. Full allergen information is available from the team.',
    'A discretionary 12.5% service charge is added to your bill.',
    'We add a discretionary £1 per guest donation to WaterAid for unlimited filtered water.',
  ],
  tabs: [
    {
      id: 'today',
      label: 'Today',
      heading: 'Today’s menu',
      sections: [
        {
          title: 'Snacks',
          items: [
            { name: 'Green Olives', price: 4.5 },
            { name: 'Pickles', price: 5 },
            { name: 'Caraway & Black Treacle Sourdough, Cultured Butter', price: 5.5 },
            { name: 'Beef & Barley Bun, Horseradish', price: 7.5, signature: true },
            { name: 'Porthilly Oyster', price: 5.5, per: 'each' },
          ],
        },
        {
          title: 'Starters',
          items: [
            { name: 'Chicory, Pear, Walnut & Harbourne Blue', price: 14 },
            { name: 'Duck Liver Parfait, Brioche & Burnt Apple', price: 15 },
            { name: 'Crumbed Cod’s Cheeks & Tartare Sauce', price: 15 },
            { name: 'Duck Hearts & Braised Onion on Toast', price: 14 },
          ],
        },
        {
          title: 'Mains',
          items: [
            { name: 'Lentils, Chard & Goat’s Curd', price: 21 },
            { name: 'Roast Cod, Seaweed Butter & Sea Aster', price: 38 },
            { name: 'Tamworth Chop, Spinach & Chanterelle', price: 32 },
            { name: 'Chicken & Girolle Pie', price: 60, per: 'for two' },
            { name: 'Hereford Wing Rib & Horseradish', price: 85, per: 'for two' },
          ],
        },
        {
          title: 'Tuesday Steak Night',
          note: 'Tuesdays only',
          items: [{ name: 'Hereford Skirt, Parsley Butter, Chips & Salad', price: 17 }],
        },
        {
          title: 'Sides',
          items: [
            { name: 'Hand Cut Chips & Mayonnaise', price: 6.5 },
            { name: 'Butterhead, Buttermilk & Tarragon', price: 7 },
            { name: 'Potato & Montgomery Gratin', price: 8 },
          ],
        },
        {
          title: 'Puddings',
          items: [
            { name: 'Guinness & Dark Chocolate Soft Serve', price: 9 },
            { name: 'Set Chocolate, Blackcurrant & Hazelnut', price: 10 },
            { name: 'Almond & Pear Cake, Vanilla Cream', price: 10 },
            { name: 'British Cheeses & Damson', price: 15 },
          ],
        },
      ],
    },
    {
      id: 'sunday',
      label: 'Sunday',
      heading: 'Sunday lunch',
      sample: true,
      priceLine: '2 courses £42 · 3 courses £48',
      intro: 'Groups of 9 or more share three courses, family-style.',
      sections: [
        {
          title: 'To start',
          items: [
            { name: 'Porthilly Oysters & Shallot Vinegar' },
            { name: 'Smoked Eel, Beetroot & Horseradish' },
            { name: 'Ham Hock & Parsley Terrine, Piccalilli' },
            { name: 'Chicory, Pear, Walnut & Harbourne Blue' },
          ],
        },
        {
          title: 'The roast',
          signature: true,
          note: 'With roast potatoes, carrots, greens and gravy',
          items: [
            { name: 'Roast Hereford Sirloin, Yorkshire Pudding & Horseradish', signature: true },
            { name: 'Roast Tamworth Pork, Crackling & Apple Sauce' },
            { name: 'Roast Chicken, Bread Sauce & Bacon' },
            { name: 'Squash, Spelt & Goat’s Curd Pie' },
          ],
        },
        {
          title: 'Puddings',
          items: [
            { name: 'Brown Butter & Honey Tart', signature: true },
            { name: 'Apple & Blackberry Crumble, Custard' },
            { name: 'Guinness & Dark Chocolate Soft Serve' },
            { name: 'British Cheeses & Damson' },
          ],
        },
      ],
    },
    {
      id: 'feasting',
      label: 'Feasting 9+',
      heading: 'The Feasting Menu',
      sample: true,
      priceLine: 'For 9 or more · price per head on enquiry',
      intro: 'Served family-style down the table. Seasonal, so it changes with the kitchen.',
      sections: [
        {
          title: 'For the table',
          items: [
            { name: 'Beef & Barley Buns, Horseradish', signature: true },
            { name: 'Pickles & Green Olives' },
            { name: 'Caraway & Black Treacle Sourdough, Cultured Butter' },
            { name: 'Duck Liver Parfait, Brioche & Burnt Apple' },
          ],
        },
        {
          title: 'To share',
          items: [
            { name: 'Hereford Wing Rib & Horseradish' },
            { name: 'Chicken & Girolle Pie' },
            { name: 'Lentils, Chard & Goat’s Curd' },
            { name: 'Hand Cut Chips, Butterhead Salad, Potato & Montgomery Gratin' },
          ],
        },
        {
          title: 'To finish',
          items: [
            { name: 'Brown Butter & Honey Tart', signature: true },
            { name: 'British Cheeses & Damson' },
          ],
        },
      ],
    },
    {
      id: 'drinks',
      label: 'Drinks',
      heading: 'Drinks',
      intro: 'Biodynamic and natural wines from across Europe, house-infused spirits and London craft beer.',
      sections: [
        {
          title: 'Cocktails',
          items: [
            {
              name: 'Pickled Nelson',
              price: 12,
              description: 'ELLC Rum, Manzanilla, Noilly Prat, pickled onion',
              signature: true,
            },
            { name: 'The Last Word', price: 14 },
            { name: 'Apples & Pears', price: 13 },
            { name: 'Mezcal Manhattan', price: 14 },
            { name: 'Negroni', price: 12 },
          ],
        },
        {
          title: 'Beer & low / no',
          items: [
            { name: 'Five Points Bitter', description: 'Cask', price: 6.5 },
            { name: 'Five Points Lager', price: 7 },
            { name: 'Woodshedding No Dig IPA', price: 7.5 },
            { name: 'Lucky Saint 0.5%', price: 6.7 },
            { name: 'Spiced Plum Soda', price: 5 },
          ],
        },
        {
          title: 'Wine',
          note: 'Our list of biodynamic and natural wines changes often. Ask at the bar for today’s bottles.',
          items: [],
        },
      ],
    },
  ] satisfies MenuTab[],
};

/* ------------------------------------------------------------------ */
/* Signatures                                                          */
/* ------------------------------------------------------------------ */

export const signatures = {
  label: 'Signatures',
  heading: 'Order these',
  items: [
    {
      id: 'bun',
      name: 'Beef & Barley Bun',
      with: 'Snacks · with horseradish',
      line: 'Soft, rich, gone in three bites. Nobody orders just the one.',
      image: 'bun_closeup' as ImageSlotId,
    },
    {
      id: 'tart',
      name: 'Brown Butter & Honey Tart',
      with: 'Puddings · when it’s on',
      line: 'Not on every day’s menu, which is half the point. Ask.',
      image: 'tart_closeup' as ImageSlotId,
    },
  ],
  footnote: 'And on Sundays, the roast.',
};

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */

export const booking = {
  maxOnline: 8,
  maxGuests: 200,
  daysAhead: 21,
  openTableUrl:
    'https://www.opentable.co.uk/r/the-marksman-hackney-reservations-london?restref=208518&lang=en-GB',
  /** Mock sittings per day for the time picker (24h, 30-minute steps). */
  sittings: {
    mon: [],
    tue: [['17:30', '21:30']],
    wed: [['12:00', '14:30'], ['17:30', '21:30']],
    thu: [['12:00', '14:30'], ['17:30', '21:30']],
    fri: [['12:00', '14:30'], ['17:30', '21:45']],
    sat: [['12:00', '15:00'], ['17:30', '21:45']],
    sun: [['12:00', '18:30']],
  } satisfies Record<DayKey, [string, string][]>,
  copy: {
    title: 'Book a table',
    onlineNote: 'Up to 8 guests book online through OpenTable. The pub and Roof Terrace are walk-in.',
    groupSwitch: 'Groups of 9 or more dine from our seasonal Feasting Menu, served family-style. Tell us about your party and we’ll come back to you.',
    enquiryNote: 'Parties of 9 or more, private hire and events are arranged by email with the team.',
    confirm: 'Confirm on OpenTable',
    confirmNote: 'You’ll finish your booking on OpenTable, where your table is held.',
  },
};

export const occasions: Occasion[] = [
  {
    id: 'feasting',
    label: 'Group dining (9+)',
    title: 'Group enquiry',
    emailSubject: 'Group booking enquiry (9+)',
    defaultGuests: 10,
    intro: 'For 9 or more we serve the seasonal Feasting Menu, family-style down the table.',
  },
  {
    id: 'hire',
    label: 'Full-venue private hire',
    title: 'Private hire enquiry',
    emailSubject: 'Private hire enquiry',
    defaultGuests: 60,
    intro: 'Private hire is for the whole building: pub, Dining Room and Roof Terrace.',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    title: 'Wedding enquiry',
    emailSubject: 'Wedding enquiry',
    defaultGuests: 40,
    intro: 'From a wedding breakfast for close family to a full takeover, with music and late-night food.',
  },
  {
    id: 'christmas',
    label: 'Christmas 2026',
    title: 'Christmas enquiry',
    emailSubject: 'Christmas 2026 enquiry',
    defaultGuests: 8,
    intro: 'Christmas bookings are open in the Pub and the Dining Room.',
  },
  {
    id: 'catering',
    label: 'Off-site catering',
    title: 'Catering enquiry',
    emailSubject: 'Off-site catering enquiry',
    defaultGuests: 30,
    intro: 'We cook away from the pub, too. Tell us about the event.',
  },
  {
    id: 'other',
    label: 'Something else',
    title: 'Enquiry',
    emailSubject: 'Enquiry',
    defaultGuests: 10,
    intro: 'Tell us what you have in mind.',
  },
];

/* ------------------------------------------------------------------ */
/* Groups, private hire, weddings                                      */
/* ------------------------------------------------------------------ */

export const groups = {
  label: 'Bigger occasions',
  heading: 'Groups, Private Hire & Weddings',
  cards: [
    {
      id: 'feasting',
      numeral: 'I',
      title: 'Feasting for 9+',
      body: 'Nine or more? You’ll share our seasonal Feasting Menu, served family-style down the table. On Sundays, three courses to share.',
      cta: 'Enquire for a group',
      occasion: 'feasting' as OccasionId,
    },
    {
      id: 'hire',
      numeral: 'II',
      title: 'Full-venue hire',
      body: 'Take the whole building: the pub, the Dining Room and the Roof Terrace. Private hire is full-venue only.',
      cta: 'Enquire about hire',
      occasion: 'hire' as OccasionId,
    },
    {
      id: 'weddings',
      numeral: 'III',
      title: 'Weddings',
      body: 'Anything from a wedding breakfast for close family to a full takeover: sit-down reception through to music and late-night food.',
      cta: 'Enquire about a wedding',
      occasion: 'wedding' as OccasionId,
    },
  ],
  catering: { text: 'Off-site catering is available too.', cta: 'Ask about catering' },
};

/* ------------------------------------------------------------------ */
/* Christmas                                                           */
/* ------------------------------------------------------------------ */

export const christmas = {
  /** Toggle the seasonal band on or off. */
  enabled: true,
  label: 'Seasonal',
  heading: 'Christmas 2026',
  intro: 'Bookings are now open in the Pub and the Dining Room.',
  classicsLabel: 'The classics',
  classics: [
    'Roast Norfolk Bronze Turkey',
    'Chicken & Preserved Cep Pie',
    'Date & Salt Toffee Cake, Vanilla Custard',
  ],
  cta: 'Enquire about Christmas',
  emailNote: 'Or email',
};

/* ------------------------------------------------------------------ */
/* Find us                                                             */
/* ------------------------------------------------------------------ */

export const findUs = {
  label: 'Visit',
  heading: 'Find Us',
  stationNote: 'A few minutes’ walk from Hoxton (Overground).',
  sundayNote: 'On Sundays, Columbia Road flower market is round the corner. Flowers first, then the roast.',
  hoursHeading: 'Opening hours',
  toConfirmNote: 'Hours to be confirmed with the venue.',
  directions: 'Get directions',
  call: 'Call the pub',
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  newsletter: {
    heading: 'The Marksman letter',
    body: 'Now and then: new menus, Christmas, the odd Sunday special. Never more than once a month.',
    label: 'Email address',
    button: 'Sign up',
    success: 'You’re on the list. See you at the bar.',
    privacy: 'We’ll only use your email to send the newsletter. Unsubscribe any time.',
  },
  contacts: [
    { label: 'Bookings', value: venue.email.bookings, href: `mailto:${venue.email.bookings}` },
    { label: 'Press', value: venue.email.press, href: `mailto:${venue.email.press}` },
    { label: 'Jobs', value: venue.email.jobs, href: `mailto:${venue.email.jobs}?subject=${encodeURIComponent('Job enquiry')}` },
  ],
  privacy: {
    label: 'Privacy',
    heading: 'Privacy',
    body: [
      'This is a concept site. It uses no cookies or analytics, and the forms on it do not send or store anything.',
      'The venue’s own privacy policy would appear here.',
    ],
  },
};
