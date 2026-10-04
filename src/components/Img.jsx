/**
 * Image with stable dimensions. When `src` is null it renders a styled,
 * clearly labelled placeholder with the same aspect ratio, so swapping in a
 * real photo later never shifts the layout.
 */
const TONES = {
  forest: ['#1f4a3b', '#10281f', '#be985b'],
  chilli: ['#c4653f', '#7e3420', '#f0d2b0'],
  gold: ['#cfae74', '#8a6a37', '#18392e'],
  charcoal: ['#3a3934', '#191917', '#be985b'],
  ivory: ['#efe5d4', '#d9c7a8', '#b95435'],
}

export function Placeholder({ tone = 'forest', label = 'Photo placeholder', motif = 'bowl', className = '' }) {
  const [a, b, line] = TONES[tone] || TONES.forest
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 90% at 30% 20%, ${a} 0%, ${b} 75%)` }}
      role="presentation"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`dots-${tone}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={line} opacity="0.18" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill={`url(#dots-${tone})`} />
        <g fill="none" stroke={line} strokeWidth="1.4" opacity="0.55">
          {motif === 'bowl' && (
            <>
              <path d="M110 215h180a90 90 0 01-180 0z" />
              <path d="M150 200c10-30 30-30 40 0M195 200c10-38 34-38 44 0M235 202c6-20 22-22 30-2" />
              <path d="M170 150c-8-14 8-22 0-36M200 146c-8-14 8-22 0-36M230 150c-8-14 8-22 0-36" opacity="0.6" />
              <ellipse cx="200" cy="318" rx="70" ry="8" opacity="0.5" />
            </>
          )}
          {motif === 'leaf' && (
            <>
              <path d="M120 290C140 170 230 110 300 110c0 80-60 170-180 180z" />
              <path d="M120 290L260 150M170 240l-6-40M200 210l-4-44M230 180l-2-36M170 240l40 4M200 210l46 2" />
            </>
          )}
          {motif === 'table' && (
            <>
              <circle cx="200" cy="200" r="110" />
              <circle cx="200" cy="200" r="74" opacity="0.6" />
              <circle cx="130" cy="140" r="26" />
              <circle cx="275" cy="160" r="22" />
              <circle cx="250" cy="275" r="28" />
              <circle cx="140" cy="265" r="20" />
            </>
          )}
        </g>
      </svg>
      {label && (
        <span
          className="absolute bottom-3 left-3 rounded-full bg-black/35 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm"
        >
          {label}
        </span>
      )}
    </div>
  )
}

export default function Img({
  image,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '100vw',
  tone,
  motif,
  label,
  aspect = true,
}) {
  const { src, srcSet, alt = '', w = 1200, h = 900 } = image || {}
  const style = aspect ? { aspectRatio: `${w} / ${h}` } : undefined
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {src ? (
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          width={w}
          height={h}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <>
          <Placeholder tone={tone} motif={motif} label={label} className={imgClassName} />
          {alt && <span className="sr-only">Placeholder image: {alt}</span>}
        </>
      )}
    </div>
  )
}
