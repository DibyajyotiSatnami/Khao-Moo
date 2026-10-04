import { site, has, waHref, telHref } from '../config/site.js'
import { formatPrice } from '../lib/menu.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'
import { PhoneIcon, WhatsAppIcon } from './Icons.jsx'

const ShipIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
)
const WalletIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7h14a2 2 0 012 2v9a2 2 0 01-2 2H4zM4 7l11-3v3" />
    <circle cx="16" cy="13.5" r="1.2" />
  </svg>
)

/** "How to order" — all details taken from the official Khao Moo menu card. */
export default function Order() {
  const ref = useReveal()
  if (!has.ordering()) return null
  const o = site.ordering
  const icons = [ShipIcon, WalletIcon]

  return (
    <section ref={ref} id="order" aria-labelledby="order-title" className="relative overflow-hidden bg-ivory-deep py-20 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="order-title"
            eyebrow="How to order"
            title={
              <>
                A call or a <em className="text-chilli">message</em> away
              </>
            }
            intro={o.howTo}
          />
          <div className="reveal mt-8 flex flex-wrap gap-3">
            {has.whatsapp() && (
              <a href={waHref("Hi Khao Moo! I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsAppIcon width={18} height={18} /> WhatsApp us
              </a>
            )}
            {has.phone() && (
              <a href={telHref()} className="btn btn-ghost-dark">
                <PhoneIcon width={18} height={18} /> {site.contact.phone}
              </a>
            )}
          </div>
          <ul className="mt-10 space-y-5">
            {o.notes.map((n, i) => {
              const Icon = icons[i % icons.length]
              return (
                <li key={n} className="reveal flex items-center gap-4" style={{ '--reveal-delay': `${i * 80}ms` }}>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-chilli/30 text-chilli">
                    <Icon />
                  </span>
                  <span className="font-medium text-charcoal">{n}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="reveal lg:col-span-7" style={{ '--reveal-delay': '120ms' }}>
          <div className="relative border border-chilli/25 bg-ivory p-6 sm:p-10">
            <span className="absolute -top-3 left-6 bg-chilli px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ivory sm:left-10">
              Delivery charges
            </span>
            <table className="w-full text-left">
              <caption className="pt-3 pb-6 text-left font-serif text-2xl text-forest">{o.deliveryRegionLabel}</caption>
              <thead>
                <tr className="border-b border-forest/15 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="pb-3 font-semibold">Weight of the order</th>
                  <th scope="col" className="pb-3 text-right font-semibold">Charge</th>
                </tr>
              </thead>
              <tbody>
                {o.deliveryCharges.map((r) => (
                  <tr key={r.weight} className="border-b border-dashed border-forest/15">
                    <td className="py-4 text-charcoal">{r.weight}</td>
                    <td className="py-4 text-right font-serif text-xl text-chilli">{formatPrice(r.charge)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-sm text-muted">{o.outsideNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
