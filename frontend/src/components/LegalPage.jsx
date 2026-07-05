import { Link } from 'react-router-dom'

// Shared layout for legal pages (Privacy Policy, Terms of Use). Renders
// numbered sections in the site's editorial style.
export default function LegalPage({ label, title, accent, updated, intro, sections }) {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Header */}
        <header className="border-b border-mist/15 pb-10 md:pb-14">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-mist-dim">
            {label}
          </p>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-mist sm:text-6xl md:text-7xl">
            {title}{' '}
            <span className="relative inline-block text-jd-green">
              {accent}
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 h-1.5 w-full rounded-full bg-jd-yellow md:-bottom-2 md:h-2"
              />
            </span>
          </h1>
          <p className="mt-7 font-mono text-xs uppercase tracking-[0.28em] text-mist-dim">
            Last updated · {updated}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist-dim">{intro}</p>
        </header>

        {/* Table of contents */}
        <nav aria-label="Contents" className="border-b border-mist/15 py-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-mist-dim">
            Contents
          </p>
          <ol className="mt-5 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a
                  href={`#section-${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById(`section-${i + 1}`)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group inline-flex items-baseline gap-3 text-base text-mist/80 transition-colors hover:text-jd-green"
                >
                  <span className="font-mono text-xs text-jd-green">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="underline-offset-4 group-hover:underline">{s.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="divide-y divide-mist/10">
          {sections.map((s, i) => (
            <article
              key={s.heading}
              id={`section-${i + 1}`}
              className="grid scroll-mt-28 gap-x-10 gap-y-3 py-10 md:grid-cols-[5rem_1fr] md:py-12"
            >
              <span
                aria-hidden
                className="font-display text-3xl font-extrabold leading-none tracking-tight text-jd-green md:text-4xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-mist md:text-3xl">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[#3c4a37]">
                  {s.body.map((block, j) =>
                    Array.isArray(block) ? (
                      <ul key={j} className="space-y-2 pl-1">
                        {block.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-jd-yellow" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j}>{block}</p>
                    ),
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Contact block */}
        <aside className="mt-4 border border-mist/15 bg-white p-8 md:p-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-mist-dim">
            Questions about this policy?
          </p>
          <ul className="mt-5 space-y-2 text-base leading-relaxed text-[#3c4a37]">
            <li>
              Email ·{' '}
              <a href="mailto:info@mvdugar.com" className="font-medium text-jd-green hover:underline">
                info@mvdugar.com
              </a>
            </li>
            <li>
              Phone ·{' '}
              <a href="tel:+97714514355" className="font-medium text-jd-green hover:underline">
                01-4514355
              </a>
              , 01-4514104, 01-4514651
            </li>
            <li>Address · 4th Floor, Laxman Babu Bhawan, Naxal, Kathmandu, Nepal</li>
          </ul>
          <Link
            to="/contact"
            className="group mt-7 inline-flex items-center gap-3 bg-jd-green px-6 py-3.5 text-xs font-bold uppercase tracking-[0.28em] text-white transition-colors hover:bg-jd-green-deep"
          >
            Contact us
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </aside>
      </div>
    </section>
  )
}
