import { getMenu, priceSummary, orderMessage } from '../lib/menu.js'
import { has, waHref } from '../config/site.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'
import DietaryTags from './DietaryTags.jsx'
import Img from './Img.jsx'
import { ArrowRight, WhatsAppIcon } from './Icons.jsx'

const TONES = ['forest', 'chilli', 'gold', 'charcoal', 'ivory', 'forest']

function Dish({ item, index, large, span = '' }) {
  const price = priceSummary(item)
  return (
    <article className={`group reveal flex flex-col ${large ? 'lg:row-span-2' : ''} ${span}`} style={{ '--reveal-delay': `${index * 90}ms` }}>
      <div className={`zoom-frame reveal-img relative bg-forest/10 ${large ? 'aspect-[4/5] lg:aspect-auto lg:min-h-[28rem] lg:flex-1' : span ? 'aspect-[4/5] lg:aspect-[21/9]' : 'aspect-[4/5] lg:aspect-[5/4]'}`}>
        <Img
          image={item.image}
          aspect={false}
          className="h-full w-full"
          sizes={large ? '(min-width: 1024px) 40vw, 80vw' : '(min-width: 1024px) 28vw, 80vw'}
          tone={TONES[index % TONES.length]}
          label={item.sample ? 'Sample' : 'Photo coming soon'}
        />
        <span className="absolute top-4 left-4 font-serif text-sm text-ivory/90 mix-blend-difference">0{index + 1}</span>
        {item.sample && (
          <span className="absolute top-4 right-4 rounded-full bg-gold px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-charcoal">
            Sample
          </span>
        )}
      </div>
      <div className={`flex flex-col border-b border-forest/15 pt-5 pb-6 ${large ? '' : 'flex-1'}`}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`text-forest ${large ? 'text-3xl sm:text-4xl' : 'text-2xl'} leading-tight font-normal`}>{item.name}</h3>
          {price && <p className="shrink-0 font-serif text-lg text-chilli">{price}</p>}
        </div>
        {item.description && <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.description}</p>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <DietaryTags dietary={item.dietary} />
          {has.whatsapp() && !item.sample && (
            <a
              href={waHref(orderMessage(item))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline-offset-4 hover:text-chilli hover:underline"
            >
              <WhatsAppIcon width={17} height={17} />
              {price ? 'Order on WhatsApp' : 'Ask on WhatsApp'}
              <span className="sr-only"> for {item.name}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Featured() {
  const ref = useReveal()
  const menu = getMenu()
  const featured = menu.items.filter((i) => i.featured).slice(0, 6)
  if (!featured.length) return null
  // Keep the editorial grid free of gaps: a lone last item stretches across the empty cells
  const rest = featured.length - 1
  const lastSpan = rest % 2 === 1 ? (rest === 1 ? '' : rest === 3 ? 'lg:col-span-2' : 'lg:col-span-3') : ''

  return (
    <section ref={ref} id="featured" aria-labelledby="featured-title" className="grain relative overflow-hidden py-20 sm:py-28">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="featured-title"
            eyebrow="From our kitchen"
            title={
              <>
                Discover What&rsquo;s <em className="text-chilli">Cooking</em>
              </>
            }
            intro="A few favourites from the Khao Moo menu — pickles, chilli oil and dishes from our kitchen."
          />
          <a href="#menu" className="reveal btn btn-ghost-dark self-start lg:self-auto">
            See the full menu <ArrowRight width={18} height={18} />
          </a>
        </div>
        {menu.mode === 'sample' && (
          <p className="mb-8 rounded-md border border-gold/60 bg-gold/15 px-4 py-3 text-sm text-charcoal">
            <strong>Preview only:</strong> these are sample placeholders, not Khao Moo&rsquo;s real dishes.
          </p>
        )}
      </div>

      {/* Swipe rail on mobile → editorial grid on desktop */}
      <div className="rail container-x flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-x-8 lg:gap-y-10 lg:overflow-visible lg:pb-0">
        {featured.map((item, i) => (
          <div key={item.id} className="w-[80%] shrink-0 sm:w-[46%] lg:contents">
            <Dish item={item} index={i} large={i === 0 && rest >= 3} span={i === featured.length - 1 ? lastSpan : ''} />
          </div>
        ))}
      </div>
      <p className="container-x mt-3 text-xs text-muted lg:hidden" aria-hidden="true">
        Swipe to see more →
      </p>
    </section>
  )
}
