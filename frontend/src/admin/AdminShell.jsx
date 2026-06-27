import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../lib/api'

/* ─────────────────────────────────────────────────────────────
   Admin shell — dark control-room chrome that wraps every admin
   page. Intentionally NOT the public site's chrome: the eyebrow
   bar, monospace serial header, and topo watermark signal this
   is a back-office tool, not a marketing surface.
   ───────────────────────────────────────────────────────────── */

function StatusPulse() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-jd-green">
      <span className="relative grid h-2 w-2 place-items-center">
        <span className="absolute h-2 w-2 rounded-full bg-jd-green" />
        <span className="absolute h-2 w-2 animate-ping rounded-full bg-jd-green opacity-70" />
      </span>
      Live
    </span>
  )
}

export function TopoBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="admin-topo" x="0" y="0" width="620" height="620" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#9ed27f" strokeWidth="1.1">
              <ellipse cx="120" cy="180" rx="34" ry="22" transform="rotate(-22 120 180)" />
              <ellipse cx="120" cy="180" rx="68" ry="44" transform="rotate(-22 120 180)" />
              <ellipse cx="120" cy="180" rx="108" ry="70" transform="rotate(-22 120 180)" />
              <ellipse cx="120" cy="180" rx="154" ry="98" transform="rotate(-22 120 180)" />
              <ellipse cx="120" cy="180" rx="206" ry="130" transform="rotate(-22 120 180)" />
              <ellipse cx="460" cy="440" rx="30" ry="22" transform="rotate(28 460 440)" />
              <ellipse cx="460" cy="440" rx="62" ry="46" transform="rotate(28 460 440)" />
              <ellipse cx="460" cy="440" rx="100" ry="74" transform="rotate(28 460 440)" />
              <ellipse cx="460" cy="440" rx="146" ry="106" transform="rotate(28 460 440)" />
              <ellipse cx="520" cy="100" rx="22" ry="16" transform="rotate(-8 520 100)" />
              <ellipse cx="520" cy="100" rx="46" ry="32" transform="rotate(-8 520 100)" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#admin-topo)" />
      </svg>
    </div>
  )
}

export default function AdminShell({ children, breadcrumb = [] }) {
  const nav = useNavigate()
  const loc = useLocation()
  const [confirmingLogout, setConfirmingLogout] = useState(false)
  const onLogout = () => {
    auth.signOut()
    nav('/admin/login', { replace: true })
  }
  const isLogin = loc.pathname === '/admin/login'

  return (
    <div className="relative min-h-screen bg-[#0b110a] text-white">
      <TopoBackdrop />

      {/* Top utility bar */}
      <header className="relative border-b border-white/10 bg-[#0b110a]/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/55 md:px-10">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center gap-3 text-white transition-colors hover:text-jd-yellow"
            >
              <span aria-hidden className="grid h-6 w-6 place-items-center bg-jd-green text-[10px] font-extrabold text-white">
                MV
              </span>
              <span className="tracking-[0.32em]">MV Dugar Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <StatusPulse />
            {!isLogin && (
              <button
                type="button"
                onClick={() => setConfirmingLogout(true)}
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/55 transition-colors hover:text-jd-yellow"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumb / page meta strip */}
      {breadcrumb.length > 0 && (
        <div className="relative border-b border-white/5">
          <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40 md:px-10">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/20">→</span>}
                {b.to ? (
                  <Link to={b.to} className="transition-colors hover:text-jd-yellow">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{b.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      <main className="relative">{children}</main>

      {confirmingLogout && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-white/15 bg-[#10180e] p-8">
            <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-jd-yellow" />
            <span aria-hidden className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-jd-yellow" />
            <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-jd-yellow" />
            <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-jd-yellow" />
            <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-jd-yellow">
              Sign out
            </p>
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
              Sign out of admin?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              You'll need to enter the admin password again to come back in.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmingLogout(false)}
                className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="bg-jd-yellow px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#0b110a] transition-all hover:bg-white"
              >
                Yes, sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
