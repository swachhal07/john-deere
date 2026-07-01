import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import jdLogo from '../assets/john-deere-logo.png'
import mvDugarLogo from '../assets/MVDUGAR-01.png'
import coverFieldBg from '../assets/wp9212100.jpg'
import whyChoose01 from '../assets/wp3183062.jpg'
import storySlide1 from '../assets/WhatsApp Image 2026-06-26 at 8.30.45 AM.jpeg'
import storySlide2 from '../assets/WhatsApp Image 2026-06-26 at 8.30.46 AM.jpeg'
import storySlide3 from '../assets/WhatsApp Image 2026-06-26 at 8.30.47 AM.jpeg'
import storySlide4 from '../assets/WhatsApp Image 2026-06-26 at 8.33.10 AM.jpeg'

import serviceTeamPhoto from '../assets/_DSC5954.jpg.jpeg'
import serviceTeamPhoto2 from '../assets/_DSC5898.jpg.jpeg'
import whyChoose1 from '../assets/wp9633811.jpg'
import whyChoose2 from '../assets/premium_photo-1661935875460-f239deafada1.avif'
import whyChoose3 from '../assets/premium_photo-1661836105117-2a6641fa7510.avif'
import whyChoose4 from '../assets/69892118-tracteur-travail-dans-champ-a-le-coucher-du-soleil-agriculture-agriculture-recolte-rural-paysage-et-durable-les-pratiques-gratuit-photo.jpg'

/* ────────────────────────────────────────────────────────────
   ABOUT — "Field Almanac"
   A magazine-feature editorial. Cream paper, italic Fraunces
   serif, sidebar margin labels, drop caps, breakout pull quote,
   polaroid-framed team photos, postcard sign-off. Distinctively
   different from any other page on the site.
   ──────────────────────────────────────────────────────────── */

const storySlides = [storySlide1, storySlide2, storySlide3, storySlide4]



const trustPillars = [
  { num: '01', label: 'Authorized distributor', detail: 'Direct from John Deere — no resellers in the chain, no grey market.', image: whyChoose01 },
  { num: '02', label: 'Factory-trained service', detail: 'Technicians trained on every model we put on Nepali ground.', image: whyChoose2 },
  { num: '03', label: 'Manufacturer warranty',  detail: 'Standard coverage on every machine — honoured at any branch.', image: whyChoose3 },
  { num: '04', label: 'Genuine parts supply',   detail: 'OEM stock at the central warehouse and at every one of sixteen branches.', image: whyChoose4 },
]

const LIGHT_GREEN = '#f1f5ea'

