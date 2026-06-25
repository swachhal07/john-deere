import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/Reveal'
import { products, categories } from '../data/products'

const BANNER =
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=2400&q=80'

export default function Products() {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <>
      {/* Banner */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden grain">
        <img src={BANNER} alt="John Deere machinery line-up" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-16 pt-32">
          <motion.p
            className="eyebrow text-jd-yellow mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Range
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Equipment built<br />for Nepal.
          </motion.h1>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[100px] z-30 bg-ink/90 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-sm text-sm font-medium transition-colors ${
                active === c
                  ? 'bg-jd-yellow text-ink'
                  : 'bg-white/5 text-mist/70 hover:bg-white/10 hover:text-mist'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div layout className="grid gap-8 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group grid sm:grid-cols-2 bg-ink-card rounded-sm overflow-hidden border border-white/5"
                >
                  <div className="relative h-56 sm:h-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-jd-green text-white text-xs font-semibold px-3 py-1 rounded-sm">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-7 flex flex-col">
                    <span className="eyebrow text-jd-green-bright mb-2">{p.power}</span>
                    <h3 className="text-2xl text-mist mb-1">{p.name}</h3>
                    <p className="text-jd-yellow-soft text-sm italic mb-4">{p.tagline}</p>
                    <p className="text-mist-dim text-sm leading-relaxed mb-6">{p.description}</p>
                    <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
                      {p.specs.map((s) => (
                        <div key={s.label}>
                          <dt className="text-[0.65rem] uppercase tracking-wider text-mist-dim/60">{s.label}</dt>
                          <dd className="text-sm text-mist font-medium mt-1">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Help band */}
      <section className="bg-ink-soft border-t border-white/5 py-16">
        <Reveal className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-3xl md:text-4xl text-mist text-balance">
            Not sure which machine fits your farm?
          </h3>
          <a
            href="tel:+97714000000"
            className="inline-flex items-center gap-3 bg-jd-green hover:bg-jd-green-bright text-white font-semibold px-7 py-4 rounded-sm transition-colors whitespace-nowrap"
          >
            Speak to a specialist <span aria-hidden>→</span>
          </a>
        </Reveal>
      </section>
    </>
  )
}
