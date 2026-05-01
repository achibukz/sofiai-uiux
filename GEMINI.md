# GEMINI.md

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
pnpm dev          # local dev (delegates to apps/web)
pnpm build        # production build (run before pushing if shipping fast)
pnpm lint         # if configured
pnpm screenshots  # capture progress report screenshots
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

Drive visual direction via the `impeccable`, `frontend-design`, and `redesign-skill` skills. Tone: **premium-playful hybrid** — editorial typography and structure with personality moments. Differentiates from the current playful-only landing at <https://sofi-ai-gia.netlify.app/>.

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
