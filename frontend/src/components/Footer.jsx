import { Link } from 'react-router-dom'
import logo from '../assets/john-deere-logo.png'
import bg from '../assets/john-deere-tractor-and-harvesters-8vy92xu1qcrorfub.webp'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/why-us', label: 'Why Us' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate overflow-hidden bg-black text-white">
      {/* Background image */}
      <img
        src={bg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      {/* Dark gradient overlay for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/90"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <img src={logo} alt="John Deere" className="mx-auto h-14 w-auto" />

        <h2 className="mt-10 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          Cultivating <span className="text-jd-green-bright">Nepal.</span>
        </h2>

        <nav className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg text-white/80">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-lg text-white/70">
          <span>Kathmandu, Nepal</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-white/30 md:inline-block" />
          <a href="tel:+9779802960739" className="transition-colors hover:text-white">
            +977 980-2960739
          </a>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-white/30 md:inline-block" />
          <a href="mailto:info@johndeere.com.np" className="transition-colors hover:text-white">
            info@johndeere.com.np
          </a>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-10 text-base text-white/55">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden />
            <Link to="/terms-of-use" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
          <p>© {year} Vivek Automobiles Pvt. Ltd · Authorised dealer of John Deere Nepal</p>
          <p>
            Developed by{' '}
            <a
              href="https://swachhalportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-jd-green-bright transition-colors hover:text-white"
            >
              Swachhal Lamsal
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
