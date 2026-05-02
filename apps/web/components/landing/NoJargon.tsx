'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const callouts = [
  {
    jargon: 'Engagement correlation coefficient',
    plain: 'Strong hooks',
  },
  {
    jargon: 'Geospatial temporal clustering',
    plain: 'Most fans: Metro Manila, 7–9 PM',
  },
  {
    jargon: 'NLP sentiment polarity index',
    plain: 'Comments are mostly love',
  },
]

export default function NoJargon() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const entry = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 600ms ${delay}ms ${EASE}, transform 600ms ${delay}ms ${EASE}`,
  })

  return (
    <section
      ref={ref}
      style={{
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Eyebrow + underline */}
        <div style={{ marginBottom: 'clamp(28px, 4vw, 40px)', ...entry(0) }}>
          <p
            style={{
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              margin: '0 0 6px 0',
            }}
          >
            Built for creators, not analysts
          </p>
          <div
            style={{
              width: 24,
              height: 1.5,
              backgroundColor: 'var(--color-gold)',
              transformOrigin: 'left center',
              transform: visible ? 'scaleX(1)' : 'scaleX(0)',
              transition: `transform 500ms 200ms ${EASE}`,
            }}
          />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--color-text)',
            margin: '0 0 16px 0',
            maxWidth: '22ch',
            ...entry(80),
          }}
        >
          You don&rsquo;t need to understand analytics. GIA does it for you.
        </h2>

        {/* Sub-copy */}
        <p
          style={{
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            margin: '0 0 clamp(40px, 6vw, 64px) 0',
            maxWidth: '52ch',
            ...entry(160),
          }}
        >
          No dashboards to decode. No metrics to memorize. GIA reads your TikTok data and tells you
          exactly what it means — in plain terms.
        </p>

        {/* Callout cards */}
        <div
          className="nojargon-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(16px, 3vw, 28px)',
          }}
        >
          {callouts.map((callout, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderTop: '2px solid var(--color-accent)',
                borderRadius: 4,
                padding: 'clamp(20px, 3vw, 28px)',
                ...entry(240 + idx * 120),
              }}
            >
              {/* Jargon (struck through) */}
              <p
                style={{
                  fontWeight: 400,
                  fontSize: '0.8rem',
                  color: 'var(--color-text-faint)',
                  textDecoration: 'line-through',
                  margin: '0 0 12px 0',
                  lineHeight: 1.5,
                }}
              >
                {callout.jargon}
              </p>

              {/* Arrow */}
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-gold)',
                  margin: '0 0 8px 0',
                }}
              >
                →
              </div>

              {/* Plain text */}
              <p
                style={{
                  fontWeight: 600,
                  fontSize: '1.0625rem',
                  color: 'var(--color-text)',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {callout.plain}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nojargon-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
