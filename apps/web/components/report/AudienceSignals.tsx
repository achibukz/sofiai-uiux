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
        padding: '32px 0',
        borderTop: '1px solid var(--color-border)',
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
          margin: '0 0 20px 0',
        }}
      >
        Audience Signals
      </p>

      <div className="flex flex-col gap-8">
        {/* Location breakdown */}
        <div>
          <h3
            style={{
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: 'var(--color-text)',
              margin: '0 0 12px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Location
          </h3>
          <div className="flex flex-col gap-3">
            {audienceSignals.topLocations.map((loc, i) => (
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
                      width: '100%',
                      backgroundColor: 'var(--color-accent)',
                      opacity: i === 0 ? 1 : 0.7 - i * 0.12,
                      transformOrigin: 'left center',
                      transform: visible ? `scaleX(${loc.percentage / maxPct})` : 'scaleX(0)',
                      transition: `transform 600ms ${i * 80}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age & Watch Time */}
        <div>
          <h3
            style={{
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: 'var(--color-text)',
              margin: '0 0 8px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Age & Watch Time
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
            Core audience:{' '}
            <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>
              {audienceSignals.ageRange}
            </span>
            , avg watch time{' '}
            <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              {audienceSignals.watchTimeAvg}
            </span>
          </p>
        </div>

        {/* Timing heatmap */}
        <div>
          <h3
            style={{
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: 'var(--color-text)',
              margin: '0 0 12px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Best Time to Post
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64 }}>
            {audienceSignals.timingHeatmap.map((band) => {
              const barHeight = Math.max(20, band.intensity * 100)
              const isHot = band.intensity > 0.6
              return (
                <div
                  key={band.label}
                  className="flex flex-col items-center gap-2"
                  style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${barHeight}%`,
                      backgroundColor: isHot ? 'var(--color-gold)' : 'var(--color-accent)',
                      borderRadius: '3px 3px 0 0',
                      opacity: isHot ? 0.9 : 0.3 + band.intensity * 0.5,
                      transformOrigin: 'bottom center',
                      transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                      transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
            {audienceSignals.timingHeatmap.map((band) => (
              <div
                key={band.label}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: '0.5625rem',
                  color: 'var(--color-text-faint)',
                  letterSpacing: '0.01em',
                }}
              >
                {band.label}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 8, fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Peak at{' '}
            <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              {audienceSignals.peakHours}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
