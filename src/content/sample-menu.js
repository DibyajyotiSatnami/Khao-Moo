/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SAMPLE MENU — PREVIEW CONTENT ONLY. NOT KHAO MOO'S REAL MENU.
 * ─────────────────────────────────────────────────────────────────────────────
 *  These placeholder entries exist so the layout can be reviewed before the
 *  real menu is supplied. Names are deliberately generic, prices are dummy
 *  values, and no dietary labels are claimed. Every entry is rendered with a
 *  visible "Sample" badge and the section shows a preview notice.
 *
 *  This file is ignored automatically as soon as src/content/menu.js has items.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const sampleCategories = [
  { id: 'small-plates', label: 'Small Plates' },
  { id: 'mains', label: 'Mains' },
  { id: 'rice-noodles', label: 'Rice & Noodles' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
]

const s = (id, name, category, description, price, featured = false) => ({
  id: `sample-${id}`,
  name,
  category,
  description,
  price,
  dietary: [],
  featured,
  image: null,
  sample: true,
})

export const sampleItems = [
  s('sp1', 'Sample Small Plate One', 'small-plates', 'Placeholder description — replace with the real dish details.', 180, true),
  s('sp2', 'Sample Small Plate Two', 'small-plates', 'Placeholder description — a short, appetising line goes here.', 220),
  s('sp3', 'Sample Small Plate Three', 'small-plates', 'Placeholder description for preview purposes only.', 160),
  s('m1', 'Sample Main One', 'mains', 'Placeholder description — replace with the real dish details.', 340, true),
  s('m2', 'Sample Main Two', 'mains', 'Placeholder description — a short, appetising line goes here.', 380, true),
  s('m3', 'Sample Main Three', 'mains', 'Placeholder description for preview purposes only.', 320),
  s('m4', 'Sample Main Four', 'mains', 'Placeholder description for preview purposes only.', 360),
  s('rn1', 'Sample Rice Bowl', 'rice-noodles', 'Placeholder description — replace with the real dish details.', 260, true),
  s('rn2', 'Sample Noodle Bowl', 'rice-noodles', 'Placeholder description — a short, appetising line goes here.', 240, true),
  s('rn3', 'Sample Rice Plate', 'rice-noodles', 'Placeholder description for preview purposes only.', 280),
  s('sd1', 'Sample Side One', 'sides', 'Placeholder description for preview purposes only.', 90),
  s('sd2', 'Sample Side Two', 'sides', 'Placeholder description for preview purposes only.', 110, true),
  s('d1', 'Sample Drink One', 'drinks', 'Placeholder description for preview purposes only.', 120),
  s('d2', 'Sample Drink Two', 'drinks', 'Placeholder description for preview purposes only.', 140),
]
