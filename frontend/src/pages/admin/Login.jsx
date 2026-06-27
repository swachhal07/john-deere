import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminShell from '../../admin/AdminShell'
import { api, auth, ApiError } from '../../lib/api'

export default function AdminLogin() {
  const nav = useNavigate()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!auth.token) return
    api.me().then(() => nav('/admin', { replace: true })).catch(() => auth.signOut())
  }, [nav])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await api.login(password)
      auth.token = token
      nav('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminShell>
      <div className="relative mx-auto flex min-h-[calc(100vh-58px)] max-w-[1400px] items-center px-6 py-16 md:px-10">
        {/* Left rail — large serial mark, hidden on mobile */}
        <aside className="hidden flex-1 self-stretch border-l border-r border-white/5 px-12 lg:flex lg:flex-col lg:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35">
            Admin login
          </p>

          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.36em] text-jd-green">
              Staff only
            </p>
            <h1 className="font-display text-[64px] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-white md:text-[88px]">
              Admin
              <br />
              <span className="text-jd-yellow">panel.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-[1.65] text-white/55">
              Manage the John Deere catalogue. Add new tractors, change photos,
              update specs &mdash; changes show on the website right after you save.
            </p>
          </div>

          <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.36em] text-white/30">
            <span>v 1.0</span>
            <span>Kathmandu &middot; 2026</span>
          </div>
        </aside>

        {/* Login card */}
        <section className="relative w-full max-w-xl lg:ml-12 lg:max-w-[560px]">
          <div className="relative border border-white/10 bg-[#10180e] p-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] md:p-14">
            {/* Corner ticks */}
            <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-jd-yellow" />
            <span aria-hidden className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-jd-yellow" />
            <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-jd-yellow" />
            <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-jd-yellow" />

            <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-jd-yellow">
              Sign in
            </p>
            <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[1] tracking-tight text-white md:text-5xl">
              Welcome back.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              Enter the admin password. You'll stay signed in for 7 days on this
              device.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-7">
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.36em] text-white/45">
                  Password
                </span>
                <input
                  type="password"
                  autoFocus
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-3 block w-full border-0 border-b border-white/15 bg-transparent py-4 font-mono text-xl text-white outline-none transition-colors placeholder:text-white/20 focus:border-jd-yellow"
                  placeholder="••••••••"
                />
              </label>

              {error && (
                <div className="border-l-2 border-red-400 bg-red-400/5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="group relative flex w-full items-center justify-between gap-4 bg-jd-yellow px-7 py-5 font-display text-base font-extrabold uppercase tracking-[0.18em] text-[#0b110a] transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{loading ? 'Signing in…' : 'Sign in'}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>

            <div className="mt-10 flex items-baseline justify-between border-t border-white/5 pt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-white/30">
              <Link to="/" className="transition-colors hover:text-jd-yellow">
                ← Back to website
              </Link>
              <span>Secure</span>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  )
}
