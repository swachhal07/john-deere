import { Link } from 'react-router-dom'

/* ────────────────────────────────────────────────────────────
   WHY US — Swiss/industrial editorial.
   Centred hero with yellow-underline accent word, by-the-numbers
   strip, numbered reasons grid, deep-green capabilities slab,
   testimonial, and a final yellow CTA strip.
   ──────────────────────────────────────────────────────────── */

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2400&q=80'

const metrics = [
  { value: '180+',   label: 'Years of John Deere engineering' },
  { value: '10',     label: 'Sales · Service · Parts branches' },
  { value: '24 hrs', label: 'Average parts dispatch nationwide' },
  { value: '100%',   label: 'Genuine parts. Always.' },
]

const reasons = [
  {
    no: '01',
    title: 'Genuine parts, always in stock',
    body: 'A fully stocked parts network across Nepal means your machine is never idle for long. Every component is genuine John Deere — engineered to last.',
  },
  {
    no: '02',
    title: 'Service that comes to you',
    body: 'Trained field technicians and mobile workshops reach you on the farm. Scheduled maintenance keeps small problems from becoming downtime.',
  },
  {
    no: '03',
    title: 'Specified for Nepali conditions',
    body: 'From hill-terrace clearance to monsoon-grade durability, every machine is matched to the terrain it will actually work.',
  },
  {
    no: '04',
    title: 'Financing made simple',
    body: 'Flexible plans built with local farmers in mind, so the right equipment is within reach this season — not next.',
  },
  {
    no: '05',
    title: 'Operators, trained right',
    body: 'Hands-on training programmes help your team get the most from every machine, safely and efficiently.',
  },
  {
    no: '06',
    title: 'A name you can trust',
    body: 'Backed by 180+ years of John Deere engineering and a local team that knows Nepali farming inside out.',
  },
]

const capabilities = [
  { code: '01', title: 'Sales',         note: 'Spec a tractor to your land' },
  { code: '02', title: 'Genuine Parts', note: 'OEM stock at every branch' },
  { code: '03', title: 'Field Service', note: 'On-farm technicians' },
  { code: '04', title: 'Operator Training', note: 'Hands-on, on your machine' },
  { code: '05', title: 'Financing',     note: 'Built around farm cashflow' },
  { code: '06', title: 'Warranty',      note: 'Backed factory-direct' },
]


