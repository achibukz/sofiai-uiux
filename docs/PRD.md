# PRD — GIA Job Application Prototype

## Problem Statement

A job-application challenge for SOFI AI requires designing **GIA (Generative Influencer Analyst)** — a web product that takes a TikTok creator's profile link and returns a readable analytics report aimed at Filipino creators who don't speak fluent analytics. The existing landing page (`https://sofi-ai-gia.netlify.app/`) leans playful but doesn't communicate product credibility, has no live product flow behind it, and the brief itself questions whether a PDF is the right report format. The applicant needs to ship a deployed prototype plus a 1–3 min video pitch by **May 9, 2026** (target May 5–6) that demonstrates thinking, design, and communication — without building real backend infrastructure.

## Solution

A deployed Next.js + Tailwind prototype with hardcoded mock data covering four routes — landing, onboarding, processing state, and an interactive report dashboard — plus a public sample-report page linked from the landing. The dashboard replaces the brief's PDF with a scannable web experience answering "what should I post next, and why?" in plain language. A short video walks through the flow, explains design decisions, and pitches the applicant. The applicant's thesis (engagement-prediction research on Filipino micro-creators) is used as **video-only credibility**; it does not appear anywhere in the product UI.

## User Stories

1. As a SOFI AI hiring reviewer, I want to open a deployed link and immediately see a polished landing page, so that I can judge the applicant's design execution within seconds.
2. As a hiring reviewer, I want to click through a working onboarding flow, so that I can evaluate how the applicant thinks about the user journey end-to-end.
3. As a hiring reviewer, I want to view a sample report without filling out a form, so that I can inspect the centerpiece deliverable directly.
4. As a hiring reviewer, I want a 1–3 minute video, so that I can hear the applicant's reasoning and pitch in their own voice.
5. As a Filipino TikTok creator visiting the landing page, I want a clear value proposition in plain language, so that I understand what GIA does in under 10 seconds.
6. As a creator, I want to paste my TikTok link directly from the hero, so that I can start without scrolling.
7. As a creator, I want to specify my content goal (growth / monetization / niche-build), so that GIA's recommendations match what I actually want.
8. As a creator, I want to declare my niche, so that benchmarks feel relevant to peers in my category.
9. As a creator, I want to optionally add competitor or inspiration handles, so that I get comparative insight rather than just self-analysis.
10. As a creator, I want a visible processing state, so that I trust the system is doing real work and not stalling.
11. As a creator, I want my report headlined by a single human-readable narrative ("GIA's take"), so that I get the verdict before drowning in numbers.
12. As a creator, I want a hook score with a plain-language reason, so that I understand *why* my opens are working or not.
13. As a creator, I want audience signals (age, location, watch-time windows), so that I know who I'm actually reaching.
14. As a creator, I want sentiment broken down with example comments, so that the abstraction stays grounded in real viewer reactions.
15. As a creator, I want 3 specific post ideas with rationale, so that I can act on the report today, not just understand it.
16. As a creator, I want to share my report via a link, so that I can show it to collaborators without screenshots.
17. As a creator, I want a mobile-readable version, so that I can review my report on the device I actually use.
18. As the applicant, I want hardcoded mock data centralized in one file, so that I can iterate on the design without coupling to backend work.
19. As the applicant, I want the prototype deployed to Vercel from day one, so that deployment is never the blocker on submission day.
20. As the applicant, I want a CLAUDE.md at the repo root, so that future Claude sessions resume the project with the right rules (especially the thesis-exclusion rule).

## Implementation Decisions

**Stack & deployment**
- Next.js 15 (App Router) + TypeScript + Tailwind v4. Deployed to Vercel.
- No backend, no database, no API integrations. All data hardcoded.

