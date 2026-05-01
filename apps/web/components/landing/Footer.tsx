import Link from 'next/link'

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.2 8.2 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        paddingTop: 'clamp(32px, 4vw, 48px)',
        paddingBottom: 'clamp(32px, 4vw, 48px)',
        paddingLeft: 'var(--spacing-container)',
        paddingRight: 'var(--spacing-container)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--color-accent)',
                letterSpacing: '-0.01em',
              }}
            >
              GIA
            </span>
            <span
              style={{
                fontWeight: 400,
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
              }}
            >
              by SOFI AI
            </span>
          </div>
          <p
            style={{
              fontWeight: 400,
              fontSize: '0.75rem',
              color: 'var(--color-text-faint)',
              margin: 0,
            }}
          >
            Built for Philippine creators.
          </p>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Link
            href="#what-gia-shows"
            style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}
            className="hover:text-[--color-text] transition-colors"
          >
            What GIA shows
          </Link>
          <Link
            href="#how-it-works"
            style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}
            className="hover:text-[--color-text] transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/report/sample"
            style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}
            className="hover:text-[--color-text] transition-colors"
          >
            Sample report
          </Link>
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href="#"
            aria-label="TikTok"
            style={{ color: 'var(--color-text-faint)', display: 'flex', transition: 'color 150ms' }}
            className="hover:text-[--color-accent]"
          >
            <TikTokIcon />
          </a>
          <a
            href="#"
            aria-label="X / Twitter"
            style={{ color: 'var(--color-text-faint)', display: 'flex', transition: 'color 150ms' }}
            className="hover:text-[--color-accent]"
          >
            <XIcon />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            style={{ color: 'var(--color-text-faint)', display: 'flex', transition: 'color 150ms' }}
            className="hover:text-[--color-accent]"
          >
            <LinkedInIcon />
          </a>
          <span
            style={{
              width: 1,
              height: 16,
              backgroundColor: 'var(--color-border)',
              display: 'inline-block',
              margin: '0 4px',
            }}
          />
          <span
            style={{
              fontSize: '0.6875rem',
              color: 'var(--color-gold)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            SOFI AI
          </span>
        </div>
      </div>
    </footer>
  )
}
