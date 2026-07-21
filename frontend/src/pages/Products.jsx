import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import { products as staticProducts, categories } from '../data/products'

/* ------------------------------------------------------------------ */
/*  Series split — the 5D (economy) and 5E (premium) families.        */
/* ------------------------------------------------------------------ */
const SERIES_META = {
  D: {
    code: '5D',
    blurb:
      'The 5D series — 36 to 50 HP. Multi-utility by nature and efficient across both agricultural work and heavy-duty haulage, built simple enough to service anywhere in Nepal.',
  },
  E: {
    code: '5E',
    blurb:
      'The 5E series — 50 to 75 HP, purpose-built for heavy-duty work and large implements. More hydraulics, more comfort and more capability for the long working day.',
  },
}

// Classify a model into its series. Honours an explicit `series` field when
// present, otherwise derives it from the model name / trim / horsepower so it
// works for both the bundled data and rows coming from the API.
function seriesOf(p) {
  if (p.series === 'D' || p.series === 'E') return p.series
  const name = (p.name || '').toUpperCase()
  if (name.endsWith('E') || p.trim === 'E') return 'E'
  if (name.endsWith('D')) return 'D'
  return p.hp > 50 ? 'E' : 'D'
}

/* ------------------------------------------------------------------ */
/*  Topographic placeholder — used until real product photos arrive.  */
/* ------------------------------------------------------------------ */
function TopoPattern({ stroke = '#ffffff', opacity = 0.16 }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        <pattern id="topo-products" x="0" y="0" width="520" height="520" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="1.1">
            <ellipse cx="130" cy="160" rx="32" ry="22" transform="rotate(-22 130 160)" />
            <ellipse cx="130" cy="160" rx="62" ry="44" transform="rotate(-22 130 160)" />
            <ellipse cx="130" cy="160" rx="96" ry="68" transform="rotate(-22 130 160)" />
            <ellipse cx="130" cy="160" rx="134" ry="94" transform="rotate(-22 130 160)" />
            <ellipse cx="130" cy="160" rx="178" ry="124" transform="rotate(-22 130 160)" />
            <ellipse cx="400" cy="380" rx="28" ry="20" transform="rotate(28 400 380)" />
            <ellipse cx="400" cy="380" rx="58" ry="42" transform="rotate(28 400 380)" />
            <ellipse cx="400" cy="380" rx="92" ry="66" transform="rotate(28 400 380)" />
            <ellipse cx="400" cy="380" rx="130" ry="92" transform="rotate(28 400 380)" />
            <ellipse cx="450" cy="80" rx="22" ry="16" transform="rotate(-8 450 80)" />
            <ellipse cx="450" cy="80" rx="46" ry="32" transform="rotate(-8 450 80)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo-products)" />
    </svg>
  )
}

/* Engineering corner-bracket marks — viewfinder feel */
function CornerMarks() {
  const arm = 'absolute h-px w-7 bg-white/35'
  const armV = 'absolute w-px h-7 bg-white/35'
  return (
    <>
      <span className={`${arm} top-3 left-3`} />
      <span className={`${armV} top-3 left-3`} />
      <span className={`${arm} top-3 right-3`} />
      <span className={`${armV} top-3 right-3`} />
      <span className={`${arm} bottom-3 left-3`} />
      <span className={`${armV} bottom-3 left-3 -translate-y-7`} />
      <span className={`${arm} bottom-3 right-3`} />
      <span className={`${armV} bottom-3 right-3 -translate-y-7`} />
    </>
  )
}

/* Blueprint scan-lines — very subtle horizontal hairlines */
function ScanLines() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0, transparent 13px, #ffffff 13px, #ffffff 14px)',
      }}
    />
  )
}

