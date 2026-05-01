'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReportData } from '@/lib/mockReport'

type Props = {
  hookScore: ReportData['hookScore']
}

export default function HookScore({ hookScore }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(48px, 6vw, 80px) var(--spacing-container)',
        borderBottom: '1px solid var(--color-border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <p
          style={{
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-faint)',
            margin: '0 0 20px 0',
          }}
        >
          Hook Score
        </p>

        {/* Editorial large number */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: 'clamp(3.25rem, 7vw, 5.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--color-text)',
            }}
          >
            {hookScore.score}
          </span>
          <span
            style={{
              fontWeight: 400,
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: 'var(--color-text-faint)',
              letterSpacing: '-0.01em',
            }}
          >
            / 100
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              borderRadius: 99,
              backgroundColor: 'var(--color-accent-muted)',
              color: 'var(--color-accent)',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginLeft: 4,
            }}
          >
            {hookScore.label}
          </span>
        </div>

        {/* Track bar */}
        <div
          style={{
            height: 6,
            backgroundColor: 'var(--color-border)',
            borderRadius: 3,
            position: 'relative',
            maxWidth: 480,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: visible ? `${hookScore.score}%` : '0%',
              backgroundColor: 'var(--color-accent)',
              borderRadius: 3,
              transition: 'width 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: visible ? `${hookScore.score}%` : '0%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)',
              boxShadow: '0 0 0 3px var(--color-surface), 0 2px 8px rgba(0,0,0,0.35)',
              zIndex: 1,
              transition: 'left 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        <p
          style={{
            fontWeight: 400,
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            margin: 0,
            maxWidth: '64ch',
          }}
        >
          {hookScore.reason}
        </p>
      </div>
    </section>
  )
}
