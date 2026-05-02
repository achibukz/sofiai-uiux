import type { ReportData } from '@/lib/mockReport'
import Tag from '@/components/ui/Tag'

type Props = {
  creator: ReportData['creator']
  hookScoreLabel: string
  narrative: string
}

export default function ReportHeader({ creator, hookScoreLabel, narrative }: Props) {
  const formattedDate = new Date(creator.handle ? '2026-05-01T19:32:00+08:00' : '').toLocaleString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Manila',
  })

  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        padding: 'clamp(80px, 10vw, 100px) var(--spacing-container) clamp(36px, 4.5vw, 56px)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div>
          {/* Main header content */}
          <div>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.8125rem',
                color: 'var(--color-text-faint)',
                textDecoration: 'none',
                marginBottom: '32px',
                transition: 'color 150ms',
              }}
              className="hover:text-[--color-text-muted]"
            >
              ← Back to GIA
            </a>

            <div className="flex flex-wrap items-start gap-4 mb-6">
              <div>
                <h1
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                    letterSpacing: '-0.025em',
                    color: 'var(--color-text)',
                    margin: '0 0 10px 0',
                    lineHeight: 1.1,
                  }}
                >
                  {creator.handle}
                </h1>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Tag label={creator.niche} />
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {creator.followerCount.toLocaleString()} followers
                  </span>
                  <Tag label={hookScoreLabel} color="accent" selected />
                </div>
              </div>
            </div>

            <blockquote
              style={{
                margin: 0,
                padding: '16px 20px',
                backgroundColor: 'var(--color-accent-muted)',
                border: '1px solid oklch(32% 0.135 15 / 0.10)',
                borderRadius: '6px',
                fontStyle: 'italic',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--color-text)',
                maxWidth: '64ch',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                }}
              >
                GIA&rsquo;s take
              </span>
              {narrative}
            </blockquote>

            <p
              style={{
                marginTop: '20px',
                fontSize: '0.75rem',
                color: 'var(--color-text-faint)',
                letterSpacing: '0.02em',
              }}
            >
              Generated {formattedDate} PHT
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .report-header-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </header>
  )
}