function BuildCard({ product }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-jd-green-deep">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-jd-green-deep via-[#1c4421] to-[#0c1f0e]" />

      {/* Optional photo */}
      {product.image && (
        <img
          src={product.image}
          alt={`${product.name} ${product.trim ?? ''}`.trim()}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Placeholder atmosphere — only when no real photo */}
      {!product.image && (
        <>
          <TopoPattern stroke="#ffffff" opacity={0.13} />
          <ScanLines />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.55em] text-white/45">
              John&nbsp;Deere&nbsp;·&nbsp;5-Series
            </span>
            <span className="mt-3 font-display text-[clamp(4rem,11vw,9rem)] font-extrabold leading-[0.85] tracking-tighter text-white">
              {product.name}
            </span>
            {product.trim && (
              <span className="mt-2 inline-flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-jd-yellow">
                <span className="h-px w-5 bg-jd-yellow" />
                {product.trim}
                <span className="h-px w-5 bg-jd-yellow" />
              </span>
            )}
          </div>
        </>
      )}

      {/* Top-right: HP + drive chip */}
      <div className="absolute top-5 right-5 z-10 flex flex-col items-end gap-1.5">
        <span className="rounded-[1px] bg-jd-yellow px-2.5 py-1 font-mono text-[0.7rem] font-extrabold tabular-nums text-mist">
          {product.hp} HP
        </span>
        <span className="rounded-[1px] border border-white/35 px-2.5 py-[3px] font-mono text-[0.55rem] font-bold uppercase tracking-[0.3em] text-white/85">
          {product.drive}
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function Products({ series }) {
  const [active, setActive] = useState('All')
  const [products, setProducts] = useState(staticProducts)

  // Try the live API; fall back to the bundled static list if it's unreachable.
  useEffect(() => {
    let cancelled = false
    fetch('/api/products')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('api offline'))))
      .then((rows) => {
        if (cancelled || !Array.isArray(rows) || rows.length === 0) return
        setProducts(rows)
      })
      .catch(() => {
        // keep static fallback silently
      })
    return () => {
      cancelled = true
    }
  }, [])

  // On a series page, narrow the list to that family; otherwise show everything.
  const pool = useMemo(
    () => (series ? products.filter((p) => seriesOf(p) === series) : products),
    [series, products]
  )

  // Reset the category filter whenever we switch between all / D / E pages.
  useEffect(() => {
    setActive('All')
  }, [series])

  const visible = useMemo(() => {
    if (active === 'All') return pool
    if (active === 'MFWD' || active === '2WD') return pool.filter((p) => p.drive === active)
    if (active === 'Dual Clutch') return pool.filter((p) => p.clutch === 'Dual')
    if (active === 'Single Clutch') return pool.filter((p) => p.clutch === 'Single')
    return pool
  }, [active, pool])

  const meta = series ? SERIES_META[series] : null
  const hpList = pool.map((p) => p.hp)
  const hpMin = hpList.length ? Math.min(...hpList) : 36
  const hpMax = hpList.length ? Math.max(...hpList) : 75
  const mfwdCount = pool.filter((p) => p.drive === 'MFWD').length

  return (
    <>
      {/* ============ HERO — asymmetric, type-led ============ */}
      <section className="relative min-h-screen overflow-hidden bg-ink py-20 md:py-28">
        <div className="absolute -left-40 -bottom-48 h-[520px] w-[520px] rounded-full bg-jd-green/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-[88rem] grid-cols-1 gap-12 px-6 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <motion.span
              className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.4em] text-jd-green md:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <span className="h-px w-10 bg-jd-green" /> {meta ? `${meta.code} Series` : 'The 5-Series'} · {hpMin}–{hpMax} HP
            </motion.span>
            <motion.h1
              className="mt-6 font-display text-[clamp(3.5rem,8vw,7.5rem)] font-extrabold leading-[1.02] tracking-tighter text-mist"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {meta ? (
                <>
                  The {meta.code}<br />
                  <span className="relative whitespace-nowrap text-jd-green">
                    Series
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
                </>
              ) : (
                <>
                  One series.<br />
                  <span className="relative whitespace-nowrap text-jd-green">
                    Every farm
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
                  <br />
                  in Nepal.
                </>
              )}
            </motion.h1>
            <motion.p
              className="mt-8 max-w-xl text-lg leading-relaxed text-mist-dim md:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
            >
              {meta
                ? meta.blurb
                : 'Ten builds, one chassis lineage, engineered for terraced hills, Terai paddies, and the cooperatives that work both. Stocked, serviced and parted by Vivek Automobiles.'}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <div>
                <div className="font-display text-4xl font-extrabold text-mist">{pool.length}</div>
                <div className="text-xs uppercase tracking-[0.28em] text-mist-dim">Models in stock</div>
              </div>
              <div className="h-10 w-px bg-mist/15" />
              <div>
                <div className="font-display text-4xl font-extrabold text-mist">{hpMin}–{hpMax}</div>
                <div className="text-xs uppercase tracking-[0.28em] text-mist-dim">HP range</div>
              </div>
              <div className="h-10 w-px bg-mist/15" />
              <div>
                <div className="font-display text-4xl font-extrabold text-mist">{mfwdCount}</div>
                <div className="text-xs uppercase tracking-[0.28em] text-mist-dim">MFWD builds</div>
              </div>
            </motion.div>
          </div>

          {/* Right: model index */}
          <motion.aside
            className="self-end"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.4em] text-mist-dim md:text-sm">
              {meta ? `The ${meta.code} line-up` : 'The line-up'}
            </div>
            <ol className="mt-5 divide-y divide-mist/10 border-t border-mist/10">
              {pool.map((p, i) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="group flex items-baseline gap-4 py-3.5 text-mist-dim transition-colors hover:text-mist"
                  >
                    <span className="w-7 font-mono text-xs tabular-nums text-mist-dim/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display text-lg font-bold tracking-tight text-mist md:text-xl">
                      {p.name}
                      {p.trim && (
                        <span className="ml-2 text-sm font-medium text-mist-dim">{p.trim}</span>
                      )}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-jd-green md:text-sm">
                      {p.hp} HP
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.aside>
        </div>
      </section>

      {/* ============ FILTER RAIL ============ */}
      <section className="sticky top-0 z-30 border-y border-mist/10 bg-ink/85 backdrop-blur-md">
        <div className="relative mx-auto max-w-[88rem] px-6 py-4">
          <span className="absolute left-6 top-1/2 hidden -translate-y-1/2 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-mist-dim md:block">
            Filter
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            {categories.map((c) => {
              const isActive = active === c
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'text-mist' : 'text-mist-dim hover:text-mist'
                  }`}
                >
                  {c}
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute inset-x-3 -bottom-px h-[2px] bg-jd-green"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <span className="absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-xs tabular-nums text-mist-dim md:block">
            <span className="text-mist">{String(visible.length).padStart(2, '0')}</span>
            <span className="mx-1.5 text-mist-dim/50">/</span>
            {String(pool.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* ============ EDITORIAL ZIG-ZAG ROWS ============ */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[88rem] divide-y divide-mist/10 px-6">
          {visible.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-mist-dim">
                No models match the current filter
              </p>
              <button
                onClick={() => setActive('All')}
                className="mt-4 text-sm font-semibold text-jd-green underline-offset-4 hover:underline"
              >
                Reset filter →
              </button>
            </div>
          )}

          {visible.map((p, i) => {
            const reverse = i % 2 === 1
            return (
              <article
                key={p.id}
                id={p.id}
                className="scroll-mt-32 py-20 md:py-28"
              >
                {/* ---------- top meta strip ---------- */}
                <Reveal>
                  <div className="mb-10 flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.34em] text-mist-dim md:gap-5">
                    <span className="flex items-baseline gap-1.5">
                      <span className="tabular-nums text-jd-green">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-mist-dim/40">/</span>
                      <span className="tabular-nums">
                        {String(visible.length).padStart(2, '0')}
                      </span>
                    </span>
                    <span className="h-px flex-1 bg-mist/15" />
                    <span className="hidden sm:inline">
                      {p.clutch} clutch · {p.drive}
                    </span>
                    <span className="hidden h-3 w-px bg-mist/20 sm:inline-block" />
                    <span className="hidden text-mist md:inline">Vivek Automobiles · Nepal</span>
                  </div>
                </Reveal>

                <div
                  className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-x-14 ${
                    reverse ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* ---------- visual block (5 cols) ---------- */}
                  <Reveal className="lg:col-span-5">
                    <div>
                      <BuildCard product={p} index={i} />

                      {/* dimension stamp under visual */}
                      <div className="mt-3 flex items-baseline justify-between font-mono text-[0.55rem] uppercase tracking-[0.32em] text-mist-dim">
                        <span>Plate · {p.name}{p.trim ? ` ${p.trim}` : ''}</span>
                        <span className="tabular-nums">
                          ▢ {String(i + 1).padStart(3, '0')} / 010
                        </span>
                      </div>
                    </div>
                  </Reveal>

                  {/* ---------- content block (7 cols) ---------- */}
                  <Reveal delay={0.1} className="lg:col-span-7">
                    <div>
                      {/* model + trim */}
                      <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
                        <h2 className="font-display text-[clamp(3.25rem,6vw,5.75rem)] font-extrabold leading-[0.86] tracking-tighter text-mist">
                          {p.name}
                        </h2>
                        {p.trim && (
                          <span className="mb-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.28em] text-jd-green">
                            <span className="h-2.5 w-2.5 rotate-45 bg-jd-yellow" aria-hidden />
                            {p.trim}
                          </span>
                        )}
                      </div>

                      {/* pull-quote tagline */}
                      <blockquote className="mt-7 flex gap-5">
                        <span
                          aria-hidden
                          className="mt-1 w-[3px] self-stretch bg-jd-yellow"
                        />
                        <p className="max-w-xl font-display text-[1.55rem] font-medium italic leading-[1.2] text-mist md:text-[1.85rem]">
                          {p.tagline}
                        </p>
                      </blockquote>

                      {/* description */}
                      <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-mist-dim">
                        {p.description}
                      </p>

                      {/* §01 Capabilities */}
                      <div className="mt-10">
                        <div className="mb-4 flex items-baseline gap-3">
                          <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-jd-green">
                            § 01 · Capabilities
                          </span>
                          <span className="h-px flex-1 bg-mist/12" />
                          <span className="font-mono text-[0.6rem] tabular-nums text-mist-dim">
                            {String(p.features.length).padStart(2, '0')} items
                          </span>
                        </div>
                        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                          {p.features.map((f, idx) => (
                            <li
                              key={f}
                              className="flex items-baseline gap-3 border-b border-mist/10 py-2 text-[0.92rem] text-mist"
                            >
                              <span className="font-mono text-[0.6rem] tabular-nums text-mist-dim/55">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <span className="flex-1">{f}</span>
                              <span
                                aria-hidden
                                className="h-1 w-1 rounded-full bg-jd-green"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* §02 Specification — 4-quadrant instrument readout */}
                      <div className="mt-10">
                        <div className="mb-4 flex items-baseline gap-3">
                          <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-jd-green">
                            § 02 · Specification
                          </span>
                          <span className="h-px flex-1 bg-mist/12" />
                        </div>
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                          {p.specs.map((s, idx) => (
                            <div key={s.label} className="relative pt-4">
                              <span
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-[3px] bg-mist"
                              />
                              <span
                                aria-hidden
                                className="absolute top-0 left-0 h-[3px] w-6 bg-jd-yellow"
                              />
                              <dt className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-mist-dim">
                                {String(idx + 1).padStart(2, '0')} · {s.label}
                              </dt>
                              <dd className="mt-2 font-display text-[1.25rem] font-extrabold leading-tight tracking-tight text-mist md:text-[1.4rem]">
                                {s.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {/* CTAs */}
                      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                        <Link
                          to="/contact"
                          className="group relative inline-flex items-center gap-3 overflow-hidden bg-jd-green px-7 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-jd-green-deep"
                        >
                          <span className="relative z-10">Request a quote</span>
                          <span
                            aria-hidden
                            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                          <span
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-0 bg-jd-yellow/15 transition-[width] duration-500 ease-out group-hover:w-full"
                          />
                        </Link>
                        <Link
                          to="/contact"
                          className="group inline-flex items-center gap-3 border border-mist/25 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-mist transition-colors hover:border-jd-green hover:text-jd-green"
                        >
                          Book a demo
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </section>

    </>
  )
}
