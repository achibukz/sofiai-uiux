# GIA Job Application Test — Execution Plan

## Context

This is a job-application challenge for SOFI AI (Bookman Building, QC). The role is a project-based / flexible internship with a **May 9, 2026** deadline. Instead of a resume, applicants design **GIA (Generative Influencer Analyst)** — a web analytics product that takes a TikTok creator's profile link and returns a readable report (hook scores, audience signals, sentiment, post recommendations) tailored to Filipino creators who don't speak fluent analytics.

The applicant is a QA Engineer / Data Analyst / Full-Stack Developer working on a thesis — *"To Predict Is To Believe: Integrating Content, Context, and Creator Features For Pre-Publication Short-Form Video Engagement Prediction"* — a Filipino micro-creator engagement prediction model using frozen LMMs, with ECR (Engagement Continuation Rate) and NAWP (Normalized Average Watch Percentage) as core metrics. **This thesis is NOT content for the website.** It's a positioning asset for the video pitch only — proof of unique fit and a credible source for "future direction" suggestions.

**Deliverables required by the brief:**
1. Deployed website / prototype (landing + product flow + report dashboard).
2. 1–3 minute video pitch.
3. Submission form (name, email, contact, live link, video link).

**Decisions locked:**
- Stack: **Next.js + Tailwind**, deployed to Vercel. Hardcoded mock data — no real backend.
- Report form: **interactive dashboard** (directly answers their "is PDF best?" prompt by replacing it).
- Scope: landing redesign + onboarding + processing state + report dashboard.
- Timeline: **3–4 day sprint**, target submission **May 5–6** (buffer before May 9).
- Design tone: driven by the `impeccable` / `frontend-design` / `redesign-skill` skills — premium, anti-generic, editorial-with-personality.
- Onboarding inputs: TikTok link + content goals + niche + competitor handles.
- Critique stance: GIA should exist, but reframe positioning (analyst → creator coach with grounded data).

---

## Build Plan

### Day 1 — Foundation & Design Direction (May 1–2)

1. **Init repo** (`apps/web`): monorepo structure with Next.js 15 + Tailwind v4 + TypeScript at `apps/web/`. Root `package.json` delegates `dev`, `build`, `lint` to the workspace. Deploy empty shell to Vercel immediately so deploys are never the blocker.
2. **Run design skills back-to-back** to produce the visual system:
   - `impeccable` → audit the existing landing at `https://sofi-ai-gia.netlify.app/`, identify what's generic, define the upgrade direction.
   - `frontend-design` or `redesign-skill` → generate the actual component-level direction (typography scale, color, motion, hero composition).
3. Lock: typography (one editorial display + one neutral sans), color tokens (single-accent + warm neutrals), spacing scale, motion principles. **After this step, write `docs/design.md`** capturing every locked token and decision so future sessions don't re-derive them.
4. **Write `docs/architecture.md`** — monorepo layout, module responsibilities, and data flow. Do this before touching any component so the structure is agreed on first.
5. **Install test tooling:** Jest (unit) + Cypress (E2E) into `apps/web/`. Wire `pnpm test` and `pnpm cypress` at workspace level.
6. Build mock data layer: `apps/web/lib/mockReport.ts` — one believable Filipino creator profile (e.g., a food/lifestyle micro-creator) with hook score, audience signals, sentiment breakdown, and 3 post recommendations.

### Day 2 — Landing Page Redesign

Replace the current landing's playful-only voice with a premium-playful hybrid that takes the product seriously without losing personality.

**Sections (top to bottom):**
- Hero — sharp value prop ("understand why your TikToks land — or don't"), primary CTA "analyze my profile", secondary "see a sample report".
- Live demo strip — paste a TikTok link inline → animates into "what you'll get" preview.
- What GIA actually shows — 3–4 cards mapping the dashboard sections (hook, audience, sentiment, what to post next), each with a real-looking screenshot.
- Why this isn't generic analytics — positioning against "TikTok's built-in analytics" and "generic AI tools" (built for Filipino creators, plain-language, action-oriented).
- Social proof / sample report CTA — link to the live sample report page.
- Pricing / get started — single CTA, no friction.

### Color Rebrand (completed May 1) — SOFI AI Brand Identity

Replaced the dark amber palette with the actual SOFI AI brand colors sourced from `sofi-ai-gia.netlify.app`:
- **Light theme**: cream bg (`#FAF7F0`), white surface, deep maroon primary (`#7A1528`), gold secondary (`#C9A84C`)
- Updated `apps/web/app/globals.css` @theme block (all oklch values)
- Fixed hardcoded dark bg in `Nav.tsx`
- Updated `docs/design.md` Color Tokens section + Tone section
- Updated `CLAUDE.md` design direction notes

