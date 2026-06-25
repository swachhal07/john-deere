import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Reveal from '../components/Reveal'

import heroVideo from '../assets/hero-clip.mp4'
import hero1 from '../assets/wp9633811.jpg'
import hero2 from '../assets/wp3183062.jpg'
import hero3 from '../assets/john-deere-tractor-and-harvesters-8vy92xu1qcrorfub.jpg'
import hero4 from '../assets/wp3183064.jpg'
import hero5 from '../assets/power-and-technology-background.avif'

const heroSlides = [
  { type: 'video', src: heroVideo },
  { type: 'image', src: hero1 },
  { type: 'image', src: hero2 },
  { type: 'image', src: hero3 },
  { type: 'image', src: hero4 },
  { type: 'image', src: hero5 },
]

const TERRAIN =
  'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=80'

// Verified MV Dugar facts. `node` carries the styled markup, `text` the
// plain string for screen readers.
const marqueeFacts = [
  {
    node: (
      <>
        Authorised <span className="text-jd-yellow">John Deere</span> distributor
      </>
    ),
    text: 'Authorised John Deere distributor',
  },
  {
    node: <>Kathmandu, Nepal</>,
    text: 'Kathmandu, Nepal',
  },
  {
    node: <>Est. 1995</>,
    text: 'Est. 1995',
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
      'The 5310 handles my Terai plots without strain, and MV Dugar had parts ready when I needed them. No downtime in two seasons.',
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
      'From paperwork to delivery, the MV Dugar team made buying my first tractor simple. The financing options actually fit a farmer’s budget.',
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

// Big-quote slideshow. Auto-advances every 7s; pauses on hover; manual dots.
function ReviewSlideshow({ items, interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, interval)
    return () => clearInterval(id)
  }, [paused, items.length, interval])

  const go = (next) => setIndex(((next % items.length) + items.length) % items.length)
  const r = items[index]

  // Split the quote around its highlight so the middle phrase renders in green.
  const parts = (() => {
    if (!r.highlight) return [r.quote, '', '']
    const idx = r.quote.indexOf(r.highlight)
    if (idx === -1) return [r.quote, '', '']
    return [
      r.quote.slice(0, idx),
      r.highlight,
      r.quote.slice(idx + r.highlight.length),
    ]
  })()

  return (
    <div
      className="relative mx-auto max-w-4xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <div className="min-h-[20rem] md:min-h-[22rem]">
        <motion.div
          key={r.name + index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <blockquote className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[#16210f] md:text-4xl lg:text-5xl">
            &ldquo;{parts[0]}
            {parts[1] && <span className="text-jd-green">{parts[1]}</span>}
            {parts[2]}&rdquo;
          </blockquote>

          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <span
              aria-hidden
              className="grid h-12 w-12 place-items-center rounded-full bg-jd-green font-display text-xl font-extrabold text-white"
            >
              {r.name.charAt(0)}
            </span>
            <div>
              <p className="font-display text-base font-extrabold uppercase tracking-tight text-black">
                {r.name}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
                {r.location}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((it, i) => {
          const active = i === index
          return (
            <button
              key={it.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                active ? 'w-8 bg-jd-green' : 'w-1.5 bg-black/20 hover:bg-black/40'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// Common pre-sale and ownership questions. PLACEHOLDER answers — confirm warranty,
// financing and service-network details with MV Dugar before launch.
const faqs = [
  {
    q: 'What warranty comes with a new John Deere tractor?',
    a: 'Every new John Deere ships with the standard manufacturer warranty covering the engine and major driveline components. Extended warranty packages are available — ask your MV Dugar sales contact for the option that fits your usage.',
  },
  {
    q: 'How do I schedule a service visit?',
    a: 'Call any MV Dugar branch or our service line and we’ll arrange it. We offer both on-site field service and workshop appointments, scheduled around your season.',
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
    a: 'MV Dugar serves all 7 provinces through its branches and trained field technicians. Get in touch and we’ll point you to the nearest service point.',
  },
  {
    q: 'Is operator training included at the time of delivery?',
    a: 'Yes. Every handover includes hands-on operator training so you and your team can run the machine safely and get the most out of it from day one.',
  },
]

function FaqAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="border-t border-black/10">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <li key={i} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={`font-display text-lg font-extrabold tracking-tight transition-colors ${isOpen ? 'text-jd-green' : 'text-mist group-hover:text-jd-green'}`}
              >
                {f.q}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-jd-green bg-jd-green text-white' : 'border-black/20 text-mist group-hover:border-jd-green group-hover:bg-jd-green group-hover:text-white'}`}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="pb-7 pr-10 leading-relaxed text-mist-dim">{f.a}</p>
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
    title: 'Tractor Sales',
    blurb: 'The complete John Deere 5000 Series, from 45 to 63 HP, matched to your land.',
    image: hero2,
    to: '/products',
    cta: 'View the 5000 Series',
    feature: true,
  },
  {
    title: 'Harvesting Equipment',
    blurb: 'Combine harvesters that bring the crop home faster, with less grain loss.',
    image: hero3,
    to: '/products',
  },
  {
    title: 'Implements & Attachments',
    blurb: 'Tillers, ploughs and seed drills matched to every John Deere tractor.',
    image: hero4,
    to: '/products',
  },
  {
    title: 'Genuine Parts',
    blurb: 'Authentic John Deere parts, stocked and ready across Nepal.',
    icon: <PackageIcon />,
    to: '/about',
  },
  {
    title: 'Service & Maintenance',
    blurb: 'Trained technicians and field support that keep your machines running.',
    icon: <ToolIcon />,
    to: '/about',
  },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

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
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-end overflow-hidden grain">
        <div className="absolute inset-0">
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
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={s.src}
                  alt=""
                  aria-hidden={i !== slide}
                  className="h-full w-full object-cover animate-[kenburns_8s_ease-in-out_infinite_alternate]"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </div>
        <style>{`@keyframes kenburns{from{transform:scale(1)}to{transform:scale(1.09)}}`}</style>

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
        aria-label="MV Dugar at a glance"
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
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-24 md:pb-32">
        <div className="relative mx-auto max-w-[92rem] px-6">
          <Reveal className="mb-14 mx-auto max-w-4xl text-center">
            <p className="eyebrow !text-lg text-jd-green mb-4">What we do</p>
            <h2 className="text-6xl leading-[1.05] text-mist md:text-7xl">
              More than machines.
              <br />
              <span className="text-jd-green md:whitespace-nowrap">
                A partner for every season.
              </span>
            </h2>
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-[24rem_1fr] lg:gap-16 lg:items-center">
            {/* Service list */}
            <ul
              className="border-t border-black/10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {specialties.map((s, i) => (
                <li key={s.title} className="border-b border-black/10">
                  <div
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                    className="group flex items-center gap-5 py-7 transition-colors"
                  >
                    {/* Thumbnail (mobile) */}
                    <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg lg:hidden">
                      {s.image ? (
                        <img src={s.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="grid h-full w-full place-items-center bg-jd-green text-white">
                          {s.icon}
                        </span>
                      )}
                    </span>

                    <div className="flex-1">
                      <h3
                        className={`font-display text-2xl font-extrabold leading-tight transition-colors md:text-3xl whitespace-nowrap ${active === i ? 'text-jd-green' : 'text-mist'
                          }`}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-1.5 max-w-md leading-relaxed text-mist-dim">
                        {s.blurb}
                      </p>
                    </div>

                    <span
                      className={`hidden shrink-0 text-2xl text-jd-green transition-all md:block ${active === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                        }`}
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </li>
              ))}
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
      <section className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-14 md:pb-20">

        <div className="relative mx-auto w-full max-w-[88rem] px-6">
          <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <div className="flex items-center justify-center gap-4 text-base font-bold uppercase tracking-[0.32em] text-jd-green md:text-xl">
              <span className="h-px w-16 bg-jd-green" />
              In their own words
              <span className="h-px w-16 bg-jd-green" />
            </div>
          </Reveal>

          <div
            role="region"
            aria-label="Farmer testimonials"
            aria-roledescription="carousel"
            className="mx-auto flex w-full flex-col items-center text-center"
          >
            <ReviewSlideshow items={reviews} />
          </div>
        </div>
      </section>

      {/* ============ FAQ (split intro + accordion) ============ */}
      <section className="relative bg-ink-soft py-24 md:py-32">
        <div className="relative mx-auto grid max-w-[88rem] items-start gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-jd-green" />
              <span className="eyebrow !text-base text-jd-green">Got questions?</span>
            </div>
            <h2 className="text-6xl font-extrabold uppercase leading-[0.92] text-mist md:text-7xl">
              Let’s clear
              <br />
              it up.
            </h2>
            <p className="mt-7 max-w-lg text-xl leading-relaxed text-mist-dim">
              Straight answers to what Nepal’s farmers, fleet owners and operators
              ask us most often.
            </p>
            <a
              href="tel:+97714000000"
              className="mt-9 inline-flex items-center gap-3 rounded-sm bg-mist px-8 py-5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-jd-green"
            >
              <PhoneIcon /> Still unsure? Just call: +977 1 400 0000
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>
    </>
  )
}
