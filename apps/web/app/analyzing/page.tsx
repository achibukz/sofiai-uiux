'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const STATUS_MESSAGES = [
  'reading your last 30 posts',
  'mapping your audience patterns',
  'finding your strongest hooks',
  'building your report',
]

export default function AnalyzingPage() {
  const router = useRouter()
  const [statusIndex, setStatusIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length)
        setFade(true)
      }, 200)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/report/sample')
    }, 4000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        gap: 0,
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          fontWeight: 800,
          fontSize: 'clamp(64px, 12vw, 96px)',
          letterSpacing: '-0.04em',
          color: 'var(--color-text)',
          lineHeight: 1,
          marginBottom: '48px',
          userSelect: 'none',
        }}
      >
        GIA
      </div>

      {/* Pulsing rings */}
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: '48px' }}>
        {[0, 800, 1600].map((delay, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid var(--color-accent)',
              animation: `pulseRing 2.4s ${delay}ms cubic-bezier(0.16, 1, 0.3, 1) infinite`,
            }}
          />
        ))}
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            inset: '50%',
            transform: 'translate(-50%, -50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent)',
          }}
        />
      </div>

      {/* Status text */}
      <p
        style={{
          fontWeight: 400,
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.01em',
          opacity: fade ? 1 : 0,
          transition: 'opacity 200ms ease',
          userSelect: 'none',
          margin: 0,
        }}
      >
        {STATUS_MESSAGES[statusIndex]}
      </p>
    </div>
  )
}
