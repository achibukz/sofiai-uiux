'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const starterFeatures = [
  '10 video analysis',
  'Hook scoring + breakdown',
  'Comment sentiment',
  '3 video ideas',
  'Shareable story card',
]

const deepDiveFeatures = [
  { text: '30 video analysis', rule: false },
  { text: 'Full hook + comment deep dive', rule: true },
  { text: 'GIA account score', rule: false },
  { text: '5 video ideas + hook scripts', rule: true },
  { text: '30-day content roadmap', rule: true },
  { text: 'Shareable story card', rule: false },
]

const monthlyFeatures = [
  'Weekly mini-reports',
  'Monthly full deep dive',
  'Strategy calls included',
  'Priority turnaround',
  '4 story cards/month',
  'Slack access to GIA',
]

export default function Pricing() {
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
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const fadeIn = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 500ms ${delay}ms ${EASE}, transform 500ms ${delay}ms ${EASE}`,
  })

  return (
    <section
      ref={ref}
      id="pricing"
      style={{
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
        backgroundColor: 'var(--color-surface-raised)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, ...fadeIn(0) }}>
          <div style={{ width: 24, height: 2, backgroundColor: 'var(--color-accent)' }} />
          <span style={{
            fontWeight: 600,
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}>
            Pricing
          </span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)', ...fadeIn(0) }}>
          <h2 style={{ margin: '0 0 16px 0', lineHeight: 1.05 }}>
            <span style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
            }}>
              honest reports.
            </span>
            <span style={{
              display: 'block',
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--color-accent)',
            }}>
              honest prices.
            </span>
          </h2>
          <p style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--color-text-muted)', margin: 0 }}>
            no subscriptions you forget to cancel. pay for what you need.
          </p>
        </div>

        {/* Plans */}
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(12px, 2vw, 20px)',
            alignItems: 'stretch',
          }}
        >
          {/* Starter */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            padding: 'clamp(24px, 3.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            ...fadeIn(80),
          }}>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Starter
              </span>
            </div>
            <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span style={{ fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--color-text)' }}>
                ₱3,500
              </span>
            </div>
            <p style={{ fontWeight: 400, fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              one-time report
            </p>
            <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBottom: 20 }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
              {starterFeatures.map((feat) => (
                <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.45 }}>
                  <span style={{ flexShrink: 0, marginTop: 1, fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-accent)' }}>✓</span>
                  {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/analyze"
              className="no-underline hover:opacity-90"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '13px 20px',
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.02em',
                borderRadius: '999px',
                backgroundColor: 'var(--color-accent)',
                color: 'oklch(97% 0.008 75)',
                transition: 'opacity 150ms ease',
              }}
            >
              get started
            </Link>
          </div>

          {/* Deep Dive */}
          <div style={{
            backgroundColor: 'var(--color-accent)',
            borderRadius: '16px',
            padding: 'clamp(24px, 3.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            ...fadeIn(160),
          }}>
            {/* Most Popular badge */}
            <div style={{
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: 'var(--color-gold)',
              color: 'oklch(20% 0.02 60)',
              fontWeight: 700,
              fontSize: '0.5625rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '5px 12px',
              borderRadius: 999,
            }}>
              Most Popular
            </div>

            <div style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'oklch(97% 0.008 75)' }}>
                Deep Dive
              </span>
            </div>
            <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span style={{ fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.04em', lineHeight: 1, color: 'oklch(97% 0.008 75)' }}>
                ₱6,500
              </span>
            </div>
            <p style={{ fontWeight: 400, fontSize: '0.875rem', color: 'oklch(78% 0.02 15)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              one-time report
            </p>
            <div style={{ height: 1, backgroundColor: 'oklch(97% 0.008 75 / 0.15)', marginBottom: 20 }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: 0, flexGrow: 1 }}>
              {deepDiveFeatures.map((feat) => (
                <li key={feat.text}>
                  {feat.rule && (
                    <div style={{ height: 1, backgroundColor: 'oklch(97% 0.008 75 / 0.15)', margin: '10px 0' }} />
                  )}
                  <div style={{ display: 'flex', alignItems: 'flex-start', fontSize: '0.875rem', color: 'oklch(92% 0.01 15)', lineHeight: 1.45, padding: '5px 0' }}>
                    {feat.text}
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/analyze"
              className="no-underline hover:opacity-90"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '13px 20px',
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.02em',
                borderRadius: '999px',
                backgroundColor: 'oklch(97% 0.008 75)',
                color: 'var(--color-accent)',
                transition: 'opacity 150ms ease',
              }}
            >
              get your report
            </Link>
          </div>

          {/* Monthly */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            padding: 'clamp(24px, 3.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            ...fadeIn(240),
          }}>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Monthly
              </span>
            </div>
            <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span style={{ fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--color-text)' }}>
                ₱12,000
              </span>
            </div>
            <p style={{ fontWeight: 400, fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              per month
            </p>
            <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBottom: 20 }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
              {monthlyFeatures.map((feat) => (
                <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.45 }}>
                  <span style={{ flexShrink: 0, marginTop: 1, fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-accent)' }}>✓</span>
                  {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/analyze"
              className="no-underline hover:opacity-90"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '13px 20px',
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.02em',
                borderRadius: '999px',
                backgroundColor: 'var(--color-accent)',
                color: 'oklch(97% 0.008 75)',
                transition: 'opacity 150ms ease',
              }}
            >
              let&apos;s talk
            </Link>
          </div>
        </div>

        <p style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: '0.8125rem',
          color: 'var(--color-text-faint)',
          ...fadeIn(360),
        }}>
          Questions? Reach us at hello@sofi.ai
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
