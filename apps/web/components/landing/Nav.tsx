'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`animate-enter fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-sm' : ''
      }`}
      style={{
        animationDelay: '0ms',
        backgroundColor: scrolled ? 'oklch(97% 0.008 75 / 0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: 'clamp(16px, 2vw, 24px) clamp(24px, 5vw, 80px)',
        }}
      >
        <Link href="/" className="flex items-baseline gap-1.5 no-underline">
          <span
            className="text-[--color-text]"
            style={{ fontWeight: 600, fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
          >
            GIA
          </span>
          <span
            className="text-[--color-text-muted]"
            style={{ fontWeight: 400, fontSize: '0.9375rem' }}
          >
            by SOFI AI
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#story"
            className="text-sm text-[--color-text-muted] hover:text-[--color-text] transition-colors no-underline"
            style={{ fontWeight: 400 }}
          >
            Story
          </Link>
          <Link
            href="/#what-gia-shows"
            className="text-sm text-[--color-text-muted] hover:text-[--color-text] transition-colors no-underline"
            style={{ fontWeight: 400 }}
          >
            What GIA shows
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-[--color-text-muted] hover:text-[--color-text] transition-colors no-underline"
            style={{ fontWeight: 400 }}
          >
            Pricing
          </Link>
          <Link
            href="/report/sample"
            className="text-sm text-[--color-text-muted] hover:text-[--color-text] transition-colors no-underline"
            style={{ fontWeight: 400 }}
          >
            See sample
          </Link>
          <Link
            href="/analyze"
            className="btn-primary inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold no-underline"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              letterSpacing: '0.02em',
            }}
          >
            Analyze my profile →
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden">
          <Link
            href="/analyze"
            className="btn-primary inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold no-underline"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              letterSpacing: '0.02em',
            }}
          >
            Analyze
          </Link>
        </div>
      </div>
    </nav>
  )
}
