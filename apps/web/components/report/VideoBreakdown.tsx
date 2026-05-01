'use client'

import { useState } from 'react'
import type { VideoEntry } from '@/lib/mockReport'

type Props = {
  videos: VideoEntry[]
}

const HOOK_TYPE_LABELS: Record<string, string> = {
  CURIOSITY_GAP: 'Curiosity Gap',
  RELATABILITY: 'Relatability',
  CONTROVERSY: 'Controversy',
  PROBLEM_SOLUTION: 'Problem → Solution',
  SOCIAL_PROOF: 'Social Proof',
  VISUAL_PATTERN_INTERRUPT: 'Visual Pattern Interrupt',
}

function MetricCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        padding: '12px 16px',
        backgroundColor: 'var(--color-bg)',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <span style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>
        {label}
      </span>
      <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
        {value}
      </span>
    </div>
  )
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
        {label}
      </span>
      <div style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
        {children}
      </div>
    </div>
  )
}

export default function VideoBreakdown({ videos }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggle = (id: number) => setExpandedId(expandedId === id ? null : id)

  return (
    <section style={{ padding: 'clamp(48px, 6vw, 80px) var(--spacing-container)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <p
          style={{
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-faint)',
            margin: '0 0 24px 0',
          }}
        >
          {videos.length} Videos Analysed
        </p>

        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr 90px 90px 72px 24px',
              gap: 0,
              padding: '10px 20px',
              backgroundColor: 'var(--color-surface-raised)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            {['#', 'Title', 'Views', 'Eng. Rate', 'Hook ★', ''].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-faint)',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Video rows */}
          {videos.map((video) => {
            const isOpen = expandedId === video.id
            return (
              <div key={video.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                {/* Summary row */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(video.id)}
                  onKeyDown={(e) => e.key === 'Enter' && toggle(video.id)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr 90px 90px 72px 24px',
                    gap: 0,
                    padding: '14px 20px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: isOpen ? 'var(--color-accent-muted)' : 'var(--color-surface)',
                    transition: 'background-color 150ms',
                  }}
                  className="hover:bg-[--color-surface-raised]"
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-faint)' }}>
                    {video.id}
                  </span>
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      paddingRight: 16,
                    }}
                    title={video.title}
                  >
                    {video.title}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {video.views.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {video.engagementRate.toFixed(1)}%
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                    {video.hookScore}/10
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-faint)',
                      transition: 'transform 150ms',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      display: 'inline-block',
                    }}
                  >
                    ▾
                  </span>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div
                    style={{
                      backgroundColor: 'var(--color-accent-muted)',
                      borderTop: '1px solid var(--color-border)',
                      padding: 'clamp(20px, 3vw, 32px)',
                    }}
                  >
                    {/* Top row: thumbnail + hook type info */}
                    <div style={{ display: 'flex', gap: 20, marginBottom: 24, alignItems: 'flex-start' }}>
                      {/* Thumbnail placeholder */}
                      <div
                        style={{
                          flexShrink: 0,
                          width: 72,
                          aspectRatio: '9 / 16',
                          backgroundColor: 'var(--color-surface-raised)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px 4px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.5625rem',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'var(--color-accent)',
                            textAlign: 'center',
                            lineHeight: 1.4,
                          }}
                        >
                          Video Thumbnail
                        </span>
                      </div>

                      {/* Hook type badge + meta */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, paddingTop: 4 }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px 12px',
                            borderRadius: 99,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-bg)',
                          }}
                        >
                          {HOOK_TYPE_LABELS[video.hookType] ?? video.hookType}
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                          Trigger: <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>{video.trigger}</strong>
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                          Pacing: <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>{video.pacing}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: 8,
                        marginBottom: 28,
                      }}
                    >
                      <MetricCell label="Views" value={video.views.toLocaleString()} />
                      <MetricCell label="Eng. Rate" value={`${video.engagementRate.toFixed(1)}%`} />
                      <MetricCell label="Likes" value={video.likes.toLocaleString()} />
                      <MetricCell label="Shares" value={video.shares.toLocaleString()} />
                      <MetricCell label="Saves" value={video.saves.toLocaleString()} />
                      <MetricCell label="Comments" value={video.comments.toLocaleString()} />
                    </div>

                    {/* Text fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <DetailField label="Text Overlay">
                        {video.textOverlay}
                      </DetailField>
                      <DetailField label="Spoken Hook">
                        <em>&ldquo;{video.spokenHook}&rdquo;</em>
                      </DetailField>
                      <DetailField label="Visual Elements">
                        {video.visualElements}
                      </DetailField>
                      <div
                        style={{
                          height: 1,
                          backgroundColor: 'var(--color-border)',
                          margin: '4px 0',
                        }}
                      />
                      <DetailField label="Spoken Hook Analysis">
                        {video.spokenHookAnalysis}
                      </DetailField>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                          gap: 20,
                        }}
                      >
                        <DetailField label="Why It Works">
                          {video.whyItWorks}
                        </DetailField>
                        <div
                          style={{
                            padding: '16px 20px',
                            border: '1px solid var(--color-border)',
                            borderRadius: 8,
                            backgroundColor: 'var(--color-surface)',
                          }}
                        >
                          <DetailField label="Improvement">
                            {video.improvement}
                          </DetailField>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
