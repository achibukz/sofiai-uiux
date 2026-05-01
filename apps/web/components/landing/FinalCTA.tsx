import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section
      style={{
        paddingTop: 'var(--spacing-section-major)',
        paddingBottom: 'var(--spacing-section-major)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h2
          className="text-[--color-text]"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 20px 0',
          }}
        >
          Ready to understand your content?
        </h2>
        <p
          className="text-[--color-text-muted]"
          style={{
            fontWeight: 400,
            fontSize: '1.0625rem',
            lineHeight: 1.65,
            margin: '0 0 40px 0',
          }}
        >
          Paste your TikTok link. GIA does the rest — no spreadsheets, no jargon, no guessing.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/analyze"
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold transition-all hover:brightness-90 active:scale-[0.97] no-underline"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              fontSize: '0.9375rem',
              letterSpacing: '0.02em',
            }}
          >
            Analyze my profile →
          </Link>
          <Link
            href="/report/sample"
            className="font-medium text-[--color-accent] underline-offset-2 hover:underline no-underline"
            style={{ fontSize: '0.9375rem' }}
          >
            See sample report
          </Link>
        </div>
      </div>
    </section>
  )
}
