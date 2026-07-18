import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import { gsap, useGSAP } from '../lib/gsap'

import serviceTeam from '../assets/WhatsApp Image 2026-06-26 at 2.44.17 PM.webp'
import genuineParts from '../assets/WhatsApp Image 2026-06-26 at 3.25.57 PM.webp'
import heroVideo from '../assets/878c2f97-b4c0-4141-bd25-2469d5da7a78.mp4'
import hero1 from '../assets/wp9633811.webp'
import hero2 from '../assets/wp3183062.webp'
import hero4 from '../assets/wp3183064.webp'
import hero5 from '../assets/power-and-technology-background.avif'
import hero6 from '../assets/69892118-tracteur-travail-dans-champ-a-le-coucher-du-soleil-agriculture-agriculture-recolte-rural-paysage-et-durable-les-pratiques-gratuit-photo.webp'
import hero11 from '../assets/a0d81b1f-4773-4d2c-b8e7-0c2f938df4d9.webp'
import hero12 from '../assets/05b7b343-dfe0-4c51-b42f-399fb652f4e1.webp'
import hero13 from '../assets/83af290a-005b-4889-8daf-f7ad21830cb3.webp'
import hero14 from '../assets/28c32bc4-018b-47b0-ab1f-e644ce2e4f78.webp'
import hero15 from '../assets/07b91e73-5381-4c06-872d-050270db769c.webp'

const heroSlides = [
  { type: 'video', src: heroVideo },
  { type: 'image', src: hero1 },
  { type: 'image', src: hero11 },
  { type: 'image', src: hero12, position: '50% 30%' },
  { type: 'image', src: hero13 },
  { type: 'image', src: hero14 },
  { type: 'image', src: hero15 },
]

const TERRAIN =
  'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=80'

// Verified MV Dugar facts. `node` carries the styled markup, `text` the
// plain string for screen readers.
const marqueeFacts = [
  {
    node: (
      <>
        Authorised <span className="text-jd-yellow">John Deere</span> Dealer
      </>
    ),
    text: 'Authorised John Deere Dealer',
  },
  {
    node: <>Kathmandu, Nepal</>,
    text: 'Kathmandu, Nepal',
  },
  {
    node: <>Est. 2002</>,
    text: 'Est. 2002',
  },
  {
    node: <>7 provinces served</>,
    text: '7 provinces served',
  },
]

function PackageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function ToolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9" aria-hidden>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

// Farmer testimonials. PLACEHOLDER copy — replace with real, approved reviews
// from MV Dugar customers before launch.
const reviews = [
  {
    name: 'Ramesh Thapa',
    location: 'Chitwan, Bagmati',
    quote:
      'The 5310 handles my Terai plots without strain, and Vivek Automobiles had parts ready when I needed them. No downtime in two seasons.',
    highlight: 'No downtime in two seasons',
  },
  {
    name: 'Sita Gurung',
    location: 'Kaski, Gandaki',
    quote:
      'On our hill terraces I needed something tight and reliable. Their team matched me to the right tractor and trained my son to run it.',
    highlight: 'Their team matched me to the right tractor',
  },
  {
    name: 'Bikash Yadav',
    location: 'Dhanusha, Madhesh',
    quote:
      'Service is what sold me. Field support shows up, the machine keeps working through monsoon, and the fuel economy is real.',
    highlight: 'Field support shows up',
  },
  {
    name: 'Anita Rai',
    location: 'Jhapa, Koshi',
    quote:
      'From paperwork to delivery, the Vivek Automobiles team made buying my first tractor simple. The financing options actually fit a farmer’s budget.',
    highlight: 'made buying my first tractor simple',
  },
  {
    name: 'Krishna Bahadur',
    location: 'Rupandehi, Lumbini',
    quote:
      'I plough, till and haul with one machine. The implements they recommended paid for themselves in a single paddy season.',
    highlight: 'paid for themselves in a single paddy season',
  },
  {
    name: 'Dipak Shrestha',
    location: 'Morang, Koshi',
    quote:
      'Genuine parts in stock locally means I’m never waiting weeks. That reliability is why my whole cooperative buys from them.',
    highlight: 'I’m never waiting weeks',
  },
  {
    name: 'Sunita Magar',
    location: 'Dang, Lumbini',
    quote:
      'The harvester cut our grain losses noticeably. What used to take a week of labour now finishes in two days.',
    highlight: 'finishes in two days',
  },
  {
    name: 'Hari Prasad',
    location: 'Bardiya, Lumbini',
    quote:
      'Honest advice, no overselling. They pointed me to the right horsepower for my land instead of the most expensive model.',
    highlight: 'Honest advice, no overselling',
  },
  {
    name: 'Gita Chaudhary',
    location: 'Kailali, Sudurpashchim',
    quote:
      'Trained technicians came to my farm for the first service. That kind of after-sales care is rare and I won’t forget it.',
    highlight: 'after-sales care is rare',
  },
]

