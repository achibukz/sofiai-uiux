'use client'

interface PlainSummary {
  hookScore: string
  audience: string
  sentiment: string
}

interface ReportSummaryProps {
  plainSummary: PlainSummary
}

const SUMMARY_ROWS = [
  {
    key: 'hookScore',
    label: 'Hooks',
    accentColor: 'var(--color-accent)',
    badgeBg: 'var(--color-accent-muted)',
    badgeColor: 'var(--color-accent)',
  },
  {
    key: 'audience',
    label: 'Audience',
    accentColor: 'var(--color-gold)',
    badgeBg: 'oklch(72% 0.110 75 / 0.12)',
    badgeColor: 'var(--color-gold)',
  },
  {
    key: 'sentiment',
    label: 'Sentiment',
    accentColor: 'var(--color-sentiment-pos)',
    badgeBg: 'oklch(48% 0.14 148 / 0.12)',
    badgeColor: 'var(--color-sentiment-pos)',
  },
] as const

export default function ReportSummary({ plainSummary }: ReportSummaryProps) {
  return (
    <div
      style={{
        width: '100%',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        padding: '32px var(--spacing-container)',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Eyebrow */}
        <p
          style={{
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            margin: '0 0 20px 0',
          }}
        >
          What this means for you
        </p>

        {/* Summary rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {SUMMARY_ROWS.map(({ key, label, accentColor, badgeBg, badgeColor }) => (
            <div key={key} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              {/* Left accent bar */}
              <div
                style={{
                  width: 3,
                  alignSelf: 'stretch',
                  flexShrink: 0,
                  borderRadius: 999,
                  backgroundColor: accentColor,
                  minHeight: 20,
                }}
              />

              {/* Content: badge + text */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 10px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontWeight: 700,
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: badgeColor,
                    backgroundColor: badgeBg,
                    padding: '3px 8px',
                    borderRadius: 999,
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text)',
                    margin: 0,
                  }}
                >
                  {plainSummary[key as keyof PlainSummary]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
