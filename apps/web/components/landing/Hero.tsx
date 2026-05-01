import Link from 'next/link'

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(128px, 18vw, 200px)',
        paddingBottom: 'clamp(80px, 10vw, 128px)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
      }}
    >
      {/* Decorative arc — bleeds off top-right */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-12%',
          width: 'clamp(360px, 50vw, 720px)',
          height: 'clamp(360px, 50vw, 720px)',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          opacity: 0.055,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: 'clamp(60px, 8vw, 120px)',
          height: 'clamp(60px, 8vw, 120px)',
          borderRadius: '50%',
          border: '1.5px solid var(--color-gold)',
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      <div
        className="hero-grid grid"
        style={{
          gridTemplateColumns: 'minmax(0, 58fr) minmax(0, 42fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left column */}
        <div className="flex flex-col gap-7">
          {/* Eyebrow with gold rule */}
          <div
            className="animate-enter flex items-center gap-3"
            style={{ animationDelay: '0ms' }}
          >
            <div style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-gold)', flexShrink: 0 }} />
            <span
              className="text-[--color-accent] uppercase"
              style={{ fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.08em' }}
            >
              Built for Philippine creators
            </span>
          </div>

          <h1
            className="animate-enter"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              letterSpacing: '-0.035em',
              lineHeight: 0.92,
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
              fontSize: 'clamp(1rem, 1.4vw, 1.1875rem)',
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
              className="btn-primary inline-flex items-center no-underline"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                fontSize: '0.9375rem',
                letterSpacing: '0.02em',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: '4px',
              }}
            >
              Analyze my profile →
            </Link>
            <Link
              href="/report/sample"
              className="font-medium text-[--color-accent] underline-offset-2 hover:underline no-underline"
              style={{ fontSize: '0.875rem' }}
            >
              See a sample report →
            </Link>
          </div>

          {/* Social proof row */}
          <div
            className="animate-enter flex items-center gap-6"
            style={{ animationDelay: '320ms', paddingTop: 4 }}
          >
            {[
              { value: '67', label: 'creators in beta' },
              { value: '4.8', label: 'avg rating' },
              { value: '2min', label: 'report time' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: i === 0 ? 0 : 16 }}>
                {i > 0 && (
                  <div style={{ width: 1, height: 28, backgroundColor: 'var(--color-border)', marginRight: 16 }} />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1875rem', color: 'var(--color-text)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {stat.value}
                  </span>
                  <span style={{ fontWeight: 400, fontSize: '0.6875rem', color: 'var(--color-text-faint)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — report excerpt card with maroon header */}
        <div
          className="animate-enter-card"
          style={{
            border: '1.5px solid var(--color-accent)',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '4px',
            overflow: 'hidden',
            animationDelay: '320ms',
          }}
        >
          {/* Maroon header strip */}
          <div
            style={{
              backgroundColor: 'var(--color-accent)',
              padding: '11px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{
              fontWeight: 600,
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'oklch(90% 0.015 15)',
            }}>
              GIA — Creator Report
            </span>
            <span style={{
              fontWeight: 700,
              fontSize: '0.6875rem',
              letterSpacing: '0.04em',
              color: 'var(--color-gold)',
            }}>
              @maelingkitchen
            </span>
          </div>

          {/* Card body */}
          <div style={{ padding: 'clamp(20px, 3vw, 32px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { label: 'Top insight', text: 'Your 7pm food posts get 2× the saves of morning content.' },
              { label: 'Audience gap', text: 'Your Cebu audience is loyal but underserved — 3 posts in 30 days vs 24 for Manila.' },
              { label: 'Hook pattern', text: 'Hooks that open with a question perform 3× better for your niche.' },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-enter"
                style={{ animationDelay: `${400 + i * 80}ms`, display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                <span style={{
                  fontWeight: 600,
                  fontSize: '0.625rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                }}>
                  {item.label}
                </span>
                <p style={{
                  fontWeight: 400,
                  fontSize: '0.9375rem',
                  lineHeight: 1.55,
                  color: 'var(--color-text)',
                  margin: 0,
                }}>
                  {item.text}
                </p>
              </div>
            ))}

            <div style={{
              paddingTop: 14,
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontWeight: 400, fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>
                what a real GIA report looks like
              </span>
              <Link
                href="/report/sample"
                style={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                View full →
              </Link>
            </div>
          </div>
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
