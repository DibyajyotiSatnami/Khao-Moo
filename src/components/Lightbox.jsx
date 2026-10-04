import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CloseIcon } from './Icons.jsx'

/** Opens a lightbox from anywhere in the app. */
export const openLightbox = (images, index = 0) =>
  document.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images, index } }))

/**
 * Accessible lightbox: modal dialog, focus trapped, Esc closes,
 * ←/→ navigate, focus returns to the trigger on close, swipe on touch.
 */
export default function Lightbox() {
  const [state, setState] = useState(null) // { images, index }
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const returnFocus = useRef(null)
  const touchX = useRef(null)

  useEffect(() => {
    const onOpen = (e) => {
      returnFocus.current = document.activeElement
      setState({ images: e.detail.images, index: e.detail.index || 0 })
    }
    document.addEventListener('open-lightbox', onOpen)
    return () => document.removeEventListener('open-lightbox', onOpen)
  }, [])

  const close = useCallback(() => {
    setState(null)
    requestAnimationFrame(() => returnFocus.current?.focus?.())
  }, [])

  const go = useCallback(
    (d) => setState((s) => s && { ...s, index: (s.index + d + s.images.length) % s.images.length }),
    [],
  )

  useEffect(() => {
    if (!state) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const f = [...dialogRef.current.querySelectorAll('button')]
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
  }, [state, close, go])

  if (!state) return null
  const { images, index } = state
  const img = images[index]
  const multi = images.length > 1

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="lightbox on-dark fixed inset-0 z-[60] flex flex-col bg-charcoal/95 text-ivory backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null || !multi) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm text-ivory/70" aria-live="polite">
          {multi && `${index + 1} / ${images.length}`}
        </p>
        <button ref={closeRef} type="button" onClick={close} aria-label="Close image viewer" className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10">
          <CloseIcon width={24} height={24} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
        <figure key={index} className="lightbox-figure flex max-h-full flex-col items-center">
          <img src={img.src} srcSet={img.srcSet} sizes="90vw" alt={img.alt} className="max-h-[calc(100svh-9rem)] w-auto max-w-full object-contain" />
          {(img.caption || img.alt) && <figcaption className="mt-3 text-center text-sm text-ivory/80">{img.caption || img.alt}</figcaption>}
        </figure>
        {multi && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 grid h-12 w-12 place-items-center rounded-full bg-black/30 hover:bg-white/15 sm:left-5">
              <ArrowLeft />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 grid h-12 w-12 place-items-center rounded-full bg-black/30 hover:bg-white/15 sm:right-5">
              <ArrowRight />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
