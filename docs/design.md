# Design System — GIA Prototype

Generated from `impeccable critique` + `frontend-design` run on 2026-05-01 against the existing landing at https://sofi-ai-gia.netlify.app/. These decisions are locked for the build. Do not re-derive them per session.

## Tone

Premium-playful hybrid. "Creator coach with grounded data." Warm, editorial, grounded.

Physical scene: A Filipino creator at her ring-lit desk at 10pm — warm lamp overhead, scrolling stats, serious about her craft. The tool feels like a premium printed report she'd actually frame, not a SaaS monitoring dashboard.

Color direction: The SOFI AI brand identity — warm cream backgrounds, deep maroon primary, gold secondary. Light and warm, not dark. Feels editorial and approachable. Reference: a well-designed magazine report or a premium receipt, not a dark-mode analytics tool.

Anti-references: gradient text, glassmorphism, hero-metric template (big number + small label + gradient card), Inter/DM Sans/Plus Jakarta Sans, cold SaaS blues, dark-mode only, centered-stack hero layout, asterisk-and-arrow decoration as personality substitute.

---

## Typography

**Family: Bricolage Grotesque** (variable, Google Fonts). Single family. Weight contrast is the hierarchy.

```
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');
```

| Role | Weight | Size (fluid clamp) | Tracking | Line-height |
|---|---|---|---|---|
| Display / hero | 800 | `clamp(3.25rem, 7vw, 6.5rem)` | `-0.03em` | `0.95` |
| Hero sub / section H1 | 700 | `clamp(2rem, 4vw, 3.5rem)` | `-0.02em` | `1.05` |
| Section H2 | 600 | `clamp(1.5rem, 2.5vw, 2.25rem)` | `-0.01em` | `1.1` |
| Card heading / H3 | 600 | `clamp(1.125rem, 1.5vw, 1.375rem)` | `0` | `1.2` |
| Body | 400 | `1rem` | `0` | `1.65` |
| Body large | 450 | `clamp(1.0625rem, 1.25vw, 1.1875rem)` | `0` | `1.6` |
| Label / caption | 500 | `0.75rem` | `0.06em` | `1.4` |
| Button | 600 | `0.875rem` | `0.02em` | `1` |

Body line-length cap: `max-width: 65ch` on prose blocks.
Light text on dark: add `0.08` to line-height for display sizes.

---

## Color Tokens

**Strategy: SOFI AI brand identity.** Warm cream + deep maroon + gold. Light mode only. Maroon is the load-bearing accent — carries primary CTAs, borders, and data highlights.

Brand source: `sofi-ai-gia.netlify.app` — `--cream #FAF7F0`, `--maroon #7A1528`, `--gold #C9A84C`. Translated to oklch for Tailwind v4.

| Token | Value (oklch) | Brand hex | Usage |
|---|---|---|---|
| `--color-bg` | `oklch(97% 0.008 75)` | `#FAF7F0` cream | Page background |
| `--color-surface` | `oklch(99% 0.004 80)` | `#FFFEF9` white | Cards, panels |
| `--color-surface-raised` | `oklch(95% 0.015 75)` | `#F5F0E8` cream-warm | Elevated surface, hover |
| `--color-border` | `oklch(86% 0.025 75)` | `#DDD5C4` cream-border | Dividers, card borders |
| `--color-accent` | `oklch(32% 0.135 15)` | `#7A1528` maroon | Primary CTA, highlights |
| `--color-accent-muted` | `oklch(95% 0.015 15)` | `#F7ECEE` maroon-pale | Selected state tint, callout bg |
| `--color-accent-dim` | `oklch(40% 0.130 15)` | `#9E2540` maroon-mid | Hover state on accent elements |
| `--color-gold` | `oklch(72% 0.110 75)` | `#C9A84C` gold | Secondary accent, decorative |
| `--color-text` | `oklch(14% 0.020 55)` | `#1C1008` ink | Body copy |
| `--color-text-muted` | `oklch(28% 0.035 55)` | `#4A3525` ink-mid | Labels, captions |
| `--color-text-faint` | `oklch(62% 0.025 60)` | `#9C8878` ink-light | Decorative numbers, secondary labels |
| `--color-sentiment-pos` | `oklch(48% 0.14 148)` | — | Positive sentiment (dark green for light bg) |
| `--color-sentiment-neu` | `oklch(55% 0.10 75)` | — | Neutral sentiment (medium gold) |
| `--color-sentiment-neg` | `oklch(36% 0.13 15)` | — | Negative sentiment (close to maroon) |

