import { site, has, telHref, waHref } from '../config/site.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'
import { PinIcon, ClockIcon, PhoneIcon, InstagramIcon, WhatsAppIcon, ArrowRight } from './Icons.jsx'

export default function Visit() {
  const ref = useReveal()
  const row = 'reveal flex gap-4 border-t border-forest/15 py-6'
  return (
    <section ref={ref} id="visit" aria-labelledby="visit-title" className="grain relative overflow-hidden py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="visit-title"
            eyebrow="Visit Us"
            title={
              <>
                Come find <em className="text-chilli">us</em>
              </>
            }
          />
          <div className="mt-10">
            {has.address() && (
              <div className={row}>
                <PinIcon className="mt-1 shrink-0 text-chilli" />
                <div>
                  <h3 className="eyebrow text-muted">Address</h3>
                  <address className="mt-2 font-serif text-xl not-italic text-forest">{site.contact.address}</address>
                </div>
              </div>
            )}
            {has.hours() && (
              <div className={row}>
                <ClockIcon className="mt-1 shrink-0 text-chilli" />
                <div className="flex-1">
                  <h3 className="eyebrow text-muted">Opening hours</h3>
                  <dl className="mt-2 space-y-1">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6">
                        <dt className="text-charcoal">{h.days}</dt>
                        <dd className="text-forest">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
            {has.phone() && (
              <div className={row}>
                <PhoneIcon className="mt-1 shrink-0 text-chilli" />
                <div>
                  <h3 className="eyebrow text-muted">Call or WhatsApp</h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <a href={telHref()} className="font-serif text-xl text-forest hover:text-chilli">
                      {site.contact.phone}
                    </a>
                    {has.whatsapp() && (
                      <a href={waHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline-offset-4 hover:underline">
                        <WhatsAppIcon width={16} height={16} /> Message us
                      </a>
                    )}
                  </p>
                </div>
              </div>
            )}
            <div className={`${row} border-b`}>
              <InstagramIcon className="mt-1 shrink-0 text-chilli" />
              <div>
                <h3 className="eyebrow text-muted">Instagram</h3>
                <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-2 block font-serif text-xl text-forest hover:text-chilli">
                  {site.social.instagram.handle}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal lg:col-span-7" style={{ '--reveal-delay': '120ms' }}>
          {has.embed() ? (
            <div className="flex h-full flex-col">
              <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-[28px] border border-forest/15 bg-ivory-deep shadow-[0_30px_60px_-35px_rgba(24,57,46,0.55)] sm:min-h-[30rem]">
                <iframe
                  src={site.maps.embedUrl}
                  title={`Map showing the location of ${site.name}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a href={site.maps.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-forest underline-offset-4 hover:text-chilli hover:underline">
                Open in Google Maps <ArrowRight width={16} height={16} />
              </a>
            </div>
          ) : (
            <a
              href={site.maps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group on-dark relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-t-[12rem] bg-forest p-8 text-ivory sm:min-h-[28rem] sm:p-12"
              aria-label="Open Khao Moo on Google Maps"
            >
              {/* Stylised map motif — not a real map */}
              <svg className="absolute inset-0 h-full w-full text-gold/25 transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-105" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M-20 120 C120 90 200 180 320 150 S520 60 640 100" />
                  <path d="M-20 260 C100 230 220 320 360 280 S540 200 640 240" />
                  <path d="M-20 400 C140 370 260 450 400 410 S560 340 640 380" />
                  <path d="M120 -20 C150 120 90 260 140 520" />
                  <path d="M330 -20 C300 140 380 300 330 520" />
                  <path d="M500 -20 C470 160 540 300 500 520" />
                </g>
                <g stroke="currentColor" strokeWidth="0.6" opacity="0.6">
                  {Array.from({ length: 14 }, (_, i) => (
                    <line key={i} x1={i * 46} y1="0" x2={i * 46 - 120} y2="500" />
                  ))}
                </g>
              </svg>
              <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="pin-pulse absolute inset-0 rounded-full bg-chilli/50" aria-hidden="true" />
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-chilli text-ivory shadow-lg">
                  <PinIcon width={28} height={28} />
                </span>
              </div>
              <div className="relative">
                <p className="eyebrow text-gold-soft">{site.name} · {site.tagline}</p>
                {has.address() && <p className="mt-3 font-serif text-2xl sm:text-3xl">{site.contact.address}</p>}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Open in Google Maps <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
