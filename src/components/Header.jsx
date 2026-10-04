import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site.js'
import Wordmark from './Wordmark.jsx'
import { CloseIcon, MenuIcon, ArrowRight, InstagramIcon } from './Icons.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav item for the section currently in view
  useEffect(() => {
    const sections = site.nav.map((n) => document.querySelector(n.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Mobile menu: lock scroll, Esc to close, keep focus inside
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () => panelRef.current?.querySelectorAll('a,button')
    focusables()?.[0]?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = [toggleRef.current, ...(focusables() || [])]
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open
  const close = () => setOpen(false)

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
        solid ? 'bg-ivory/95 py-3 shadow-[0_1px_0_rgba(24,57,46,0.1)] backdrop-blur-md' : 'on-dark bg-transparent py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href="#home" onClick={close} aria-label={`${site.name} — home`} className="relative z-10 shrink-0">
          <Wordmark light={!solid} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  aria-current={active === n.href ? 'true' : undefined}
                  className={`relative py-2 text-[0.82rem] font-semibold tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current]:after:scale-x-100 ${
                    solid ? 'text-charcoal hover:text-chilli after:bg-chilli' : 'text-ivory/90 hover:text-ivory after:bg-gold-soft'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#menu" className="btn btn-primary hidden !py-3 whitespace-nowrap md:inline-flex">
            Explore Menu
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`relative z-10 grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
              solid ? 'text-forest hover:bg-forest/5' : 'text-ivory hover:bg-white/10'
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu panel — outside <header> so its backdrop-filter doesn't trap position:fixed */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-0 z-[45] bg-ivory transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="grain flex h-full flex-col px-6 pt-28 pb-10">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {site.nav.map((n, i) => (
                <li
                  key={n.href}
                  className="transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]"
                  style={{
                    transitionDelay: open ? `${80 + i * 50}ms` : '0ms',
                    opacity: open ? 1 : 0,
                    transform: open ? 'none' : 'translateY(14px)',
                  }}
                >
                  <a
                    href={n.href}
                    onClick={close}
                    className="flex items-baseline justify-between border-b border-forest/10 py-4 font-serif text-[2.1rem] text-forest"
                  >
                    {n.label}
                    <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-4">
            <a href="#menu" onClick={close} className="btn btn-primary w-full">
              Explore Menu <ArrowRight width={18} height={18} />
            </a>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-forest"
            >
              <InstagramIcon /> {site.social.instagram.handle}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
