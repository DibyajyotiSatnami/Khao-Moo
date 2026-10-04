import { site } from '../config/site.js'

/**
 * Vector redraw of the Khao Moo seal (pig emblem, red band, "Estd." year).
 * Replace with the original artwork by setting `site.logo` once supplied.
 */
export default function Seal({ size = 56, className = '', title = `${site.name} — ${site.tagline}`, inverted = false }) {
  if (site.logo) {
    return <img src={site.logo} alt={title} width={size} height={size} className={className} />
  }
  const red = inverted ? '#f7efe3' : '#a51f24'
  const paper = inverted ? '#a51f24' : '#f7efe3'
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}>
      <circle cx="100" cy="100" r="97" fill={paper} />
      <circle cx="100" cy="100" r="93" fill="none" stroke={red} strokeWidth="6" />
      <circle cx="100" cy="100" r="84" fill="none" stroke={red} strokeWidth="1.6" />
      <path d="M16.2 106 L183.8 106 A84 84 0 0 1 16.2 106 Z" fill={red} />
      {/* pig */}
      <g fill="none" stroke={red} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M78 48 L70 32 Q84 32 90 42" />
        <path d="M122 48 L130 32 Q116 32 110 42" />
        <ellipse cx="100" cy="66" rx="27" ry="24" />
        <ellipse cx="100" cy="74" rx="11.5" ry="7.5" />
      </g>
      <g fill={red}>
        <circle cx="89" cy="59" r="2.6" />
        <circle cx="111" cy="59" r="2.6" />
        <circle cx="96" cy="74" r="2" />
        <circle cx="104" cy="74" r="2" />
      </g>
      <text x="100" y="134" textAnchor="middle" fill={paper} fontFamily="'Manrope Variable', Manrope, Arial, sans-serif" fontWeight="600" fontSize="22" letterSpacing="2.5">
        KHAO MOO
      </text>
      <rect x="44" y="142" width="112" height="19" rx="9.5" fill={paper} />
      <text x="100" y="155.5" textAnchor="middle" fill={red} fontFamily="'Manrope Variable', Manrope, Arial, sans-serif" fontWeight="600" fontSize="10.5">
        The Ethnic Food Hub
      </text>
      <text x="100" y="178" textAnchor="middle" fill={paper} fontFamily="'Manrope Variable', Manrope, Arial, sans-serif" fontWeight="600" fontSize="10">
        Estd. {site.established}
      </text>
    </svg>
  )
}
