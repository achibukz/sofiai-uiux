'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReportData } from '@/lib/mockReport'

type Props = {
  audienceSignals: ReportData['audienceSignals']
}

export default function AudienceSignals({ audienceSignals }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const maxPct = Math.max(...audienceSignals.topLocations.map((l) => l.percentage))

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(48px, 6vw, 80px) var(--spacing-container)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
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
            margin: '0 0 32px 0',
          }}
        >
          Audience Signals
        </p>

        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {/* Location breakdown */}
          <div>
            <h3
              style={{
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--color-text)',
                margin: '0 0 16px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Location
            </h3>
            <div className="flex flex-col gap-3">
              {audienceSignals.topLocations.map((loc) => (
                <div key={loc.name}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 500 }}>
                      {loc.name}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      {loc.percentage}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      backgroundColor: 'var(--color-border)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${(loc.percentage / maxPct) * 100}%`,
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: 3,
                        opacity: 0.85,
                        transition: 'width 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age & Watch Time + Timing Heatmap */}
          <div className="flex flex-col gap-8">
            {/* Age & watch time inline */}
            <div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  margin: '0 0 10px 0',
                  letterSpacing: '-0.01em',
                }}
              >
                Age & Watch Time
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                Your core audience is{' '}
                <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>
                  {audienceSignals.ageRange}
                </span>
                , spending{' '}
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  {audienceSignals.watchTimeAvg}
                </span>{' '}
                of each video on average.
              </p>
            </div>

            {/* Timing heatmap */}
            <div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  margin: '0 0 14px 0',
                  letterSpacing: '-0.01em',
                }}
              >
                Best Time to Post
              </h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                {audienceSignals.timingHeatmap.map((band) => {
                  const height = Math.max(20, band.intensity * 100)
                  const opacity = 0.3 + band.intensity * 0.7
                  return (
                    <div
                      key={band.label}
                      className="flex flex-col items-center gap-2"
                      style={{ flex: 1 }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: `${height}%`,
                          backgroundColor: 'var(--color-accent)',
                          borderRadius: '3px 3px 0 0',
                          opacity,
                          transition: 'height 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                {audienceSignals.timingHeatmap.map((band) => (
                  <div
                    key={band.label}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '0.625rem',
                      color: 'var(--color-text-faint)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {band.label}
                  </div>
                ))}
              </div>
              <p
                style={{
                  marginTop: 10,
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Peak activity at{' '}
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  {audienceSignals.peakHours}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
