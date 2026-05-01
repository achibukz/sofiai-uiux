type Props = {
  data: number[]
  width?: number
  height?: number
}

export default function GrowthGraph({ data, width = 200, height = 64 }: Props) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 4

  const points = data.map((val, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    const y = pad + (1 - (val - min) / range) * (height - pad * 2)
    return { x, y }
  })

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ')

  const fillPath =
    linePath +
    ` L ${points[points.length - 1].x.toFixed(1)},${height} L ${points[0].x.toFixed(1)},${height} Z`

  const startVal = data[0]
  const endVal = data[data.length - 1]
  const pctChange = (((endVal - startVal) / startVal) * 100).toFixed(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--color-text-faint)',
          }}
        >
          30-Day Growth
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--color-gold)',
            letterSpacing: '-0.01em',
          }}
        >
          +{pctChange}%
        </span>
      </div>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`30-day follower growth chart, +${pctChange}%`}
        role="img"
      >
        {/* Fill area */}
        <path
          d={fillPath}
          fill="oklch(72% 0.110 75 / 0.12)"
        />
        {/* Line */}
        <path
          d={linePath}
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* End dot */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="3"
          fill="var(--color-gold)"
        />
      </svg>

      <span
        style={{
          fontSize: '0.6875rem',
          color: 'var(--color-text-faint)',
        }}
      >
        {endVal.toLocaleString()} followers
      </span>
    </div>
  )
}
