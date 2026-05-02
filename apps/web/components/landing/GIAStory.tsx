'use client'

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function GIAStory() {
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

  const entry = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 600ms ${delay}ms ${EASE}, transform 600ms ${delay}ms ${EASE}`,
  })

  return (
    <section
      ref={ref}
      id="story"
      style={{
        paddingTop: 'var(--spacing-section-major)',
        paddingBottom: 'var(--spacing-section-major)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div
        className="story-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'stretch',
        }}
      >
        {/* Left: editorial maroon panel */}
        <div
          style={{
            backgroundColor: 'var(--color-accent)',
            borderRadius: '4px',
            padding: 'clamp(36px, 5vw, 60px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 'clamp(340px, 40vw, 500px)',
            position: 'relative',
            overflow: 'hidden',
            ...entry(0),
          }}
        >
          {/* Watermark GIA */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-0.12em',
              right: '-0.04em',
              fontSize: 'clamp(7rem, 15vw, 13rem)',
              fontWeight: 800,
              letterSpacing: '-0.06em',
              lineHeight: 1,
              color: 'oklch(97% 0.008 75)',
              opacity: 0.07,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            GIA
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span
              style={{
                display: 'inline-block',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
                fontWeight: 600,
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '4px 12px',
                marginBottom: 'clamp(28px, 4vw, 40px)',
              }}
            >
              SOFI AI, Philippines
            </span>

            <h2
              style={{
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.97,
                color: 'oklch(97% 0.008 75)',
                margin: 0,
              }}
            >
              GIA isn&rsquo;t just software.
            </h2>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: 1.65,
                color: 'oklch(78% 0.02 15)',
                margin: 0,
              }}
            >
              Generative Influencer Analyst. Built in Manila. Trained on Filipino content.
            </p>
          </div>
        </div>

        {/* Right: story copy */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(20px, 3vw, 28px)',
            ...entry(120),
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                margin: '0 0 6px 0',
              }}
            >
              The story
            </p>
            {/* Gold drawn underline */}
            <div
              style={{
                width: 24,
                height: 1.5,
                backgroundColor: 'var(--color-gold)',
                transformOrigin: 'left center',
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transition: `transform 500ms 320ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            />
          </div>

          <blockquote
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--color-accent)',
              margin: 0,
              maxWidth: '34ch',
            }}
          >
            <span style={{ color: 'var(--color-gold)', fontSize: '2em', lineHeight: 0, verticalAlign: '-0.15em', marginRight: 2 }}>&ldquo;</span>Most analytics tools were built for someone else.<span style={{ color: 'var(--color-gold)', fontSize: '2em', lineHeight: 0, verticalAlign: '-0.15em', marginLeft: 2 }}>&rdquo;</span>
          </blockquote>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p
              style={{
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              They don&rsquo;t understand Taglish. They don&rsquo;t know that 7PM is rice time in Filipino households. They optimise for views, not for the specific community you&rsquo;re trying to reach.
            </p>

            <p
              style={{
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              GIA was built from the ground up to understand Filipino creators. She reads your comments the way your audience does, in the language they actually use. She knows your niche, your posting patterns, and the cultural context that makes content resonate.
            </p>

            <p
              style={{
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              She&rsquo;s a product of SOFI AI, a team based in Quezon City that believes the next generation of Filipino creators deserves tools built <em style={{ color: 'var(--color-accent)' }}>for</em> them, not adapted from tools built for someone else.
            </p>
          </div>

          {/* Decorative gold rule */}
          <div style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-gold)' }} />

          <div
            style={{
              paddingTop: 20,
              borderTop: '1px solid oklch(72% 0.110 75 / 0.35)',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 3 }}>SOFI AI Team</div>
            <div style={{ fontWeight: 400, fontSize: '0.75rem', color: 'var(--color-accent)', opacity: 0.7 }}>Quezon City, Philippines</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
