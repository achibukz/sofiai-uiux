# GIA Application Challenge — Brief & Decisions

## Role

| Field | Detail |
|---|---|
| Location | 2nd Floor, Bookman Building, Quezon Ave, Santa Mesa Heights, Quezon City, Metro Manila |
| Employment Type | Project-based / Flexible Internship |
| Work Mode | Hybrid (1–2x onsite per week) |
| Compensation | Per hour or per project (negotiable — strong applicants paid more) |
| Deadline | **May 9, 2026** |

## Application Process

No resumes. Applicants design a new product to demonstrate how they think and build.

The challenge:

- Bring a rough product vision to life through design.
- Create a clear user flow.
- Suggest how the product could be better.

Does **not** need to be fully functional. What matters is a clear, thoughtful vision and the ability to communicate how it should look and feel. Any tools allowed (AI, references, personal workflow).

## The Product — GIA: Generative Influencer Analyst

GIA is a web-based analytics platform powered by SOFI AI. She helps TikTok creators understand their content in plain language, without needing to be technical.

**Target user:** Filipino TikTok creators who see their metrics but don't fully understand them.

**Use case:** Creator submits their TikTok profile link → GIA returns a readable report covering:

- Hook scores
- Audience signals
- Sentiment analysis
- Recommendations on what to post next

**Reference materials in this repo:**

- `sample1.pdf` — sample GIA report (long form)
- `sample2.pdf` — sample GIA report (short form)
- Existing landing page: <https://sofi-ai-gia.netlify.app/>

## What to Build

### 1. Landing page

Improve or redesign the existing landing. Consider:

- How to improve conversion.
- How clearly the product is communicated.
- What makes creators immediately understand the value.

### 2. Product flow

Design the end-to-end experience: from inputting a TikTok link to receiving and viewing the generated report. Open questions to engage with:

- Is a PDF the best report format, or would a dashboard work better?
- Is the TikTok link the only input needed, or are others useful?
- Is anything missing from the current flow?
- *Should this product even exist?* Suggestions welcome.

## Evaluation Criteria

1. **Thinking** — how the problem is approached and how decisions are made.
2. **Design** — clarity, usability, overall execution.
3. **Communication** — how well the work and ideas are explained.

## Submission Requirements

1. **Deployed website or prototype**
   - Shows the product experience.
   - Clear, logical user flow.
   - Doesn't need to be fully functional, as long as it can be explained.

2. **1–3 minute video**
   - Pitch yourself.
   - Walk through the design.
   - Explain thinking and decisions.

**Form fields:** Full Name, Email, Contact Number, Live Link (site / prototype / wireframe), Short Video link (unlisted YouTube acceptable).

Response within 24 hours of submission.

---

## Decisions Locked for This Submission

| Decision | Choice | Why |
|---|---|---|
| Stack | Next.js 15 + Tailwind v4 + TypeScript, deployed to Vercel | Frontend-heavy work; instant deploys; matches design-skill outputs |
| Backend | None — hardcoded mock data in `lib/mockReport.ts` | Brief explicitly says fully functional not required |
| Report form | Interactive web dashboard (replaces PDF) | Directly answers brief's "is PDF best?" question |
| Onboarding inputs | TikTok link + content goal + niche + optional competitor handles | Adds signal beyond just the link |
| Design tone | Premium-playful hybrid via `impeccable` / `frontend-design` skills | Differentiates from current playful-only landing |
| Critique stance | GIA should exist, but reposition as "creator coach with grounded data" | Defensible, additive |
| Timeline | 3–4 day sprint, target submission May 5–6 (buffer before May 9) | Allows re-record buffer for the video |

## Out of Scope (this submission)

- Real TikTok ingestion, scraping, or any backend.
- Auth, persistence, payments, analytics.
- Working PDF export (button is mocked; dashboard replaces it).
- ECR, NAWP, or any thesis-derived metric in the product UI. *Thesis is video-pitch context only — see `CLAUDE.md`.*

## Companion Documents

- `plan.md` (repo root) — day-by-day execution plan.
- `docs/PRD.md` — product requirements and module shapes.
- `CLAUDE.md` (repo root) — rules for any Claude session working on this repo.
