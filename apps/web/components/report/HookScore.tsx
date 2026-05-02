'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReportData } from '@/lib/mockReport'

type Props = {
  hookScore: ReportData['hookScore']
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function HookScore({ hookScore }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [countedScore, setCountedScore] = useState(0)

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

  useEffect(() => {
    if (!visible) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setCountedScore(hookScore.score); return }

    const duration = 900
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCountedScore(Math.round(hookScore.score * easeOutCubic(progress)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, hookScore.score])

  return (
    <section
      ref={ref}
      style={{
        padding: '32px 0',
        borderBottom: '1px solid var(--color-border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <p
        style={{
          fontWeight: 500,
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          margin: '0 0 16px 0',
        }}
      >
        Hook Score
      </p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
        <span
          style={{
            fontWeight: 800,
            fontSize: 'clamp(3.25rem, 7vw, 5.5rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: 'var(--color-text)',
          }}
        >
          {countedScore}
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
          height: 8,
          backgroundColor: 'var(--color-border)',
          borderRadius: 4,
          position: 'relative',
          maxWidth: 400,
          marginBottom: 20,
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
            borderRadius: 4,
            transition: 'width 900ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Score dot */}
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
        {/* Pulse ring — fires once after bar finishes */}
        {visible && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: `${hookScore.score}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              border: '1.5px solid var(--color-accent)',
              pointerEvents: 'none',
              animation: 'pulseRing 600ms 950ms ease-out 1 forwards',
            }}
          />
        )}
      </div>

      <p
        style={{
          fontWeight: 400,
          fontSize: '0.9375rem',
          lineHeight: 1.7,
          color: 'var(--color-text-muted)',
          margin: 0,
          maxWidth: '56ch',
        }}
      >
        {hookScore.reason}
      </p>
    </section>
  )
}
