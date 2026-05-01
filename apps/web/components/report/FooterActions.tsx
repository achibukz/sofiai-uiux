'use client'

import Link from 'next/link'

export default function FooterActions() {
  return (
    <footer
      style={{
        padding: 'clamp(32px, 4vw, 48px) var(--spacing-container)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        className="flex flex-wrap items-center gap-4"
        style={{ maxWidth: '960px', margin: '0 auto' }}
      >
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'GIA Report', url: window.location.href })
            } else {
              navigator.clipboard.writeText(window.location.href)
            }
          }}
          style={{
            padding: '10px 20px',
            borderRadius: 999,
            border: '1px solid var(--color-accent)',
            backgroundColor: 'transparent',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            transition: 'background-color 150ms',
          }}
          onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.backgroundColor = 'var(--color-accent-muted)' }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.backgroundColor = 'transparent' }}
        >
          Share report
        </button>

        <Link
          href="/analyze"
          style={{
            padding: '10px 20px',
            borderRadius: 999,
            border: '1px solid var(--color-accent)',
            backgroundColor: 'transparent',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'background-color 150ms',
          }}
        >
          Analyze another account
        </Link>

        <span
          title="Coming soon"
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-faint)',
            cursor: 'default',
            padding: '10px 4px',
          }}
        >
          Export PDF
        </span>
      </div>
    </footer>
  )
}