export default function WhyUs() {
  return (
    <main className="bg-white">
      <PageStyles />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f4f6f0] pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Floating "25+ years" badge */}
        <div
          aria-hidden
          className="badge-25 pointer-events-none absolute right-6 top-2 hidden md:right-12 md:top-4 md:block lg:right-20 lg:top-6"
        >
          <div className="badge-25-bob relative grid h-36 w-36 place-items-center rounded-full bg-jd-yellow shadow-[0_22px_50px_-22px_rgba(0,0,0,0.35)] md:h-40 md:w-40 lg:h-44 lg:w-44">
            <span
              aria-hidden
              className="badge-25-ring absolute inset-2 rounded-full border-2 border-dashed border-black/70"
            />
            <div className="relative text-center leading-tight">
              <div className="font-display text-4xl font-extrabold text-black md:text-5xl">
                25<span className="text-[0.7em]">+</span>
              </div>
              <div className="mt-1 font-display text-sm font-bold leading-[1.15] text-black md:text-base">
                Years
                <br />
                Experience
              </div>
            </div>
          </div>

          <style>{`
            .badge-25 { animation: badge-25-in 0.8s ease-out 0.2s both; }
            .badge-25-bob { animation: badge-25-bob 4.5s ease-in-out infinite; transform-origin: center; }
            .badge-25-ring { animation: badge-25-spin 18s linear infinite; }
            @keyframes badge-25-in {
              from { opacity: 0; transform: translateY(-24px) scale(0.85) rotate(-20deg); }
              to   { opacity: 1; transform: translateY(0)     scale(1)    rotate(0deg); }
            }
            @keyframes badge-25-bob {
              0%,100% { transform: translateY(0)    rotate(-6deg); }
              50%     { transform: translateY(-10px) rotate(6deg); }
            }
            @keyframes badge-25-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @media (prefers-reduced-motion: reduce) {
              .badge-25, .badge-25-bob, .badge-25-ring { animation: none; }
            }
          `}</style>
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="text-center" style={{ animation: 'fade-up 0.7s ease-out both' }}>
            <div className="mb-6 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.32em] text-jd-green md:text-base">
              <span className="h-px w-12 bg-jd-green" />
              Why work with us
              <span className="h-px w-12 bg-jd-green" />
            </div>
            <h1 className="font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#16210f] sm:text-6xl md:text-7xl lg:text-[112px]">
              Built for Nepal.
              <br />
              <span className="relative whitespace-nowrap text-jd-green">
                Backed for life
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

      {/* ─── By the numbers ─────────────────────────────────── */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className="relative bg-white py-10 sm:py-14"
                style={{
                  animation: `fade-up 0.7s ease-out ${0.05 * i}s both`,
                }}
              >
                {/* Vertical divider — skip the first */}
                {i > 0 && (
                  <span className="pointer-events-none absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gray-200 lg:block" />
                )}
                <div className="flex items-baseline gap-3 px-2 sm:px-6">
                  <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-jd-green">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="mt-4 px-2 sm:px-6">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-[#16210f] sm:text-6xl">
                    {m.value}
                  </p>
                  <p className="mt-3 max-w-[14ch] text-sm leading-relaxed text-gray-600">
                    {m.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reasons grid ───────────────────────────────────── */}
      <section className="bg-[#f4f6f0] pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div
            className="mb-14 grid grid-cols-1 items-end gap-8 pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
            style={{ animation: 'fade-up 0.7s ease-out both' }}
          >
            <div>
              <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-jd-green md:text-base">
                <span className="h-px w-10 bg-jd-green" />
                Six reasons
              </p>
              <h2 className="font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-[#16210f] md:text-5xl lg:text-6xl">
                Why choose{' '}
                <span className="relative whitespace-nowrap text-jd-green">
                  John&nbsp;Deere
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
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[#16210f]">.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-gray-700 lg:justify-self-end lg:text-right md:text-lg">
              World-class engineering, paired with a local team that knows
              Nepali farming — from hill terraces to the Terai plains.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-gray-300 bg-gray-300 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <article
                key={r.no}
                className="group relative flex flex-col bg-white p-8 transition-colors hover:bg-[#f4f6f0] md:p-10"
                style={{
                  animation: `fade-up 0.6s ease-out ${0.05 * i}s both`,
                }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-5xl font-extrabold tabular-nums tracking-tight text-jd-green md:text-6xl">
                    {r.no}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400 transition-colors group-hover:text-jd-green">
                    NP
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-black md:text-2xl">
                  {r.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {r.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Capabilities slab — deep JD green ─────────────── */}
      <section className="relative overflow-hidden bg-[#0e2010] py-24 text-white md:py-32">
        {/* Topographic watermark */}
        <svg
          aria-hidden
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <path
              key={i}
              d="M-200,300 C 120,200 320,420 600,300 S 1080,180 1340,300 S 1760,420 2040,310"
              transform={`translate(0 ${i * 56 - 200})`}
              stroke={i % 4 === 0 ? '#ffde00' : '#4ca832'}
              strokeWidth={i % 4 === 0 ? 1.4 : 0.9}
              fill="none"
            />
          ))}
        </svg>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-jd-yellow md:text-xs">
                <span className="h-px w-10 bg-jd-yellow" />
                One roof
              </p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl">
                The whole circle of{' '}
                <span className="relative whitespace-nowrap text-jd-yellow">
                  support
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
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Sales, genuine parts, on-farm service, operator training and
                financing — under one roof, with one team that picks up the
                phone when you call.
              </p>
              <Link
                to="/contact"
                className="group mt-9 inline-flex items-center gap-3 border-b-2 border-jd-yellow pb-1 text-xs font-bold uppercase tracking-[0.28em] text-white transition-colors hover:text-jd-yellow"
              >
                Talk to our team
                <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>

            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
              {capabilities.map((c) => (
                <li
                  key={c.code}
                  className="group flex items-center gap-5 bg-[#0e2010] p-6 transition-colors hover:bg-[#15311a]"
                >
                  <span className="font-display text-4xl font-extrabold tabular-nums tracking-tight text-jd-yellow">
                    {c.code}
                  </span>
                  <div>
                    <p className="font-display text-lg font-extrabold uppercase tracking-tight text-white">
                      {c.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      {c.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Closing line ───────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <div
            className="mb-6 flex items-center justify-center gap-4 text-lg font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl lg:text-2xl"
            style={{ animation: 'fade-up 0.7s ease-out both' }}
          >
            <span className="h-px w-12 bg-jd-green" />
            What sets us apart
            <span className="h-px w-12 bg-jd-green" />
          </div>
          <p
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[#16210f] md:text-5xl lg:text-6xl"
            style={{ animation: 'fade-up 0.7s ease-out 0.1s both' }}
          >
            Buying a tractor is easy. Keeping it running, season after season,
            is where we{' '}
            <span className="relative whitespace-nowrap text-jd-green">
              earn your trust
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
          </p>
        </div>
      </section>
    </main>
  )
}

function PageStyles() {
  return (
    <style>{`
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        [style*="fade-up"] { animation: none !important; }
      }
    `}</style>
  )
}
