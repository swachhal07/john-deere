import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import jdLogo from '../assets/john-deere-logo.png'
import mvDugarLogo from '../assets/MVDUGAR-01.png'
import coverFieldBg from '../assets/wp9212100.webp'
import storySlide1 from '../assets/WhatsApp Image 2026-06-26 at 8.30.45 AM.webp'
import storySlide2 from '../assets/WhatsApp Image 2026-06-26 at 8.30.46 AM.webp'
import storySlide3 from '../assets/WhatsApp Image 2026-06-26 at 8.30.47 AM.webp'
import storySlide4 from '../assets/WhatsApp Image 2026-06-26 at 8.33.10 AM.webp'

import serviceTeamPhoto from '../assets/_DSC5954.jpg.webp'
import serviceTeamPhoto2 from '../assets/_DSC5898.jpg.webp'

/* ────────────────────────────────────────────────────────────
   ABOUT — "Field Almanac"
   A magazine-feature editorial. Cream paper, italic Fraunces
   serif, sidebar margin labels, drop caps, breakout pull quote,
   polaroid-framed team photos, postcard sign-off. Distinctively
   different from any other page on the site.
   ──────────────────────────────────────────────────────────── */

const storySlides = [storySlide1, storySlide2, storySlide3, storySlide4]



const roadAhead = [
  { n: '01', title: 'Network expansion', body: 'Extending our outlet network beyond 27 locations to reach agricultural districts that remain underserved.' },
  { n: '02', title: 'Growing our farmer community', body: 'Targeted outreach across remote hill and mountain regions, building on our base of 12,000+ farmers.' },
  { n: '03', title: 'Expanding the implements portfolio', body: 'Broadening our John Deere implement range to cover every crop type and terrain condition in Nepal.' },
  { n: '04', title: 'Digital transformation', body: 'Online spare parts procurement, service scheduling, and farmer support, available anytime, from anywhere.' },
  { n: '05', title: 'Precision agriculture', body: 'Smart farming technologies, GPS-guided machinery, and data-driven tools for higher yields and lower input costs.' },
  { n: '06', title: 'Farmer knowledge & capability', body: 'Structured training, field demonstrations, and workshops so every owner runs their machine at peak performance.' },
  { n: '07', title: 'A stronger dealer network', body: 'Elevating service standards and parts availability across our 30+ authorised partner network.' },
]

const BAND_YELLOW = '#ffde00'

