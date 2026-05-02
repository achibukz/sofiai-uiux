import { mockReport } from '@/lib/mockReport'
import { buildNarrative } from '@/lib/reportNarrative'
import Nav from '@/components/landing/Nav'
import ReportHeader from '@/components/report/ReportHeader'
import ReportSummary from '@/components/report/ReportSummary'
import HookScore from '@/components/report/HookScore'
import AudienceSignals from '@/components/report/AudienceSignals'
import Sentiment from '@/components/report/Sentiment'
import PostIdeas from '@/components/report/PostIdeas'
import FooterActions from '@/components/report/FooterActions'
import ReportTabs from '@/components/report/ReportTabs'
import VideoBreakdown from '@/components/report/VideoBreakdown'
import GrowthGraph from '@/components/report/GrowthGraph'

export default function ReportPage() {
  const narrative = buildNarrative(mockReport)

  const overview = (
    <>
      <ReportSummary plainSummary={mockReport.plainSummary} />
      {/* 2-column data grid */}
      <div
        className="overview-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 'clamp(32px, 4vw, 48px)',
          padding: 'clamp(32px, 4vw, 48px) var(--spacing-container)',
          maxWidth: '960px',
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        {/* Left column: HookScore + AudienceSignals */}
        <div>
          <HookScore hookScore={mockReport.hookScore} />
          <AudienceSignals audienceSignals={mockReport.audienceSignals} />
        </div>

        {/* Right column: Sentiment + GrowthGraph */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Sentiment sentiment={mockReport.sentiment} />
          <div style={{ padding: '32px 0', borderBottom: '1px solid var(--color-border)' }}>
            <GrowthGraph data={mockReport.followerGrowth} width={340} height={180} />
          </div>
        </div>
      </div>

      {/* Post ideas — full width, 3-col */}
      <PostIdeas postIdeas={mockReport.postIdeas} />
      <FooterActions />

      <style>{`
        @media (max-width: 768px) {
          .overview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )

  const breakdown = <VideoBreakdown videos={mockReport.videoBreakdown} />

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Nav />
      <ReportHeader
        creator={mockReport.creator}
        hookScoreLabel={mockReport.hookScore.label}
        narrative={narrative}
      />
      <ReportTabs overview={overview} videoBreakdown={breakdown} />
    </main>
  )
}
