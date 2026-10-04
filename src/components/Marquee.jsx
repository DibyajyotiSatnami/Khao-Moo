import { site } from '../config/site.js'

const Star = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="shrink-0 text-gold">
    <path fill="currentColor" d="M12 2l1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-1.8z" />
  </svg>
)

/** Slow ticker of verified brand facts. Static (and duplicate hidden) under reduced motion. */
export default function Marquee() {
  const words = [
    ...site.story.values,
    'Ethnic pickles, made just for you',
    site.ordering.notes[0],
    `Estd. ${site.established}`,
    'Sivasagar, Assam',
  ]
  const Row = ({ hidden }) => (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {words.map((w, i) => (
        <li key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-serif text-xl italic sm:text-2xl">{w}</span>
          <Star />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee overflow-hidden border-y border-forest/10 bg-chilli py-4 text-ivory">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
