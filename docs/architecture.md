# Architecture — GIA Prototype

## Monorepo Layout

```
sofiai-uiux/
├── apps/
│   └── web/                          # Next.js 15 app (App Router)
│       ├── app/
│       │   ├── globals.css           # design tokens (colors, type, spacing)
│       │   ├── layout.tsx            # root layout
│       │   ├── page.tsx              # / — landing
│       │   ├── analyze/
│       │   │   └── page.tsx          # /analyze — onboarding form
│       │   ├── analyzing/
│       │   │   └── page.tsx          # /analyzing — processing state
│       │   └── report/
│       │       ├── [slug]/
│       │       │   └── page.tsx      # /report/[slug] — report dashboard
│       │       └── sample/
│       │           └── page.tsx      # /report/sample — public sample (no input)
│       ├── components/
│       │   ├── landing/              # section components (Hero, LiveDemoStrip, etc.)
│       │   ├── report/               # report sections (Header, HookScore, AudienceSignals, Sentiment, PostIdeas)
│       │   └── ui/                   # shared primitives (Button, Card, Tag, MetricNumber)
│       ├── lib/
│       │   ├── mockReport.ts         # single source of truth for mock data
│       │   └── reportNarrative.ts    # pure function: ReportData → "GIA's take" string
│       ├── cypress/
│       │   ├── e2e/                  # E2E specs
│       │   └── support/
│       ├── jest.config.ts
│       ├── jest.setup.ts
│       └── tsconfig.json
├── docs/
│   ├── specs.md
│   ├── PRD.md
│   ├── architecture.md               # this file
│   └── design.md                     # generated after design-skill run
├── plan.md
├── CLAUDE.md
└── package.json                      # root workspace config (delegates to apps/web)
```

## Module Responsibilities

### `lib/mockReport.ts`
Single export: a `ReportData` object representing one believable Filipino creator (food/lifestyle micro-creator). Every report-rendering component imports from here. Do not inline mock data inside components.

Shape:
```ts
type ReportData = {
  creator: {
    handle: string
    niche: string
    followerCount: number
    avatarUrl: string
  }
  hookScore: {
    score: number          // 0–100
    label: string          // e.g. "Strong"
    reason: string         // plain-language explanation
  }
  audienceSignals: {
    ageRange: string       // e.g. "18–24"
    topLocations: string[] // e.g. ["Metro Manila", "Cebu", "Davao"]
    peakHours: string      // e.g. "7–9 PM"
    watchTimeAvg: string   // e.g. "62%"
  }
  sentiment: {
    positive: number       // percentage
    neutral: number
    negative: number
    exampleComments: { text: string; tone: 'positive' | 'neutral' | 'negative' }[]
  }
  postIdeas: {
    title: string
    rationale: string
  }[]
  generatedAt: string      // ISO date string
}
```

### `lib/reportNarrative.ts`
Pure function. Takes `ReportData`, returns a 2-sentence "GIA's take" summary string. No side effects, no imports from Next.js. This is the only module with Jest unit tests.

```ts
export function buildNarrative(report: ReportData): string
```

### `components/report/*`
Presentational only. Each section component receives typed props derived from `ReportData` — no data fetching, no internal state beyond UI interactions (e.g., tab toggle).

| Component | Props source |
|---|---|
| `ReportHeader` | `creator`, `hookScore.label`, narrative string |
| `HookScore` | `hookScore` |
| `AudienceSignals` | `audienceSignals` |
| `Sentiment` | `sentiment` |
| `PostIdeas` | `postIdeas` |

### `components/landing/*`
Static section components. No props beyond optional className overrides.

| Component | Purpose |
|---|---|
| `Hero` | Value prop + primary CTA |
| `LiveDemoStrip` | Inline link input → animated preview |
| `FeatureCards` | 3–4 cards showing dashboard sections |
| `Positioning` | Differentiation vs TikTok analytics + generic AI |
| `FinalCTA` | Sample report link + get-started button |

### `components/ui/*`
Shared primitives with no business logic.

`Button`, `Card`, `Tag`, `MetricNumber`

## Data Flow

```
mockReport.ts
    │
    ├── reportNarrative.ts  →  narrative string
    │
    └── report/[slug]/page.tsx
            │
            ├── ReportHeader  (creator + narrative)
            ├── HookScore
            ├── AudienceSignals
            ├── Sentiment
            └── PostIdeas
```

The `[slug]` page ignores the slug value in the prototype — it always renders the single mock report. The slug exists so the URL looks real and shareable.

`/report/sample` is a thin wrapper that renders the same page component with a hardcoded `slug="sample"`.

## Routing

| Route | Purpose | Notes |
|---|---|---|
| `/` | Landing | Static |
| `/analyze` | Onboarding form | Client component for form state; on submit pushes to `/analyzing` |
| `/analyzing` | Processing state | Client component; `setTimeout(~4000)` then `router.push('/report/sample')` |
| `/report/[slug]` | Report dashboard | Server component; reads mock data |
| `/report/sample` | Public sample | Renders `[slug]` component with hardcoded data |

Do not add top-level routes without owner sign-off (see CLAUDE.md).

## Testing

### Unit (Jest)
- Target: `lib/reportNarrative.ts` only.
- Test: given a `ReportData` input → returns the expected narrative string. No mocking required (pure function).
- Config: `apps/web/jest.config.ts`

### E2E (Cypress)
- Full user flow: landing CTA → `/analyze` form submission → `/analyzing` transition → `/report/[slug]`.
- Sample route: `/report/sample` loads without form input.
- Covers: route existence, CTA navigation, no JS errors on any route.
- No timer assertions on the `/analyzing` transition.
- Config: `apps/web/cypress/`

## Design Tokens

All tokens live in `apps/web/app/globals.css` as CSS custom properties. Components reference tokens via Tailwind utilities. See `docs/design.md` for the locked visual system (generated after design-skill run).
