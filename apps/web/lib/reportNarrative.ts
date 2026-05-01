import type { ReportData } from './mockReport'

export function buildNarrative(report: ReportData): string {
  const { creator, hookScore, audienceSignals } = report
  const topLocation = audienceSignals.topLocations[0]
  return `Your question-hook openings are your strongest asset, ${creator.handle} — keep them front-loaded in the first 2 seconds to hold the viewers you're already earning. Your evening audience in ${topLocation.name} is primed at ${audienceSignals.peakHours}; posting consistently in that window could push your engagement meaningfully higher.`
}
