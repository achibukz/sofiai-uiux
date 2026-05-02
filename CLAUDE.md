# CLAUDE.md

Rules for any Claude session working in this repo.

## What this repo is

A **job application prototype** for SOFI AI — a deployed Next.js + Tailwind site demonstrating a redesign of GIA (Generative Influencer Analyst), a TikTok analytics product for Filipino creators. **Deadline: May 9, 2026. Target submission: May 5–6.**

The product does **not** need to be functional. It's a prototype with hardcoded data. The deliverables are a deployed link plus a 1–3 minute video pitch.

Source-of-truth documents:

- `docs/specs.md` — the original brief plus locked decisions.
- `docs/PRD.md` — product requirements, modules, and testing posture.
- `docs/architecture.md` — monorepo layout, module responsibilities, data flow.
- `docs/design.md` — visual system (generated after design-skill run).
- `plan.md` — day-by-day execution plan.

## Stack

- Monorepo: Next.js app lives at `apps/web/`
- Next.js 15 (App Router) + TypeScript + Tailwind v4
- Deployed to Vercel
- Package manager: **pnpm**
- No backend, no database, no API integrations. All data hardcoded in `apps/web/lib/mockReport.ts`.

## Commands

```bash
# Run from repo root
pnpm dev      # local dev (delegates to apps/web)
pnpm build    # production build (run before pushing if shipping fast)
pnpm lint     # if configured
```

## Testing

- **Unit tests:** Jest — pure modules only (`lib/reportNarrative.ts`). Run with `pnpm test`.
- **E2E tests:** Cypress — covers the full user flow (landing → /analyze → /analyzing → /report/[slug]) and the sample report route. Run with `pnpm cypress`.
- No tests for presentational components, route shells, or the mock data file.
- No timer/animation assertions (overhead not justified at this scope).
- Config lives at `apps/web/jest.config.ts` and `apps/web/cypress/`.

## Docs

- `docs/specs.md` — brief + locked decisions
- `docs/PRD.md` — product requirements, modules, testing posture
- `docs/architecture.md` — monorepo layout, module responsibilities, data flow
- `docs/design.md` — visual system (typography, color tokens, motion) — generated after design-skill run
- `plan.md` — day-by-day execution plan

## Hard rules

### 1. No thesis content in the product

The owner's thesis — *"To Predict Is To Believe: Integrating Content, Context, and Creator Features For Pre-Publication Short-Form Video Engagement Prediction"* — uses metrics including **ECR (Engagement Continuation Rate)** and **NAWP (Normalized Average Watch Percentage)**, plus a frozen-LMM ensemble for engagement prediction.

**Do not reference any of this in the website, components, copy, mock data, comments, alt text, meta tags, or commit messages.** The thesis is for the video pitch only — establishing unique fit and serving as a "future direction" suggestion. The product uses only the vocabulary in `docs/specs.md` (hook scores, audience signals, sentiment, post recommendations).

If asked to "make the analysis smarter" or "add more metrics," extend within the brief's vocabulary. Do not introduce ECR, NAWP, retention curves, or prediction-model language.

### 2. No real backend, no real APIs

Everything is hardcoded. Don't add Prisma, don't add `fetch` to TikTok, don't add auth. If a feature seems to require backend, mock it visually (loading state, fake delay) and move on.

### 3. Routes are fixed

`/`, `/analyze`, `/analyzing`, `/report/[slug]`, `/report/sample`. Don't invent new top-level routes without checking with the user.

### 4. Mock data lives in one place

`lib/mockReport.ts`. Every report-rendering component imports from it. Do not inline mock data inside components.

## Design direction

**Color palette: SOFI AI brand identity — light theme.** Warm cream backgrounds (`#FAF7F0`), deep maroon primary (`#7A1528`), gold secondary (`#C9A84C`). All color tokens in `app/globals.css` are translated to oklch for Tailwind v4. Do not introduce dark backgrounds or amber/orange accents — the rebrand to the brand identity is locked.

Tone: **premium-playful hybrid** — editorial typography and structure with personality moments. Warm and approachable, not cold SaaS.

### User persona
The target user is a Filipino TikTok creator who is **not data-literate**. All metric copy must translate numbers into plain Tagalog/English outcomes — what it means for their content, not what the number is. Avoid terms like "engagement rate", "correlation", "coefficient", "NLP", "polarity", "clustering". Prefer: "your hooks are strong", "most fans are from Manila", "comments are mostly positive", "viewers are sticking around past the 5-second mark".

