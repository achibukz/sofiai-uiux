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
            margin: '0 0 24px 0',
          }}
        >
          Hook Score
        </p>

        {/* Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div
            style={{
              flex: 1,
              height: 8,
              backgroundColor: 'var(--color-border)',
              borderRadius: 4,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${hookScore.score}%`,
                backgroundColor: 'var(--color-accent)',
                borderRadius: 4,
                transition: 'width 800ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            {/* Marker */}
            <div
              style={{
                position: 'absolute',
                left: `${hookScore.score}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 0 0 4px var(--color-surface), 0 2px 8px rgba(0,0,0,0.4)',
                zIndex: 1,
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, minWidth: 'fit-content' }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--color-accent)',
                letterSpacing: '-0.02em',
              }}
            >
              {hookScore.score}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>/100</span>
            <span
              style={{
                marginLeft: 4,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-accent)',
              }}
            >
              {hookScore.label}
            </span>
          </div>
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
