type TagProps = {
  label: string
  selected?: boolean
  onClick?: () => void
  color?: 'accent' | 'pos' | 'neu' | 'neg' | 'default'
}

export default function Tag({ label, selected = false, onClick, color = 'default' }: TagProps) {
  const colorMap = {
    accent: selected
      ? 'bg-[--color-accent] text-[--color-bg] border-[--color-accent]'
      : 'border-[--color-border] text-[--color-text-muted] hover:border-[--color-accent] hover:text-[--color-accent]',
    pos: 'bg-[--color-sentiment-pos]/15 text-[--color-sentiment-pos] border-[--color-sentiment-pos]/30',
    neu: 'bg-[--color-sentiment-neu]/15 text-[--color-sentiment-neu] border-[--color-sentiment-neu]/30',
    neg: 'bg-[--color-sentiment-neg]/15 text-[--color-sentiment-neg] border-[--color-sentiment-neg]/30',
    default: 'border-[--color-border] text-[--color-text-muted]',
  }

  return (
    <span
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium transition-all ${colorMap[color]} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ letterSpacing: '0.04em' }}
    >
      {label}
    </span>
  )
}