function WhyChooseScroll() {
  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden text-[#1a261a]"
      style={{ backgroundColor: LIGHT_GREEN }}
    >
      {/* ── Heading ─────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-12 pt-16 md:pb-14 md:pt-20 lg:px-12">
        <div className="cx-rise text-center">
          <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
            <span className="h-px w-16 bg-jd-green" />
            A nationwide network
            <span className="h-px w-16 bg-jd-green" />
          </div>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] md:text-6xl lg:text-7xl">
            Backed by{' '}
            <span className="relative whitespace-nowrap text-jd-green">
              180+ years
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
            </span>{' '}
            of John Deere<span className="text-[#1a261a]">.</span>
          </h2>
        </div>
      </div>

      {/* ── City marquee — full-bleed ───────────────────── */}
      <div className="overflow-hidden border-y border-[#1a261a]/15 py-6" style={{ backgroundColor: LIGHT_GREEN }}>
        <div className="cx-marquee-track flex items-center gap-12 whitespace-nowrap font-['Fraunces'] text-4xl text-[#1a261a] md:text-5xl">
          {[...Array(2)].flatMap((_, copy) =>
            ['Kathmandu', 'Biratnagar', 'Jeetpur', 'Bardibaas', 'Nepalgunj', 'Dhangadi', 'Surkhet', 'Dang', 'Pokhara', 'Butwal'].map((city) => (
              <span key={`${copy}-${city}`} className="flex items-center gap-12">
                <span aria-hidden className="inline-block h-3 w-3 rounded-full bg-jd-green" />
                <span>{city}</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── What you can count on — 4-row list ──────────── */}
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-24 lg:px-12">
        <p className="cx-rise mb-12 text-center text-sm font-bold uppercase tracking-[0.45em] text-jd-green md:mb-16 md:text-base">
          What you can count on
        </p>

        <ul className="cx-rise-slow border-t border-[#1a261a]/15">
          {trustPillars.map((p) => (
            <li
              key={p.num}
              className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 border-b border-[#1a261a]/15 py-10 md:grid-cols-[6rem_minmax(0,18rem)_1fr] md:gap-x-12 md:py-14"
            >
              <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-jd-green md:text-5xl lg:text-6xl">
                {p.num}
              </span>
              <h3 className="self-center font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-[#1a261a] md:text-3xl lg:text-[34px]">
                {p.label}
              </h3>
              <p className="col-span-2 text-lg leading-[1.55] text-[#3a4a36] md:col-span-1 md:self-center md:text-xl">
                {p.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const SALES_PHOTO = serviceTeamPhoto2
const SERVICE_PHOTO = serviceTeamPhoto

const teamProfiles = [
  {
    n: '01',
    role: 'The Sales Floor',
    accent: 'around the farmer',
    photo: SALES_PHOTO,
    caption: 'Showroom, Kathmandu · 2026',
    rotate: -1.4,
    bio: 'Our sales team pairs technical depth with on-the-ground experience. They walk farms, talk through soil, slope and crop, and stay involved long after delivery — because the relationship is the product.',
    capabilities: [
      'Showroom walk-throughs & farm visits',
      'Application sizing & spec advice',
      'Financing & delivery coordination',
      'Long-term customer relationships',
    ],
  },
  {
    n: '02',
    role: 'Field Service',
    accent: 'close to the work',
    photo: SERVICE_PHOTO,
    caption: 'Service centre, Balaju · 2026',
    rotate: 1.6,
    bio: 'Factory-trained, parts-stocked, and always reachable. The service team carries the machine from first commissioning to its tenth season — through warranty work, scheduled servicing, and the late-night calls when the monsoon hits.',
    capabilities: [
      'Factory-trained technicians',
      'Scheduled servicing & warranty',
      'Genuine John Deere parts',
      'Emergency field response',
    ],
  },
]

const ornament = (
  <svg viewBox="0 0 60 12" className="h-3 w-16 text-jd-green/60" aria-hidden>
    <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1" />
    <circle cx="30" cy="6" r="2.5" fill="currentColor" />
    <line x1="40" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function About() {
  const [storyIndex, setStoryIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStoryIndex((i) => (i + 1) % storySlides.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="relative bg-white text-[#1a261a]">
      <PageStyles />

      {/* ── COVER ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1a261a]/15 bg-[#f4f6f0]">
        {/* Cultivation backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <img
            src={coverFieldBg}
            alt=""
            className="h-full w-full object-cover opacity-[0.12]"
            style={{ filter: 'grayscale(35%) contrast(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f6f0]/40 via-[#f4f6f0]/10 to-[#f4f6f0]/85" />
        </div>

        {/* Top masthead ribbon */}
        <div className="relative z-10 border-b border-[#1a261a]/15">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.45em] text-[#1a261a]/55 lg:px-12">
            <span>MV Dugar &middot; John Deere Nepal</span>
            <span className="hidden sm:inline">Field Almanac &middot; Issue I</span>
            <span>EST. 2002</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-20 pb-10 md:pt-28 md:pb-12 lg:px-12">
          <div className="cx-rise text-center">
            <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              A field almanac
              <span className="h-px w-16 bg-jd-green" />
            </div>
            <h1 className="font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] sm:text-6xl md:text-7xl lg:text-[112px]">
              Two decades
              <br />
              on{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                Nepal&rsquo;s farms
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
              <span className="text-[#1a261a]">.</span>
            </h1>
            <p className="mx-auto mt-12 max-w-xl text-lg leading-[1.6] text-[#3a4a36]">
              The story, the partnership, and the people behind every John
              Deere machine MV Dugar puts on the ground in Nepal — from hill
              terraces to the Terai plains.
            </p>

            {/* Paired dispatch stamps */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-10 md:gap-14">
              {/* MV Dugar stamp */}
              <div className="cx-stamp-drop" style={{ animationDelay: '0.2s' }}>
                <a
                  href="https://www.mvdugar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit MV Dugar website"
                  className="stamp-card relative inline-block cursor-pointer border-[3px] border-jd-green bg-[#f4f6f0] px-9 py-7 text-center no-underline"
                  style={{ '--tilt': '2.4deg', boxShadow: '-6px 8px 0 -2px rgba(54,124,43,0.18)' }}
                >
                  <span
                    aria-hidden
                    className="stamp-spark absolute -right-3 -top-3 grid h-7 w-7 place-items-center rounded-full bg-jd-yellow font-mono text-[10px] font-bold uppercase tracking-tighter text-[#1a261a]"
                  >
                    ✦
                  </span>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-jd-green">
                    Distributor
                  </p>
                  <img
                    src={mvDugarLogo}
                    alt="MV Dugar"
                    className="my-4 mx-auto h-20 w-auto md:h-24"
                  />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a261a]">
                    Est. 2002 &middot; Nepal
                  </p>
                </a>
              </div>

              {/* John Deere stamp */}
              <div className="cx-stamp-drop" style={{ animationDelay: '0.5s' }}>
                <div
                  className="stamp-card relative inline-block border-[3px] border-jd-green bg-[#f4f6f0] px-9 py-7 text-center"
                  style={{ '--tilt': '-2.4deg', boxShadow: '6px 8px 0 -2px rgba(54,124,43,0.18)' }}
                >
                  <span
                    aria-hidden
                    className="stamp-spark absolute -left-3 -top-3 grid h-7 w-7 place-items-center rounded-full bg-jd-yellow font-mono text-[10px] font-bold uppercase tracking-tighter text-[#1a261a]"
                    style={{ animationDelay: '0.8s' }}
                  >
                    ✦
                  </span>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-jd-green">
                    Authorized
                  </p>
                  <img
                    src={jdLogo}
                    alt="John Deere"
                    className="my-4 mx-auto h-14 w-auto md:h-16"
                  />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a261a]">
                    Dealer &middot; Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4 md:mt-16">
            <span className="h-px flex-1 bg-[#1a261a]/15" />
            {ornament}
            <span className="h-px flex-1 bg-[#1a261a]/15" />
          </div>
        </div>
      </section>

      {/* ── VOLUME I — OUR STORY ────────────────────────── */}
      <section className="border-b border-[#1a261a]/15">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28 lg:px-12">
          <div>
            <div className="cx-rise">
              <header className="mb-20 text-center md:-mt-10">
                <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
                  <span className="h-px w-16 bg-jd-green" />
                  Our story
                  <span className="h-px w-16 bg-jd-green" />
                </div>
                <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] md:text-6xl lg:text-7xl">
                  Two decades.{' '}
                  <span className="relative whitespace-nowrap text-jd-green">
                    One mission
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
                  <span className="text-[#1a261a]">.</span>
                </h2>
              </header>

              {/* Story body with breakout image */}
              <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
                <article className="space-y-7 text-lg leading-[1.65] text-[#23311f] lg:order-2">
                  <p>
                    <span className="float-left mr-3 mt-1 font-display text-[6.5rem] font-extrabold leading-[0.8] text-jd-green sm:text-[7.5rem]">
                      M
                    </span>
                    V Dugar has been an authorized dealer of John Deere
                    agricultural machinery in Nepal since 2002, offering
                    tractors, implements, harvesters, genuine spare parts, and
                    dependable after-sales service support across the country.
                  </p>
                  <p>
                    With an extensive network of{' '}
                    <strong className="font-semibold text-[#1a261a]">
                      16 fully-equipped 3S branches
                    </strong>{' '}
                    and{' '}
                    <strong className="font-semibold text-[#1a261a]">
                      35 authorized service points
                    </strong>{' '}
                    nationwide, MV Dugar has built a strong reputation in the
                    agricultural machinery industry through quality products
                    and customer-focused service.
                  </p>
                  <p>
                    As part of a diversified automotive group representing
                    several market-leading brands, we bring world-class
                    engineering and a local team that understands the realities
                    of farming in Nepal.
                  </p>
                  <p>
                    From the rice paddies of the Terai to the steep terraces of
                    the mid-hills, we match every machine to the land it will
                    actually work. No two farms in Nepal are alike — and our
                    team is trained to spec the right tractor, the right
                    implement, and the right financing for each.
                  </p>
                  <p>
                    Behind every sale is a long-term commitment: factory-trained
                    technicians, mobile workshops that reach you on the farm,
                    and a parts network that keeps your machine running through
                    every monsoon and every harvest.
                  </p>
                  <p>
                    We aren&rsquo;t just delivering tractors. We&rsquo;re
                    investing in the productivity of Nepali agriculture — one
                    farm, one season, one harvest at a time. That&rsquo;s the
                    work we&rsquo;ve been doing for more than twenty years, and
                    it&rsquo;s the work we plan to keep doing for the next
                    twenty.
                  </p>
                </article>

                {/* Image side — paper-framed slideshow */}
                <figure className="cx-rise-slow lg:order-1 lg:sticky lg:top-28 lg:self-start">
                  <div
                    className="relative bg-white p-3 md:p-4"
                    style={{
                      transform: 'rotate(1.2deg)',
                      boxShadow: '0 20px 60px -30px rgba(26,38,26,0.45)',
                    }}
                  >
                    {/* Tape strip */}
                    <span
                      aria-hidden
                      className="absolute -top-3 left-1/2 h-7 w-20 -translate-x-1/2 -rotate-2 bg-jd-yellow/70"
                      style={{
                        clipPath: 'polygon(2% 30%, 98% 0, 100% 70%, 4% 100%)',
                      }}
                    />
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {storySlides.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                            i === storyIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                    </div>
                    <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#1a261a]/60">
                      <span>Plate I</span>
                      <span>{String(storyIndex + 1).padStart(2, '0')} / {storySlides.length.toString().padStart(2, '0')}</span>
                    </figcaption>
                  </div>
                </figure>
              </div>

              {/* Pull quote breakout */}
              <blockquote className="cx-rise mt-16 text-center md:mt-20">
                <p className="font-['Fraunces'] text-3xl font-medium leading-[1.15] text-[#1a261a] md:text-4xl lg:text-5xl">
                  &ldquo;From hill terraces to the Terai plains — wherever
                  there is land to work, there is a Deere built for it.&rdquo;
                </p>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-jd-green">
                  Field Notes &middot; Vol. I
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUME II — THE TRUSTED PARTNER ─────────────── */}
      <section className="border-b border-[#1a261a]/15 bg-[#f4f6f0]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div>
            <div className="cx-rise">
              {/* Trust pillars — scroll-pinned hero, one card per step */}
              <WhyChooseScroll />
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUME III — OUR TEAM ──────────────────────── */}
      <section className="border-b border-[#1a261a]/15">
        <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-20 md:pt-20 md:pb-28 lg:px-12">
          <div>
            <div className="cx-rise">
              <header className="mb-16 text-center">
                <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
                  <span className="h-px w-16 bg-jd-green" />
                  Our team
                  <span className="h-px w-16 bg-jd-green" />
                </div>
                <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] md:text-6xl lg:text-7xl">
                  The people{' '}
                  <span className="relative whitespace-nowrap text-jd-green">
                    behind
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
                  </span>{' '}
                  the machines<span className="text-[#1a261a]">.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.6] text-[#3a4a36]">
                  Three things have to happen under one roof for a tractor to
                  keep earning its keep. These are the people who make sure
                  each one does.
                </p>
              </header>

              <div className="space-y-24 md:space-y-32">
                {teamProfiles.map((g, i) => {
                  const reversed = i % 2 === 1
                  return (
                    <article
                      key={g.role}
                      className="cx-stagger relative"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      <div
                        className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 ${
                          reversed ? 'lg:[&>figure]:order-2' : ''
                        }`}
                      >
                        {/* Polaroid */}
                        <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
                          <div
                            className="relative bg-white p-3 md:p-4"
                            style={{
                              transform: `rotate(${g.rotate}deg)`,
                              boxShadow:
                                '0 30px 60px -30px rgba(26,38,26,0.45), 0 6px 14px -6px rgba(26,38,26,0.25)',
                            }}
                          >
                            <span
                              aria-hidden
                              className="absolute -top-3 left-8 h-7 w-24 -rotate-3 bg-jd-yellow/70"
                              style={{
                                clipPath: 'polygon(2% 30%, 98% 0, 100% 70%, 4% 100%)',
                              }}
                            />
                            <div className="relative aspect-[5/4] overflow-hidden">
                              <img
                                src={g.photo}
                                alt={`${g.role} team`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#1a261a]/60">
                              <span>Plate {g.n}</span>
                              <span>{g.caption}</span>
                            </figcaption>
                          </div>
                        </figure>

                        {/* Profile body */}
                        <div>
                          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-jd-green">
                            Profile / {g.n}
                            <span className="h-px flex-1 bg-jd-green/40" />
                          </p>
                          <h3 className="font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] md:text-5xl">
                            {g.role}{' '}
                            <span className="relative whitespace-nowrap text-jd-green">
                              {g.accent}
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
                            <span className="text-[#1a261a]">.</span>
                          </h3>
                          <p className="mt-7 text-lg leading-[1.6] text-[#23311f]">
                            {g.bio}
                          </p>

                          <ul className="mt-9 border-t border-[#1a261a]/15">
                            {g.capabilities.map((c, j) => (
                              <li
                                key={c}
                                className="flex items-baseline gap-4 border-b border-[#1a261a]/15 py-3.5"
                              >
                                <span className="font-mono text-[10px] font-bold tabular-nums tracking-[0.3em] text-jd-green">
                                  / {String(j + 1).padStart(2, '0')}
                                </span>
                                <span className="text-base text-[#23311f] md:text-lg">
                                  {c}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CODA — Sign-off ────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f4f6f0]">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-24 md:pt-16 md:pb-32 lg:px-12">
          <div className="cx-rise mx-auto max-w-4xl text-center md:-mt-6">
            <div className="mb-8 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              In closing
              <span className="h-px w-16 bg-jd-green" />
            </div>

            <blockquote className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#1a261a] md:text-6xl lg:text-7xl">
              &ldquo;Every John Deere we sell, we{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                stand behind
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
              {' '}&mdash; from the showroom to your last harvest.&rdquo;
            </blockquote>

            <div className="mt-12 flex items-center justify-center gap-4 text-[#1a261a]/55">
              <span className="h-px w-12 bg-[#1a261a]/25" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.4em]">
                With every machine &mdash; the team at MV Dugar
              </p>
              <span className="h-px w-12 bg-[#1a261a]/25" />
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-jd-green px-7 py-4 text-xs font-bold uppercase tracking-[0.28em] text-white transition hover:bg-[#16210f]"
              >
                Visit the showroom
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 border-b-2 border-jd-green pb-1 text-xs font-bold uppercase tracking-[0.28em] text-[#1a261a] transition hover:text-jd-green"
              >
                See the range
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function PageStyles() {
  return (
    <style>{`
      @keyframes cxRise {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .cx-rise       { animation: cxRise 0.9s cubic-bezier(0.22,1,0.36,1) both; }
      .cx-rise-slow  { animation: cxRise 1.1s 0.18s cubic-bezier(0.22,1,0.36,1) both; }
      .cx-stagger    { animation: cxRise 0.8s cubic-bezier(0.22,1,0.36,1) both; }

      @keyframes cxMarquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .cx-marquee-track {
        animation: cxMarquee 38s linear infinite;
        width: max-content;
      }

      @keyframes stampDrop {
        0%   { opacity: 0; transform: translateY(-32px) scale(1.35); }
        55%  { opacity: 1; transform: translateY(4px)   scale(0.95); }
        78%  { opacity: 1; transform: translateY(-1px)  scale(1.012); }
        100% { opacity: 1; transform: translateY(0)     scale(1); }
      }
      .cx-stamp-drop { animation: stampDrop 0.95s cubic-bezier(0.34,1.5,0.64,1) both; }

      .stamp-card {
        transform: rotate(var(--tilt, 0deg));
        transition: transform 450ms cubic-bezier(0.22,1,0.36,1),
                    box-shadow 450ms ease-out;
      }
      .stamp-card:hover {
        transform: rotate(0deg) translateY(-6px) scale(1.025);
      }

      @keyframes stampSparkle {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50%      { transform: scale(1.18) rotate(20deg); }
      }
      .stamp-card .stamp-spark { animation: stampSparkle 2.4s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .cx-rise, .cx-rise-slow, .cx-stagger { animation: none; }
        .cx-marquee-track { animation: none; }
        .cx-stamp-drop { animation: none; opacity: 1; }
        .stamp-card .stamp-spark { animation: none; }
        .stamp-card:hover { transform: rotate(var(--tilt, 0deg)); }
      }
    `}</style>
  )
}
