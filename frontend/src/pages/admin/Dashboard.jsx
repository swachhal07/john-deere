import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminShell from '../../admin/AdminShell'
import { api, auth, ApiError } from '../../lib/api'

export default function AdminDashboard() {
  const nav = useNavigate()
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(null) // slug pending delete

  useEffect(() => {
    if (!auth.token) return nav('/admin/login', { replace: true })
    load()
  }, [nav])

  async function load() {
    try {
      const data = await api.list()
      setRows(data)
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        auth.signOut()
        nav('/admin/login', { replace: true })
        return
      }
      setError(err.message)
    }
  }

  async function onDelete(slug) {
    try {
      await api.remove(slug)
      setConfirming(null)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const count = rows?.length ?? 0

  return (
    <AdminShell breadcrumb={[{ label: 'Home' }, { label: 'Vehicles' }]}>
      <section className="relative mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
        {/* Header */}
        <div className="flex flex-col gap-8 border-b border-white/8 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-jd-green">
              Vehicles
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white md:text-6xl">
              All tractors<span className="text-jd-yellow">.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              Every tractor on the website. Edit details or change the photo at
              any time &mdash; changes go live right after you save.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-white/40">
              Total
              <span className="ml-3 font-display text-3xl font-extrabold tabular-nums text-white">
                {String(count).padStart(2, '0')}
              </span>
            </p>
            <Link
              to="/admin/new"
              className="group inline-flex items-center gap-3 bg-jd-yellow px-6 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#0b110a] transition-all hover:bg-white"
            >
              <span aria-hidden className="grid h-4 w-4 place-items-center bg-[#0b110a] text-[10px] font-extrabold text-jd-yellow">
                +
              </span>
              Add new vehicle
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 border-l-2 border-red-400 bg-red-400/5 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-red-300">
            {error}
          </div>
        )}

        {/* Ledger table */}
        <div className="mt-10 border border-white/10 bg-[#10180e]">
          <div className="grid grid-cols-[3rem_4rem_minmax(0,1fr)_4.5rem_5rem_6rem_8rem] items-center gap-4 border-b border-white/10 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
            <span>#</span>
            <span>Photo</span>
            <span>Name</span>
            <span>HP</span>
            <span>Drive</span>
            <span>Clutch</span>
            <span className="text-right">Actions</span>
          </div>

          {rows === null ? (
            <SkeletonRows />
          ) : rows.length === 0 ? (
            <EmptyState />
          ) : (
            <ul>
              {rows.map((r, i) => (
                <li
                  key={r.slug}
                  className="group grid grid-cols-[3rem_4rem_minmax(0,1fr)_4.5rem_5rem_6rem_8rem] items-center gap-4 border-t border-white/5 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="font-mono text-[11px] tabular-nums text-white/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="grid h-12 w-12 place-items-center overflow-hidden border border-white/10 bg-[#0b110a]">
                    {r.image ? (
                      <img src={r.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">N/A</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-display text-lg font-extrabold uppercase tracking-tight text-white">
                      {r.name}{' '}
                      {r.trim && (
                        <span className="text-jd-green/80">/ {r.trim}</span>
                      )}
                    </p>
                    <p className="truncate text-xs text-white/45">{r.tagline}</p>
                  </div>

                  <span className="font-display text-xl font-extrabold tabular-nums text-jd-yellow">
                    {r.hp}
                  </span>

                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/65">
                    {r.drive}
                  </span>

                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/65">
                    {r.clutch}
                  </span>

                  <div className="flex items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.24em]">
                    <Link
                      to={`/admin/edit/${encodeURIComponent(r.slug)}`}
                      className="text-jd-yellow transition-opacity hover:opacity-70"
                    >
                      Edit
                    </Link>
                    <span className="text-white/15">|</span>
                    <button
                      type="button"
                      onClick={() => setConfirming(r.slug)}
                      className="text-red-300/80 transition-opacity hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-4 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-white/30">
          <span>End of list</span>
          <span className="tabular-nums">{count} {count === 1 ? 'vehicle' : 'vehicles'}</span>
        </p>
      </section>

      {/* Delete confirmation */}
      {confirming && (
        <DeleteModal
          slug={confirming}
          onCancel={() => setConfirming(null)}
          onConfirm={() => onDelete(confirming)}
        />
      )}
    </AdminShell>
  )
}

function SkeletonRows() {
  return (
    <ul aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <li
          key={i}
          className="grid grid-cols-[3rem_4rem_minmax(0,1fr)_4.5rem_5rem_6rem_8rem] items-center gap-4 border-t border-white/5 px-5 py-4"
        >
          <span className="h-3 w-6 animate-pulse bg-white/5" />
          <span className="h-12 w-12 animate-pulse bg-white/5" />
          <span className="h-4 w-40 animate-pulse bg-white/5" />
          <span className="h-3 w-8 animate-pulse bg-white/5" />
          <span className="h-3 w-10 animate-pulse bg-white/5" />
          <span className="h-3 w-12 animate-pulse bg-white/5" />
          <span className="ml-auto h-3 w-20 animate-pulse bg-white/5" />
        </li>
      ))}
    </ul>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <span aria-hidden className="grid h-10 w-10 place-items-center border border-white/15 font-mono text-[10px] text-white/45">
        ✕
      </span>
      <p className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
        No vehicles yet.
      </p>
      <p className="max-w-sm text-sm leading-relaxed text-white/45">
        Add your first tractor to get started.
      </p>
      <Link
        to="/admin/new"
        className="mt-3 inline-flex items-center gap-2 border border-jd-yellow px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-jd-yellow transition-colors hover:bg-jd-yellow hover:text-[#0b110a]"
      >
        Add first vehicle →
      </Link>
    </div>
  )
}

function DeleteModal({ slug, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-6 backdrop-blur-sm">
      <div className="relative w-full max-w-md border border-white/15 bg-[#10180e] p-8">
        <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-red-400" />
        <span aria-hidden className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-red-400" />
        <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-red-400" />
        <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-red-400" />
        <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-red-300">
          Are you sure?
        </p>
        <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
          Delete <span className="text-jd-yellow">{slug}</span>?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          This will remove the vehicle from the website right away. You can't
          undo this.
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-400 px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#0b110a] transition-all hover:bg-red-300"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  )
}
