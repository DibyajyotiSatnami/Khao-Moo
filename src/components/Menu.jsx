import { useMemo, useState } from 'react'
import { site, has, waHref } from '../config/site.js'
import { getMenu, formatPrice, orderMessage } from '../lib/menu.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'
import DietaryTags from './DietaryTags.jsx'
import Img from './Img.jsx'
import { openLightbox } from './Lightbox.jsx'
import { SearchIcon, DownloadIcon, WhatsAppIcon, CloseIcon, InstagramIcon } from './Icons.jsx'

function Prices({ item }) {
  if (item.prices?.length) {
    return (
      <dl className="flex flex-wrap gap-x-5 gap-y-1">
        {item.prices.map((v) => (
          <div key={v.label} className="flex items-baseline gap-1.5">
            <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">{v.label}</dt>
            <dd className="font-serif text-lg text-chilli">{formatPrice(v.price)}</dd>
          </div>
        ))}
      </dl>
    )
  }
  const p = formatPrice(item.price)
  if (p) {
    return (
      <p className="flex items-baseline gap-1.5">
        {item.size && <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">{item.size}</span>}
        <span className="font-serif text-lg text-chilli">{p}</span>
      </p>
    )
  }
  return <p className="text-sm text-muted italic">Price on request</p>
}

function MenuItem({ item }) {
  return (
    <li className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-b border-dashed border-forest/20 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-x-6">
      {item.image ? (
        <div className="zoom-frame row-span-3 hidden h-24 w-24 overflow-hidden rounded-full sm:block">
          <Img image={item.image} aspect={false} className="h-full w-full" sizes="96px" />
        </div>
      ) : (
        <span className="row-span-3 hidden h-24 w-24 sm:block" aria-hidden="true" />
      )}
      <h4 className="font-serif text-[1.45rem] leading-tight text-forest">
        {item.name}
        {item.sample && (
          <span className="ml-2 inline-block rounded-full bg-gold px-2 py-0.5 align-middle font-sans text-[0.6rem] font-bold uppercase tracking-[0.16em] text-charcoal">
            Sample
          </span>
        )}
      </h4>
      <div className="row-span-2 self-start text-right">
        {has.whatsapp() && !item.sample && (
          <a
            href={waHref(orderMessage(item))}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
            aria-label={`Order ${item.name} on WhatsApp`}
            title="Order on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
        )}
      </div>
      <div className="space-y-3">
        {item.description && <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted">{item.description}</p>}
        {item.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <li key={t} className="rounded-full border border-gold/60 px-2.5 py-0.5 text-[0.7rem] font-semibold text-charcoal/80">
                {t}
              </li>
            ))}
          </ul>
        )}
        <Prices item={item} />
        <DietaryTags dietary={item.dietary} />
      </div>
    </li>
  )
}