### Landing page sections (Prototype 2 — current)
The landing (`/`) now has these sections in order:

1. **Nav** — fixed, with anchors: Story, What GIA shows, Pricing, See sample
2. **Hero** — decorative maroon arc, gold rule eyebrow, `8vw/7.5rem` headline, maroon-header report card preview, social proof bar (67 creators / 4.8 rating / 2min)
3. **HowItWorks** — 3-step horizontal timeline with mini UI mockup per step (SVG address bar / scan animation / mini report card). Each visual appears above the step number on scroll enter.
4. **GIAStory** — origin story: left editorial maroon panel (giant GIA watermark, SOFI AI gold badge), right copy with gold guillemet pull-quote, drawn gold underline on eyebrow, maroon quote text, gold horizontal rule above attribution, warm maroon attribution footer
5. **NoJargon** — "Built for creators, not analysts" section with headline "You don't need to understand analytics. GIA does it for you." Three callout cards translating jargon into plain outcomes (e.g. "72/100 correlation coefficient" → "Strong hooks"). Staggered scroll reveal animation.
6. **WhatGIAShows** — 4 alternating feature sections (hook score, audience signals, sentiment, recommendations)
7. **Positioning** — feature comparison table vs TikTok built-in / generic AI tools
8. **Pricing** — 3-tier PHP pricing: Free / ₱299 Starter / ₱799 Pro (Pro card in solid maroon)
9. **FinalCTA** — full maroon background section with cream headline and decorative rings
10. **Footer**

Component files: `components/landing/GIAStory.tsx`, `components/landing/Pricing.tsx`, `components/landing/HowItWorks.tsx`.

### Report dashboard tabs
The report page (`/report/[slug]`) has two tabs:
- **Overview** — ReportSummary bar with plain-language metric explanations, then 2-column grid layout (left: HookScore + AudienceSignals; right: Sentiment + GrowthGraph), then PostIdeas as 3-column horizontal, then FooterActions
- **Video Breakdown** — per-video analysis table with expandable accordion rows

**Overview layout (desktop):**
```
[ReportHeader — full width]
[ReportSummary — full width, 3 plain-language rows]
┌─ left (1fr) ──────────────┬─ right (340px) ───────────┐
│ HookScore                 │ Sentiment                  │
│ AudienceSignals           │ GrowthGraph (promoted)     │
└───────────────────────────┴────────────────────────────┘
[PostIdeas — 3-col horizontal, gold top rule per col]
[FooterActions]
```
Grid container: `max-width: 960px`, `grid-template-columns: 1fr 340px`, `gap: clamp(32px, 4vw, 48px)`. Collapses to single column at 768px.

**GrowthGraph** is no longer in the ReportHeader — it lives in the right column of the overview grid at `height: 180px`.

**ReportHeader blockquote** uses full-radius `--color-accent-muted` background + subtle full border. No `borderLeft` side-stripe.

Video breakdown data lives in `mockReport.videoBreakdown` (8 videos for @maelingkitchen). Each video has: hook type, trigger, pacing, text overlay, spoken hook, visual elements, spoken hook analysis, why it works, improvement, and full engagement metrics. `VideoBreakdown.tsx` renders the table. `ReportTabs.tsx` is the client tab switcher that wraps both tabs.

**Video Breakdown specifics:**
- Table header has a `2px solid var(--color-gold)` bottom rule
- Hook type badges are color-coded per type (not all maroon): CURIOSITY_GAP=maroon, RELATABILITY=accent-muted, CONTROVERSY=dark maroon, PROBLEM_SOLUTION=gold, SOCIAL_PROOF=green, VISUAL_PATTERN_INTERRUPT=cream
- Thumbnail placeholder: dark phone-screen bg (`oklch(14% 0.020 55)`), cream SVG play button, hook score badge bottom-left
- Expanded rows animate in with `enterUp` keyframe (250ms)

## Code conventions

- Short, direct code. No comments unless the *why* is non-obvious.
- No backwards-compat shims, unused `_vars`, or re-exports for removed code.
- TypeScript strict. Component props always typed.
- Tailwind utilities preferred; design tokens live in `app/globals.css`.

## When in doubt

Ask the owner before:

- Adding a new top-level route.
- Adding a dependency that isn't UI/animation/icon related.
- Touching anything that would require a real backend.
- Inventing metric vocabulary not in `docs/specs.md`.
