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
        padding: 'clamp(32px, 5vw, 64px) var(--spacing-container)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Back link */}
        <a
          href="/analyze"
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
        >
          ← Analyze another
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

        {/* GIA's take callout */}
        <blockquote
          style={{
            margin: 0,
            padding: '16px 20px',
            borderLeft: '3px solid var(--color-accent)',
            backgroundColor: 'var(--color-accent-muted)',
            borderRadius: '0 8px 8px 0',
            fontStyle: 'italic',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--color-text)',
            maxWidth: '72ch',
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
    </header>
  )
}
