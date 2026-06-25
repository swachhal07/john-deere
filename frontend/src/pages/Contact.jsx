import { useState } from 'react'

/* ────────────────────────────────────────────────────────────
   CONTACT — Swiss/industrial editorial.
   Heavy uppercase display + Fraunces serif-italic accents,
   John Deere green on white, yellow on the black slab,
   underline-only inputs, numbered network grid. Sharp corners.
   ──────────────────────────────────────────────────────────── */

const interests = [
  '5-Series Tractors',
  'Other Tractors',
  'Harvesters',
  'Implements',
  'Genuine parts',
  'Service & maintenance',
  'Financing',
  'Operator training',
  'Something else',
]

// MV Dugar service & parts network across Nepal.
const offices = [
  { city: 'Kathmandu',  activeFor: 'Sales · Service · Parts', phone: '9800018809' },
  { city: 'Biratnagar', activeFor: 'Service & Parts',         phone: '9801558692' },
  { city: 'Jeetpur',    activeFor: 'Service & Parts',         phone: '9802919537' },
  { city: 'Bardibaas',  activeFor: 'Service',                 phone: '9801558692' },
  { city: 'Nepalgunj',  activeFor: 'Service & Parts',         phone: '9802573217' },
  { city: 'Dhangadi',   activeFor: 'Service',                 phone: '9802573217' },
  { city: 'Surkhet',    activeFor: 'Service',                 phone: '9802573217' },
  { city: 'Dang',       activeFor: 'Service',                 phone: '9802573217' },
  { city: 'Pokhara',    activeFor: 'Service & Parts',         phone: '9802773245' },
  { city: 'Butwal',     activeFor: 'Service',                 phone: '9802773245' },
]

const inputClass =
  'block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-black placeholder:text-gray-400 shadow-sm transition focus:border-jd-green focus:outline-none'

function Field({ label, required, children, span = 1 }) {
  return (
    <label className={span === 2 ? 'block md:col-span-2' : 'block'}>
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.28em] text-gray-500">
        {label}
        {required && <span className="ml-1 text-jd-green">*</span>}
      </span>
      {children}
    </label>
  )
}

