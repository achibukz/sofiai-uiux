'use client'

import { useEffect, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function CrosshairIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="21" y2="12" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function MessageHeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M12 9c0-.83-.63-1.5-1.5-1.5S9 8.17 9 9c0 1.83 3 3 3 3s3-1.17 3-3c0-.83-.63-1.5-1.5-1.5S12 8.17 12 9z" />
    </svg>
  )
}

function LightbulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 1 7 7c0 2.62-1.5 4.91-3.5 6.2V17H8.5v-1.8C6.5 13.91 5 11.62 5 9a7 7 0 0 1 7-7z" />
    </svg>
  )
}

const sections = [
  {
    title: 'Hook Score',
    icon: <CrosshairIcon />,
    description:
      'Know which openings grab attention and which lose it. GIA scores every hook type in your last 30 posts and tells you exactly which patterns hold viewers past the 5-second mark.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center justify-between mb-1">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hook Score</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-accent)' }}>72 / 100</span>
        </div>
        <div style={{ height: 8, backgroundColor: 'var(--color-border)', borderRadius: 4, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '72%', backgroundColor: 'var(--color-accent)', borderRadius: 4 }} />
          <div style={{ position: 'absolute', left: '72%', top: '50%', transform: 'translate(-50%, -50%)', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-accent)', boxShadow: '0 0 0 3px var(--color-surface)' }} />
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>Strong — question hooks outperform statement hooks 3×</p>
      </div>
    ),
  },
  {
    title: 'Audience Signals',
    icon: <UsersIcon />,
    description:
      'See who\'s actually watching and when they tune in. GIA maps your real audience by age, location, and viewing time — so you can post when your people are most active.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-xs">
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
            <div style={{ height: 6, backgroundColor: 'var(--color-border)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${loc.pct}%`, backgroundColor: 'var(--color-accent)', borderRadius: 3, opacity: 0.85 }} />
            </div>
          </div>
        ))}
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', margin: '4px 0 0 0' }}>Peak activity: 7–9 PM</p>
      </div>
    ),
  },
  {
    title: 'Sentiment Analysis',
    icon: <MessageHeartIcon />,
    description:
      'Understand what your audience feels, in their own words. GIA reads your comments — in Filipino and English — and surfaces the emotional signal behind the numbers.',
    preview: (
      <div className="flex gap-3 w-full max-w-xs">
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
    icon: <LightbulbIcon />,
    description:
      'Get 3 specific ideas to try this week, with reasoning. Every suggestion is tied to your actual data — not generic tips that work for anyone.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-xs">
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

export default function WhatGIAShows() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVisibleSections(new Set(sections.map((_, i) => i)))
      return
    }

    const elements = document.querySelectorAll<HTMLElement>('[data-what-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.whatSection ?? '0')
            setVisibleSections(prev => new Set([...prev, idx]))
          }
        })
      },
      { threshold: 0.12 }
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div id="what-gia-shows">
      {sections.map((section, i) => {
        const visible = visibleSections.has(i)
        const isEven = i % 2 === 0

        const textEntry: React.CSSProperties = {
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity 500ms 0ms ${EASE}, transform 500ms 0ms ${EASE}`,
        }
        const cardEntry: React.CSSProperties = {
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity 500ms 120ms ${EASE}, transform 500ms 120ms ${EASE}`,
        }

        return (
          <section
            key={i}
            data-what-section={i}
            style={{
              backgroundColor: isEven ? 'var(--color-bg)' : 'var(--color-surface)',
              paddingTop: 'var(--spacing-section)',
              paddingBottom: 'var(--spacing-section)',
              paddingLeft: 'var(--spacing-container)',
              paddingRight: 'var(--spacing-container)',
            }}
          >
            <div
              style={{
                maxWidth: '1280px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(48px, 8vw, 96px)',
                alignItems: 'center',
              }}
            >
              <div style={{ order: isEven ? 0 : 1, ...textEntry }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: 'var(--color-accent-muted)',
                    color: 'var(--color-accent)',
                    marginBottom: 20,
                  }}
                >
                  {section.icon}
                </div>
                <h2
                  className="text-[--color-text]"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    letterSpacing: '-0.01em',
                    margin: '0 0 16px 0',
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-[--color-text-muted]"
                  style={{ fontWeight: 400, fontSize: '1rem', lineHeight: 1.65, margin: 0 }}
                >
                  {section.description}
                </p>
              </div>

              <div
                className="panel-interactive flex items-center justify-center"
                style={{
                  order: isEven ? 1 : 0,
                  padding: 'clamp(24px, 3vw, 40px)',
                  backgroundColor: isEven ? 'var(--color-surface)' : 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  ...cardEntry,
                }}
              >
                {section.preview}
              </div>
            </div>

            <style>{`
              @media (max-width: 768px) {
                .what-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </section>
        )
      })}
    </div>
  )
}
