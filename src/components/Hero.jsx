import { site } from '../config/site.js'
import { ArrowRight, PinIcon } from './Icons.jsx'
import Img from './Img.jsx'
import Seal from './Seal.jsx'

function SpinBadge() {
  const text = `${site.story.values.join(' · ')} · Estd. ${site.established} · `
  return (
    <div className="relative grid h-32 w-32 place-items-center rounded-full bg-ivory shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] sm:h-36 sm:w-36">
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text fill="#18392e" fontSize="9.2" fontWeight="600" letterSpacing="2.6" fontFamily="'Manrope Variable', Manrope, sans-serif">
          <textPath href="#badge-circle">{text.toUpperCase()}</textPath>
        </text>
      </svg>
      <Seal size={64} title="" />
    </div>
  )
}

export default function Hero() {
  const { eyebrow, headline, text } = site.hero
  // "A Table Full of Flavour." → "A Table" / "Full of" / *Flavour.*
  const words = headline.split(' ')
  const last = words.pop()
  const mid = Math.ceil(words.length / 2)
  return (
    <section id="home" aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-forest text-ivory">
      {/* Image: full-bleed on mobile, arched panel on desktop */}
      <div className="absolute inset-0 -z-10 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[46%] lg:pt-28 lg:pr-10 lg:pb-12">
        <div className="relative h-full w-full overflow-hidden lg:rounded-t-[999px] lg:rounded-b-[28px]">
          <Img image={site.images.hero} priority aspect={false} className="settle h-full w-full" sizes="(min-width: 1024px) 46vw, 100vw" motif="table" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/50 lg:from-forest/40 lg:via-transparent lg:to-transparent" aria-hidden="true" />
        </div>
      </div>

      {/* Decorative weave strip */}
      <div className="weave pointer-events-none absolute top-0 bottom-0 left-0 hidden w-3 text-gold/25 lg:block" aria-hidden="true" />

      <div className="container-x flex min-h-[88svh] flex-col justify-end pt-32 pb-14 sm:min-h-[92svh] lg:min-h-[100svh] lg:justify-center lg:pb-20">
        <div className="max-w-[40rem] lg:max-w-[46%]">
          <p className="eyebrow rise mb-6 flex items-center gap-3 text-gold-soft" style={{ '--d': '120ms' }}>
            <span className="h-px w-10 bg-gold-soft/70" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1
            id="hero-title"
            className="rise text-[3.4rem] leading-[0.92] font-light tracking-[-0.035em] sm:text-7xl lg:text-[6.4rem]"
            style={{ '--d': '220ms' }}
          >
            <span className="block">{words.slice(0, mid).join(' ')}</span>
            <span className="block">{words.slice(mid).join(' ')}</span>
            <em className="block font-normal text-gold-soft">{last}</em>
          </h1>
          <p className="rise mt-6 max-w-md text-base leading-relaxed text-ivory/85 sm:text-lg" style={{ '--d': '360ms' }}>
            {text}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ '--d': '480ms' }}>
            <a href="#menu" className="btn btn-primary group">
              Explore the Menu
              <ArrowRight width={18} height={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#visit" className="btn btn-ghost-light">
              <PinIcon width={18} height={18} /> Find Us on the Map
            </a>
          </div>
        </div>
      </div>

      <div className="rise absolute right-6 bottom-8 hidden sm:block lg:right-[calc(46%-4.5rem)] lg:bottom-16" style={{ '--d': '700ms' }}>
        <SpinBadge />
      </div>
    </section>
  )
}
