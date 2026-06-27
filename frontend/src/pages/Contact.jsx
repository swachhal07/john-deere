import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

// MV Dugar branch & sales-point network across Nepal.
// `lng` / `lat` = approximate centroid in WGS84 degrees, used for the map plot.
// `labelDir` = preferred label placement around the pin (only used for branches).
const offices = [
  { city: 'Birtamode', type: 'Branch', address: 'Bhagwan Chowk, Birtamod-01, Jhapa', manager: 'Ankit Thapa Magar', phone: '9802750877', lng: 87.99, lat: 26.65, province: 'Koshi', labelDir: 'right' },
  { city: 'Taplejung', type: 'Sales point', address: 'Phungling N.P.-01, Taplejung', manager: 'Ankit Thapa Magar', phone: '9802750877', lng: 87.67, lat: 27.35, province: 'Koshi' },
  { city: 'Phidim', type: 'Sales point', address: 'Phidim-02, Panchthar', manager: 'Ankit Thapa Magar', phone: '9802750877', lng: 87.75, lat: 27.15, province: 'Koshi' },
  { city: 'Gauriganj', type: 'Sales point', address: 'Ganapur-6, Janaki R.M.', manager: 'Harish Regmi', phone: '9802902128', lng: 87.27, lat: 26.75, province: 'Koshi' },
  { city: 'Biratnagar', type: 'Branch', address: 'Kanchanwari, Ward 3, Morang', manager: 'Deepak Poudel', phone: '9802701808', lng: 87.27, lat: 26.45, province: 'Koshi', labelDir: 'below' },
  { city: 'Mangalwari', type: 'Sales point', address: 'Rangeli M.P.-2, Morang', manager: 'Deepak Poudel', phone: '9802701808', lng: 87.45, lat: 26.55, province: 'Koshi' },
  { city: 'Lahan', type: 'Branch', address: 'Lahan-3, Siraha', manager: 'Abdul Qudir Jeelani', phone: '9801169058', lng: 86.49, lat: 26.72, province: 'Madhesh', labelDir: 'below' },
  { city: 'Katari', type: 'Sales point', address: 'Katari-4, Udaypur', manager: 'Abdul Qudir Jeelani', phone: '9801169058', lng: 86.65, lat: 26.92, province: 'Koshi' },
  { city: 'Janakpur', type: 'Branch', address: 'Mujheliya-14, Dhanusha', manager: 'Lalit Kumar Jha', phone: '9802961266', lng: 85.93, lat: 26.73, province: 'Madhesh', labelDir: 'below' },
  { city: 'Bardibas', type: 'Sales point', address: 'Bardibas-1, Mahottari', manager: 'Lalit Kumar Jha', phone: '9802961266', lng: 85.90, lat: 26.83, province: 'Madhesh' },
  { city: 'Hile', type: 'Branch', address: 'Dhankuta-1, Dhankuta', manager: 'Nirmal Bhandari', phone: '9802701823', lng: 87.33, lat: 27.05, province: 'Koshi', labelDir: 'left' },
  { city: 'Jeetpur', type: 'Branch', address: 'Chhatapipra, Ward 9, Jeetpur-Simara', manager: 'Lilaraj Wagle', phone: '9802794315', lng: 84.98, lat: 27.17, province: 'Madhesh', labelDir: 'left' },
  { city: 'Harion', type: 'Branch', address: 'Nayaroad, Hariwon-9, Sarlahi', manager: 'Sujan Rokka Kshetri', phone: '9801558687', lng: 85.50, lat: 27.07, province: 'Madhesh', labelDir: 'below' },
  { city: 'Hetauda', type: 'Branch', address: 'Hetauda H.I.D.-8, Makwanpur', manager: 'Dipak Sharma', phone: '9802902124', lng: 85.04, lat: 27.43, province: 'Bagmati', labelDir: 'right' },
  { city: 'Narayan Ghat', type: 'Branch', address: 'Bharatpur-12, Milanchowk, Chitwan', manager: 'Ramesh Prasad Dahal', phone: '9802902131', lng: 84.43, lat: 27.68, province: 'Bagmati', labelDir: 'above' },
  { city: 'Pokhara', type: 'Branch', address: 'Swagat Nagar-14, Pokhara, Kaski', manager: 'Sunil Kumar Thakur', phone: '9802921039', lng: 83.99, lat: 28.21, province: 'Gandaki', labelDir: 'above' },
  { city: 'Butwal', type: 'Branch', address: 'Tilottama-2, Janakinagar, Butwal', manager: 'Rajesh Kumar Sah', phone: '9802902103', lng: 83.45, lat: 27.70, province: 'Lumbini', labelDir: 'left' },
  { city: 'Kapilvastu', type: 'Sales point', address: 'Kapilvastu N.P.-1, Purano Atbazar', manager: 'Rajesh Kumar Sah', phone: '9802902103', lng: 83.05, lat: 27.55, province: 'Lumbini' },
  { city: 'Parasi', type: 'Sales point', address: 'Ramgram N.P.-12', manager: 'Rajesh Kumar Sah', phone: '9802902103', lng: 83.69, lat: 27.52, province: 'Lumbini' },
  { city: 'Nepalganj', type: 'Branch', address: 'Khajura Rd-1, Nepalganj', manager: 'Harish Regmi', phone: '9802902128', lng: 81.62, lat: 28.05, province: 'Lumbini', labelDir: 'below' },
  { city: 'Dhangadhi', type: 'Branch', address: 'Dhangadhi-13, Mohanpur, Kailali', manager: 'Binay Kumar Jha', phone: '9802971502', lng: 80.59, lat: 28.69, province: 'Sudurpaschim', labelDir: 'left' },
  { city: 'Mahendra Nagar', type: 'Sales point', address: 'Bhimdutta N.P.-1, Bhasi, Kanchanpur', manager: 'Binay Kumar Jha', phone: '9802971502', lng: 80.18, lat: 28.96, province: 'Sudurpaschim' },
  { city: 'Tikapur', type: 'Sales point', address: 'Tikapur N.P.-1, Kailali', manager: 'Binay Kumar Jha', phone: '9802971502', lng: 81.12, lat: 28.53, province: 'Sudurpaschim' },
  { city: 'Surkhet', type: 'Branch', address: 'Birendranagar-11, Surkhet', manager: 'Madhav Regmi', phone: '9802075800', lng: 81.62, lat: 28.60, province: 'Karnali', labelDir: 'above' },
  { city: 'Dang', type: 'Branch', address: 'Ghorahi S.M.-14, Dang', manager: 'Dhiraj Regmi', phone: '9802500803', lng: 82.42, lat: 28.04, province: 'Lumbini', labelDir: 'above' },
]