Never `#000` or `#fff`. Every neutral is tinted warm. Light theme only — no dark mode variant.

---

## Spacing Scale

4px base unit. Fluid via `clamp()` for section-level gaps.

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `24px` |
| `--space-6` | `32px` |
| `--space-8` | `40px` |
| `--space-10` | `56px` |
| `--space-12` | `clamp(64px, 8vw, 96px)` |
| `--spacing-section` | `clamp(96px, 12vw, 160px)` |
| `--spacing-section-major` | `clamp(128px, 16vw, 224px)` |
| `--spacing-container` | `clamp(24px, 5vw, 80px)` |

Rhythm rule: vary section gaps intentionally. Tighter between related sections, generous before standalone CTAs.

---

## Motion Principles

```
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1)
--ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1)
--duration-fast:   150ms   /* hover, micro */
--duration-mid:    300ms   /* button press, small reveal */
--duration-slow:   500ms   /* section enter */
--duration-enter:  700ms   /* page-load stagger units */
```

**Page-load stagger (all routes):** Elements enter `opacity: 0 → 1` + `translateY(20px → 0)` with `ease-out-expo`. Stagger: nav 0ms, headline 80ms, sub 160ms, CTAs 240ms.

**`/analyzing` processing animation:**
- No spinner, no progress bar, no percentage
- GIA wordmark centered, full viewport
- 3 concentric rings: `scale(1 → 1.8)` + `opacity(0.4 → 0)`, staggered at 0ms / 800ms / 1600ms, loop every 2.4s
- Status text crossfades at 1.5s intervals: "reading your last 30 posts" → "mapping your audience patterns" → "finding your strongest hooks" → "building your report"
- Total: ~4s then navigate to report

**Scroll reveals (report dashboard):** IntersectionObserver, threshold `0.15`. Each section: `translateY(32px → 0)` + `opacity: 0 → 1`, `--duration-slow`, `ease-out-expo`.

**Rules:** Never animate CSS layout properties. Ease-out only (no bounce, no elastic). Hover transitions: 150ms. Active press: `scale(0.97)` at 100ms.

---

## Hero Composition

The hero IS the report. The right half shows an actual GIA report excerpt — readable, specific, plain language. This is the differentiator argument made visual without explanation.

**Layout (left-aligned, asymmetric, NOT centered stack):**

```
[LEFT 58%]                          [RIGHT 42%]
───────────────────────────         ──────────────────────────────
Small label:                        ┌─ GIA's take on @youraccount ─┐
"built for Philippine creators"     │                               │
                                    │ Your 7pm food posts get 2×    │
DISPLAY HEADLINE:                   │ the saves of morning content. │
understand why your                 │                               │
TikToks land —                      │ Your Cebu audience is loyal   │
or don't.                           │ but underserved — 3 posts in  │
                                    │ 30 days vs 24 for Manila.     │
Body (1-2 lines):                   │                               │
GIA reads your content, audience,   │ Hooks that open with a        │
and patterns. You get a coach,      │ question perform 3× better    │
not a spreadsheet.                  │ for your niche.               │
                                    └──────────────────────────────┘
[Analyze my profile] (amber btn)      Caption: "what a GIA report
[See a sample report →] (text link)   actually looks like"
```

Mobile (< 768px): headline full width, report card below at reduced size.

---

## Component Notes

### Navigation
- Left: "GIA" (600 weight) + "by SOFI AI" (400 muted)
- Right: "What GIA shows" / "How it works" / "See sample" + amber CTA button
- Mobile: wordmark + single CTA only

### How It Works (landing)
3-step horizontal timeline. NOT cards.
- Numbers: `--color-text-faint`, 800 weight, 60px
- Connecting line: 1px `--color-border`
- Mobile: vertical stack

### What GIA Shows (landing)
Full-width alternating strips with `--color-surface` background. Left text / right preview on odd, right text / left preview on even. Never a card grid.

### /analyze Form
Multi-step, one question per screen, max-width 480px centered.
- Step 1: TikTok link input (large, amber focus ring)
- Step 2: Goal selection (3 pill selectors)
- Step 3: Niche selection (pills + freeform)
- Step 4: Competitor handles, optional (chip input + skip link)
- Progress: "Step X of 4" text, no bar
- Continue button: bottom-right, amber

