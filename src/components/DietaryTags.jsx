import { DIETARY_LABELS } from '../lib/menu.js'

const DOT = { veg: 'border-emerald-700 after:bg-emerald-700', 'non-veg': 'border-chilli after:bg-chilli' }

/** Renders only the labels present in the data (i.e. confirmed by the owner). */
export default function DietaryTags({ dietary = [], dark = false }) {
  if (!dietary.length) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Dietary information">
      {dietary.map((d) => (
        <li
          key={d}
          className={`inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-ivory/80' : 'text-muted'}`}
        >
          {DOT[d] && (
            <span
              className={`relative inline-block h-3 w-3 border after:absolute after:inset-[2px] after:rounded-full ${DOT[d]}`}
              aria-hidden="true"
            />
          )}
          {DIETARY_LABELS[d] || d}
        </li>
      ))}
    </ul>
  )
}