function ArrowBtn({ dir, onClick, label }) {
  const slide = dir === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group grid h-[68px] w-[68px] flex-none place-items-center rounded-full bg-jd-green text-white shadow-[0_22px_40px_-18px_rgba(54,124,43,0.55)] transition-all duration-300 hover:scale-[1.06] hover:bg-jd-green-deep"
    >
      <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform duration-300 ${slide}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === 'prev' ? (
          <>
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </>
        ) : (
          <>
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </>
        )}
      </svg>
    </button>
  )
}

// Editorial review slideshow: title + big counter (left) / quote + reviewer (right).
function ReviewSlideshow({ items, interval = 7000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = items.length
  const pad = (n) => String(n).padStart(2, '0')

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % total), interval)
    return () => clearInterval(id)
  }, [paused, total, interval])

  const go = (next) => setIndex(((next % total) + total) % total)
  const r = items[index]

  const parts = (() => {
    if (!r.highlight) return [r.quote, '', '']
    const i = r.quote.indexOf(r.highlight)
    if (i === -1) return [r.quote, '', '']
    return [r.quote.slice(0, i), r.highlight, r.quote.slice(i + r.highlight.length)]
  })()

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge arrows (xl+ only — needs whitespace outside the content) */}
      <div className="pointer-events-none absolute inset-y-0 z-20 hidden items-center justify-between xl:flex" style={{ left: '-9rem', right: '-9rem' }}>
        <div className="pointer-events-auto">
          <ArrowBtn dir="prev" onClick={() => go(index - 1)} label="Previous testimonial" />
        </div>
        <div className="pointer-events-auto">
          <ArrowBtn dir="next" onClick={() => go(index + 1)} label="Next testimonial" />
        </div>
      </div>

      <div>
        {/* Content: title + counter | quote + reviewer */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-16 xl:gap-20">
          {/* LEFT */}
          <div className="flex flex-col items-center text-center lg:ml-8 xl:ml-16">
            <h2 className="font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] text-mist md:text-6xl lg:text-[3.75rem]">
              Voices from
              <br />
              <span className="text-jd-green">Nepal’s farms.</span>
            </h2>

            <div className="mt-1 flex items-end justify-center leading-[0.88] md:mt-2">
              <motion.span
                key={`n-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[6.5rem] font-extrabold tracking-tight text-jd-yellow-soft md:text-[8.5rem] lg:text-[9.5rem]"
              >
                {pad(index + 1)}
              </motion.span>
              <span className="mx-1 -translate-y-2 font-display text-[4.5rem] font-light text-mist/25 md:text-[6rem] lg:text-[7rem]">
                /
              </span>
              <span className="font-display text-[6.5rem] font-extrabold tracking-tight text-mist md:text-[8.5rem] lg:text-[9.5rem]">
                {pad(total)}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <motion.div
            key={r.name + index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-4 rounded-lg border border-mist/10 bg-white px-5 py-3 shadow-[0_10px_30px_-22px_rgba(22,33,15,0.35)]">
              <p className="font-display text-2xl font-extrabold leading-none text-mist md:text-3xl">
                20<span className="text-jd-green">+</span>
              </p>
              <div className="leading-tight">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-mist-dim">
                  Years of trust
                </p>
                <div className="mt-1 flex items-center gap-1 text-jd-yellow-soft" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <p className="mt-7 text-xl leading-[1.5] text-mist md:mt-9 md:text-2xl lg:text-3xl">
              {parts[0]}
              {parts[1] && (
                <span className="relative whitespace-normal font-semibold text-jd-green">
                  {parts[1]}
                  <svg
                    className="absolute left-0 w-full"
                    style={{ bottom: '-0.3em', height: '0.3em' }}
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
              )}
              {parts[2]}
            </p>

            {/* Reviewer */}
            <div className="mt-9 w-full max-w-xs border-t border-mist/10 pt-5 md:mt-10">
              <div className="flex items-center justify-center gap-4">
                <span
                  aria-hidden
                  className="grid h-12 w-12 flex-none place-items-center rounded-full bg-jd-green font-display text-base font-extrabold text-white"
                >
                  {r.name.charAt(0)}
                </span>
                <div className="min-w-0 text-left">
                  <p className="font-display text-base font-extrabold tracking-tight text-mist">
                    {r.name}
                  </p>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-mist-dim">
                    {r.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom controls (sm – lg). Hidden at xl where edge arrows take over. */}
      <div className="mt-12 flex items-center justify-center gap-6 xl:hidden">
        <ArrowBtn dir="prev" onClick={() => go(index - 1)} label="Previous testimonial" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-mist-dim">
          {pad(index + 1)} <span className="text-mist-dim/40">/</span> {pad(total)}
        </span>
        <ArrowBtn dir="next" onClick={() => go(index + 1)} label="Next testimonial" />
      </div>
    </div>
  )
}

// Common pre-sale and ownership questions. PLACEHOLDER answers — confirm warranty,
// financing and service-network details with MV Dugar before launch.
const faqs = [
  {
    q: 'What warranty comes with a new John Deere tractor?',
    a: 'Every new John Deere ships with the standard manufacturer warranty covering the engine and major driveline components. Extended warranty packages are available. Ask your Vivek Automobiles sales contact for the option that fits your usage.',
  },
  {
    q: 'How do I schedule a service visit?',
    a: 'Call any Vivek Automobiles branch or our service line and we’ll arrange it. We offer both on-site field service and workshop appointments, scheduled around your season.',
  },
  {
    q: 'Are genuine John Deere spare parts stocked in Nepal?',
    a: 'Yes. We hold authentic John Deere parts in stock locally and can source any additional part quickly through the dealer network, so you’re not left waiting.',
  },
  {
    q: 'Do you offer financing or lease options?',
    a: 'Yes. We work with partner banks to offer financing tailored to a farmer’s seasonal cash flow. Talk to us about down-payment and tenure options that suit you.',
  },
  {
    q: 'Where are your service centres located?',
    a: 'Vivek Automobiles serves all 7 provinces through its branches and trained field technicians. Get in touch and we’ll point you to the nearest service point.',
  },
  {
    q: 'Is operator training included at the time of delivery?',
    a: 'Yes. Every handover includes hands-on operator training so you and your team can run the machine safely and get the most out of it from day one.',
  },
]

function FaqAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="js-faq-list border-t border-black/80">
      {faqs.map((f, i) => {
        const isOpen = open === i
        const num = String(i + 1).padStart(2, '0')
        return (
          <li key={i} className="js-faq-item border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-8 py-8 text-left md:gap-12 md:py-10"
            >
              <span
                className={`font-display text-3xl font-light tabular-nums tracking-tight transition-colors md:text-4xl ${isOpen ? 'text-mist' : 'text-mist/25 group-hover:text-mist/50'}`}
                aria-hidden
              >
                {num}
              </span>
              <span
                className={`font-display text-xl font-semibold tracking-tight transition-colors md:text-2xl lg:text-3xl ${isOpen ? 'text-jd-green' : 'text-mist group-hover:text-jd-green'}`}
              >
                {f.q}
              </span>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-jd-green bg-jd-green text-white' : 'border-black/25 text-mist group-hover:border-jd-green group-hover:bg-jd-green group-hover:text-white'}`}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_auto] gap-8 md:gap-12">
                  <span aria-hidden className="invisible font-display text-3xl md:text-4xl">{num}</span>
                  <p className="pb-9 pr-4 text-base leading-relaxed text-mist-dim md:text-lg">{f.a}</p>
                  <span aria-hidden className="invisible h-11 w-11" />
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// What MV Dugar offers. Photo tiles use real machinery images; the parts and
// service tiles use icons. Confirm/adjust this offering list with the client.
const specialties = [
  {
    title: 'Tractors',
    blurb: 'The complete John Deere 5000 Series, from 45 to 63 HP, matched to your land.',
    image: hero2,
    to: '/products',
    cta: 'View the 5000 Series',
    feature: true,
  },
  {
    title: 'Implements',
    blurb: 'Tillers, ploughs and seed drills matched to every John Deere tractor.',
    image: hero4,
    to: '/products',
  },
  {
    title: 'Spare Parts',
    blurb: 'Authentic John Deere parts, stocked and ready across Nepal.',
    image: genuineParts,
    to: '/about',
  },
  {
    title: 'Service & Maintenance',
    blurb: 'Trained technicians and field support that keep your machines running.',
    image: serviceTeam,
    to: '/about',
  },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const rootRef = useRef(null)

  // GSAP scroll polish. Everything lives inside a reduced-motion media
  // query and is reverted automatically on route change by useGSAP.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero media drifts slower than the page as the hero scrolls away.
        gsap.to('.js-hero-media', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: '.js-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        // "What we do" rows rise in one after another.
        gsap.from('.js-spec-item', {
          y: 44,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: '.js-spec-list', start: 'top 82%' },
        })

        // Terraced-hillside backdrop drifts against the reviews section.
        gsap.fromTo(
          '.js-terrace',
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: '.js-reviews',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )

        // Trust strip: photo parallax + badge pops in.
        gsap.fromTo(
          '.js-trust-img',
          { y: 26 },
          {
            y: -26,
            ease: 'none',
            scrollTrigger: {
              trigger: '.js-trust',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
        gsap.from('.js-trust-badge', {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.js-trust', start: 'top 75%' },
        })

        // FAQ rows cascade in.
        gsap.from('.js-faq-item', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: '.js-faq-list', start: 'top 80%' },
        })
      })
    },
    { scope: rootRef },
  )

  useEffect(() => {
    const duration = heroSlides[slide].type === 'video' ? 60000 : 5500
    const id = setTimeout(
      () => setSlide((s) => (s + 1) % heroSlides.length),
      duration,
    )
    return () => clearTimeout(id)
  }, [slide])

  // Auto-advance the "What we do" list/photo; pauses while hovering the list.
  useEffect(() => {
    if (paused) return
    const id = setInterval(
      () => setActive((a) => (a + 1) % specialties.length),
      3500,
    )
    return () => clearInterval(id)
  }, [paused])

  const prev = () =>
    setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)
  const next = () => setSlide((s) => (s + 1) % heroSlides.length)

  return (
    <div ref={rootRef}>
      {/* ============ HERO ============ */}
      <section className="js-hero relative min-h-screen flex items-end overflow-hidden grain bg-black">
        <div className="js-hero-media absolute inset-0">
          {heroSlides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === slide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {s.type === 'video' ? (
                <video
                  src={s.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden={i !== slide}
                  className="h-full w-full scale-[1.4] object-cover md:scale-[1.6]"
                />
              ) : (
                <img
                  src={s.src}
                  alt=""
                  aria-hidden={i !== slide}
                  style={s.position ? { objectPosition: s.position } : undefined}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </div>

        {/* Prev / Next controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="group absolute left-4 md:left-6 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-transparent text-white transition-colors hover:border-jd-yellow hover:text-jd-yellow"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="group absolute right-4 md:right-6 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-transparent text-white transition-colors hover:border-jd-yellow hover:text-jd-yellow"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

      </section>

      {/* ============ STATS MARQUEE ============ */}
      <section
        aria-label="Vivek Automobiles at a glance"
        className="relative overflow-hidden border-y border-white/5 bg-jd-green-deep py-4"
      >
        {/* Accessible static copy */}
        <ul className="sr-only">
          {marqueeFacts.map((f) => (
            <li key={f.text}>{f.text}</li>
          ))}
        </ul>

        {/* Visual scrolling band */}
        <div aria-hidden className="stats-marquee flex w-max items-center">
          {[...marqueeFacts, ...marqueeFacts, ...marqueeFacts].map((f, i) => (
            <div key={i} className="flex items-center">
              <span className="whitespace-nowrap px-8 font-display text-xl font-semibold text-white md:text-2xl">
                {f.node}
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-jd-yellow" aria-hidden />
            </div>
          ))}
        </div>

        <style>{`
          .stats-marquee { animation: stats-marquee 34s linear infinite; }
          .stats-marquee:hover { animation-play-state: paused; }
          @keyframes stats-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-33.333%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .stats-marquee { animation: none; }
          }
        `}</style>
      </section>

      {/* ============ WHAT WE DO (interactive split) ============ */}
      <section className="relative overflow-hidden pt-10 pb-24 md:pt-12 md:pb-32">
        <div className="relative mx-auto max-w-[92rem] px-6">
          <Reveal className="mb-14 mx-auto max-w-5xl text-center">
            <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              What we do
              <span className="h-px w-16 bg-jd-green" />
            </div>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-mist md:text-6xl lg:text-7xl">
              More than machines.
              <br />
              <span className="relative inline-block text-jd-green">
                A partner for every season.
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
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-[34rem_1fr] lg:gap-20 lg:items-center">
            {/* Service list */}
            <ul
              className="js-spec-list flex flex-col gap-2"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {specialties.map((s, i) => {
                const isActive = active === i
                const num = String(i + 1).padStart(2, '0')
                return (
                  <li
                    key={s.title}
                    className={`js-spec-item border-b transition-colors duration-300 ${isActive ? 'border-transparent' : 'border-black/10'
                      }`}
                  >
                    <div
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      tabIndex={0}
                      className={`group flex cursor-pointer items-center gap-4 rounded-full px-6 py-5 transition-[background-color,box-shadow] duration-300 ${isActive ? 'bg-jd-yellow shadow-md' : 'bg-transparent'
                        }`}
                    >
                      {/* Arrow icon — reserves space in both states */}
                      <span
                        className={`shrink-0 transition-opacity duration-300 ${isActive ? 'text-black opacity-100' : 'opacity-0'
                          }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="9 7 17 7 17 15" />
                        </svg>
                      </span>

                      <h3
                        className={`flex-1 whitespace-nowrap font-display text-2xl font-extrabold leading-tight transition-colors md:text-3xl ${isActive ? 'text-black' : 'text-mist-dim/70'
                          }`}
                      >
                        {s.title}
                      </h3>

                      {/* Number badge */}
                      <span
                        className={`shrink-0 text-xs font-semibold transition-colors ${isActive ? 'text-black/70' : 'text-mist-dim/60'
                          }`}
                        aria-hidden
                      >
                        {num}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Sticky image preview (desktop) */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[43rem] overflow-hidden rounded-2xl border border-black/10 shadow-sm">
                {specialties.map((s, i) => (
                  <div
                    key={s.title}
                    className={`absolute inset-0 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    {s.image ? (
                      <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-jd-green to-jd-green-deep">
                        <div className="scale-[2.4] text-white/90">{s.icon}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-7 left-7 font-display text-3xl font-extrabold text-white">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS (farmer testimonials) ============ */}
      <section className="js-reviews relative overflow-hidden bg-white py-24 md:py-32">
        {/* Terraced hillside lines — curvy stepped contour bands with gentle drift animation */}
        <div
          aria-hidden="true"
          className="js-terrace pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        >
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1600 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="#367c2b"
            strokeLinecap="round"
          >
            <style>{`
              .terrace {
                animation-name: terraceDrift;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                animation-timing-function: ease-in-out;
                will-change: transform;
              }
              @keyframes terraceDrift {
                from { transform: translateX(-45px); }
                to   { transform: translateX(45px); }
              }
              @media (prefers-reduced-motion: reduce) {
                .terrace { animation: none; }
              }
            `}</style>

            {/* 14 stacked terrace lines — each drifts horizontally at a different pace,
                creating a parallax "wind over the terraces" effect */}
            {[
              { d: "M -60 65   C 180 15, 380 110, 560 60  C 760 5, 980 110, 1180 55  C 1380 0, 1540 95, 1660 60", t: 4.5, e: 0 },
              { d: "M -60 118  C 190 70, 390 162, 570 110 C 770 55, 990 162, 1190 105 C 1390 50, 1550 145, 1660 112", t: 5.2, e: 0.4 },
              { d: "M -60 172  C 200 125, 400 215, 580 162 C 780 105, 1000 215, 1200 158 C 1400 100, 1560 198, 1660 165", t: 6.1, e: 0.2 },
              { d: "M -60 228  C 210 180, 410 270, 590 218 C 790 160, 1010 270, 1210 212 C 1410 155, 1570 252, 1660 220", t: 4.8, e: 0.7 },
              { d: "M -60 286  C 220 238, 420 328, 600 276 C 800 220, 1020 328, 1220 270 C 1420 215, 1580 310, 1660 280", t: 7.0, e: 0.1 },
              { d: "M -60 346  C 230 298, 430 388, 610 334 C 810 280, 1030 388, 1230 332 C 1430 275, 1590 370, 1660 340", t: 5.4, e: 0.6 },
              { d: "M -60 408  C 240 360, 440 450, 620 396 C 820 340, 1040 450, 1240 394 C 1440 340, 1600 430, 1660 402", t: 6.6, e: 0.3 },
              { d: "M -60 470  C 250 422, 450 510, 630 458 C 830 402, 1050 510, 1250 454 C 1450 400, 1610 490, 1660 462", t: 4.2, e: 0.9 },
              { d: "M -60 530  C 240 484, 440 568, 620 518 C 820 462, 1040 568, 1240 514 C 1440 462, 1600 548, 1660 522", t: 5.8, e: 0.0 },
              { d: "M -60 590  C 230 546, 430 626, 610 576 C 810 522, 1030 626, 1230 572 C 1430 520, 1590 606, 1660 580", t: 7.4, e: 0.5 },
              { d: "M -60 648  C 220 606, 420 682, 600 632 C 800 580, 1020 682, 1220 628 C 1420 578, 1580 660, 1660 634", t: 4.6, e: 1.0 },
              { d: "M -60 704  C 210 664, 410 736, 590 686 C 790 638, 1010 736, 1210 682 C 1410 634, 1570 716, 1660 690", t: 6.0, e: 0.2 },
              { d: "M -60 752  C 200 716, 400 786, 580 736 C 780 690, 1000 786, 1200 732 C 1400 686, 1560 762, 1660 738", t: 5.0, e: 0.6 },
              { d: "M -60 794  C 190 762, 390 798, 570 776 C 770 754, 990 798, 1190 774 C 1390 752, 1550 794, 1660 778", t: 7.8, e: 0.0 },
            ].map((line, i) => (
              <path
                key={i}
                className="terrace"
                d={line.d}
                strokeWidth="1.4"
                style={{ animationDuration: `${line.t}s`, animationDelay: `-${line.e}s` }}
              />
            ))}

            {/* Tiny vertical "step" notches — short marks to suggest terrace walls */}
            <g strokeWidth="0.9" strokeOpacity="0.55">
              <line x1="120" y1="65" x2="120" y2="118" />
              <line x1="420" y1="172" x2="420" y2="228" />
              <line x1="720" y1="55" x2="720" y2="105" />
              <line x1="980" y1="240" x2="980" y2="300" />
              <line x1="1240" y1="118" x2="1240" y2="170" />
              <line x1="1500" y1="290" x2="1500" y2="350" />

              <line x1="200" y1="380" x2="200" y2="440" />
              <line x1="540" y1="450" x2="540" y2="510" />
              <line x1="860" y1="335" x2="860" y2="395" />
              <line x1="1140" y1="470" x2="1140" y2="528" />
              <line x1="1400" y1="405" x2="1400" y2="465" />

              <line x1="280" y1="620" x2="280" y2="678" />
              <line x1="620" y1="575" x2="620" y2="632" />
              <line x1="940" y1="685" x2="940" y2="734" />
              <line x1="1280" y1="640" x2="1280" y2="695" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[80rem] px-6">
          <div
            role="region"
            aria-label="Farmer testimonials"
            aria-roledescription="carousel"
          >
            <ReviewSlideshow items={reviews} />
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP (yellow banner) ============ */}
      <section className="js-trust relative overflow-hidden bg-jd-yellow">
        <div className="relative mx-auto flex max-w-[88rem] flex-col items-center gap-10 px-6 py-12 md:flex-row md:justify-between md:py-14">
          {/* Left: image + headline */}
          <div className="flex items-center gap-5">
            <img
              src={hero6}
              alt=""
              className="js-trust-img h-24 w-32 shrink-0 rounded-xl object-cover shadow-md md:h-28 md:w-40"
            />
            <p className="font-display text-2xl font-extrabold leading-tight text-black md:text-3xl">
              Nepal's Trusted
              <br />
              John Deere Partner
            </p>
          </div>

          {/* Center: rotating badge */}
          <a
            href="/products"
            className="js-trust-badge group relative grid h-36 w-36 shrink-0 place-items-center rounded-full border-2 border-black/80 bg-white md:h-40 md:w-40"
            aria-label="Explore more"
          >
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]"
              aria-hidden
            >
              <defs>
                <path
                  id="badge-circle"
                  d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
                />
              </defs>
              <text
                className="fill-black font-display text-[15px] font-bold uppercase"
              >
                <textPath
                  href="#badge-circle"
                  startOffset="0"
                  textLength="477"
                  lengthAdjust="spacingAndGlyphs"
                >
                  EXPLORES MORE  •  EXPLORES MORE  •
                </textPath>
              </text>
            </svg>
            <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-black bg-jd-yellow text-black transition-transform group-hover:scale-110 md:h-20 md:w-20">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="9 7 17 7 17 15" />
              </svg>
            </span>
          </a>

          {/* Right: trust + avatars */}
          <div className="flex items-center gap-5">
            <p className="font-display text-2xl font-extrabold leading-tight text-black md:text-3xl">
              12,000+ Nepali Farmers
              <br />
              Trust Vivek Automobiles.
            </p>
            <div className="flex -space-x-3">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border-[3px] border-jd-yellow bg-jd-green text-white md:h-14 md:w-14">
                <img src={serviceTeam} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border-[3px] border-jd-yellow bg-jd-green-deep text-white md:h-14 md:w-14">
                <img src={genuineParts} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border-[3px] border-jd-yellow bg-jd-green-bright text-white md:h-14 md:w-14">
                <img src={hero2} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-jd-yellow bg-white text-xl font-bold text-black md:h-14 md:w-14">
                +
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="relative mx-auto max-w-[88rem] px-6">
          <Reveal className="mx-auto max-w-5xl text-center">
            <div className="mb-6 flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              Vivek Automobiles FAQs
              <span className="h-px w-16 bg-jd-green" />
            </div>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] text-mist md:text-6xl lg:text-7xl">
              Questions{' '}
              <span className="relative inline-block text-jd-green">
                about our work.
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
          </Reveal>

          <div className="mt-12 md:mt-16">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </div>
  )
}
