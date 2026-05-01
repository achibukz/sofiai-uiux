'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReportData } from '@/lib/mockReport'
import Tag from '@/components/ui/Tag'

type Props = {
  sentiment: ReportData['sentiment']
}

const SENTIMENT_BARS = [
  { key: 'positive' as const, label: 'Positive', color: 'var(--color-sentiment-pos)', colorKey: 'pos' as const },
  { key: 'neutral' as const, label: 'Neutral', color: 'var(--color-sentiment-neu)', colorKey: 'neu' as const },
  { key: 'negative' as const, label: 'Negative', color: 'var(--color-sentiment-neg)', colorKey: 'neg' as const },
]

export default function Sentiment({ sentiment }: Props) {
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
          Sentiment Analysis
        </p>

        {/* Three bars */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 40, maxWidth: 400 }}>
          {SENTIMENT_BARS.map((bar) => {
            const pct = sentiment[bar.key]
            return (
              <div key={bar.key} className="flex flex-col gap-2" style={{ flex: 1 }}>
                <div
                  style={{
                    height: 100,
                    backgroundColor: 'var(--color-border)',
                    borderRadius: 6,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: `${pct}%`,
                      backgroundColor: bar.color,
                      opacity: 0.9,
                      transition: 'height 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: bar.color,
                      marginBottom: 2,
                    }}
                  >
                    {pct}%
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-faint)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {bar.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Example comments */}
        <div className="flex flex-col gap-4">
          {sentiment.exampleComments.map((comment, i) => {
            const colorKey = comment.tone === 'positive' ? 'pos' : comment.tone === 'neutral' ? 'neu' : 'neg'
            return (
              <div
                key={i}
                style={{
                  paddingLeft: 20,
                  borderLeft: `2px solid ${
                    comment.tone === 'positive'
                      ? 'var(--color-sentiment-pos)'
                      : comment.tone === 'neutral'
                      ? 'var(--color-sentiment-neu)'
                      : 'var(--color-sentiment-neg)'
                  }`,
                }}
              >
                <div style={{ marginBottom: 6 }}>
                  <Tag
                    label={comment.tone.charAt(0).toUpperCase() + comment.tone.slice(1)}
                    color={colorKey}
                  />
                </div>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{comment.text}&rdquo;
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
