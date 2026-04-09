import { useState } from 'react'

function LotusIcon() {
  return (
    <svg aria-hidden="true" className="w-12 h-12 mx-auto mb-4 text-marigold" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <ellipse cx="24" cy="24" rx="6" ry="18" />
      <ellipse cx="24" cy="24" rx="6" ry="18" transform="rotate(30 24 24)" />
      <ellipse cx="24" cy="24" rx="6" ry="18" transform="rotate(-30 24 24)" />
      <ellipse cx="24" cy="24" rx="6" ry="18" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="6" ry="18" transform="rotate(-60 24 24)" />
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function Spinner() {
  return (
    <span
      className="inline-block w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin"
      aria-label="Loading"
    />
  )
}

export default function RSVPForm() {
  const [form, setForm] = useState({ name: '', email: '', guests: '1' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!form.email.trim()) {
      errs.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('submitting')

    try {
      const url = import.meta.env.VITE_APPS_SCRIPT_URL
      if (!url) throw new Error('RSVP endpoint not configured.')

      // Apps Script doesn't support CORS preflight, so we post without
      // Content-Type header (keeps it a "simple request") and accept an
      // opaque response (no-cors). We show success optimistically.
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          guests: Number(form.guests),
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const inputBase =
    'w-full bg-transparent border-b-2 border-terracotta/40 focus:border-terracotta outline-none py-2 font-sans text-warmBrown placeholder-warmBrown/40 transition-colors duration-200 text-base'

  const labelBase = 'block font-sans text-xs tracking-widest uppercase text-warmBrown/60 mb-1'

  if (status === 'success') {
    return (
      <section id="rsvp" className="py-24 px-6 bg-cream-light">
        <div className="max-w-md mx-auto text-center">
          <LotusIcon />
          <h2 className="font-serif text-3xl text-warmBrown mb-3">Thank You!</h2>
          <p className="font-serif italic text-warmBrown/70 text-lg leading-relaxed">
            Your RSVP has been received. We are delighted you will be joining us
            to celebrate this joyful occasion.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-marigold opacity-50" />
            <span className="text-marigold">✦</span>
            <div className="h-px w-12 bg-marigold opacity-50" />
          </div>
          <p className="font-sans font-light text-warmBrown/50 text-sm mt-4">
            With love, Snigdha &amp; Pramod
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-cream-light">
      <div className="max-w-lg mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-script text-terracotta text-2xl mb-2">Kindly Reply</p>
          <h2 className="font-serif text-4xl md:text-5xl text-warmBrown mb-4">RSVP</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-marigold opacity-50" />
            <span className="text-marigold text-xl">✦</span>
            <div className="h-px w-16 bg-marigold opacity-50" />
          </div>
          <p className="font-serif italic text-warmBrown/60 mt-4 text-lg">
            Please let us know you are coming — we can't wait to celebrate with you!
          </p>
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div role="alert" className="mb-6 p-4 bg-terracotta/10 border border-terracotta/30 rounded text-center">
            <p className="font-sans text-sm text-terracotta-dark">
              Something went wrong submitting your RSVP. Please try again or contact us directly.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 font-sans text-xs underline text-terracotta hover:text-terracotta-dark"
            >
              Try again
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-8">
            <label htmlFor="name" className={labelBase}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className={inputBase}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1 font-sans text-xs text-terracotta">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-8">
            <label htmlFor="email" className={labelBase}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className={inputBase}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 font-sans text-xs text-terracotta">
                {errors.email}
              </p>
            )}
          </div>

          {/* Number of Guests */}
          <div className="mb-10">
            <label htmlFor="guests" className={labelBase}>
              Number of Guests
            </label>
            <select
              id="guests"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className={`${inputBase} cursor-pointer`}
              aria-required="true"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
              className="inline-flex items-center gap-3 bg-terracotta hover:bg-terracotta-dark disabled:opacity-70 disabled:cursor-not-allowed text-cream font-serif tracking-widest text-sm uppercase px-12 py-4 rounded-full transition-all duration-300"
            >
              {status === 'submitting' ? (
                <>
                  <Spinner />
                  <span>Sending…</span>
                </>
              ) : (
                'Confirm Attendance'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
