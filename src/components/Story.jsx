import { site } from '../config/site.js'
import { useReveal } from '../hooks/useReveal.js'
import Img from './Img.jsx'
import Seal from './Seal.jsx'

export default function Story() {
  const ref = useReveal()
  const { heading, paragraphs, values } = site.story
  return (
    <section ref={ref} id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-ivory-deep py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Image column */}
        <div className="relative lg:col-span-6">
          <div className="reveal-img relative ml-0 aspect-[4/5] w-[88%] overflow-hidden rounded-t-[999px] sm:w-[78%] lg:w-[86%]">
            <Img image={site.images.story} aspect={false} className="h-full w-full" sizes="(min-width: 1024px) 40vw, 85vw" tone="charcoal" />
          </div>
          <div className="reveal absolute right-0 bottom-[-1.5rem] w-[46%] max-w-[15rem] border-[6px] border-ivory-deep sm:bottom-[-2rem]" style={{ '--reveal-delay': '200ms' }}>
            <Img image={site.images.gallery[0]} className="w-full" sizes="240px" />
          </div>
          <div className="float absolute top-6 -left-2 hidden sm:block" aria-hidden="true">
            <Seal size={84} title="" />
          </div>
        </div>

        {/* Text column */}
        <div className="lg:col-span-6 lg:pl-4">
          <p className="eyebrow reveal mb-4 flex items-center gap-3 text-chilli">
            <span className="h-px w-8 bg-chilli/60" aria-hidden="true" />
            Our Story
          </p>
          <h2 id="story-title" className="reveal text-[2.6rem] leading-[1] font-light tracking-[-0.025em] text-forest sm:text-6xl">
            {heading.replace(/\.$/, '')}
            <span className="text-chilli">.</span>
          </h2>
          <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-charcoal/85">
            {paragraphs.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? 'font-serif text-xl leading-snug text-forest sm:text-2xl' : ''}`} style={{ '--reveal-delay': `${80 * (i + 1)}ms` }}>
                {p}
              </p>
            ))}
          </div>
          {values?.length > 0 && (
            <ul className="reveal mt-10 grid grid-cols-3 border-y border-forest/15" style={{ '--reveal-delay': '300ms' }}>
              {values.map((v, i) => (
                <li key={v} className={`py-5 text-center ${i > 0 ? 'border-l border-forest/15' : ''}`}>
                  <span className="block font-serif text-2xl text-forest italic sm:text-3xl">{v}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
