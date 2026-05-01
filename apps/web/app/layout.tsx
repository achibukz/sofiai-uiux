import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GIA — Generative Influencer Analyst',
  description: 'Understand why your TikToks land — or don\'t. Built for Philippine creators.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        {children}
      </body>
    </html>
  )
}
