'use client'

import { useState, type ReactNode } from 'react'

type Props = {
  overview: ReactNode
  videoBreakdown: ReactNode
}

const TAB_STYLE_BASE: React.CSSProperties = {
  padding: '14px 24px',
  background: 'none',
  border: 'none',
  borderBottom: '2px solid transparent',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  fontWeight: 500,
  letterSpacing: '0.01em',
  transition: 'color 150ms, border-color 150ms',
}

export default function ReportTabs({ overview, videoBreakdown }: Props) {
  const [tab, setTab] = useState<'overview' | 'breakdown'>('overview')

  return (
    <div>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 var(--spacing-container)',
            display: 'flex',
            gap: 0,
          }}
        >
          <button
            onClick={() => setTab('overview')}
            style={{
              ...TAB_STYLE_BASE,
              color: tab === 'overview' ? 'var(--color-accent)' : 'var(--color-text-faint)',
              borderBottom: tab === 'overview' ? '2px solid var(--color-accent)' : '2px solid transparent',
              fontWeight: tab === 'overview' ? 600 : 500,
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setTab('breakdown')}
            style={{
              ...TAB_STYLE_BASE,
              color: tab === 'breakdown' ? 'var(--color-accent)' : 'var(--color-text-faint)',
              borderBottom: tab === 'breakdown' ? '2px solid var(--color-accent)' : '2px solid transparent',
              fontWeight: tab === 'breakdown' ? 600 : 500,
            }}
          >
            Video Breakdown
          </button>
        </div>
      </div>

      {tab === 'overview' ? overview : videoBreakdown}
    </div>
  )
}
