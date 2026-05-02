'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReportData } from '@/lib/mockReport'

type Props = {
  postIdeas: ReportData['postIdeas']
}

export default function PostIdeas({ postIdeas }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(40px, 5vw, 64px) var(--spacing-container)',
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
            color: 'var(--color-accent)',
            margin: '0 0 28px 0',
          }}
        >
          Post Recommendations
        </p>

        <div
          className="post-ideas-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px, 3vw, 36px)',
          }}
        >
          {postIdeas.map((idea, i) => (
            <div
              key={i}
              style={{
                borderTop: '2px solid var(--color-gold)',
                paddingTop: 20,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 500ms ${80 + i * 80}ms ${EASE}, transform 500ms ${80 + i * 80}ms ${EASE}`,
              }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 10 }}>
                <h3
                  style={{
                    flex: 1,
                    fontWeight: 600,
                    fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                    color: 'var(--color-text)',
                    margin: 0,
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {idea.title}
                </h3>
                <span
                  style={{
                    flexShrink: 0,
                    fontWeight: 800,
                    fontSize: '3rem',
                    lineHeight: 1,
                    color: 'var(--color-text-faint)',
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                    opacity: 0.4,
                  }}
                >
                  0{i + 1}
                </span>
              </div>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: 'var(--color-text-muted)',
                  margin: 0,
                }}
              >
                {idea.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .post-ideas-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
