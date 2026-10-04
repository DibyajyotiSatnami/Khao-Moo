import { site } from '../config/site.js'
import Seal from './Seal.jsx'

export default function Wordmark({ light = false, className = '' }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Seal size={46} title="" className="shrink-0 drop-shadow-sm" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.45rem] font-medium tracking-[-0.01em] ${light ? 'text-ivory' : 'text-forest'}`}>
          Khao <span className={`italic ${light ? 'text-gold-soft' : 'text-chilli'}`}>Moo</span>
        </span>
        <span className={`mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.3em] ${light ? 'text-ivory/75' : 'text-muted'}`}>
          {site.tagline}
        </span>
      </span>
    </span>
  )
}
