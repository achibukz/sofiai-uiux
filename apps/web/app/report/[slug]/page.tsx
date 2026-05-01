import { mockReport } from '@/lib/mockReport'
import { buildNarrative } from '@/lib/reportNarrative'
import ReportHeader from '@/components/report/ReportHeader'
import HookScore from '@/components/report/HookScore'
import AudienceSignals from '@/components/report/AudienceSignals'
import Sentiment from '@/components/report/Sentiment'
import PostIdeas from '@/components/report/PostIdeas'
import FooterActions from '@/components/report/FooterActions'
import ReportTabs from '@/components/report/ReportTabs'
import VideoBreakdown from '@/components/report/VideoBreakdown'

export default function ReportPage() {
  const narrative = buildNarrative(mockReport)

  const overview = (
    <>
      <HookScore hookScore={mockReport.hookScore} />
      <AudienceSignals audienceSignals={mockReport.audienceSignals} />
      <Sentiment sentiment={mockReport.sentiment} />
      <PostIdeas postIdeas={mockReport.postIdeas} />
      <FooterActions />
    </>
  )

  const breakdown = <VideoBreakdown videos={mockReport.videoBreakdown} />

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <ReportHeader
        creator={mockReport.creator}
        hookScoreLabel={mockReport.hookScore.label}
        narrative={narrative}
      />
      <ReportTabs overview={overview} videoBreakdown={breakdown} />
    </main>
  )
}