**Routes**
- `/` — landing redesign.
- `/analyze` — onboarding form (TikTok link, content goal, niche, optional competitor handles).
- `/analyzing` — animated processing state with a timed transition (~4s) into the report.
- `/report/[slug]` — report dashboard, parameterized for shareable URLs.
- `/report/sample` — public sample, linked from landing; uses the same component as `[slug]` with a hardcoded slug.

**Modules**
- `lib/mockReport.ts` — single source of truth for the mock creator profile and report. Deep module: one well-typed export consumed by every report-rendering component. Stable interface, easy to swap for a real API later.
- `lib/reportNarrative.ts` — pure function turning the report data structure into the "GIA's take" 2-sentence summary string. Deep, testable in isolation.
- `components/report/*` — presentational components for each dashboard section (Header, HookScore, AudienceSignals, Sentiment, PostIdeas). Take typed props; no data fetching.
- `components/landing/*` — section components (Hero, LiveDemoStrip, FeatureCards, Positioning, FinalCTA).
- `components/ui/*` — shared primitives (Button, Card, Tag, MetricNumber).
- `app/globals.css` — design tokens (typography scale, colors, spacing) generated from the design-skill outputs.

**Design direction**
- Drive visual direction via the `impeccable`, `frontend-design`, and `redesign-skill` skills. Premium-playful hybrid: editorial typography and structure, with personality moments.

**Mock data shape (vocabulary fixed by `specs.md` — hook scores, audience signals, sentiment, suggestions). Explicitly excludes ECR / NAWP and any thesis-derived metrics.**

**Out-of-product positioning**
- Thesis ("To Predict Is To Believe…") is referenced only in the video pitch and in CLAUDE.md as an exclusion rule. It is not in any component, copy, mock data, or comment.

## Testing Decisions

This is a 3–4 day prototype submission, not a production product. Testing posture is proportional:

- **Manual click-through verification** is the primary test surface. Walk every route, every CTA, on desktop (1440px) and mobile (375px), before submission. Lighthouse pass on the landing.
- **Unit tests** are written only for genuinely deep, pure modules where regression risk outweighs setup cost:
  - `lib/reportNarrative.ts` — given a report data structure, returns the expected narrative string. Easy to test, easy to break silently.
- **No tests** for presentational components, route shells, or the mock data file itself. Testing those is pure overhead at this scope.
- A good test here means: tests the externally observable behavior of `reportNarrative` (input → string output) without asserting on internal implementation. No mocking required since the module is pure.
- No prior art in this repo (fresh); follow standard Vitest + React Testing Library conventions if/when added.

## Out of Scope

- Real TikTok API integration, scraping, or any data ingestion.
- Authentication, accounts, persistence, or backend of any kind.
- Payment / pricing logic beyond a static "get started" CTA.
- PDF export functionality (button is mocked; the dashboard *replaces* the PDF as the answer to the brief's question).
- A11y audit beyond keyboard-navigable buttons and reasonable contrast.
- I18n. Copy is English-only; Tagalog inflections allowed in microcopy where natural.
- Analytics / tracking on the deployed site.
- Any reference to ECR, NAWP, or the applicant's thesis prediction model in product UI, copy, or mock data.

## Further Notes

- **Thesis usage rule (load-bearing):** The applicant's thesis on Filipino micro-creator engagement prediction (ECR, NAWP, frozen-LMM ensemble) is for the video pitch only — establishing unique fit and serving as a "future direction" suggestion. It must not appear in any product surface. This rule is mirrored in `CLAUDE.md` so future sessions enforce it automatically.
- **Suggestion to give in the video:** GIA should exist, but reposition from "analyst" to "creator coach with grounded data." Mention engagement-prediction research as a credible future direction.
- **Submission package:** deployed Vercel URL + unlisted YouTube video URL, submitted via SOFI AI's form (name, email, contact, live link, video link).
- **Resume / extend in new chat:** `plan.md` at repo root has the day-by-day execution plan; this PRD has the why and the module shapes; `CLAUDE.md` has the rules.
