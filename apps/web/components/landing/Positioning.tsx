'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const rows = [
  { feature: 'Knows your niche',                           tiktok: '✗', generic: 'Partly',    gia: '✓' },
  { feature: 'Analyzes hook performance',                  tiktok: '✗', generic: '✗',         gia: '✓' },
  { feature: 'Understands Filipino / Taglish comments',    tiktok: '✗', generic: '✗',         gia: '✓' },
  { feature: 'Plain language, not dashboards',             tiktok: '✗', generic: 'Sometimes', gia: '✓' },
  { feature: 'Action-oriented recommendations',            tiktok: '✗', generic: 'Generic',   gia: 'Specific' },
  { feature: 'Free to try',                                tiktok: '✓', generic: 'Paid',      gia: '✓' },
]

export default function Positioning() {
  const headerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [tableVisible, setTableVisible] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setHeaderVisible(true)
      setTableVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          if (entry.target === headerRef.current) setHeaderVisible(true)
          if (entry.target === tableRef.current) setTableVisible(true)
        })
      },
      { threshold: 0.15 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    if (tableRef.current) obs.observe(tableRef.current)
    return () => obs.disconnect()
  }, [])

  const headerEntry = (delay: number): React.CSSProperties => ({
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 500ms ${delay}ms ${EASE}, transform 500ms ${delay}ms ${EASE}`,
  })

  const rowEntry = (i: number): React.CSSProperties => ({
    opacity: tableVisible ? 1 : 0,
    transform: tableVisible ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 400ms ${i * 45}ms ${EASE}, transform 400ms ${i * 45}ms ${EASE}`,
  })

  return (
    <section
      style={{
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div ref={headerRef}>
          <p
            className="text-[--color-accent] uppercase"
            style={{ fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.06em', marginBottom: 12, ...headerEntry(0) }}
          >
            Why GIA
          </p>
          <h2
            className="text-[--color-text]"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              letterSpacing: '-0.01em',
              margin: `0 0 clamp(40px, 6vw, 64px) 0`,
              lineHeight: 1.2,
              ...headerEntry(70),
            }}
          >
            Built differently from everything else you&rsquo;ve tried
          </h2>
        </div>

        {/* Table */}
        <div
          ref={tableRef}
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 16,
            overflow: 'hidden',
            opacity: tableVisible ? 1 : 0,
            transition: `opacity 400ms 0ms ${EASE}`,
          }}
        >
          {/* Header */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div style={{ padding: '16px 20px' }} />
            {[
              { label: "TikTok's built-in", sub: 'data without context' },
              { label: 'Generic AI tools', sub: 'not built for your niche' },
              { label: 'GIA', sub: 'built for Filipino creators', highlight: true },
            ].map((col) => (
              <div
                key={col.label}
                style={{
                  padding: '16px 20px',
                  backgroundColor: col.highlight ? 'var(--color-accent-muted)' : 'transparent',
                  borderLeft: col.highlight ? '1px solid var(--color-accent)/30' : '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: col.highlight ? 'var(--color-accent)' : 'var(--color-text)', marginBottom: 2 }}>
                  {col.label}
                </div>
                <div style={{ fontWeight: 400, fontSize: '0.75rem', color: col.highlight ? 'var(--color-accent-dim)' : 'var(--color-text-faint)', letterSpacing: '0.01em' }}>
                  {col.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Rows — stagger in after table container appears */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid"
              style={{
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
                backgroundColor: i % 2 === 1 ? 'oklch(14% 0.013 52 / 0.5)' : 'transparent',
                ...rowEntry(i),
              }}
            >
              <div style={{ padding: '14px 20px', fontSize: '0.875rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>
                {row.feature}
              </div>
              {[row.tiktok, row.generic, row.gia].map((val, j) => {
                const isGia = j === 2
                const isPositive = val === '✓' || val === 'Specific'
                return (
                  <div
                    key={j}
                    style={{
                      padding: '14px 20px',
                      fontSize: '0.875rem',
                      fontWeight: isPositive && isGia ? 600 : 400,
                      color: isGia
                        ? isPositive ? 'var(--color-accent)' : 'var(--color-text-faint)'
                        : val === '✓' ? 'var(--color-text-muted)' : 'var(--color-text-faint)',
                      backgroundColor: isGia ? 'var(--color-accent-muted)' : 'transparent',
                      borderLeft: isGia ? '1px solid oklch(76% 0.185 68 / 0.15)' : '1px solid var(--color-border)',
                    }}
                  >
                    {val}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
