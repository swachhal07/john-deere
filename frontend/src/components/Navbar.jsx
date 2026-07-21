import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import logo from '../assets/john-deere-logo.png'
import dugarLogo from '../assets/MVDUGAR-01.png'
import dSeriesImg from '../assets/john-deere-india-d-series-tractors 5045d.avif'
import eSeriesImg from '../assets/john-deere-5405-tractor-termiv.webp'

const leftNavItems = [
  { to: '/', label: 'Home' },
  {
    to: '/products',
    label: 'Products',
    mega: true,
    eyebrow: 'John Deere 5-Series',
    blurb:
      'Tractors engineered for Nepal — from nimble utility workhorses to heavy-duty field performers.',
    series: [
      {
        to: '/products/d-series',
        name: '5D Series',
        hp: '36–50 HP',
        image: dSeriesImg,
        desc: 'John Deere 5D series tractors range from 36 HP to 50 HP. The 5D series tractors are multi utility in nature, efficient in both agricultural applications as well as heavy duty haulage.',
      },
      {
        to: '/products/e-series',
        name: '5E Series',
        hp: '50–74 HP',
        image: eSeriesImg,
        desc: 'John Deere 5E Series tractors are available from 50 HP to 74 HP. The 5E series tractors are specially designed for heavy duty applications and to handle large size implements with great ease and efficiency.',
      },
    ],
    links: [
      { to: '/products', label: 'All Tractors' },
      { to: '/products', label: 'Tractor Implements' },
    ],
  },
]

const rightNavItems = [
  { to: '/why-us', label: 'Why Us' },
  {
    to: '/about',
    label: 'About Us',
    children: [
      { to: '/about', label: 'About Us' },
      { to: '/leadership', label: 'Leadership' },
    ],
  },
]

// Single centered nav row: logos left, links center, CTA right.
const centerNavItems = [...leftNavItems, ...rightNavItems]

const flattenItems = (items) =>
  items.flatMap((it) => {
    if (it.mega)
      return [
        { to: it.to, label: it.label },
        ...it.series.map((s) => ({ to: s.to, label: s.name })),
        ...it.links,
      ]
    if (it.children) return flattenItems(it.children)
    return [it]
  })
const allNavItems = flattenItems(centerNavItems)

function NavItem({ item, isHome }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        `relative inline-flex pb-1 text-lg font-medium transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:bg-jd-green after:transition-transform after:duration-200 after:origin-left ${
          isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
        } ${
          isHome
            ? 'text-white group-hover/nav:text-gray-900'
            : 'text-gray-800 hover:text-black'
        }`
      }
    >
      {item.label}
    </NavLink>
  )
}

