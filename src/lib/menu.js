import { categories, items } from '../content/menu.js'
import { sampleCategories, sampleItems } from '../content/sample-menu.js'
import { site } from '../config/site.js'

/**
 * Resolves which menu to display.
 *  - 'production': real items from content/menu.js
 *  - 'sample':     labelled preview content (only while the real menu is empty)
 *  - 'empty':      no menu to show
 */
export function getMenu() {
  if (items.length > 0) return { mode: 'production', categories, items }
  if (site.features.showSampleMenuWhenEmpty) {
    return { mode: 'sample', categories: sampleCategories, items: sampleItems }
  }
  return { mode: 'empty', categories: [], items: [] }
}

export const DIETARY_LABELS = {
  veg: 'Veg',
  'non-veg': 'Non-veg',
  vegan: 'Vegan',
  spicy: 'Spicy',
  'contains-nuts': 'Contains nuts',
}

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
export const formatPrice = (p) => (typeof p === 'number' ? inr.format(p) : null)

/** "From ₹85" for variant items, "₹299" for single price, null if unconfirmed. */
export function priceSummary(item) {
  if (item.prices?.length) return `From ${formatPrice(Math.min(...item.prices.map((v) => v.price)))}`
  return formatPrice(item.price)
}

export const orderMessage = (item) => `Hi Khao Moo! I'd like to order: ${item.name}. Could you share availability and delivery details?`
