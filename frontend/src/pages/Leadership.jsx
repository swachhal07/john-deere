import { Link } from 'react-router-dom'
import motiImg from '../assets/af0b8ecf-4ddc-41f9-9dd1-ba5c0df1b212.webp'
import vivekImg from '../assets/ae68fbad-4028-45aa-81d5-44d526f4f5af.webp'
import shubhamImg from '../assets/af5ea000-e8c5-4f03-ac64-9fd3a8bb8009.webp'
import namanImg from '../assets/eb7eb529-8d15-4359-8ac0-df51b7393d00.webp'

const directors = [
  {
    no: '01',
    name: 'Moti Lal Dugar',
    title: 'Chairman',
    photo: motiImg,
    generation: 'First generation',
  },
  {
    no: '02',
    name: 'Vivek Dugar',
    title: 'Vice Chairman',
    photo: vivekImg,
    generation: 'Second generation',
  },
  {
    no: '03',
    name: 'Shubham Dugar',
    title: 'Director',
    photo: shubhamImg,
    generation: 'Third generation',
  },
  {
    no: '04',
    name: 'Naman Dugar',
    title: 'Director',
    photo: namanImg,
    generation: 'Third generation',
  },
]

const management = [
  { name: 'Team Member', title: 'General Manager', photo: null },
  { name: 'Team Member', title: 'Sales Head', photo: null },
  { name: 'Team Member', title: 'Service Head', photo: null },
  { name: 'Team Member', title: 'Parts & Logistics', photo: null },
]

function initialsOf(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function LeaderColumn({ leader, index }) {
  return (
    <article
      className="group relative transition-transform duration-500 ease-out hover:-translate-y-1.5"
      style={{
        animation: `roster-in 0.65s ease-out ${0.08 * index}s both`,
      }}
    >
      {/* Portrait */}
      <div className="relative overflow-hidden">
        {/* Yellow top edge — grows full width on hover */}
        <span
          aria-hidden
          className="absolute left-0 top-0 z-20 h-[3px] w-12 bg-jd-yellow transition-[width] duration-500 ease-out group-hover:w-full"
        />

        {/* Image */}
        <img
          src={leader.photo}
          alt={leader.name}
          className="aspect-[4/5] w-full object-cover grayscale-[20%] brightness-[0.97] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.06]"
        />

      </div>

      {/* Name block */}
      <div className="relative mt-6">
        {/* Sliding green underline behind the name */}
        <span
          aria-hidden
          className="absolute -bottom-2 left-0 h-[3px] w-0 bg-jd-green transition-[width] duration-500 ease-out group-hover:w-12"
        />

        <div className="mb-3 inline-flex items-center gap-2.5">
          <span className="h-px w-6 bg-jd-green transition-[width] duration-500 ease-out group-hover:w-10" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-jd-green">
            {leader.title}
          </span>
        </div>
        <h2 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-mist transition-colors duration-500 ease-out group-hover:text-jd-green md:text-[1.6rem] lg:text-3xl">
          {leader.name}
        </h2>
      </div>
    </article>
  )
}

function ManagerColumn({ manager, index }) {
  return (
    <article
      className="group relative transition-transform duration-500 ease-out hover:-translate-y-1.5"
      style={{
        animation: `roster-in 0.65s ease-out ${0.08 * index}s both`,
      }}
    >
      {/* Square portrait / placeholder */}
      <div className="relative overflow-hidden bg-[#16210f]">
        <span
          aria-hidden
          className="absolute left-0 top-0 z-20 h-[3px] w-12 bg-jd-green transition-[width] duration-500 ease-out group-hover:w-full"
        />
        {manager.photo ? (
          <img
            src={manager.photo}
            alt={manager.name}
            className="aspect-square w-full object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.06]"
          />
        ) : (
          <div
            aria-hidden
            className="relative flex aspect-square w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 25%, #2a4a23 0%, #16210f 55%, #0a120a 100%)',
            }}
          >
            <span className="font-display text-[5.5rem] font-extrabold leading-none tracking-tight text-white/[0.08]">
              {initialsOf(manager.name)}
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(0deg, transparent 95%, rgba(255,255,255,0.04) 100%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.04) 100%)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        )}
      </div>

      {/* Name block */}
      <div className="mt-6">
        <div className="mb-3 inline-flex items-center gap-2.5">
          <span className="h-px w-6 bg-jd-green transition-[width] duration-500 ease-out group-hover:w-10" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-jd-green">
            {manager.title}
          </span>
        </div>
        <h3 className="font-display text-xl font-extrabold uppercase leading-[0.95] tracking-tight text-mist transition-colors duration-500 ease-out group-hover:text-jd-green md:text-2xl">
          {manager.name}
        </h3>
      </div>
    </article>
  )
}

export default function Leadership() {
  return (
    <>
      {/* ─── Masthead ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink pt-24 pb-12 md:pt-32 md:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Top meta row */}
          <div className="mb-12 grid grid-cols-2 items-baseline gap-4 border-b border-mist/15 pb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-mist-dim md:grid-cols-3">
            <span className="text-jd-green">MV Dugar · Nepal</span>
            <span className="hidden text-center md:inline">Roster · 04 entries · 2026</span>
            <span className="text-right">Authorized John Deere distributor</span>
          </div>

          {/* Headline */}
          <h1 className="text-center font-display text-[clamp(3.25rem,9vw,8rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.035em] text-mist">
            The{' '}
            <span className="relative inline-block text-jd-green">
              Roster.
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
          </h1>
        </div>
      </section>

      {/* ─── Horizontal roster ───────────────────────────────── */}
      <section className="relative bg-ink pb-24 md:pb-32">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Ledger header */}
          <div className="mb-8 flex items-baseline justify-between border-y border-mist/20 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-mist-dim">
            <span className="text-jd-green">Board of Directors</span>
            <span>04 entries · Kathmandu</span>
          </div>

          {/* Four columns */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {directors.map((leader, i) => (
              <LeaderColumn key={leader.name} leader={leader} index={i} />
            ))}
          </div>

          {/* Colophon — pinned to the end of the BOD section */}
          <div className="mt-20 flex flex-col items-center border-t border-mist/15 pt-14 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-jd-green">
              ↳ End of roster
            </span>
            <p className="mt-6 max-w-4xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-mist md:text-5xl lg:text-6xl">
              One family. One business. Every district in Nepal.
            </p>
            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 border-b-2 border-jd-yellow pb-1 text-xs font-bold uppercase tracking-[0.28em] text-mist transition-colors hover:text-jd-green"
            >
              Speak with our team
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Management team ─────────────────────────────────── */}
      <section className="relative bg-white pt-20 pb-24 md:pt-24 md:pb-32">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Section header */}
          <div className="mb-12 text-center">
            <div className="mb-5 flex items-center justify-center gap-3 text-base font-bold uppercase tracking-[0.3em] text-jd-green md:text-lg">
              <span className="h-px w-12 bg-jd-green" />
              Management Team
              <span className="h-px w-12 bg-jd-green" />
            </div>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-mist md:text-6xl">
              The team{' '}
              <span className="relative inline-block text-jd-green">
                in the field.
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
            </h2>
          </div>

          {/* Ledger header */}
          <div className="mb-8 flex items-baseline justify-between border-y border-mist/20 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-mist-dim">
            <span className="text-jd-green">Senior Management</span>
            <span>04 entries · Kathmandu</span>
          </div>

          {/* Four columns */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {management.map((m, i) => (
              <ManagerColumn key={`${m.title}-${i}`} manager={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes roster-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