### /analyzing State
Full viewport. GIA wordmark (display weight, 80px) centered. Concentric pulse rings below. Status text in body muted below rings. No other elements.

### /report Hook Score
Horizontal bar with position marker — NOT the big-number hero template.
Track: `--color-border`. Fill: `--color-accent`. Score marker: circle at position value.
Plain-language explanation (2-3 sentences) below the bar.

### /report Audience Signals
- Location: left-aligned list with proportional bars + percentages
- Age: inline text with proportional emphasis
- Timing: 7×time-band heat strip — color intensity = engagement level

### /report Sentiment
Three proportional bars (`--color-sentiment-pos/neu/neg`) + percentage labels.
3 pull-quote examples below — indented, one per sentiment type. Tagalog quotes are intentional.

### /report What to Post Next
Numbered list (01, 02, 03). Numbers: `--color-text-faint`, 800 weight, 64px, positioned behind text block. Title: H3. Body: body regular. Rationale: body muted. No icon, no card borders.

### /report Video Breakdown (tab 2)
Second tab on the report dashboard. Accessible via "Video Breakdown" tab beside "Overview".
- Summary table: columns are #, title (truncated), views, eng. rate, hook ★ (out of 10), expand chevron.
- Table header bg: `--color-surface-raised`. Row hover: `--color-surface-raised`. Selected/expanded row: `--color-accent-muted`.
- Each row expands accordion-style to a full detail panel.
- Detail panel shows: hook type badge (maroon pill), trigger + pacing inline, metrics grid (views/eng rate/likes/shares/saves/comments in `--color-bg` tiles), then text fields (text overlay, spoken hook in italic, visual elements), divider, spoken hook analysis, why it works + improvement side-by-side.
- "Improvement" field has a distinct `--color-surface` border box to differentiate it from analysis.
- Mock data: 8 videos for @maelingkitchen. Hook types used: CURIOSITY_GAP, RELATABILITY, CONTROVERSY, PROBLEM_SOLUTION, SOCIAL_PROOF, VISUAL_PATTERN_INTERRUPT.

### /report Footer Actions
Inline tertiary buttons: "Share report" / "Analyze another account" / "Export PDF (coming soon)".
"Export PDF" in `--color-text-faint`, cursor default, tooltip "coming soon".

---

## globals.css (@theme block)

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');

@theme {
  --color-bg:              oklch(97% 0.008 75);
  --color-surface:         oklch(99% 0.004 80);
  --color-surface-raised:  oklch(95% 0.015 75);
  --color-border:          oklch(86% 0.025 75);
  --color-accent:          oklch(32% 0.135 15);
  --color-accent-muted:    oklch(95% 0.015 15);
  --color-accent-dim:      oklch(40% 0.130 15);
  --color-gold:            oklch(72% 0.110 75);
  --color-text:            oklch(14% 0.020 55);
  --color-text-muted:      oklch(28% 0.035 55);
  --color-text-faint:      oklch(62% 0.025 60);
  --color-sentiment-pos:   oklch(48% 0.14 148);
  --color-sentiment-neu:   oklch(55% 0.10 75);
  --color-sentiment-neg:   oklch(36% 0.13 15);

  --font-sans:    'Bricolage Grotesque', sans-serif;
  --font-display: 'Bricolage Grotesque', sans-serif;

  --text-display: clamp(3.25rem, 7vw, 6.5rem);
  --text-hero:    clamp(2rem, 4vw, 3.5rem);
  --text-2xl:     clamp(1.5rem, 2.5vw, 2.25rem);
  --text-xl:      clamp(1.125rem, 1.5vw, 1.375rem);
  --text-lg:      clamp(1.0625rem, 1.25vw, 1.1875rem);
  --text-base:    1rem;
  --text-sm:      0.875rem;
  --text-xs:      0.75rem;

  --spacing-section:       clamp(96px, 12vw, 160px);
  --spacing-section-major: clamp(128px, 16vw, 224px);
  --spacing-container:     clamp(24px, 5vw, 80px);

  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast:   150ms;
  --duration-mid:    300ms;
  --duration-slow:   500ms;
  --duration-enter:  700ms;
}

* { box-sizing: border-box; }

html {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}
```