function SuccessState({ onReset }) {
  return (
    <div className="flex flex-col items-start py-10">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center bg-jd-green">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-white stroke-[3]" aria-hidden>
          <path d="M5 12l5 5L20 7" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
      </div>
      <h3 className="font-display text-3xl font-extrabold uppercase leading-[1] tracking-tight text-black md:text-4xl">
        Message received.
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600">
        Our team in Kathmandu will be in touch within one working day. For
        anything urgent — a machine down in the field, a part you need this
        season — call us directly on the number on the right.
      </p>
      <button
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 border-b-2 border-jd-green pb-1 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:text-jd-green"
      >
        Send another
        <span aria-hidden>→</span>
      </button>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    interest: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')

  const update = (key) => (e) => {
    const v = key === 'phone' ? e.target.value.replace(/[^0-9+\s-]/g, '') : e.target.value
    setForm((f) => ({ ...f, [key]: v }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Front-end only: simulate dispatch, then show confirmation.
    setTimeout(() => setStatus('sent'), 600)
  }

  const reset = () => {
    setStatus('idle')
    setForm({ name: '', company: '', phone: '', email: '', interest: '', message: '' })
  }

  return (
    <main className="bg-white">
      <PageStyles />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f4f6f0] pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="text-center" style={{ animation: 'fade-up 0.7s ease-out both' }}>
            <div className="mb-6 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.32em] text-jd-green md:text-base">
              <span className="h-px w-12 bg-jd-green" />
              Contact us
              <span className="h-px w-12 bg-jd-green" />
            </div>
            <h1 className="font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#16210f] sm:text-6xl md:text-7xl lg:text-[112px]">
              Let&rsquo;s put a Deere
              <br />
              on{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                your land
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 16"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 11 C 70 4, 150 4, 298 9"
                    stroke="#ffde00"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-[#16210f]">.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ─── Form + Info panel ─────────────────────────────────── */}
      <section className="bg-white pb-24">
        <div className="mx-auto -mt-20 max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12">

            {/* ── Form card ─────────────────────────────────────── */}
            <div
              className="relative overflow-hidden rounded-2xl bg-white p-8 md:p-12 lg:p-14"
              style={{
                boxShadow: '0 40px 90px -50px rgba(22,51,26,0.35)',
                animation: 'fade-up 0.7s ease-out 0.3s both',
              }}
            >
              {/* Vertical green rule */}
              <span className="absolute left-0 top-0 h-full w-1.5 bg-jd-green" />
              {/* Tiny editorial stamp */}
              <span className="absolute right-6 top-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                Form&nbsp;·&nbsp;001
              </span>

              {status === 'sent' ? (
                <SuccessState onReset={reset} />
              ) : (
                <>
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-jd-green">
                    Send us a note
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.02] tracking-tight text-[#16210f] md:text-[2.6rem]">
                    Tell us about{' '}
                    <span className="relative whitespace-nowrap text-jd-green">
                      your land
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full"
                        viewBox="0 0 300 16"
                        fill="none"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d="M2 11 C 70 4, 150 4, 298 9"
                          stroke="#ffde00"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    .
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600">
                    Spec a machine for your ground, order genuine parts, or book a
                    service visit. We&rsquo;ll be in touch within one working day.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-9">
                    {/* Interest chips (replaces dropdown) */}
                    <fieldset className="mb-8">
                      <legend className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gray-500">
                        What can we help with
                        <span className="ml-1 text-jd-green">*</span>
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((opt) => {
                          const active = form.interest === opt
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, interest: opt }))}
                              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                                active
                                  ? 'border-jd-green bg-jd-green text-white shadow-sm'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-jd-green hover:text-jd-green'
                              }`}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                      {/* keep a required field for validation */}
                      <input
                        type="text"
                        required
                        value={form.interest}
                        onChange={() => {}}
                        tabIndex={-1}
                        aria-hidden
                        className="sr-only"
                      />
                    </fieldset>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8">
                      <Field label="Your name" required>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={update('name')}
                          placeholder="Swachhal Lamsal"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Farm / Company">
                        <input
                          type="text"
                          value={form.company}
                          onChange={update('company')}
                          placeholder="Chitwan Agro Farm"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Phone" required>
                        <input
                          type="tel"
                          required
                          inputMode="tel"
                          pattern="[0-9+\s-]{7,15}"
                          title="Digits only — at least 7 numbers"
                          value={form.phone}
                          onChange={update('phone')}
                          placeholder="+977 98•••••••"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Email" required>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={update('email')}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Your message" required span={2}>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={update('message')}
                          maxLength={600}
                          placeholder="Your district, the machine you're interested in, acreage, timeline — anything we should know…"
                          className={`${inputClass} resize-none`}
                        />
                        <span className="mt-1 block text-right text-[11px] tabular-nums text-gray-400">
                          {form.message.length}/600
                        </span>
                      </Field>
                    </div>

                    <div className="mt-8 md:flex md:items-center md:justify-between md:gap-8">
                      <p className="text-xs leading-relaxed text-gray-500 md:max-w-sm">
                        By sending this you agree we may contact you about your
                        enquiry. We never share details with third parties.
                      </p>
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-jd-green bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-jd-green transition hover:bg-jd-green hover:text-white disabled:cursor-not-allowed disabled:opacity-60 md:mt-0 md:w-auto"
                      >
                        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-jd-yellow text-[#16210f] transition-transform group-hover:translate-x-1">
                          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
                            <path d="M0 11h20l-6-6 1.4-1.4L24 12l-8.6 8.4L14 19l6-6H0z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* ── Info slab — deep John Deere green ────────────── */}
            <aside
              className="relative self-start overflow-hidden rounded-2xl bg-[#0e2010] p-8 text-white md:p-10 lg:sticky lg:top-28"
              style={{ animation: 'fade-up 0.7s ease-out 0.4s both' }}
            >
              {/* Topographic watermark */}
              <svg
                aria-hidden
                viewBox="0 0 400 600"
                preserveAspectRatio="xMidYMid slice"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <path
                    key={i}
                    d="M-60,300 C 60,200 160,420 260,310 S 460,180 540,300"
                    transform={`translate(0 ${i * 48 - 120})`}
                    stroke={i % 3 === 0 ? '#ffde00' : '#4ca832'}
                    strokeWidth={i % 3 === 0 ? 1.2 : 0.8}
                    fill="none"
                  />
                ))}
              </svg>

              <div className="relative">
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-jd-yellow">
                  <span className="h-px w-8 bg-jd-yellow" />
                  Reach us directly
                </p>
                <h3 className="mt-4 font-display text-3xl font-extrabold leading-[1.02] tracking-tight text-white md:text-[2.4rem]">
                  Faster?<br />
                  Pick up the{' '}
                  <span className="relative whitespace-nowrap text-jd-yellow">
                    phone
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full"
                      viewBox="0 0 240 16"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M2 11 C 60 4, 130 4, 238 9"
                        stroke="#4ca832"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  .
                </h3>

                {/* Primary call CTA */}
                <a
                  href="tel:+9779801571065"
                  className="group mt-8 flex items-center justify-between gap-4 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.08] hover:ring-jd-yellow/50"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-jd-yellow">
                      Toll Free · 24/7 sales
                    </p>
                    <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white">
                      +977 9801 571 065
                    </p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jd-yellow text-[#16210f] transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M6.6 10.8a15.3 15.3 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.6 1 1 0 01-.25 1l-2.2 2.2z" />
                    </svg>
                  </span>
                </a>

                {/* Other channels */}
                <ul className="mt-6 space-y-px overflow-hidden rounded-xl ring-1 ring-white/10">
                  <li className="bg-white/[0.025]">
                    <a
                      href="tel:+9779801007228"
                      className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-white/[0.06]"
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                          Sales
                        </p>
                        <p className="mt-0.5 text-base font-semibold text-white">
                          +977 9801007228
                        </p>
                      </div>
                      <Icon kind="phone" />
                    </a>
                  </li>
                  <li className="bg-white/[0.025]">
                    <a
                      href="mailto:info@johndeere.com.np"
                      className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-white/[0.06]"
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                          Email
                        </p>
                        <p className="mt-0.5 break-all text-base font-medium text-white">
                          info@johndeere.com.np
                        </p>
                      </div>
                      <Icon kind="mail" />
                    </a>
                  </li>
                  <li className="bg-white/[0.025]">
                    <a
                      href="https://maps.google.com/?q=Balaju,Kathmandu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-white/[0.06]"
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                          Headquarters
                        </p>
                        <p className="mt-0.5 text-base font-medium leading-snug text-white">
                          MV Dugar Building<br />
                          Balaju, Kathmandu
                        </p>
                      </div>
                      <Icon kind="pin" />
                    </a>
                  </li>
                </ul>

                {/* Hours */}
                <div className="mt-7 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                    Hours
                  </p>
                  <ul className="mt-3 space-y-2 text-sm tabular-nums">
                    <li className="flex items-baseline justify-between">
                      <span className="text-white">Sun — Fri</span>
                      <span className="font-bold text-jd-yellow">09:30 — 18:30</span>
                    </li>
                    <li className="flex items-baseline justify-between">
                      <span className="text-gray-500">Saturday</span>
                      <span className="text-gray-500">Closed</span>
                    </li>
                  </ul>
                </div>

                {/* Live indicator */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-jd-yellow"
                      style={{ animation: 'status-pulse 2s ease-out infinite' }}
                    />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-jd-yellow" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white">
                    Sales desk online now
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Showroom map ──────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-jd-green md:text-base">
                <span className="h-px w-10 bg-jd-green" />
                Find us
              </div>
              <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-black md:text-5xl">
                Our showroom.{' '}
                <span className="text-jd-green">In Kathmandu.</span>
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-600 sm:text-right">
              On the ring road in Balaju, north Kathmandu. Walk-ins welcome
              during business hours — or call ahead to schedule a meeting with
              our sales team.
            </p>
          </div>

          <div className="relative overflow-hidden border border-gray-200">
            <span className="pointer-events-none absolute left-0 top-0 z-10 h-1 w-32 bg-jd-green" />
            <iframe
              title="MV Dugar — John Deere showroom, Balaju, Kathmandu"
              src="https://maps.google.com/maps?q=27.7300363,85.3020595&hl=en&z=17&output=embed"
              width="100%"
              height="520"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: 'block' }}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=27.7300363,85.3020595"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-gray-800 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.28em] text-gray-900 transition-colors hover:border-jd-green hover:bg-jd-green hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5.5 7-5 9-2-4-4-2 11-3z" />
              </svg>
              Get directions on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ─── Service network ───────────────────────────────────── */}
      <section className="border-t border-gray-200 bg-[#f4f6f0] py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-jd-green md:text-base">
                <span className="h-px w-10 bg-jd-green" />
                Our network
              </div>
              <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-black md:text-5xl">
                On the ground.
                <br />
                <span className="font-['Fraunces'] font-medium italic normal-case tracking-normal text-jd-green">
                  Across Nepal.
                </span>
              </h3>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-gray-700 lg:justify-self-end lg:text-right">
              Service centres and field-deployable technicians in every major
              region. A machine in your field is never more than a day&rsquo;s
              reach from genuine parts and help — wherever you&rsquo;re working.
            </p>
          </div>

          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-gray-300 pb-4">
            <h4 className="font-display text-2xl font-extrabold uppercase tracking-tight text-black md:text-3xl">
              Sales · Service · Parts
            </h4>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-gray-500">
              {offices.length} locations
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden border border-gray-300 bg-gray-300 md:grid-cols-3 lg:grid-cols-5">
            {offices.map((o, i) => (
              <div
                key={o.city}
                className="group relative flex flex-col bg-[#f4f6f0] p-6 transition-colors hover:bg-white"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-jd-green">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400 transition-colors group-hover:text-jd-green">
                    NP
                  </span>
                </div>
                <p className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-black">
                  {o.city}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                  {o.activeFor}
                </p>
                <div className="mt-auto pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                    Contact
                  </p>
                  <a
                    href={`tel:+977${o.phone}`}
                    className="mt-1 inline-block font-mono text-sm tabular-nums tracking-tight text-gray-700 transition-colors hover:text-jd-green"
                  >
                    {o.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-gray-300 pt-8 sm:flex-row sm:items-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Need help reaching a remote site?
            </p>
            <a
              href="tel:+9779801571065"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-black transition-colors hover:text-jd-green"
            >
              Call toll-free · +977 9801571065
              <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function Icon({ kind }) {
  const cls = 'h-5 w-5 shrink-0 text-jd-yellow/80 transition-colors group-hover:text-jd-yellow'
  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M6.6 10.8a15.3 15.3 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.6 1 1 0 01-.25 1l-2.2 2.2z" />
      </svg>
    )
  }
  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    )
  }
  // pin
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
      <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  )
}

function PageStyles() {
  return (
    <style>{`
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes status-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%      { transform: scale(2.4); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        [style*="fade-up"], [style*="status-pulse"] { animation: none !important; }
      }
    `}</style>
  )
}
