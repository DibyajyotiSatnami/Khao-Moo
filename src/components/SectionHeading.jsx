export default function SectionHeading({ id, eyebrow, title, intro, dark = false, align = 'left', className = '' }) {
  const center = align === 'center'
  return (
    <div className={`reveal max-w-2xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 flex items-center gap-3 ${center ? 'justify-center' : ''} ${dark ? 'text-gold-soft' : 'text-chilli'}`}>
          <span className={`h-px w-8 ${dark ? 'bg-gold-soft/70' : 'bg-chilli/60'}`} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-[2.4rem] leading-[1.02] font-normal tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem] ${dark ? 'text-ivory' : 'text-forest'}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-ivory/75' : 'text-muted'}`}>{intro}</p>}
    </div>
  )
}
