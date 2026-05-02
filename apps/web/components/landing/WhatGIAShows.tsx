'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const features = [
  {
    title: 'Hook Score',
    description: 'GIA scores every hook type in your last 30 posts and tells you exactly which patterns hold viewers past the 5-second mark.',
    preview: (
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between mb-1">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hook Score</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-accent)' }}>72 / 100</span>
        </div>
        <div style={{ height: 8, backgroundColor: 'var(--color-border)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '72%', backgroundColor: 'var(--color-accent)', borderRadius: 4 }} />
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>Strong: question hooks outperform statement hooks 3×</p>
      </div>
    ),
  },
  {
    title: 'Audience Signals',
    description: 'GIA maps your real audience by location and viewing time, so you can post when your people are most active.',
    preview: (
      <div className="flex flex-col gap-3 w-full">
        {[
          { name: 'Metro Manila', pct: 58 },
          { name: 'Cebu', pct: 19 },
          { name: 'Davao', pct: 12 },
        ].map((loc) => (
          <div key={loc.name} className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)', fontWeight: 500 }}>{loc.name}</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{loc.pct}%</span>
            </div>
            <div style={{ height: 6, backgroundColor: 'var(--color-border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${loc.pct}%`, backgroundColor: 'var(--color-accent)', opacity: 0.85 }} />
            </div>
          </div>
        ))}
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', margin: '4px 0 0 0' }}>Peak activity: 7–9 PM</p>
      </div>
    ),
  },
  {
    title: 'Sentiment Analysis',
    description: 'GIA reads your comments in Filipino and English, and surfaces the emotional signal behind the numbers.',
    preview: (
      <div className="flex gap-3 w-full">
        {[
          { label: 'Positive', pct: 68, color: 'var(--color-sentiment-pos)' },
          { label: 'Neutral', pct: 22, color: 'var(--color-sentiment-neu)' },
          { label: 'Negative', pct: 10, color: 'var(--color-sentiment-neg)' },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-2 flex-1">
            <div style={{ height: 80, backgroundColor: 'var(--color-border)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${s.pct}%`, backgroundColor: s.color, opacity: 0.9 }} />
            </div>
            <div className="text-center">
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: s.color }}>{s.pct}%</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Post Recommendations',
    description: 'Every suggestion is tied to your actual data, not generic tips that work for anyone.',
    preview: (
      <div className="flex flex-col gap-3 w-full">
        {['7PM dinner series', 'Cebu regional spotlight', 'Question-hook comparison post'].map((idea, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--color-text-faint)', minWidth: 20, paddingTop: 2 }}>0{i + 1}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 500, lineHeight: 1.4 }}>{idea}</span>
          </div>
        ))}
      </div>
    ),
  },
]

type Feature = typeof features[0]

function Strip({ feature, index, reversed }: { feature: Feature; index: number; reversed: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setVisible(true); return }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const isLast = index === features.length - 1

  return (
    <div
      ref={ref}
      className="what-strip"
      style={{
        backgroundColor: reversed ? 'var(--color-surface)' : 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'clamp(56px, 8vw, 88px)',
        paddingBottom: isLast ? 'var(--spacing-section)' : 'clamp(56px, 8vw, 88px)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
      }}
    >
      <div
        className="what-strip-inner"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: reversed ? 'row-reverse' : 'row',
          alignItems: 'center',
          gap: 'clamp(40px, 7vw, 80px)',
        }}
      >
        {/* Text column */}
        <div
          style={{
            flex: '0 0 42%',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 500ms 0ms ${EASE}, transform 500ms 0ms ${EASE}`,
          }}
        >
          <span
            style={{
              display: 'block',
              fontWeight: 800,
              fontSize: 'clamp(4rem, 8vw, 6.5rem)',
              lineHeight: 0.9,
              color: 'var(--color-text-faint)',
              letterSpacing: '-0.05em',
              marginBottom: 20,
              opacity: 0.3,
              userSelect: 'none',
            }}
          >
            0{index + 1}
          </span>
          <h3
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text)',
              margin: '0 0 16px 0',
            }}
          >
            {feature.title}
          </h3>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
              margin: 0,
              maxWidth: '36ch',
            }}
          >
            {feature.description}
          </p>
        </div>

        {/* Preview column */}
        <div
          style={{
            flex: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : `translateX(${reversed ? -24 : 24}px)`,
            transition: `opacity 600ms 100ms ${EASE}, transform 600ms 100ms ${EASE}`,
            padding: 'clamp(24px, 4vw, 36px)',
            backgroundColor: reversed ? 'var(--color-bg)' : 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
          }}
        >
          {feature.preview}
        </div>
      </div>
    </div>
  )
}

export default function WhatGIAShows() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setHeaderVisible(true); return }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="what-gia-shows">
      <div
        style={{
          paddingTop: 'var(--spacing-section)',
          paddingLeft: 'var(--spacing-container)',
          paddingRight: 'var(--spacing-container)',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        <div
          ref={headerRef}
          style={{ maxWidth: '960px', margin: '0 auto', marginBottom: 'clamp(24px, 4vw, 40px)' }}
        >
          <p
            className="text-[--color-accent] uppercase"
            style={{
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              marginBottom: 12,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 500ms 0ms ${EASE}, transform 500ms 0ms ${EASE}`,
            }}
          >
            What GIA Shows
          </p>
          <h2
            className="text-[--color-text]"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              letterSpacing: '-0.01em',
              margin: 0,
              lineHeight: 1.2,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 500ms 80ms ${EASE}, transform 500ms 80ms ${EASE}`,
            }}
          >
            Your content already knows what works. GIA shows you.
          </h2>
        </div>
      </div>

      {features.map((feature, i) => (
        <Strip key={i} feature={feature} index={i} reversed={i % 2 === 1} />
      ))}

      <style>{`
        @media (max-width: 680px) {
          .what-strip-inner {
            flex-direction: column !important;
          }
          .what-strip-inner > div:first-child {
            flex: 0 0 auto !important;
          }
        }
      `}</style>
    </section>
  )
}
