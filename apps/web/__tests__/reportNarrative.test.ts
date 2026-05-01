import { buildNarrative } from '../lib/reportNarrative'
import { mockReport } from '../lib/mockReport'

describe('buildNarrative', () => {
  it('returns a string', () => {
    const result = buildNarrative(mockReport)
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('contains the creator handle', () => {
    const result = buildNarrative(mockReport)
    expect(result).toContain(mockReport.creator.handle)
  })

  it('is two sentences (ends with period and has at least one mid-sentence period)', () => {
    const result = buildNarrative(mockReport)
    expect(result.endsWith('.')).toBe(true)
    // strip trailing period, remaining text must still contain a sentence-ending period
    const withoutLast = result.slice(0, -1)
    expect(withoutLast).toMatch(/\.\s/)
  })
})
