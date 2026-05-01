'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const plans = [
  {
    name: 'Free',
    price: null,
    tagline: 'Try it with no commitment.',
    features: [
      '1 analysis per month',
      'Hook score overview',
      'Top 3 audience signals',
      'Basic post recommendations',
    ],
    cta: 'Start free',
    ctaHref: '/analyze',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '₱299',
    per: '/mo',
    tagline: 'For creators building a habit.',
    features: [
      '5 analyses per month',
      'Full hook breakdown',
      'Sentiment analysis',
      'Complete post recommendations',
      'Video-by-video breakdown',
    ],
    cta: 'Get Starter',
    ctaHref: '/analyze',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₱799',
    per: '/mo',
    tagline: 'For creators who are serious.',
    features: [
      'Unlimited analyses',
      'Priority report processing',
      'Full report history',
      'Team access (up to 3)',
      'Early access to new features',
    ],
    cta: 'Get Pro',
    ctaHref: '/analyze',
    highlight: true,
  },
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
        {/* Header */}
        <div
          style={{
            marginBottom: 'clamp(40px, 6vw, 64px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 500ms 0ms ${EASE}, transform 500ms 0ms ${EASE}`,
          }}
        >
          <p
            style={{
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              margin: '0 0 12px 0',
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: 'var(--color-text)',
              margin: '0 0 12px 0',
            }}
          >
            Start free. Upgrade when you&rsquo;re ready.
          </h2>
          <p style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--color-text-muted)', margin: 0 }}>
            All prices in Philippine Peso. Billed monthly. Cancel anytime.
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
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{
                backgroundColor: plan.highlight ? 'var(--color-accent)' : 'var(--color-surface)',
                border: plan.highlight ? 'none' : '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: 'clamp(24px, 3.5vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 500ms ${80 + i * 80}ms ${EASE}, transform 500ms ${80 + i * 80}ms ${EASE}`,
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    border: '1px solid var(--color-gold)',
                    color: 'var(--color-gold)',
                    fontWeight: 600,
                    fontSize: '0.5625rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    marginBottom: 18,
                  }}
                >
                  Most popular
                </div>
              )}

              <div style={{ marginBottom: 6 }}>
                <span style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '-0.01em',
                  color: plan.highlight ? 'oklch(97% 0.008 75)' : 'var(--color-text)',
                }}>
                  {plan.name}
                </span>
              </div>

              <div style={{ marginBottom: 14, display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: plan.highlight ? 'oklch(97% 0.008 75)' : 'var(--color-text)',
                }}>
                  {plan.price ?? 'Free'}
                </span>
                {plan.per && (
                  <span style={{
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    color: plan.highlight ? 'oklch(78% 0.02 15)' : 'var(--color-text-muted)',
                  }}>
                    {plan.per}
                  </span>
                )}
              </div>

              <p style={{
                fontWeight: 400,
                fontSize: '0.875rem',
                color: plan.highlight ? 'oklch(78% 0.02 15)' : 'var(--color-text-muted)',
                margin: '0 0 20px 0',
                lineHeight: 1.5,
              }}>
                {plan.tagline}
              </p>

              <div style={{
                height: 1,
                backgroundColor: plan.highlight ? 'oklch(97% 0.008 75 / 0.12)' : 'var(--color-border)',
                marginBottom: 20,
              }} />

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 28px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                flexGrow: 1,
              }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontSize: '0.875rem',
                    color: plan.highlight ? 'oklch(92% 0.01 15)' : 'var(--color-text)',
                    lineHeight: 1.45,
                  }}>
                    <span style={{
                      flexShrink: 0,
                      marginTop: 1,
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      color: plan.highlight ? 'var(--color-gold)' : 'var(--color-accent)',
                    }}>
                      ✓
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className="no-underline"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '13px 20px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.02em',
                  borderRadius: '4px',
                  backgroundColor: plan.highlight ? 'oklch(97% 0.008 75)' : 'var(--color-accent)',
                  color: plan.highlight ? 'var(--color-accent)' : 'oklch(97% 0.008 75)',
                  transition: 'opacity 150ms ease',
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: '0.8125rem',
          color: 'var(--color-text-faint)',
          opacity: visible ? 1 : 0,
          transition: `opacity 500ms 360ms ${EASE}`,
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
