import { site, has } from '../config/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { StarIcon, ArrowRight } from './Icons.jsx'

/**
 * Shows authentic reviews from config only. With none configured it falls
 * back to a simple "Find Us on Google Maps" link — nothing is fabricated.
 */
export default function Reviews() {
  const ref = useReveal()

  if (!has.reviews()) {
    return (
      <section ref={ref} aria-labelledby="find-us-title" className="on-dark bg-chilli text-ivory">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div className="reveal">
            <h2 id="find-us-title" className="text-3xl font-light sm:text-4xl">
              Find Us on <em>Google Maps</em>
            </h2>
            <p className="mt-2 text-ivory/80">See our listing, photos and what people are saying.</p>
          </div>
          <a href={site.maps.url} target="_blank" rel="noopener noreferrer" className="reveal btn bg-ivory text-chilli hover:bg-white">
            Open Google Maps <ArrowRight width={18} height={18} />
          </a>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} aria-labelledby="reviews-title" className="on-dark bg-forest py-20 text-ivory sm:py-28">
      <div className="container-x">
        <h2 id="reviews-title" className="reveal text-4xl font-light sm:text-5xl">
          Kind <em className="text-gold-soft">words</em>
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {site.features.reviews.map((r, i) => (
            <li key={i} className="reveal border-t border-ivory/20 pt-6" style={{ '--reveal-delay': `${i * 90}ms` }}>
              {r.rating && (
                <p className="mb-3 flex gap-1 text-gold-soft" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }, (_, k) => (
                    <StarIcon key={k} width={16} height={16} fill="currentColor" />
                  ))}
                </p>
              )}
              <blockquote className="font-serif text-xl leading-snug">&ldquo;{r.quote}&rdquo;</blockquote>
              <p className="mt-4 text-sm text-ivory/70">
                — {r.author}
                {r.source && (
                  <>
                    {' '}via{' '}
                    {r.sourceUrl ? (
                      <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        {r.source}
                      </a>
                    ) : (
                      r.source
                    )}
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
