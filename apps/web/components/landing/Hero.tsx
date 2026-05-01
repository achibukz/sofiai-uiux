import Link from 'next/link'

export default function Hero() {
  return (
    <section
      style={{
        paddingTop: 'clamp(128px, 18vw, 200px)',
        paddingBottom: 'clamp(80px, 10vw, 128px)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
      }}
    >
      <div
        className="grid gap-16"
        style={{
          gridTemplateColumns: 'minmax(0, 58fr) minmax(0, 42fr)',
          alignItems: 'start',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Left column */}
        <div className="flex flex-col gap-7">
          <span
            className="animate-enter text-[--color-accent] uppercase"
            style={{
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              animationDelay: '0ms',
            }}
          >
            built for Philippine creators
          </span>

          <h1
            className="animate-enter"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(3.25rem, 7vw, 6.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'var(--color-text)',
              margin: 0,
              animationDelay: '80ms',
            }}
          >
            understand why your TikToks land — or don&rsquo;t.
          </h1>

          <p
            className="animate-enter text-[--color-text-muted]"
            style={{
              fontWeight: 400,
              fontSize: '1.125rem',
              lineHeight: 1.65,
              maxWidth: '44ch',
              margin: 0,
              animationDelay: '160ms',
            }}
          >
            GIA reads your content, audience, and patterns. You get a coach, not a spreadsheet.
          </p>

          <div
            className="animate-enter flex flex-wrap items-center gap-4"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/analyze"
              className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold transition-all hover:brightness-90 active:scale-[0.97] no-underline"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                fontSize: '0.875rem',
                letterSpacing: '0.02em',
              }}
            >
              Analyze my profile →
            </Link>
            <Link
              href="/report/sample"
              className="text-sm font-medium text-[--color-accent] underline-offset-2 hover:underline no-underline"
              style={{ fontSize: '0.875rem' }}
            >
              See a sample report →
            </Link>
          </div>
        </div>

        {/* Right column — report excerpt card */}
        <div
          className="animate-enter rounded-2xl"
          style={{
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            padding: 'clamp(24px, 3vw, 40px)',
            animationDelay: '320ms',
          }}
        >
          <p
            className="text-[--color-text-faint] mb-5"
            style={{ fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            GIA&rsquo;s take on @maelingkitchen
          </p>

          <div className="flex flex-col gap-4">
            {[
              'Your 7pm food posts get 2× the saves of morning content.',
              'Your Cebu audience is loyal but underserved — 3 posts in 30 days vs 24 for Manila.',
              'Hooks that open with a question perform 3× better for your niche.',
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 shrink-0 rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: 'var(--color-accent)',
                  }}
                />
                <p
                  className="text-[--color-text]"
                  style={{ fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}
                >
                  {insight}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-6 text-[--color-text-faint]"
            style={{ fontWeight: 400, fontSize: '0.8125rem', letterSpacing: '0.01em' }}
          >
            what a real GIA report looks like
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
