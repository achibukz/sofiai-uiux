'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function Step1Visual({ visible }: { visible: boolean }) {
  return (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" aria-hidden>
      {/* Address bar pill */}
      <rect x="1" y="4" width="178" height="32" rx="16" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
      {/* Favicon circle */}
      <circle cx="20" cy="20" r="5" fill="var(--color-accent-muted)" stroke="var(--color-accent)" strokeWidth="1" />
      {/* URL text stub */}
      <rect
        x="32" y="18" width="80" height="4" rx="2" fill="var(--color-border)"
        style={{
          transformOrigin: '32px 20px',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 500ms 80ms ${EASE}`,
        }}
      />
      {/* Go button */}
      <rect x="140" y="10" width="28" height="20" rx="4" fill="var(--color-accent)" />
      <polygon points="151,17 151,23 157,20" fill="var(--color-bg)" />
    </svg>
  )
}

function Step2Visual({ visible }: { visible: boolean }) {
  return (
    <div style={{ position: 'relative', width: 120, height: 56, overflow: 'hidden' }}>
      {/* Post stubs */}
      {[80, 60, 72].map((w, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: i * 20,
            left: 0,
            width: w,
            height: 8,
            borderRadius: 4,
            backgroundColor: 'var(--color-border)',
          }}
        />
      ))}
      {/* Gold scan line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 1.5,
          backgroundColor: 'var(--color-gold)',
          animationName: 'scanLine',
          animationDuration: '2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationPlayState: visible ? 'running' : 'paused',
        }}
      />
    </div>
  )
}

function Step3Visual({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        width: 140,
        height: 72,
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        backgroundColor: 'var(--color-surface)',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) rotate(0deg) scale(1)' : 'translateY(8px) rotate(-1deg) scale(0.97)',
        transition: `opacity 500ms 240ms ${EASE}, transform 500ms 240ms ${EASE}`,
      }}
    >
      {/* Maroon header strip */}
      <div style={{ height: 16, backgroundColor: 'var(--color-accent)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6 }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-bg)', opacity: 0.6 }} />
      </div>
      {/* Data rows */}
      <div style={{ padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: 'var(--color-border)' }} />
            <div style={{ width: 16, height: 4, borderRadius: 2, backgroundColor: 'var(--color-gold)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

const steps = [
  {
    number: '01',
    title: 'Paste your TikTok link',
    description: 'Drop in your profile URL — that\'s all we need to get started.',
    visual: (v: boolean) => <Step1Visual visible={v} />,
  },
  {
    number: '02',
    title: 'GIA reads your last 30 posts',
    description: 'We analyze hooks, timing, audience signals, and comment sentiment.',
    visual: (v: boolean) => <Step2Visual visible={v} />,
  },
  {
    number: '03',
    title: 'Get your report in seconds',
    description: 'A plain-language breakdown of what\'s working and what to try next.',
    visual: (v: boolean) => <Step3Visual visible={v} />,
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
        <div style={{ ...entry(0), marginBottom: 40 }}>
          <p
            className="text-[--color-accent] uppercase"
            style={{ fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.06em', margin: '0 0 6px 0' }}
          >
            How it works
          </p>
          {/* Gold drawn underline on eyebrow */}
          <div
            style={{
              width: 24,
              height: 1.5,
              backgroundColor: 'var(--color-gold)',
              transformOrigin: 'left center',
              transform: visible ? 'scaleX(1)' : 'scaleX(0)',
              transition: `transform 500ms 200ms ${EASE}`,
            }}
          />
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col"
              style={{ paddingRight: i < 2 ? '40px' : 0, paddingTop: '24px', ...entry(i * 120) }}
            >
              {/* Connector line */}
              {i < 2 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 60,
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
                {/* Step visual */}
                <div style={{ height: 72, display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  {step.visual(visible)}
                </div>

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
