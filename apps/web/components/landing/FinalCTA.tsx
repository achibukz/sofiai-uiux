'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const entry = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 500ms ${delay}ms ${EASE}, transform 500ms ${delay}ms ${EASE}`,
  })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-accent)',
        paddingTop: 'var(--spacing-section-major)',
        paddingBottom: 'var(--spacing-section-major)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-35%',
          left: '-8%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          border: '1px solid oklch(97% 0.008 75 / 0.07)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-25%',
          right: '-4%',
          width: '38vw',
          height: '38vw',
          borderRadius: '50%',
          border: '1px solid var(--color-gold)',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            margin: '0 0 20px 0',
            ...entry(0),
          }}
        >
          Ready to grow?
        </p>

        <h2
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
            letterSpacing: '-0.035em',
            lineHeight: 0.95,
            margin: '0 0 24px 0',
            color: 'oklch(97% 0.008 75)',
            ...entry(80),
          }}
        >
          Know exactly why your content works.
        </h2>

        <p
          style={{
            fontWeight: 400,
            fontSize: '1.0625rem',
            lineHeight: 1.65,
            margin: '0 0 40px 0',
            color: 'oklch(78% 0.02 15)',
            ...entry(160),
          }}
        >
          Paste your TikTok link. GIA does the rest — no spreadsheets, no jargon, no guessing.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-5"
          style={entry(240)}
        >
          <Link
            href="/analyze"
            className="inline-flex items-center no-underline"
            style={{
              backgroundColor: 'oklch(97% 0.008 75)',
              color: 'var(--color-accent)',
              padding: '14px 32px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.9375rem',
              letterSpacing: '0.02em',
            }}
          >
            Analyze my profile →
          </Link>
          <Link
            href="/report/sample"
            style={{
              fontWeight: 500,
              fontSize: '0.9375rem',
              color: 'oklch(78% 0.02 15)',
              textDecoration: 'none',
              opacity: 0.85,
            }}
            className="hover:opacity-100"
          >
            See sample report
          </Link>
        </div>
      </div>
    </section>
  )
}
