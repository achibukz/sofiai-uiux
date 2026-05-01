import React from 'react'

type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold tracking-wide transition-all cursor-pointer select-none'

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-sm',
  }

  const variants = {
    primary: `bg-[--color-accent] text-[--color-bg] rounded-full hover:brightness-90 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed`,
    ghost: `bg-transparent border border-[--color-accent] text-[--color-accent] rounded-full hover:bg-[--color-accent-muted] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed`,
    text: `bg-transparent text-[--color-accent] underline-offset-2 hover:underline disabled:opacity-40 disabled:cursor-not-allowed`,
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={{ letterSpacing: '0.02em' }}
    >
      {children}
    </button>
  )
}
