/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  KHAO MOO — SITE CONFIGURATION (single source of truth)
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every restaurant detail, link, image slot and optional feature lives here.
 *
 *  RULES
 *  • Only enter information the owner has confirmed.
 *  • Leave a field as `null` (or an empty array) when it is not verified —
 *    the site automatically hides it, and it is listed in OWNER_HANDOFF.md.
 *  • This file is plain JavaScript (no JSX) because vite.config.js also reads
 *    it at build time to generate SEO metadata and structured data.
 *
 *  Menu items live in  src/content/menu.js  (production)  and
 *  src/content/sample-menu.js  (preview only — never shown when real items exist).
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Builds an image entry from the optimised files in /public/images. */
function img(name, w, h, alt, caption) {
  return {
    src: `images/${name}-1290.webp`,
    srcSet: `images/${name}-640.webp 640w, images/${name}-1290.webp 1290w`,
    alt,
    w,
    h,
    ...(caption && { caption }),
  }
}

export const site = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'Khao Moo',
  tagline: 'The Ethnic Food Hub',
  pageTitle: 'Khao Moo | The Ethnic Food Hub',
  description:
    'Khao Moo — The Ethnic Food Hub. Explore our menu, discover your next favourite, and plan your visit.',

  /** Public site URL, e.g. 'https://khaomoo.in' — used for canonical / social tags. */
  siteUrl: 'https://dibyajyotisatnami.github.io/Khao-Moo/',

  /** Year shown on the logo seal (verified: "Estd. 2023"). */
  established: 2023,

  /**
   * Optional raster/vector logo file in /public (e.g. 'images/logo.svg' — no leading slash).
   * `null` = use the built-in SVG redraw of the Khao Moo seal (components/Seal.jsx).
   */
  logo: null,

  // ── Contact & location ───────────────────────────────────────────────────
  contact: {
    /**
     * Full address as one string, or null. Do NOT guess.
     * Source: "Manufactured & Marketed by" line on the Khao Moo product label.
     */
    address: 'Cherekapar, Sivasagar – 785701, Assam',
    /** Structured address for search engines (fill only when verified). */
    addressParts: {
      streetAddress: 'Cherekapar',
      addressLocality: 'Sivasagar',
      addressRegion: 'Assam',
      postalCode: '785701',
      addressCountry: 'IN',
    },
    /** Display phone (verified: menu card + product label). null hides the Call buttons. */
    phone: '+91 60014 98277',
    /** WhatsApp number — digits only, with country code. null hides WhatsApp links. */
    whatsapp: '916001498277',
    email: null,
  },

  /**
   * Opening hours — one row per line shown on the site, e.g.
   *   { days: 'Monday – Saturday', hours: '12:00 pm – 10:00 pm' }
   * Empty array hides the hours block.
   * `schemaHours` uses schema.org format for search engines, e.g. ['Mo-Sa 12:00-22:00'].
   */
  hours: [],
  schemaHours: [],

  maps: {
    /** Supplied Google Maps listing (verified reference). */
    url: 'https://www.google.com/maps/search/?api=1&query=Khao+Moo+The+Ethnic+Food+Hub&query_place_id=ChIJV9X1YyY3RzcRUGWWlOavKrA',
    /** Turn-by-turn directions link. */
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Khao+Moo+The+Ethnic+Food+Hub&destination_place_id=ChIJV9X1YyY3RzcRUGWWlOavKrA',
    placeId: 'ChIJV9X1YyY3RzcRUGWWlOavKrA',
    /**
     * Google Maps <iframe> src (Share → Embed a map → copy the src="…" value).
     * Only add once you have checked it shows the correct restaurant pin.
     */
    embedUrl: null,
  },

  social: {
    instagram: {
      handle: '@khao.moo',
      url: 'https://www.instagram.com/khao.moo/',
    },
    facebook: null,
  },

  // ── Ordering (verified from the Khao Moo menu card) ─────────────────────
  ordering: {
    enabled: true,
    howTo: 'Call or WhatsApp us to place an order.',
    notes: ['Pan-India shipping available for pickles', 'Pre-paid orders only · No COD'],
    deliveryRegionLabel: 'Delivery charges (North-East)',
    deliveryCharges: [
      { weight: '0 – 500 g', charge: 80 },
      { weight: '500 g – 1 kg', charge: 120 },
      { weight: '1 – 1.5 kg', charge: 160 },
      { weight: '1.5 – 2 kg', charge: 220 },
    ],
    outsideNote: 'Outside Assam, charges depend on the distance and weight of the order.',
  },

  // ── Optional features ────────────────────────────────────────────────────
  features: {
    /**
     * WhatsApp table-reservation requests. The form is shown ONLY when `enabled`
     * is true AND `whatsappNumber` is set. Keep `enabled: false` until the owner
     * confirms they accept reservation requests on WhatsApp.
     */
    reservations: {
      enabled: false,
      whatsappNumber: '916001498277',
      maxGuests: 20,
    },

    /**
     * Official menu file in /public (PDF or image). null hides "Download Menu".
     * Currently the owner-supplied menu card image.
     */
    menuFile: { href: 'khao-moo-menu.jpg', label: 'Download Menu', format: 'JPG' },

    /**
     * Authentic reviews only. Each: { quote, author, source, sourceUrl, date }.
     * Empty array replaces the section with a "Find Us on Google Maps" link.
     */
    reviews: [],

    /**
     * Show the clearly labelled SAMPLE menu if the real menu (src/content/menu.js)
     * is ever emptied. The real menu is in place, so this has no effect now.
     */
    showSampleMenuWhenEmpty: false,
  },

  // ── Copy ─────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Khao Moo · The Ethnic Food Hub',
    headline: 'A Table Full of Flavour.',
    text: 'Explore our menu, discover your next favourite, and plan your visit to Khao Moo.',
  },

  /**
   * "Our Story". Built only from facts on Khao Moo's own packaging and menu
   * (Estd. 2023 · Sivasagar, Assam · "Ethnic Pickles, Made just for you" ·
   * "Fresh · Authentic · Homemade"). Replace with the owner's own words when
   * supplied. Do not add unverified history, awards or sourcing claims.
   */
  story: {
    heading: 'Welcome to Khao Moo.',
    paragraphs: [
      'Khao Moo is The Ethnic Food Hub — a homegrown kitchen from Sivasagar, Assam, cooking since 2023.',
      'Our pickles are fresh, authentic and homemade: ethnic pickles, made just for you. Alongside them you will find our chilli-garlic oil and dishes from our kitchen, packed with care and full of flavour.',
      'Order on a call or WhatsApp, and we ship our pickles across India.',
    ],
    values: ['Fresh', 'Authentic', 'Homemade'],
    ownerApproved: false,
  },

  // ── Images ───────────────────────────────────────────────────────────────
  /**
   * Every image slot on the site. `src: null` renders a styled, clearly
   * labelled placeholder with fixed proportions. To use a real photo, drop it
   * into /public/images and set `src: 'images/your-file.jpg'` (no leading slash).
   * Keep the `alt` text accurate to the actual photo.
   */
  images: {
    hero: {
      src: 'images/table-spread-1290.webp',
      srcSet: 'images/table-spread-640.webp 640w, images/table-spread-1290.webp 1290w',
      alt: 'Overhead view of a table laid with Khao Moo dishes in leaf-lined bowls',
      w: 1290,
      h: 1591,
    },
    story: {
      src: 'images/pork-pickle-pouches-1290.webp',
      srcSet: 'images/pork-pickle-pouches-640.webp 640w, images/pork-pickle-pouches-1290.webp 1290w',
      alt: 'Two pouches of Khao Moo pork pickle, one with the red Khao Moo label',
      w: 1290,
      h: 1381,
    },
    gallery: [
      img('smoked-pork-bamboo-shoot', 1290, 1310, 'Smoked pork with bamboo shoot, garnished with red chilli on a leaf', 'Smoked pork with bamboo shoot'),
      img('table-spread', 1290, 1591, 'A table full of Khao Moo dishes in leaf-lined bowls', 'A table full of flavour'),
      img('sealed-boxes', 1290, 1503, 'Sealed Khao Moo boxes with the logo sticker on the lid', 'Packed with care'),
      img('chicken-pickle-pouches', 1290, 1411, 'Hand holding three pouches of Khao Moo pickle', 'Pickles, made just for you'),
      img('chilli-garlic-oil', 1290, 1275, 'Khao Moo Chilli Garlic Oil jar with garlic and dried red chillies', 'Chilli-Garlic Oil'),
      img('pork-pickle-pouches', 1290, 1381, 'Khao Moo pork pickle pouches on a red cloth', 'Pork pickle'),
    ],
    /**
     * Manually curated picks for the Instagram section (NOT a live feed).
     * Set `postUrl` to the matching Instagram post when known.
     */
    instagram: [
      { ...img('smoked-pork-bamboo-shoot', 1290, 1310, 'Smoked pork with bamboo shoot from Khao Moo'), postUrl: null },
      { ...img('chilli-garlic-oil', 1290, 1275, 'Khao Moo Chilli Garlic Oil'), postUrl: null },
      { ...img('sealed-boxes', 1290, 1503, 'Khao Moo boxes ready to go'), postUrl: null },
      { ...img('chicken-pickle-pouches', 1290, 1411, 'Khao Moo pickle pouches'), postUrl: null },
    ],
    /** Full menu card (owner-supplied). */
    menuCard: img('menu-card', 1290, 1277, 'Khao Moo menu card listing pickles, chilli-garlic oil, ordering and delivery charges'),
    /** 1200×630 social sharing image in /public. */
    ogImage: 'og-image.jpg',
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit Us', href: '#visit' },
  ],
}

/** Helpers that encode the "only show verified info" rules in one place. */
export const has = {
  phone: () => Boolean(site.contact.phone),
  address: () => Boolean(site.contact.address),
  hours: () => site.hours.length > 0,
  embed: () => Boolean(site.maps.embedUrl),
  reservations: () =>
    Boolean(site.features.reservations.enabled && site.features.reservations.whatsappNumber),
  reviews: () => site.features.reviews.length > 0,
  menuFile: () => Boolean(site.features.menuFile),
  whatsapp: () => Boolean(site.contact.whatsapp),
  ordering: () => Boolean(site.ordering.enabled),
}

/** wa.me link with an optional pre-filled message. */
export const waHref = (text = '', number = site.contact.whatsapp) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const telHref = () => `tel:${(site.contact.phone || '').replace(/[^\d+]/g, '')}`
