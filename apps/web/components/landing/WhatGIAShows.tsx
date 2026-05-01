const sections = [
  {
    title: 'Hook Score',
    description:
      'Know which openings grab attention and which lose it. GIA scores every hook type in your last 30 posts and tells you exactly which patterns hold viewers past the 5-second mark.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center justify-between mb-1">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hook Score</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-accent)' }}>72 / 100</span>
        </div>
        <div style={{ height: 8, backgroundColor: 'var(--color-border)', borderRadius: 4, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '72%', backgroundColor: 'var(--color-accent)', borderRadius: 4 }} />
          <div style={{ position: 'absolute', left: '72%', top: '50%', transform: 'translate(-50%, -50%)', width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-accent)', boxShadow: '0 0 0 3px var(--color-surface)' }} />
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>Strong — question hooks outperform statement hooks 3×</p>
      </div>
    ),
  },
  {
    title: 'Audience Signals',
    description:
      'See who\'s actually watching and when they tune in. GIA maps your real audience by age, location, and viewing time — so you can post when your people are most active.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {[
          { name: 'Metro Manila', pct: 58 },
          { name: 'Cebu', pct: 19 },
          { name: 'Davao', pct: 12 },
        ].map((loc) => (
          <div key={loc.name} className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)', fontWeight: 500 }}>{loc.name}</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{loc.pct}%</span>
            </div>
            <div style={{ height: 6, backgroundColor: 'var(--color-border)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${loc.pct}%`, backgroundColor: 'var(--color-accent)', borderRadius: 3, opacity: 0.85 }} />
            </div>
          </div>
        ))}
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', margin: '4px 0 0 0' }}>Peak activity: 7–9 PM</p>
      </div>
    ),
  },
  {
    title: 'Sentiment Analysis',
    description:
      'Understand what your audience feels, in their own words. GIA reads your comments — in Filipino and English — and surfaces the emotional signal behind the numbers.',
    preview: (
      <div className="flex gap-3 w-full max-w-xs">
        {[
          { label: 'Positive', pct: 68, color: 'var(--color-sentiment-pos)' },
          { label: 'Neutral', pct: 22, color: 'var(--color-sentiment-neu)' },
          { label: 'Negative', pct: 10, color: 'var(--color-sentiment-neg)' },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-2 flex-1">
            <div style={{ height: 80, backgroundColor: 'var(--color-border)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${s.pct}%`, backgroundColor: s.color, opacity: 0.9 }} />
            </div>
            <div className="text-center">
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: s.color }}>{s.pct}%</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Post Recommendations',
    description:
      'Get 3 specific ideas to try this week, with reasoning. Every suggestion is tied to your actual data — not generic tips that work for anyone.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {['7PM dinner series', 'Cebu regional spotlight', 'Question-hook comparison post'].map((idea, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--color-text-faint)', minWidth: 20, paddingTop: 2 }}>0{i + 1}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 500, lineHeight: 1.4 }}>{idea}</span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function WhatGIAShows() {
  return (
    <div id="what-gia-shows">
      {sections.map((section, i) => {
        const isEven = i % 2 === 0
        return (
          <section
            key={i}
            style={{
              backgroundColor: isEven ? 'var(--color-bg)' : 'var(--color-surface)',
              paddingTop: 'var(--spacing-section)',
              paddingBottom: 'var(--spacing-section)',
              paddingLeft: 'var(--spacing-container)',
              paddingRight: 'var(--spacing-container)',
            }}
          >
            <div
              style={{
                maxWidth: '1280px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(48px, 8vw, 96px)',
                alignItems: 'center',
              }}
            >
              <div style={{ order: isEven ? 0 : 1 }}>
                <h2
                  className="text-[--color-text]"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    letterSpacing: '-0.01em',
                    margin: '0 0 16px 0',
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-[--color-text-muted]"
                  style={{ fontWeight: 400, fontSize: '1rem', lineHeight: 1.65, margin: 0 }}
                >
                  {section.description}
                </p>
              </div>

              <div
                className="flex items-center justify-center"
                style={{
                  order: isEven ? 1 : 0,
                  padding: 'clamp(24px, 3vw, 40px)',
                  backgroundColor: isEven ? 'var(--color-surface)' : 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                }}
              >
                {section.preview}
              </div>
            </div>

            <style>{`
              @media (max-width: 768px) {
                .what-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </section>
        )
      })}
    </div>
  )
}