### Video Breakdown Feature (completed May 1)

Added per-video analysis tab to the report dashboard, matching the detail level of `docs/sample1.pdf` and `docs/sample2.pdf`:
- `apps/web/lib/mockReport.ts` — added `VideoEntry` type + `videoBreakdown` array (8 videos for @maelingkitchen with full hook analysis per video)
- `apps/web/components/report/ReportTabs.tsx` — client component for tab switching (Overview | Video Breakdown)
- `apps/web/components/report/VideoBreakdown.tsx` — accordion table with full per-video detail cards
- Updated `apps/web/app/report/[slug]/page.tsx` to use ReportTabs

---

### Day 3 — Product Flow + Report Dashboard

**Routes:**
- `/` — landing
- `/analyze` — onboarding (TikTok link → goals → niche → optional competitor handles → submit)
- `/analyzing` — processing state (animated, ~4s timed transition, shows GIA "reading" the profile)
- `/report/[slug]` — report dashboard (the centerpiece)
- `/report/sample` — public sample, linked from landing

**Report dashboard sections** (using only the metric vocabulary from `specs.md` — hook scores, audience signals, sentiment, suggestions; **no ECR / NAWP**):
- Header: creator handle, snapshot summary, "GIA's take" 2-sentence narrative.
- Hook score — single big number, plain-language reason.
- Audience signals — who's watching (age, location, when they watch).
- Sentiment — comment-level sentiment with example quotes.
- What to post next — 3 specific, actionable post ideas with rationale.
- Footer: "share report" / "re-analyze" / "export PDF" (button mocked).

### Day 4 — Polish, Video, Submit

1. Mobile pass on every route. Lighthouse pass.
2. Record video (1–3 min, unlisted YouTube):
   - 20s — intro yourself; mention thesis as the credibility hook ("I'm researching engagement prediction for Filipino micro-creators, so this product is squarely in my lane").
   - 60s — walk through landing → analyze → report.
   - 30s — design decisions (why dashboard over PDF, why these inputs, why this tone).
   - 30s — suggestions: reframe GIA as a "creator coach with data", and mention thesis-derived metrics (ECR, NAWP) as a future direction worth exploring — *only here, not in the product*.
3. Submit via the form.

---

## Critical Files

- `apps/web/app/page.tsx` — landing
- `apps/web/app/analyze/page.tsx` — onboarding form
- `apps/web/app/analyzing/page.tsx` — processing state
- `apps/web/app/report/[slug]/page.tsx` — report dashboard
- `apps/web/app/report/sample/page.tsx` — public sample (re-exports the slug page with hardcoded data)
- `apps/web/lib/mockReport.ts` — single source of truth for the mock creator + report
- `apps/web/components/` — shared UI primitives (Hero, Section, MetricCard, PostIdea, etc.)
- `apps/web/app/globals.css` — design tokens
- `docs/specs.md` — to be rewritten for clarity (see below)
- `CLAUDE.md` — to be created at repo root

---

## Documents to produce alongside the build

1. **PRD via the `to-prd` skill** — published from the agreed scope so future Claude sessions can resume work without re-deciding direction.
2. **Rewritten `docs/specs.md`** — current file is a copy-paste of the brief with broken bullet formatting. Restructure into: Brief / Product / Submission Requirements / Decisions Locked / Out-of-Scope. Preserve all original facts; just make it scannable.
3. **`CLAUDE.md` at repo root** — short, opinionated: stack, commands (`pnpm dev`, `pnpm build`), where mock data lives, design-skill usage notes, and the explicit rule that **thesis content (ECR, NAWP, the prediction model) must NOT appear in the website** — only in the video pitch.

---

## Verification

- `pnpm dev` → all 5 routes load without errors.
- `pnpm test` → Jest unit tests for `lib/reportNarrative.ts` pass.
- `pnpm cypress run` → Cypress E2E suite passes: landing → /analyze → /analyzing → /report/[slug], plus /report/sample standalone.
- Manually click through every CTA on desktop. Every CTA goes somewhere sensible.
- `/report/sample` loads with no input required (linked publicly from landing).
- Mobile (375px) and desktop (1440px) both pass a visual scan — no overflow, no broken type.
- Vercel preview deploy is green and shareable.
- Video < 3 minutes, audio audible, screen recording readable.
- `docs/specs.md` is clean Markdown with no broken bullets.
- `CLAUDE.md` exists and explicitly excludes thesis content from the product.
- `docs/architecture.md` and `docs/design.md` both exist and are current.
