import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import logo from '../assets/john-deere-logo.png'
import dugarLogo from '../assets/MVDUGAR-01.png'

const leftNavItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
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

const flattenItems = (items) =>
  items.flatMap((it) => (it.children ? it.children : [it]))
const allNavItems = [...leftNavItems, ...flattenItems(rightNavItems)]

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

function NavDropdown({ item, isHome }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const isActive = item.children.some(
    (c) => pathname === c.to || pathname.startsWith(c.to + '/')
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

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
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

      {/* Dropdown panel */}
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-150 ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible translate-y-1 opacity-0'
        }`}
      >
        <div className="min-w-[14rem] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)]">
          <ul className="py-2">
            {item.children.map((child) => (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-jd-green/10 text-jd-green'
                        : 'text-gray-700 hover:bg-jd-green/5 hover:text-jd-green'
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Logo({ isHome }) {
  const shadow = isHome
    ? 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.55)] group-hover/nav:drop-shadow-none'
    : 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.18)]'
  return (
    <Link
      to="/"
      aria-label="MV Dugar — authorized John Deere distributor in Nepal"
      className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-3 md:flex"
    >
      <img
        src={dugarLogo}
        alt="MV Dugar"
        className={`relative translate-x-8 h-14 w-auto transition-[filter] duration-300 ${shadow}`}
      />
      <span
        aria-hidden
        className={`h-9 w-px ${isHome ? 'bg-white/60 group-hover/nav:bg-gray-300' : 'bg-gray-300'}`}
      />
      <img
        src={logo}
        alt="John Deere"
        className={`h-10 w-auto transition-[filter] duration-300 ${shadow}`}
      />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

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
      {!isHome && (
        <span className="pointer-events-none absolute inset-x-0 -bottom-3 z-10 h-3 bg-gradient-to-b from-black/10 to-transparent" />
      )}

      {/* Contact pill — pinned right */}
      <Link
        to="/contact"
        className={`absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border px-7 py-3 text-lg font-semibold transition md:inline-block ${
          isHome
            ? 'border-white text-white group-hover/nav:border-gray-800 group-hover/nav:text-gray-800 hover:!border-jd-green hover:!bg-jd-green hover:!text-white'
            : 'border-gray-800 text-gray-800 hover:!border-jd-green hover:!bg-jd-green hover:!text-white'
        }`}
      >
        Contact Us
      </Link>

      {/* Oversized logo — overflows below the slim bar */}
      <Logo isHome={isHome} />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-8">
        {/* Mobile logo (left) */}
        <Link
          to="/"
          aria-label="MV Dugar — authorized John Deere distributor in Nepal"
          className="flex items-center gap-2 md:hidden"
        >
          <img src={dugarLogo} alt="MV Dugar" className="h-8 w-auto" />
          <span
            aria-hidden
            className={`h-6 w-px ${isHome ? 'bg-white/60' : 'bg-gray-300'}`}
          />
          <img src={logo} alt="John Deere" className="h-6 w-auto" />
        </Link>

        {/* Left links */}
        <nav className="hidden flex-1 translate-x-16 items-center justify-end gap-14 md:flex">
          {leftNavItems.map((item) => (
            <NavItem key={item.to} item={item} isHome={isHome} />
          ))}
        </nav>

        {/* Reserve horizontal space for the centered logo */}
        <div className="hidden w-[34rem] shrink-0 md:block" aria-hidden />

        {/* Right links */}
        <nav className="hidden flex-1 items-center justify-start gap-14 md:flex">
          {rightNavItems.map((item) =>
            item.children ? (
              <NavDropdown key={item.to} item={item} isHome={isHome} />
            ) : (
              <NavItem key={item.to} item={item} isHome={isHome} />
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${isHome ? 'text-white' : 'text-gray-800'}`}
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
              key={item.to}
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
