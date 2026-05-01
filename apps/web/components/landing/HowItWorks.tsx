'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const steps = [
  {
    number: '01',
    title: 'Paste your TikTok link',
    description: 'Drop in your profile URL — that\'s all we need to get started.',
  },
  {
    number: '02',
    title: 'GIA reads your last 30 posts',
    description: 'We analyze hooks, timing, audience signals, and comment sentiment.',
  },
  {
    number: '03',
    title: 'Get your report in seconds',
    description: 'A plain-language breakdown of what\'s working and what to try next.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const entry = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 500ms ${delay}ms ${EASE}, transform 500ms ${delay}ms ${EASE}`,
  })

  return (
    <section
      ref={ref}
      id="how-it-works"
      style={{
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p
          className="text-[--color-accent] uppercase"
          style={{
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            marginBottom: 40,
            ...entry(0),
          }}
        >
          How it works
        </p>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col"
              style={{ paddingRight: i < 2 ? '40px' : 0, paddingTop: '24px', ...entry(i * 120) }}
            >
              {/* Connector line — draws left→right after step enters */}
              {i < 2 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 36,
                    left: '50%',
                    right: '-20px',
                    height: 1,
                    backgroundColor: 'var(--color-border)',
                    zIndex: 0,
                    transformOrigin: 'left center',
                    transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 650ms ${160 + i * 160}ms ${EASE}`,
                  }}
                />
              )}

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span
                  className="block text-[--color-text-faint] select-none"
                  style={{ fontWeight: 800, fontSize: '4rem', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '16px' }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-[--color-text]"
                  style={{ fontWeight: 600, fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', margin: '0 0 8px 0', letterSpacing: '-0.01em' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[--color-text-muted]"
                  style={{ fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5 items-start" style={entry(i * 100)}>
              <span
                className="text-[--color-text-faint] shrink-0 select-none"
                style={{ fontWeight: 800, fontSize: '2.5rem', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                {step.number}
              </span>
              <div>
                <h3
                  className="text-[--color-text]"
                  style={{ fontWeight: 600, fontSize: '1.125rem', margin: '0 0 4px 0' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[--color-text-muted]"
                  style={{ fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
