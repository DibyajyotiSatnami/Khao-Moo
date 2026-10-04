/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PRODUCTION MENU — Khao Moo
 * ─────────────────────────────────────────────────────────────────────────────
 *  Source: the owner-supplied Khao Moo menu card and product photos
 *  (public/khao-moo-menu.jpg). Only confirmed names, sizes and prices are used.
 *
 *  Category:  { id: 'pickles', label: 'Pickles', note?: 'Shown under the heading' }
 *
 *  Item:
 *  {
 *    id: 'unique-id',                 // required, unique
 *    name: 'Dish name',               // required
 *    category: 'pickles',             // required, must match a category id
 *    description: 'Short description.',   // confirmed wording only, or ''
 *    price: 299,                      // single price in ₹ …
 *    prices: [{ label: '50 g', price: 85 }],  // … OR size variants (use one)
 *    size: '200 ml',                  // optional pack size for single-price items
 *    dietary: ['veg'],                // confirmed only: 'veg' | 'non-veg' | 'vegan' | 'spicy' | 'contains-nuts'
 *    tags: ['Extra garlic'],          // confirmed product highlights
 *    featured: true,                  // show in "Discover What's Cooking" (max 6)
 *    image: { src, srcSet, alt, w, h } // or null
 *  }
 *  Leave price/prices out when a price is not confirmed — the site then shows
 *  "Ask on WhatsApp" instead of a number.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const photo = (name, w, h, alt) => ({
  src: `images/${name}-1290.webp`,
  srcSet: `images/${name}-640.webp 640w, images/${name}-1290.webp 1290w`,
  alt,
  w,
  h,
})

const pickleSizes = (p50, p100, p250) => [
  { label: '50 g', price: p50 },
  { label: '100 g', price: p100 },
  { label: '250 g', price: p250 },
]

export const categories = [
  { id: 'pickles', label: 'Pickles' },
  { id: 'veg-pickles', label: 'Veg Pickles', note: 'Per 100 g pack' },
  { id: 'chilli-oil', label: 'Chilli Oil' },
  { id: 'kitchen', label: 'From the Kitchen' },
]

export const items = [
  {
    id: 'smoked-pork-pickle',
    name: 'Smoked Pork Pickle',
    category: 'pickles',
    description: 'Fresh, authentic and homemade.',
    prices: pickleSizes(125, 220, 460),
    dietary: ['non-veg'],
    featured: false,
    image: null,
  },
  {
    id: 'pork-pickle',
    name: 'Pork Pickle',
    category: 'pickles',
    description: 'Fresh, authentic and homemade.',
    prices: pickleSizes(105, 190, 400),
    dietary: ['non-veg'],
    featured: true,
    image: photo('pork-pickle-pouches', 1290, 1381, 'Two pouches of Khao Moo pork pickle on a red cloth'),
  },
  {
    id: 'chicken-pickle',
    name: 'Chicken Pickle',
    category: 'pickles',
    description: 'Fresh, authentic and homemade.',
    prices: pickleSizes(85, 160, 320),
    dietary: ['non-veg'],
    featured: true,
    image: photo('chicken-pickle-pouches', 1290, 1411, 'Hand holding pouches of Khao Moo chicken pickle'),
  },
  {
    id: 'bhoot-jolokiya',
    name: 'Bhoot Jolokiya',
    category: 'veg-pickles',
    description: 'Veg pickle · 100 g.',
    price: 150,
    size: '100 g',
    dietary: ['veg'],
    featured: false,
    image: null,
  },
  {
    id: 'khorisa-bhoot-jolokiya',
    name: 'Khorisa Bhoot Jolokiya',
    category: 'veg-pickles',
    description: 'Veg pickle · 100 g.',
    price: 150,
    size: '100 g',
    dietary: ['veg'],
    featured: false,
    image: null,
  },
  {
    id: 'chilli-garlic-oil',
    name: 'Chilli-Garlic Oil',
    category: 'chilli-oil',
    description: 'Made with premium ingredients, extra garlic & bold spices. Perfect for everyday indulgence.',
    price: 299,
    size: '200 ml',
    dietary: [],
    tags: ['Extra garlic', 'Bold & aromatic', 'Premium ingredients', 'No artificial flavours'],
    featured: true,
    image: photo('chilli-garlic-oil', 1290, 1275, 'Jar of Khao Moo Chilli Garlic Oil with garlic bulbs and dried red chillies'),
  },
  {
    id: 'smoked-pork-bamboo-shoot',
    name: 'Smoked Pork with Bamboo Shoot',
    category: 'kitchen',
    description: 'Served in leaf-lined bowls with fresh red chilli.',
    dietary: ['non-veg'],
    featured: true,
    image: photo('smoked-pork-bamboo-shoot', 1290, 1310, 'Two bowls of smoked pork with bamboo shoot, garnished with sliced red chilli on a leaf'),
  },
]
