import { site, has, telHref } from '../config/site.js'
import { BookIcon, PinIcon, PhoneIcon } from './Icons.jsx'

/** Sticky bottom actions on phones. "Call" appears only with a verified number. */
export default function MobileActionBar() {
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-1 text-[0.7rem] font-semibold tracking-wide'
  return (
    <nav
      aria-label="Quick actions"
      className="on-dark safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest/95 px-3 pt-2.5 text-ivory backdrop-blur-md md:hidden"
    >
      <div className="flex divide-x divide-white/10">
        <a href="#menu" className={item}>
          <BookIcon /> Menu
        </a>
        <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className={item}>
          <PinIcon /> Directions
        </a>
        {has.phone() && (
          <a href={telHref()} className={item}>
            <PhoneIcon /> Call
          </a>
        )}
      </div>
    </nav>
  )
}
