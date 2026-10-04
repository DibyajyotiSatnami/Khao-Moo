import { site } from '../config/site.js'
import { useReveal } from '../hooks/useReveal.js'
import Img from './Img.jsx'
import { InstagramIcon } from './Icons.jsx'

/** Manually curated selection linking to the profile — not a live feed. */
export default function Instagram() {
  const ref = useReveal()
  const { handle, url } = site.social.instagram
  return (
    <section ref={ref} id="instagram" aria-labelledby="ig-title" className="grain relative overflow-hidden py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow reveal mb-4 text-chilli">{handle}</p>
          <h2 id="ig-title" className="reveal text-[2.4rem] leading-[1.02] font-light tracking-[-0.02em] text-forest sm:text-5xl">
            A Taste of <em className="text-chilli">Khao Moo.</em>
          </h2>
          <p className="reveal mt-5 text-muted">New batches, fresh plates and what&rsquo;s coming next — follow along on Instagram.</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="reveal btn btn-primary mt-8">
            <InstagramIcon /> Follow on Instagram
          </a>
          <p className="reveal mt-4 text-xs text-muted">A hand-picked selection of our photos. See the latest on our profile.</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8">
          {site.images.instagram.map((img, i) => (
            <li key={i} className={`reveal ${i % 2 ? 'sm:translate-y-8' : ''}`} style={{ '--reveal-delay': `${i * 90}ms` }}>
              <a
                href={img.postUrl || url}
                target="_blank"
                rel="noopener noreferrer"
                className="group zoom-frame relative block aspect-square overflow-hidden"
                aria-label={`${img.alt} — open on Instagram`}
              >
                <Img image={img} aspect={false} className="h-full w-full" sizes="(min-width: 640px) 20vw, 45vw" />
                <span className="absolute inset-0 grid place-items-center bg-chilli/60 text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                  <InstagramIcon width={28} height={28} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