/* ────────────────────────────────────────────────────────────
   Nepal map — Leaflet-based with CARTO Positron (OSM) tiles.
   All 25 sites plotted at their real lat/lng. Branches get
   permanent uppercase labels; sales points show on hover.
   ──────────────────────────────────────────────────────────── */
const NEPAL_BOUNDS = [
  [26.30, 79.95],
  [30.45, 88.30],
]

function NepalMap() {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const branchCount = offices.filter((o) => o.type === 'Branch').length
  const salesCount = offices.length - branchCount

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      minZoom: 6,
      maxZoom: 11,
    })
    map.fitBounds(NEPAL_BOUNDS, { padding: [10, 10] })
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &middot; &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    offices.forEach((o) => {
      const isBranch = o.type === 'Branch'
      const marker = L.circleMarker([o.lat, o.lng], {
        radius: isBranch ? 7 : 5,
        color: '#16210f',
        weight: 1.6,
        fillColor: isBranch ? '#367c2b' : '#ffffff',
        fillOpacity: 1,
        interactive: true,
      }).addTo(map)

      if (isBranch) {
        const dirMap = { above: 'top', below: 'bottom', left: 'left', right: 'right' }
        const offsetMap = {
          above: [0, -10],
          below: [0, 10],
          left: [-10, 0],
          right: [10, 0],
        }
        const dir = dirMap[o.labelDir] || 'right'
        const off = offsetMap[o.labelDir] || [10, 0]
        marker.bindTooltip(o.city.toUpperCase(), {
          permanent: true,
          direction: dir,
          offset: off,
          className: 'mvd-branch-label',
        })
      } else {
        const tooltip = L.tooltip({
          permanent: false,
          direction: 'top',
          offset: [0, -8],
          className: 'mvd-sales-label',
          opacity: 1,
        }).setContent(o.city.toUpperCase())
        marker.bindTooltip(tooltip)
        marker.on('mouseover', function () { this.openTooltip() })
        marker.on('mouseout', function () { this.closeTooltip() })
      }
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <figure className="relative">
      <div className="relative overflow-hidden border border-black/15 bg-white">
        {/* Top meta strip */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-black/10 px-6 py-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gray-500 md:px-8">
          <span>Fig. 01 &middot; Nepal &mdash; branch coverage map</span>
          <span className="tabular-nums">
            <span className="text-jd-green">{String(branchCount).padStart(2, '0')}</span> branches
            <span className="mx-2 text-gray-300">&middot;</span>
            <span className="text-gray-700">{String(salesCount).padStart(2, '0')}</span> sales points
          </span>
        </div>

        {/* The Leaflet map */}
        <div
          ref={containerRef}
          className="relative z-0"
          style={{ height: '620px', width: '100%' }}
        />

        {/* Legend strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 px-6 py-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gray-500 md:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="inline-flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-jd-green ring-[1.5px] ring-black" />
              Branch (labelled)
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full border-[1.5px] border-jd-green bg-white" />
              Sales point (hover)
            </span>
          </div>
          <span>Tiles &middot; OpenStreetMap / CARTO Positron</span>
        </div>
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gray-500">
        <span>Drag to pan &middot; scroll-zoom disabled &middot; sales-point names show on hover.</span>
        <span className="tabular-nums">&Sigma; {offices.length} sites</span>
      </figcaption>
    </figure>
  )
}


function initials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

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
                      your project
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
                              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${active
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
                        onChange={() => { }}
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
                  href="tel:+97714012628"
                  className="group mt-8 flex items-center justify-between gap-4 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.08] hover:ring-jd-yellow/50"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-jd-yellow">
                      Head Office · Naxal, Kathmandu
                    </p>
                    <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white">
                      01 - 4012628
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
                      href="tel:+9779802960739"
                      className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-white/[0.06]"
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                          Sales
                        </p>
                        <p className="mt-0.5 text-base font-semibold text-white">
                          +977 980-2960739
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
          <div className="mb-10 flex flex-col items-center text-center">
            <div>
              <div className="mb-6 flex items-center justify-center gap-3 text-base font-bold uppercase tracking-[0.3em] text-jd-green md:text-lg">
                <span className="h-px w-12 bg-jd-green" />
                Find us
                <span className="h-px w-12 bg-jd-green" />
              </div>
              <h3 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-black md:text-7xl">
                Our showroom.{' '}
                <span className="relative whitespace-nowrap text-jd-green">
                  In Kathmandu.
                  <svg
                    className="absolute -bottom-3 left-0 h-4 w-full"
                    viewBox="0 0 240 16"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M2 11 C 60 4, 130 4, 238 9"
                      stroke="#ffde00"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h3>
            </div>
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
      <section className="border-t border-gray-200 bg-[#f4f6f0] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

          {/* Header */}
          <div className="mb-14 text-center">
            <div className="mb-6 flex items-center justify-center gap-3 text-base font-bold uppercase tracking-[0.3em] text-jd-green md:text-lg">
              <span className="h-px w-12 bg-jd-green" />
              Network — {offices.length} sites
              <span className="h-px w-12 bg-jd-green" />
            </div>
            <h3 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-black md:text-7xl">
              On the ground.{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                Across Nepal.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 240 16"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 11 C 60 4, 130 4, 238 9"
                    stroke="#ffde00"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h3>
          </div>

          {/* Nepal map — the geographic hero */}
          <div className="mb-16">
            <NepalMap />
          </div>

          {/* Divider into the detail roster */}
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-black/20 pb-3">
            <h4 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-jd-green">
              Detail roster — every site
            </h4>
            <span className="font-mono text-[0.6rem] tabular-nums uppercase tracking-[0.3em] text-gray-500">
              {String(offices.length).padStart(2, '0')} entries
            </span>
          </div>

          {/* Ledger header (desktop only) */}
          <div className="hidden border-y border-black/20 py-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-gray-500 lg:grid lg:grid-cols-[3rem_1.4fr_7rem_2.3fr_1.5fr_1fr] lg:items-baseline lg:gap-6">
            <span>#</span>
            <span>Location</span>
            <span>Type</span>
            <span>Address</span>
            <span>Branch manager</span>
            <span className="text-right">Contact</span>
          </div>

          {/* Ledger rows */}
          <ol className="divide-y divide-black/10">
            {offices.map((o, i) => (
              <li
                key={`${o.city}-${i}`}
                className="group relative grid grid-cols-1 gap-y-2.5 px-1 py-5 transition-colors hover:bg-white/70 lg:grid-cols-[3rem_1.4fr_7rem_2.3fr_1.5fr_1fr] lg:items-baseline lg:gap-6 lg:py-4"
              >
                {/* Index */}
                <span className="font-mono text-[0.78rem] font-semibold tabular-nums tracking-[0.2em] text-jd-green">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Location (with inline type chip on mobile) */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                  <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-black md:text-[1.4rem]">
                    {o.city}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.28em] lg:hidden ${o.type === 'Branch'
                      ? 'bg-jd-green text-white'
                      : 'border border-gray-400 text-gray-600'
                      }`}
                  >
                    {o.type === 'Branch' ? '◆ Branch' : '◇ Sales pt.'}
                  </span>
                </div>

                {/* Type chip (desktop only column) */}
                <div className="hidden lg:block">
                  <span
                    className={`inline-flex items-center rounded-sm px-2 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.28em] ${o.type === 'Branch'
                      ? 'bg-jd-green text-white'
                      : 'border border-gray-400 text-gray-600'
                      }`}
                  >
                    {o.type === 'Branch' ? '◆ Branch' : '◇ Sales pt.'}
                  </span>
                </div>

                {/* Address */}
                <p className="text-sm leading-snug text-gray-700">{o.address}</p>

                {/* Manager */}
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jd-green/10 font-mono text-[0.55rem] font-bold tracking-[0.05em] text-jd-green">
                    {initials(o.manager)}
                  </span>
                  <span className="text-[0.85rem] leading-tight text-gray-800">
                    {o.manager}
                  </span>
                </div>

                {/* Phone */}
                <div className="lg:text-right">
                  <a
                    href={`tel:+977${o.phone}`}
                    className="inline-flex items-baseline gap-1.5 font-mono text-sm font-semibold tabular-nums text-black transition-colors hover:text-jd-green"
                  >
                    <span
                      aria-hidden
                      className="text-[0.6rem] text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-jd-green"
                    >
                      ↗
                    </span>
                    {o.phone}
                  </a>
                </div>
              </li>
            ))}
          </ol>

          {/* Footer ribbon */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/15 pt-8 sm:flex-row sm:items-center">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gray-500">
              Need help reaching a remote site?
            </p>
            <a
              href="tel:+97714012628"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-black transition-colors hover:text-jd-green"
            >
              Call head office · 01 - 4012628
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
      /* Leaflet branch labels — black slab, white display caps */
      .leaflet-tooltip.mvd-branch-label {
        background: #16210f !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 0 !important;
        padding: 4px 9px !important;
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        letter-spacing: 0.16em !important;
        text-transform: uppercase !important;
        line-height: 1.1 !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25) !important;
        white-space: nowrap !important;
      }
      .leaflet-tooltip.mvd-branch-label::before { display: none !important; }
      .leaflet-tooltip.mvd-sales-label {
        background: #ffffff !important;
        color: #16210f !important;
        border: 1px solid #367c2b !important;
        border-radius: 0 !important;
        padding: 3px 7px !important;
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
      }
      .leaflet-tooltip.mvd-sales-label::before { display: none !important; }
      .leaflet-container { background: #f4f6f0 !important; font-family: inherit; }
      @media (prefers-reduced-motion: reduce) {
        [style*="fade-up"], [style*="status-pulse"] { animation: none !important; }
      }
    `}</style>
  )
}