function WhyChooseScroll() {
  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden text-[#1a261a]"
      style={{ backgroundColor: BAND_YELLOW }}
    >
      {/* ── Heading ─────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-12 pt-10 md:pb-14 md:pt-14 lg:px-12">
        <div className="cx-rise text-center">
          <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-[#1a261a] md:text-xl">
            <span className="h-px w-16 bg-[#1a261a]" />
            A nationwide network
            <span className="h-px w-16 bg-[#1a261a]" />
          </div>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] md:text-6xl lg:text-7xl">
            Backed by{' '}
            <span className="whitespace-nowrap text-jd-green">180+ years</span>{' '}
            of John Deere<span className="text-[#1a261a]">.</span>
          </h2>
        </div>
      </div>

      {/* ── City marquee — full-bleed ───────────────────── */}
      <div className="overflow-hidden border-t border-[#1a261a]/15 py-6" style={{ backgroundColor: BAND_YELLOW }}>
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
    bio: 'Our sales team pairs technical depth with on-the-ground experience. They walk farms, talk through soil, slope and crop, and stay involved long after delivery, because the relationship is the product.',
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
    bio: 'Factory-trained, parts-stocked, and always reachable. The service team carries the machine from first commissioning to its tenth season, through warranty work, scheduled servicing, and the late-night calls when the monsoon hits.',
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
  const rootRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setStoryIndex((i) => (i + 1) % storySlides.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  // Scroll reveals — native IntersectionObserver + CSS transitions.
  // Fail-safe by design: elements are visible by default, and the hidden
  // "pre-reveal" state only exists while `rv-armed` is on the root. If this
  // effect never runs (or errors), every section still renders.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = root.querySelectorAll('[data-rv]')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target
            el.classList.add('rv-in')
            io.unobserve(el)
            // Once the reveal has played (delay + duration), strip the
            // reveal styling so the element's own (faster) hover
            // transitions apply again.
            setTimeout(() => {
              el.removeAttribute('data-rv')
              el.classList.remove('rv-in')
            }, 1400)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    root.classList.add('rv-armed')
    els.forEach((el) => {
      // Anything already scrolled past (e.g. reload with scroll restoration)
      // shows instantly instead of waiting to be scrolled back into view.
      if (el.getBoundingClientRect().bottom < 0) {
        el.removeAttribute('data-rv')
      } else {
        io.observe(el)
      }
    })

    return () => {
      io.disconnect()
      root.classList.remove('rv-armed')
    }
  }, [])

  return (
    <main ref={rootRef} className="relative bg-white text-[#1a261a]">
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
            <span>Vivek Automobiles &middot; MV Dugar Group</span>
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
              The story, the philosophy, and the people behind Vivek
              Automobiles, a member of the MV Dugar Group and John Deere&rsquo;s
              authorised dealer in Nepal, from the hill terraces to the Terai
              plains.
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
                    A part of
                  </p>
                  <img
                    src={mvDugarLogo}
                    alt="MV Dugar"
                    className="my-4 mx-auto h-20 w-auto md:h-24"
                  />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a261a]">
                    MV Dugar Group
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
                    Authorised
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
                      V
                    </span>
                    ivek Automobile Pvt. Ltd., a distinguished member of the MV
                    Dugar Group, was established in 2002 as an authorised dealer
                    for John Deere, the world&rsquo;s foremost name in
                    agricultural machinery. From the very beginning, our mandate
                    has been clear: to bring world-class tractors, implements,
                    and agricultural solutions to the farming communities of
                    Nepal, with the highest standards of sales, service, and
                    spare parts support.
                  </p>
                  <p>
                    Over more than two decades of dedicated service, we have
                    established ourselves as Nepal&rsquo;s most trusted
                    agricultural machinery partner. Our John Deere tractors and
                    implements have proven their performance across the full
                    breadth of Nepal&rsquo;s terrain, from the fertile plains of
                    the Terai to the challenging slopes of the Pahad hills, and
                    the demanding high-altitude conditions of the Himalayas.
                  </p>
                  <p>
                    Today, Vivek Automobiles operates{' '}
                    <strong className="font-semibold text-[#1a261a]">
                      27 company-owned outlets
                    </strong>{' '}
                    and supports an extended network of{' '}
                    <strong className="font-semibold text-[#1a261a]">
                      30+ authorised service and spare parts centres
                    </strong>{' '}
                    across the country. With{' '}
                    <strong className="font-semibold text-[#1a261a]">
                      over 12,000 farmers
                    </strong>{' '}
                    served to date, we have built more than a dealership; we
                    have forged a lasting partnership with Nepal&rsquo;s
                    agricultural community.
                  </p>
                  <p>
                    No geography presents a barrier, and no condition is beyond
                    our machinery&rsquo;s capability. We match every machine to
                    the land it will actually work, because no two farms in
                    Nepal are alike, specifying the right tractor, the right
                    implement, and the right support for each.
                  </p>
                  <p>
                    Our purpose remains as resolute as it was on the first day:
                    when farmers thrive, Nepal thrives. That is the work
                    we&rsquo;ve been doing for more than twenty years, and the
                    work we intend to keep doing for the next twenty.
                  </p>
                </article>

                {/* Image side — paper-framed slideshow */}
                <figure className="cx-rise-slow lg:order-1 lg:sticky lg:top-28 lg:self-start">
                  <div
                    className="story-plate relative bg-white p-3 md:p-4"
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
              <blockquote data-rv="quote" className="mt-16 text-center md:mt-20">
                <p className="font-['Fraunces'] text-3xl font-medium leading-[1.15] text-[#1a261a] md:text-4xl lg:text-5xl">
                  &ldquo;From hill terraces to the Terai plains, wherever
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

      {/* ── VOLUME II — OUR PHILOSOPHY ──────────────────── */}
      <section className="border-b border-[#1a261a]/15 bg-[#f4f6f0]">
        <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-14 md:pt-28 md:pb-16 lg:px-12">
          <header className="cx-rise mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              Our philosophy
              <span className="h-px w-16 bg-jd-green" />
            </div>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] md:text-6xl lg:text-7xl">
              Transcend:{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                from good to great
                <svg
                  className="absolute -bottom-2.5 left-0 h-3 w-full md:-bottom-3.5 md:h-4"
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

          {/* Editorial spread — creed on the left, tenet ledger on the right */}
          <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-[5fr_7fr] lg:gap-20">
            {/* The creed */}
            <div className="cx-rise lg:sticky lg:top-28 lg:self-start">
              <p className="font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#1a261a] md:text-4xl">
                At Vivek Automobiles,{' '}
                <span className="text-jd-green">mediocrity is not an option.</span>
              </p>
              <p className="mt-6 text-lg leading-[1.6] text-[#3a4a36] md:text-xl">
                We share a philosophy with John Deere, Transcend: From Good to
                Great, a principle that shapes every decision we make, every
                service we deliver, and every relationship we build. This is
                not merely a corporate statement. It is the standard by which
                we measure ourselves each day.
              </p>

              {/* Where it shows — the improvement paragraph, as an index */}
              <div className="mt-10">
                <p className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-jd-green">
                  <span className="h-px w-8 bg-jd-green" />
                  Where it shows
                </p>
                <p className="mt-4 text-base leading-[1.6] text-[#3a4a36] md:text-lg">
                  This philosophy manifests in continuous improvement across
                  every dimension of our business:
                </p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    { word: 'Calibre', of: 'of our outlets' },
                    { word: 'Expertise', of: 'of our technicians' },
                    { word: 'Reliability', of: 'of our spare parts supply chain' },
                    { word: 'Depth', of: 'of our engagement with farming communities' },
                  ].map((d) => (
                    <li key={d.word} className="flex items-baseline gap-3 text-base md:text-lg">
                      <span
                        aria-hidden
                        className="h-2 w-2 flex-none translate-y-px rotate-45 bg-jd-yellow"
                      />
                      <span>
                        <span className="font-display font-extrabold tracking-tight text-[#1a261a]">
                          {d.word}
                        </span>{' '}
                        <span className="text-[#3a4a36]">{d.of}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 font-display text-2xl font-extrabold leading-tight tracking-[-0.01em] text-jd-green md:text-[26px]">
                  Each year, we raise the bar.
                  <br />
                  Each year, we push further.
                </p>
              </div>
            </div>

            {/* The four refusals — dark manifesto panel */}
            <div
              className="cx-rise relative overflow-hidden bg-[#1a261a] px-7 py-2 md:px-12 md:py-4"
              style={{ boxShadow: '0 40px 90px -50px rgba(26,38,26,0.9)' }}
            >
              {/* Corner label */}
              <div className="flex items-center justify-between border-b border-[#f4f6f0]/15 py-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-jd-yellow">
                  The four refusals
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#f4f6f0]/40">
                  No. I &ndash; IV
                </p>
              </div>

              <div className="divide-y divide-[#f4f6f0]/10">
                {[
                  {
                    n: '01',
                    lead: 'Reject the merely good',
                    pre: 'We do not accept good service when ',
                    em: 'exceptional service',
                    post: ' is achievable.',
                  },
                  {
                    n: '02',
                    lead: 'Nothing ordinary',
                    pre: 'We do not offer ordinary products when John Deere represents ',
                    em: 'the pinnacle of agricultural engineering',
                    post: '.',
                  },
                  {
                    n: '03',
                    lead: 'No farmer out of reach',
                    pre: 'We do not settle for adequate coverage when ',
                    em: 'every farmer in Nepal',
                    post: ' deserves quality machinery and support.',
                  },
                  {
                    n: '04',
                    lead: 'Never rest on the past',
                    pre: 'We do not rest on our achievements when there is always more ground to cover, and ',
                    em: 'more farmers to serve',
                    post: '.',
                  },
                ].map((item, i) => (
                  <div
                    key={item.n}
                    data-rv="rise"
                    style={{ '--rv-delay': `${i * 0.1}s` }}
                    className="group grid grid-cols-[3.25rem_1fr] items-start gap-x-5 py-7 md:grid-cols-[4.5rem_1fr] md:gap-x-8 md:py-8"
                  >
                    <span
                      className="font-display text-4xl font-extrabold leading-none text-transparent transition-colors duration-300 group-hover:text-jd-yellow md:text-5xl"
                      style={{ WebkitTextStroke: '1.5px rgba(255,222,0,0.75)' }}
                    >
                      {item.n}
                    </span>
                    <div className="transition-transform duration-300 group-hover:translate-x-1.5">
                      <h3 className="font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-[#f4f6f0] md:text-[27px]">
                        {item.lead}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-[15px] leading-[1.55] text-[#f4f6f0]/65 md:text-base">
                        {item.pre}
                        <span className="font-semibold text-jd-yellow">{item.em}</span>
                        {item.post}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manifesto pull quote */}
          <blockquote data-rv="quote" className="mx-auto mt-20 max-w-4xl text-center md:mt-24">
            <p className="font-['Fraunces'] text-3xl font-medium leading-[1.15] text-[#1a261a] md:text-4xl lg:text-5xl">
              &ldquo;We are not simply selling tractors and implements. We are{' '}
              <span className="text-jd-green">
                redefining what agricultural support means for Nepal
              </span>
              .&rdquo;
            </p>
            <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#1a261a]">
              Field Notes &middot; Vol. II
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── VOLUME III — THE TRUSTED PARTNER ────────────── */}
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

      {/* ── VOLUME IV — OUR TEAM ───────────────────────── */}
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
                        strokeWidth="10"
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

      {/* ── VOLUME V — THE ROAD AHEAD ──────────────────── */}
      <section className="border-b border-[#1a261a]/15 bg-[#f4f6f0]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28 lg:px-12">
          <header className="cx-rise mb-14 text-center md:mb-16">
            <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              The road ahead
              <span className="h-px w-16 bg-jd-green" />
            </div>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1a261a] md:text-6xl lg:text-7xl">
              The ground{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                still ahead
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
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.6] text-[#3a4a36]">
              We regard our achievements not as a destination, but as the
              foundation from which we continue to build. Our strategic
              priorities for the years ahead:
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roadAhead.map((r, i) => (
              <li
                key={r.n}
                data-rv="rise"
                style={{ '--rv-delay': `${(i % 3) * 0.1}s` }}
                className={`group relative border border-[#1a261a]/15 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-jd-green/40 hover:shadow-[0_24px_48px_-30px_rgba(26,38,26,0.55)] md:p-9 ${
                  i === roadAhead.length - 1 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl font-extrabold leading-none text-jd-green md:text-4xl">
                    {r.n}
                  </span>
                  <span className="h-px flex-1 bg-jd-green/25" />
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold leading-[1.12] tracking-tight text-[#1a261a] md:text-2xl">
                  {r.title}
                </h3>
                <p className="mt-3 text-base leading-[1.55] text-[#3a4a36]">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CODA — Sign-off ────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-24 md:pt-16 md:pb-32 lg:px-12">
          <div className="cx-rise mx-auto max-w-6xl text-center md:-mt-6">
            <div className="mb-8 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              In closing
              <span className="h-px w-16 bg-jd-green" />
            </div>

            <blockquote className="font-display text-[32px] font-extrabold leading-[1.12] tracking-[-0.015em] text-[#1a261a] md:text-5xl lg:text-[56px]">
              &ldquo;Together with Nepal&rsquo;s farmers, we are building a more
              productive, more prosperous, and a{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                truly great
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
              {' '}agricultural nation.&rdquo;
            </blockquote>

            <div className="mt-12 flex items-center justify-center gap-4 text-[#1a261a]/55">
              <span className="h-px w-12 bg-[#1a261a]/25" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.4em]">
                With every machine &mdash; the team at Vivek Automobiles
              </p>
              <span className="h-px w-12 bg-[#1a261a]/25" />
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-jd-green px-7 py-4 text-xs font-bold uppercase tracking-[0.28em] text-white transition-colors hover:bg-jd-green-deep"
              >
                <span className="relative z-10">Visit the showroom</span>
                <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0 bg-jd-yellow/15 transition-[width] duration-500 ease-out group-hover:w-full"
                />
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

      /* ── Scroll reveals ─────────────────────────────────
         Hidden state exists only under .rv-armed (added by the
         IntersectionObserver effect), so content is never stranded
         invisible if JS fails or reduced motion is on. */
      .rv-armed [data-rv] {
        opacity: 0;
        transform: translateY(34px);
      }
      .rv-armed [data-rv='quote'] {
        transform: translateY(36px) scale(0.97);
      }
      /* The 0.9s transition lives only on the reveal itself; once played,
         the JS strips data-rv so cards get their fast hover transition back. */
      .rv-armed [data-rv].rv-in {
        opacity: 1;
        transform: none;
        transition:
          opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
          transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        transition-delay: var(--rv-delay, 0s);
      }

      /* Story polaroid settles from a stronger tilt as it scrolls in —
         pure CSS scroll-driven animation; browsers without support just
         show the resting 1.2deg tilt from the inline style. */
      @media (prefers-reduced-motion: no-preference) {
        @supports (animation-timeline: view()) {
          .story-plate {
            animation: plateSettle linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 45%;
          }
        }
      }
      @keyframes plateSettle {
        from { transform: rotate(4.5deg) translateY(24px); }
        to   { transform: rotate(1.2deg) translateY(0); }
      }

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
