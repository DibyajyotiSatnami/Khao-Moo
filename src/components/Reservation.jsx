import { useState } from 'react'
import { site, has, waHref } from '../config/site.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'
import { WhatsAppIcon } from './Icons.jsx'

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

const fmtTime = (t) => {
  const [h, m] = t.split(':').map(Number)
  return new Date(2000, 0, 1, h, m).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
}

/**
 * Optional WhatsApp reservation request form.
 * Rendered only when site.features.reservations is enabled with a verified number.
 */
export default function Reservation() {
  const ref = useReveal()
  const cfg = site.features.reservations
  const [form, setForm] = useState({ name: '', date: '', time: '', guests: '2', message: '' })
  const [errors, setErrors] = useState({})
  if (!has.reservations()) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.date) e.date = 'Please choose a date.'
    else if (form.date < todayISO()) e.date = 'Please choose today or a future date.'
    if (!form.time) e.time = 'Please choose a time.'
    else if (form.date === todayISO()) {
      const [h, m] = form.time.split(':').map(Number)
      const now = new Date()
      if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) e.time = 'Please choose a time later today.'
    }
    const g = Number(form.guests)
    if (!Number.isInteger(g) || g < 1 || g > cfg.maxGuests) e.guests = `Please enter between 1 and ${cfg.maxGuests} guests.`
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`res-${Object.keys(e)[0]}`)?.focus()
      return
    }
    const lines = [
      `Hello ${site.name}! I'd like to request a table.`,
      '',
      `Name: ${form.name.trim()}`,
      `Date: ${fmtDate(form.date)}`,
      `Time: ${fmtTime(form.time)}`,
      `Guests: ${form.guests}`,
      form.message.trim() ? `Note: ${form.message.trim()}` : null,
      '',
      'Please confirm if this is available. Thank you!',
    ].filter((l) => l !== null)
    window.open(waHref(lines.join('\n'), cfg.whatsappNumber), '_blank', 'noopener')
  }

  const field = 'mt-2 w-full border-b border-ivory/30 bg-transparent py-3 text-ivory placeholder:text-ivory/40 focus:border-gold-soft focus:outline-none [color-scheme:dark]'
  const Err = ({ k }) =>
    errors[k] ? (
      <p id={`res-${k}-err`} className="mt-1.5 text-sm text-gold-soft">
        {errors[k]}
      </p>
    ) : null
  const aria = (k) => ({ 'aria-invalid': Boolean(errors[k]) || undefined, 'aria-describedby': errors[k] ? `res-${k}-err` : undefined })

  return (
    <section ref={ref} id="reserve" aria-labelledby="reserve-title" className="on-dark bg-forest py-20 text-ivory sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="reserve-title" dark eyebrow="Reservations" title={<>Save us a <em className="text-gold-soft">seat</em></>} />
          <p className="reveal mt-5 text-ivory/75">
            Send a reservation request on WhatsApp. Your table is confirmed only once we reply to your message.
          </p>
        </div>
        <form noValidate onSubmit={submit} className="reveal grid gap-6 sm:grid-cols-2 lg:col-span-7">
          <div className="sm:col-span-2">
            <label htmlFor="res-name" className="eyebrow text-gold-soft">Name *</label>
            <input id="res-name" type="text" autoComplete="name" required value={form.name} onChange={set('name')} className={field} {...aria('name')} />
            <Err k="name" />
          </div>
          <div>
            <label htmlFor="res-date" className="eyebrow text-gold-soft">Preferred date *</label>
            <input id="res-date" type="date" required min={todayISO()} value={form.date} onChange={set('date')} className={field} {...aria('date')} />
            <Err k="date" />
          </div>
          <div>
            <label htmlFor="res-time" className="eyebrow text-gold-soft">Preferred time *</label>
            <input id="res-time" type="time" required value={form.time} onChange={set('time')} className={field} {...aria('time')} />
            <Err k="time" />
          </div>
          <div>
            <label htmlFor="res-guests" className="eyebrow text-gold-soft">Guests *</label>
            <input id="res-guests" type="number" inputMode="numeric" min="1" max={cfg.maxGuests} required value={form.guests} onChange={set('guests')} className={field} {...aria('guests')} />
            <Err k="guests" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="res-message" className="eyebrow text-gold-soft">Message (optional)</label>
            <textarea id="res-message" rows="3" value={form.message} onChange={set('message')} className={`${field} resize-none`} placeholder="Anything we should know?" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-primary">
              <WhatsAppIcon width={18} height={18} /> Send request on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
