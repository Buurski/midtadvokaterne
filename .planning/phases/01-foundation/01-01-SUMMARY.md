---
phase: 01-foundation
plan: "01"
subsystem: brand-system
tags: [tailwind, fonts, routing, brand-tokens]
dependency_graph:
  requires: []
  provides: [brand-tokens, font-utilities, clean-url-routes]
  affects: [all-subsequent-plans]
tech_stack:
  added: [Playfair Display via next/font/google, Inter via next/font/google]
  patterns: [Tailwind v4 @theme brand tokens, next/font variable injection]
key_files:
  created:
    - app/retsomraader/page.tsx
    - app/om-os/page.tsx
    - app/kontakt/page.tsx
  modified:
    - app/globals.css
    - app/layout.tsx
decisions:
  - "Tailwind v4 @theme (not @theme inline) used for brand tokens — generates bg-navy, text-navy etc. directly"
  - "Fonts loaded with variable option (not className) so CSS vars can be referenced in @theme"
  - "No dark mode block in globals.css — law firm site uses single light theme"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-26"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 1 Plan 01: Brand Tokens and Route Scaffolding Summary

Replaced Next.js Geist boilerplate with MidtAdvokaterne brand system: Tailwind v4 @theme tokens for navy/amber/off-white/text colours and Playfair Display + Inter font utilities wired into the root layout, plus three stub route pages proving clean URL structure.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Replace globals.css with brand tokens and update layout.tsx | 028d641 | app/globals.css, app/layout.tsx |
| 2 | Create stub route pages for clean URL structure (PERF-05) | 0204f50 | app/retsomraader/page.tsx, app/om-os/page.tsx, app/kontakt/page.tsx |

## What Was Built

**globals.css** now contains a Tailwind v4 `@theme` block with four colour tokens (`--color-navy`, `--color-amber`, `--color-off-white`, `--color-text`) and two font utilities (`--font-heading`, `--font-body`). These generate Tailwind classes like `bg-navy`, `text-amber`, `font-heading` throughout the project.

**layout.tsx** loads Playfair Display and Inter from `next/font/google` using the `variable` option, applies both CSS variable names to `<html>`, sets `lang="da"`, and has Danish metadata for the firm. Geist and Geist_Mono are gone entirely.

**Three stub pages** confirm the App Router clean URL convention works: `/retsomraader`, `/om-os`, `/kontakt` each render a single `<h1>` using `font-heading text-navy`, confirming brand tokens resolve at build time.

## Verification

- `npm run build` exits 0 — all 4 routes (/, /kontakt, /om-os, /retsomraader) compile as static pages
- `lang="da"` confirmed in layout.tsx
- `--color-navy` confirmed in globals.css
- No Geist references in layout.tsx
- All three stub route files exist

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

| File | Line | Description |
|------|------|-------------|
| app/retsomraader/page.tsx | 3 | Stub heading only — real content comes in Phase 3 (intentional per plan) |
| app/om-os/page.tsx | 3 | Stub heading only — real content comes in Phase 3 (intentional per plan) |
| app/kontakt/page.tsx | 3 | Stub heading only — real content comes in Phase 3 (intentional per plan) |
| app/page.tsx | all | Still the Next.js boilerplate homepage — Phase 2 replaces this entirely |

## Self-Check: PASSED

- app/globals.css exists with --color-navy: FOUND
- app/layout.tsx exists with playfair.variable: FOUND
- app/retsomraader/page.tsx: FOUND
- app/om-os/page.tsx: FOUND
- app/kontakt/page.tsx: FOUND
- Commit 028d641: FOUND
- Commit 0204f50: FOUND
