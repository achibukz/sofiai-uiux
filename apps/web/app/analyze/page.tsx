'use client'

import { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Goal = 'grow' | 'engage' | 'monetize'
type NicheOption = 'Food' | 'Lifestyle' | 'Comedy' | 'Beauty' | 'Gaming' | 'Travel' | 'Fashion' | 'Other'

const GOAL_OPTIONS: { id: Goal; label: string }[] = [
  { id: 'grow', label: 'Grow followers' },
  { id: 'engage', label: 'Increase engagement' },
  { id: 'monetize', label: 'Monetize my content' },
]

const NICHE_OPTIONS: NicheOption[] = ['Food', 'Lifestyle', 'Comedy', 'Beauty', 'Gaming', 'Travel', 'Fashion', 'Other']

export default function AnalyzePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Step 1
  const [profileUrl, setProfileUrl] = useState('')

  // Step 2
  const [goals, setGoals] = useState<Goal[]>([])

  // Step 3
  const [niches, setNiches] = useState<NicheOption[]>([])
  const [otherNiche, setOtherNiche] = useState('')

  // Step 4
  const [competitorInput, setCompetitorInput] = useState('')
  const [competitors, setCompetitors] = useState<string[]>([])

  function toggleGoal(g: Goal) {
    setGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])
  }

  function toggleNiche(n: NicheOption) {
    setNiches((prev) => prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n])
  }

  function addCompetitor() {
    const val = competitorInput.trim().replace(/^@/, '')
    if (val && !competitors.includes(val)) {
      setCompetitors((prev) => [...prev, val])
      setCompetitorInput('')
    }
  }

  function handleCompetitorKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { e.preventDefault(); addCompetitor() }
  }

  function removeCompetitor(handle: string) {
    setCompetitors((prev) => prev.filter((c) => c !== handle))
  }

  function canContinue() {
    if (step === 1) return profileUrl.trim().length > 0
    if (step === 2) return goals.length > 0
    if (step === 3) return niches.length > 0
    return true
  }

  function handleContinue() {
    if (step < 4) { setStep(step + 1); return }
    router.push('/analyzing')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: 'clamp(16px, 2vw, 24px) clamp(24px, 5vw, 80px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <Link
          href="/"
          className="no-underline flex items-baseline gap-1.5"
        >
          <span style={{ fontWeight: 600, fontSize: '1.0625rem', color: 'var(--color-text)' }}>GIA</span>
          <span style={{ fontWeight: 400, fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>by SOFI AI</span>
        </Link>
        <span
          style={{
            fontWeight: 500,
            fontSize: '0.8125rem',
            color: 'var(--color-text-faint)',
            letterSpacing: '0.04em',
          }}
        >
          Step {step} of 4
        </span>
      </div>

      {/* Form area */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 80px)' }}
      >
        <div style={{ width: '100%', maxWidth: 480 }}>
          {step === 1 && (
            <div className="animate-enter flex flex-col gap-6">
              <div>
                <h1
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    letterSpacing: '-0.025em',
                    color: 'var(--color-text)',
                    margin: '0 0 8px 0',
                    lineHeight: 1.15,
                  }}
                >
                  What&rsquo;s your TikTok profile?
                </h1>
                <p style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Paste your profile link and GIA will handle the rest.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="profile-url"
                  style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-muted)', letterSpacing: '0.01em' }}
                >
                  TikTok profile link
                </label>
                <input
                  id="profile-url"
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="tiktok.com/@yourusername"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 10,
                    color: 'var(--color-text)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    transition: 'border-color 200ms',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.boxShadow = '0 0 0 3px var(--color-accent-muted)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none' }}
                  autoFocus
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-enter flex flex-col gap-6">
              <div>
                <h1
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    letterSpacing: '-0.025em',
                    color: 'var(--color-text)',
                    margin: '0 0 8px 0',
                    lineHeight: 1.15,
                  }}
                >
                  What&rsquo;s your main goal?
                </h1>
                <p style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Select all that apply — GIA will tailor your report.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {GOAL_OPTIONS.map((g) => {
                  const selected = goals.includes(g.id)
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => toggleGoal(g.id)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 12,
                        border: selected ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                        backgroundColor: selected ? 'var(--color-accent-muted)' : 'var(--color-surface)',
                        color: selected ? 'var(--color-accent)' : 'var(--color-text)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        fontWeight: selected ? 600 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 150ms',
                        width: '100%',
                      }}
                    >
                      {g.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-enter flex flex-col gap-6">
              <div>
                <h1
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    letterSpacing: '-0.025em',
                    color: 'var(--color-text)',
                    margin: '0 0 8px 0',
                    lineHeight: 1.15,
                  }}
                >
                  What&rsquo;s your niche?
                </h1>
                <p style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Pick the categories that best describe your content.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {NICHE_OPTIONS.map((n) => {
                  const selected = niches.includes(n)
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggleNiche(n)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 999,
                        border: selected ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                        backgroundColor: selected ? 'var(--color-accent-muted)' : 'var(--color-surface)',
                        color: selected ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: selected ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 150ms',
                      }}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
              {niches.includes('Other') && (
                <input
                  type="text"
                  value={otherNiche}
                  onChange={(e) => setOtherNiche(e.target.value)}
                  placeholder="Describe your niche..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 10,
                    color: 'var(--color-text)',
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.boxShadow = '0 0 0 3px var(--color-accent-muted)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none' }}
                  autoFocus
                />
              )}
            </div>
          )}

          {step === 4 && (
            <div className="animate-enter flex flex-col gap-6">
              <div>
                <h1
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    letterSpacing: '-0.025em',
                    color: 'var(--color-text)',
                    margin: '0 0 8px 0',
                    lineHeight: 1.15,
                  }}
                >
                  Any competitors to compare against?
                </h1>
                <p style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Optional — add TikTok handles you want GIA to benchmark against.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={competitorInput}
                    onChange={(e) => setCompetitorInput(e.target.value)}
                    onKeyDown={handleCompetitorKey}
                    placeholder="@handle"
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 10,
                      color: 'var(--color-text)',
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.boxShadow = '0 0 0 3px var(--color-accent-muted)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none' }}
                  />
                  <button
                    type="button"
                    onClick={addCompetitor}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 10,
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-raised)',
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 150ms',
                    }}
                  >
                    Add
                  </button>
                </div>
                {competitors.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {competitors.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5"
                        style={{
                          padding: '6px 12px',
                          borderRadius: 999,
                          backgroundColor: 'var(--color-surface-raised)',
                          border: '1px solid var(--color-border)',
                          fontSize: '0.8125rem',
                          color: 'var(--color-text)',
                          fontWeight: 500,
                        }}
                      >
                        @{c}
                        <button
                          type="button"
                          onClick={() => removeCompetitor(c)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-faint)',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '0.875rem',
                            lineHeight: 1,
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-faint)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  padding: 0,
                }}
              >
                ← Back
              </button>
            ) : <div />}

            <div className="flex items-center gap-5">
              {step === 4 && (
                <button
                  type="button"
                  onClick={() => router.push('/analyzing')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-faint)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    padding: 0,
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Skip this step
                </button>
              )}
              <button
                type="button"
                onClick={handleContinue}
                disabled={!canContinue()}
                style={{
                  padding: '12px 28px',
                  borderRadius: 999,
                  border: 'none',
                  backgroundColor: canContinue() ? 'var(--color-accent)' : 'var(--color-border)',
                  color: canContinue() ? 'var(--color-bg)' : 'var(--color-text-faint)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  cursor: canContinue() ? 'pointer' : 'not-allowed',
                  transition: 'all 200ms',
                }}
              >
                {step === 4 ? 'Analyze →' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
