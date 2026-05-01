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
      { threshold: 0.15 }
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
            margin: '0 0 40px 0',
          }}
        >
          Post Recommendations
        </p>

        <div className="flex flex-col gap-12">
          {postIdeas.map((idea, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: 64 }}>
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: -8,
                  fontWeight: 800,
                  fontSize: '3.5rem',
                  lineHeight: 1,
                  color: 'var(--color-text-faint)',
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                  zIndex: 0,
                }}
              >
                0{i + 1}
              </span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
                    color: 'var(--color-text)',
                    margin: '0 0 10px 0',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {idea.title}
                </h3>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--color-text-muted)',
                    margin: 0,
                  }}
                >
                  {idea.rationale}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