export default function Menu() {
  const ref = useReveal()
  const menu = getMenu()
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menu.items.filter((i) => (cat === 'all' || i.category === cat) && (!q || i.name.toLowerCase().includes(q)))
  }, [menu.items, cat, query])

  const grouped = menu.categories
    .map((c) => ({ ...c, items: results.filter((i) => i.category === c.id) }))
    .filter((c) => c.items.length)

  const reset = () => {
    setQuery('')
    setCat('all')
  }

  return (
    <section ref={ref} id="menu" aria-labelledby="menu-title" className="grain relative py-20 sm:py-28">
      <div className="container-x">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="menu-title"
                eyebrow="The Menu"
                title={
                  <>
                    Pickles, oil <em className="text-chilli">&amp;</em> plates
                  </>
                }
                intro="Browse by category or search for a dish. Order any item with a quick WhatsApp message."
              />
              {menu.mode === 'production' && (
                <div className="reveal mt-8 hidden lg:block">
                  <button
                    type="button"
                    onClick={() => openLightbox([site.images.menuCard])}
                    className="group block w-full max-w-[18rem] text-left"
                  >
                    <div className="zoom-frame overflow-hidden border border-forest/15 shadow-[0_20px_40px_-25px_rgba(24,57,46,0.6)]">
                      <Img image={site.images.menuCard} className="w-full" sizes="288px" />
                    </div>
                    <span className="mt-3 block text-sm font-semibold text-forest group-hover:text-chilli">View the menu card →</span>
                  </button>
                </div>
              )}
              {menu.mode === 'production' && (
                <button type="button" onClick={() => openLightbox([site.images.menuCard])} className="reveal mt-6 mr-4 text-sm font-semibold text-forest underline underline-offset-4 hover:text-chilli lg:hidden">
                  View the menu card
                </button>
              )}
              {has.menuFile() && (
                <a href={site.features.menuFile.href} download className="reveal btn btn-forest mt-6">
                  <DownloadIcon width={18} height={18} /> {site.features.menuFile.label}
                  <span className="text-ivory/60">({site.features.menuFile.format})</span>
                </a>
              )}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            {menu.mode === 'empty' ? (
              <div className="border border-forest/15 bg-ivory p-10 text-center">
                <p className="font-serif text-2xl text-forest">Our menu is being updated.</p>
                <p className="mt-2 text-muted">See what&rsquo;s cooking on Instagram in the meantime.</p>
                <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
                  <InstagramIcon /> {site.social.instagram.handle}
                </a>
              </div>
            ) : (
              <>
                {menu.mode === 'sample' && (
                  <p className="mb-6 rounded-md border border-gold/60 bg-gold/15 px-4 py-3 text-sm">
                    <strong>Sample menu — preview only.</strong> Not Khao Moo&rsquo;s real dishes or prices.
                  </p>
                )}

                {/* Controls */}
                <div className="sticky top-[4.6rem] z-20 -mx-5 bg-ivory/95 px-5 py-4 backdrop-blur-md sm:mx-0 sm:px-0 lg:top-24">
                  <label htmlFor="menu-search" className="sr-only">
                    Search dishes by name
                  </label>
                  <div className="relative">
                    <SearchIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
                    <input
                      id="menu-search"
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search the menu…"
                      autoComplete="off"
                      className="w-full rounded-full border border-forest/20 bg-white/70 py-3.5 pr-12 pl-12 text-[0.95rem] placeholder:text-muted/70 focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-chilli"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        aria-label="Clear search"
                        className="absolute top-1/2 right-3 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-forest/5 hover:text-forest"
                      >
                        <CloseIcon width={16} height={16} />
                      </button>
                    )}
                  </div>
                  <div className="rail -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
                    {[{ id: 'all', label: 'All' }, ...menu.categories].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={cat === c.id}
                        onClick={() => setCat(c.id)}
                        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                          cat === c.id ? 'border-forest bg-forest text-ivory' : 'border-forest/20 text-forest hover:border-forest'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="sr-only" role="status" aria-live="polite">
                  {results.length} {results.length === 1 ? 'item' : 'items'} shown
                </p>

                {grouped.length === 0 ? (
                  <div className="mt-8 border border-dashed border-forest/25 px-6 py-14 text-center">
                    <p className="font-serif text-2xl text-forest">No dishes match &ldquo;{query}&rdquo;.</p>
                    <p className="mt-2 text-muted">Try a shorter word, check the spelling, or browse all categories.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button type="button" onClick={reset} className="btn btn-forest">
                        Show the full menu
                      </button>
                      {has.whatsapp() && (
                        <a href={waHref(`Hi Khao Moo! Do you have ${query}?`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
                          <WhatsAppIcon width={18} height={18} /> Ask us on WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  grouped.map((c) => (
                    <div key={c.id} className="mt-10 first-of-type:mt-6">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-3xl font-normal text-forest italic">{c.label}</h3>
                        <span className="h-px flex-1 bg-forest/20" aria-hidden="true" />
                        {c.note && <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{c.note}</span>}
                      </div>
                      <ul>{c.items.map((i) => <MenuItem key={i.id} item={i} />)}</ul>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
