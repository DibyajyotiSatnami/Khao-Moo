import { site, has, telHref, waHref } from '../config/site.js'
import Seal from './Seal.jsx'
import { InstagramIcon, WhatsAppIcon } from './Icons.jsx'

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-charcoal pt-16 pb-28 text-ivory/80 md:pb-12">
      <div className="weave pointer-events-none absolute inset-x-0 top-0 h-2 text-chilli/50" aria-hidden="true" />
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <Seal size={72} title={`${site.name} — ${site.tagline}`} />
            <div>
              <p className="font-serif text-3xl text-ivory">
                Khao <em className="text-gold-soft">Moo</em>
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ivory/60">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm font-serif text-xl text-ivory/90 italic">Ethnic pickles, made just for you.</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow mb-4 text-gold-soft">Explore</h2>
          <ul className="space-y-2">
            {site.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-ivory">
                  {n.label}
                </a>
              </li>
            ))}
            {has.ordering() && (
              <li>
                <a href="#order" className="hover:text-ivory">
                  How to Order
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <h2 className="eyebrow mb-4 text-gold-soft">Get in touch</h2>
          <ul className="space-y-2">
            {has.address() && <li>{site.contact.address}</li>}
            {has.phone() && (
              <li>
                <a href={telHref()} className="hover:text-ivory">
                  {site.contact.phone}
                </a>
              </li>
            )}
            <li className="flex gap-3 pt-2">
              <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.social.instagram.handle}`} className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 hover:border-ivory hover:text-ivory">
                <InstagramIcon />
              </a>
              {has.whatsapp() && (
                <a href={waHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 hover:border-ivory hover:text-ivory">
                  <WhatsAppIcon />
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-14 flex flex-col justify-between gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name} — {site.tagline}. All rights reserved.</p>
        <p>Estd. {site.established} · Sivasagar, Assam</p>
      </div>
    </footer>
  )
}
