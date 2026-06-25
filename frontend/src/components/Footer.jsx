import { Link } from 'react-router-dom'
import logo from '../assets/john-deere-logo.png'

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-8 overflow-hidden">
      {/* Oversized watermark */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none">
        <span className="font-display font-extrabold text-[18vw] leading-none text-white/[0.05] whitespace-nowrap">
          JOHN DEERE
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="John Deere" className="h-10 w-auto" />
              <span className="font-display font-extrabold text-lg text-white">JOHN DEERE</span>
            </div>
            <p className="text-white/70 max-w-xs leading-relaxed">
              Equipping Nepal’s farmers with world-class machinery, genuine parts and
              trusted service, from the Terai plains to the hill terraces.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-jd-green mb-5">Explore</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/why-us" className="hover:text-white transition-colors">Why Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-jd-green mb-5">Range</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link to="/products" className="hover:text-white transition-colors">Tractors</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Harvesters</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Implements</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Genuine Parts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-jd-green mb-5">Reach Us</h4>
            <ul className="space-y-3 text-white/70">
              <li>Kathmandu, Nepal</li>
              <li><a href="tel:+97714000000" className="hover:text-white transition-colors">+977 1 400 0000</a></li>
              <li><a href="mailto:info@johndeere.com.np" className="hover:text-white transition-colors">info@johndeere.com.np</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-sm text-white/50">
          <p>© {new Date().getFullYear()} Vivek Automobiles. All rights reserved.</p>
          <p>Authorized distributor of John Deere Nepal.</p>
        </div>
      </div>
    </footer>
  )
}
