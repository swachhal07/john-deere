import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-mist-dim">
        Error 404 · Field not found
      </p>

      <h1 className="mt-6 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-mist sm:text-7xl md:text-8xl">
        Lost in
        <br />
        <span className="relative inline-block text-jd-green">
          the fields.
          <span
            aria-hidden
            className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-jd-yellow md:-bottom-3 md:h-3"
          />
        </span>
      </h1>

      <p className="mt-8 max-w-md text-lg leading-relaxed text-mist-dim">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        Let&rsquo;s get you back on track.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 bg-jd-green px-7 py-4 text-xs font-bold uppercase tracking-[0.28em] text-white transition-colors hover:bg-jd-green-deep"
        >
          Back to home
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-3 border border-mist/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.28em] text-mist transition-colors hover:border-jd-green hover:text-jd-green"
        >
          Browse tractors
        </Link>
      </div>
    </section>
  )
}
