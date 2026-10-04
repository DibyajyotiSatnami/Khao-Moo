import { site } from '../config/site.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'
import Img from './Img.jsx'
import { openLightbox } from './Lightbox.jsx'
import { ExpandIcon } from './Icons.jsx'

// Editorial layout: varied spans on a 6-column grid (desktop)
const LAYOUT = [
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3',
  'lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-2',
  'lg:col-span-4',
]

export default function Gallery() {
  const ref = useReveal()
  const images = site.images.gallery
  return (
    <section ref={ref} id="gallery" aria-labelledby="gallery-title" className="on-dark relative overflow-hidden bg-forest py-20 text-ivory sm:py-28">
      <div className="weave pointer-events-none absolute inset-x-0 top-0 h-3 text-gold/20" aria-hidden="true" />
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end">
          <SectionHeading
            id="gallery-title"
            dark
            eyebrow="Gallery"
            title={
              <>
                Made with care, <em className="text-gold-soft">packed with flavour</em>
              </>
            }
          />
          <p className="reveal max-w-sm text-ivory/70">Tap any photo to view it larger. Use the arrow keys to browse.</p>
        </div>

        <ul className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[13.5rem] lg:grid-cols-6">
          {images.map((img, i) => (
            <li
              key={img.src || i}
              className={`reveal ${i === 0 ? 'col-span-2 row-span-2' : i === 5 ? 'col-span-2' : 'row-span-1'} ${LAYOUT[i % LAYOUT.length]}`}
              style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}
            >
              <button
                type="button"
                onClick={() => openLightbox(images, i)}
                className="group relative block h-full w-full overflow-hidden text-left"
                aria-label={`View larger: ${img.alt}`}
              >
                <div className="zoom-frame h-full w-full">
                  <Img image={img} aspect={false} className="h-full w-full" sizes="(min-width: 1024px) 50vw, 50vw" tone={['chilli', 'gold', 'charcoal'][i % 3]} />
                </div>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                {img.caption && (
                  <span className="absolute bottom-3 left-3 font-serif text-base text-ivory italic sm:bottom-4 sm:left-4 sm:text-lg">{img.caption}</span>
                )}
                <span className="absolute top-3 right-3 grid h-9 w-9 scale-90 place-items-center rounded-full bg-ivory/90 text-forest opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                  <ExpandIcon width={16} height={16} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