const ArrowIcon = ({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* Engineering corner-bracket marks — echoes the Products page viewfinder feel */
const CornerMarks = ({ tone = 'bg-white/40' }) => {
  const h = `absolute h-px w-5 ${tone}`
  const v = `absolute w-px h-5 ${tone}`
  return (
    <span aria-hidden className="pointer-events-none absolute inset-2.5">
      <span className={`${h} left-0 top-0`} />
      <span className={`${v} left-0 top-0`} />
      <span className={`${h} right-0 top-0`} />
      <span className={`${v} right-0 top-0`} />
      <span className={`${h} bottom-0 left-0`} />
      <span className={`${v} bottom-0 left-0 -translate-y-5`} />
      <span className={`${h} bottom-0 right-0`} />
      <span className={`${v} bottom-0 right-0 -translate-y-5`} />
    </span>
  )
}

function MegaPanel({ item, onNavigate }) {
  const hpNums = item.series.flatMap((s) =>
    s.hp.match(/\d+/g)?.map(Number) ?? []
  )
  const hpRange = hpNums.length
    ? `${Math.min(...hpNums)}–${Math.max(...hpNums)} HP`
    : ''

  return (
    <div className="w-full overflow-hidden rounded-b-2xl bg-ink-card shadow-[0_40px_90px_-30px_rgba(22,51,26,0.45)] ring-1 ring-mist/10">
      {/* thin brand hairline at the very top of the panel */}
      <div aria-hidden className="h-[3px] w-full bg-jd-green" />

      <div className="mx-auto max-w-[88rem] px-6 py-10 lg:px-12 lg:py-12">
        {/* ---------- meta strip (mono, engineering) ---------- */}
        <div className="mb-9 flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-mist-dim">
          <span className="text-mist">John&nbsp;Deere&nbsp;·&nbsp;{item.eyebrow}</span>
          <span className="h-px flex-1 bg-mist/15" />
          <span className="tabular-nums">
            {String(item.series.length).padStart(2, '0')} series
          </span>
          {hpRange && (
            <>
              <span className="hidden h-3 w-px bg-mist/20 sm:inline-block" />
              <span className="hidden tabular-nums text-jd-green sm:inline">{hpRange}</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] lg:gap-0">
          {/* ---------- intro + quick links ---------- */}
          <div className="flex flex-col lg:border-r lg:border-mist/15 lg:pr-14">
            <h3 className="font-display text-[clamp(2.25rem,3.2vw,3.25rem)] font-extrabold leading-[0.95] tracking-tight text-mist">
              Explore the{' '}
              <span className="relative whitespace-nowrap text-jd-green">
                range
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
            </h3>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-mist-dim">
              {item.blurb}
            </p>

            <div className="mt-auto pt-9">
              <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-mist-dim/70">
                Browse
              </span>
              <div className="mt-3 border-t border-mist/12">
                {item.links.map((l, i) => (
                  <NavLink
                    key={l.label}
                    to={l.to}
                    onClick={onNavigate}
                    className="group/link flex items-center gap-4 border-b border-mist/12 py-3.5 text-mist transition-colors hover:text-jd-green"
                  >
                    <span className="font-mono text-[0.6rem] tabular-nums text-mist-dim/55">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display text-lg font-bold tracking-tight">
                      {l.label}
                    </span>
                    <ArrowIcon className="h-4 w-4 text-jd-green opacity-0 transition-all duration-200 group-hover/link:translate-x-1 group-hover/link:opacity-100" />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- series poster blocks ---------- */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:pl-14">
            {item.series.map((s, i) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={onNavigate}
                className="group/card flex flex-col"
              >
                {/* poster visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-jd-green-deep ring-1 ring-mist/10 transition-shadow duration-300 group-hover/card:ring-jd-green/50">
                  <img
                    src={s.image}
                    alt={`John Deere ${s.name} tractor`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                  />
                  <CornerMarks />
                  {/* HP chip — mono, green-forward, no yellow band */}
                  <span className="absolute right-3.5 top-3.5 border border-white/40 bg-jd-green-deep/50 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
                    {s.hp}
                  </span>
                  {/* poster model name */}
                  <span className="absolute bottom-4 left-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-tight text-white">
                    {s.name}
                  </span>
                </div>

                {/* meta + copy */}
                <div className="mt-4 flex items-baseline gap-3 font-mono text-[0.58rem] uppercase tracking-[0.32em] text-mist-dim">
                  <span className="tabular-nums text-jd-green">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-mist/15" />
                  <span className="inline-flex items-center gap-1.5 font-semibold text-mist transition-colors group-hover/card:text-jd-green">
                    View series
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/card:translate-x-1" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist-dim">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function NavDropdown({ item, isHome }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [panelTop, setPanelTop] = useState(0)
  const wrapperRef = useRef(null)
  const closeTimer = useRef(null)

  // Hover intent: a short close delay bridges the dead gap between the trigger
  // and the detached full-width panel, then fires once the pointer is truly
  // outside both. Entering either surface cancels the pending close.
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const openNow = () => {
    cancelClose()
    setOpen(true)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }
  useEffect(() => cancelClose, [])

  const subPaths = item.mega
    ? [...item.series.map((s) => s.to), ...item.links.map((l) => l.to)]
    : item.children.map((c) => c.to)
  const isActive = subPaths.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Anchor the full-width mega panel just below the header. The panel is a DOM
  // descendant of the wrapper (so hover stays intact) but is positioned fixed
  // and full-bleed, so we measure the header's bottom edge to place it.
  useLayoutEffect(() => {
    if (!item.mega || !open) return
    const measure = () => {
      const header = wrapperRef.current?.closest('header')
      if (header) setPanelTop(header.getBoundingClientRect().bottom)
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [item.mega, open])

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      {/* Dim the page behind the mega panel (portaled past the transformed header) */}
      {item.mega &&
        createPortal(
          <div
            aria-hidden
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
              open ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />,
          document.body
        )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`relative inline-flex items-center gap-1.5 pb-1 text-lg font-medium transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:bg-jd-green after:transition-transform after:duration-200 after:origin-left ${
          isActive || open ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
        } ${
          isHome
            ? 'text-white group-hover/nav:text-gray-900'
            : 'text-gray-800 hover:text-black'
        }`}
      >
        {item.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Mega panel — full-bleed layer anchored below the header */}
      {item.mega ? (
        <div
          style={{ top: panelTop }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className={`fixed inset-x-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-200 ease-out motion-reduce:transition-none ${
            open
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          <MegaPanel item={item} onNavigate={() => setOpen(false)} />
        </div>
      ) : (
        /* Regular dropdown panel */
        <div
          className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-150 ${
            open
              ? 'visible translate-y-0 opacity-100'
              : 'invisible translate-y-1 opacity-0'
          }`}
        >
          <div className="min-w-[14rem] overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-20px_rgba(22,51,26,0.4)] ring-1 ring-black/5">
            <ul className="py-2">
              {item.children.map((child) => (
                <li key={`${child.to}-${child.label}`}>
                  <NavLink
                    to={child.to}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-jd-green/5 hover:text-jd-green"
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function Logo() {
  return (
    <Link
      to="/"
      aria-label="MV Dugar — authorised John Deere dealer in Nepal"
      className="flex shrink-0 items-center gap-2"
    >
      <img src={dugarLogo} alt="MV Dugar" className="h-11 w-auto" />
      <span aria-hidden className="-ml-6 h-8 w-px bg-gray-300" />
      <img src={logo} alt="John Deere" className="ml-2 h-8 w-auto" />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  // Navbar renders solid white on every route, including the home hero.
  const isHome = false

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 80) {
        setHidden(false)
      } else if (currentY > lastScrollY.current + 4) {
        setHidden(true)
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`group/nav top-0 z-50 transform transition-all duration-300 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        isHome
          ? 'absolute inset-x-0 border-b border-white/30 bg-transparent hover:bg-white hover:shadow-sm'
          : 'sticky border-b border-gray-200 bg-white shadow-sm'
      }`}
    >
      <div className="flex w-full items-center justify-between gap-8 px-6 py-4 lg:px-12">
        {/* Left: co-branded logos */}
        <Logo />

        {/* Center: nav links */}
        <nav className="relative z-30 hidden flex-1 items-center justify-center gap-10 md:flex">
          {centerNavItems.map((item) =>
            item.children || item.mega ? (
              <NavDropdown key={item.to} item={item} isHome={isHome} />
            ) : (
              <NavItem key={item.to} item={item} isHome={isHome} />
            )
          )}
        </nav>

        {/* Right: CTA pill */}
        <Link
          to="/contact"
          className="hidden shrink-0 rounded-full bg-jd-green px-7 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-jd-green/90 md:inline-block"
        >
          Contact Us
        </Link>

        {/* Mobile toggle */}
        <button
          className="text-gray-800 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-gray-200 bg-white px-6 py-3 md:hidden">
          {allNavItems.map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-jd-green/10 text-jd-green' : 'text-gray-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-jd-green px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  )
}
