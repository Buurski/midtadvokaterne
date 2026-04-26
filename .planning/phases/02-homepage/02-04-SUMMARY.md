---
phase: 02-homepage
plan: "04"
subsystem: homepage-sections
tags: [homepage, sections, animation, framer-motion, cta]
dependency_graph:
  requires: [02-01, 02-02, 02-03]
  provides: [ClientSplitSection, CtaStrip, assembled-homepage]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [scroll-triggered-animation, opposing-slide-in, server-component-cta]
key_files:
  created:
    - components/sections/ClientSplitSection.tsx
    - components/sections/CtaStrip.tsx
  modified:
    - app/page.tsx
decisions:
  - CtaStrip is a Server Component — no animations needed on a static CTA block
  - SVG icons inline in ClientSplitSection to avoid extra icon library dependency
metrics:
  duration: "~10 minutes"
  completed: "2026-04-27"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 02 Plan 04: ClientSplitSection, CtaStrip, and Homepage Assembly Summary

Completed the final two homepage sections and wired all 7 sections into app/page.tsx, delivering the full MidtAdvokaterne homepage.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | ClientSplitSection and CtaStrip | b3d92a5 | components/sections/ClientSplitSection.tsx, components/sections/CtaStrip.tsx |
| 2 | Wire all sections into app/page.tsx | 2ab4ff4 | app/page.tsx |

## What Was Built

**ClientSplitSection** — "use client" component with Framer Motion scroll-triggered animations. Left card (Privat, bg-navy) slides in from x:-48; right card (Erhverv, navy/8 bg) slides in from x:48, with 150ms delay. Both use `useReducedMotion()` to collapse duration to 0 when reduced motion is preferred. Practice area pills rendered from arrays. Links to /retsomraader.

**CtaStrip** — Pure Server Component (no animations). Amber background, large `tel:97152233` click-to-call link in Playfair Display at 4xl/6xl, business hours and address sub-text, navy contact button linking to /kontakt.

**app/page.tsx** — Replaced Next.js boilerplate. Server Component assembling all 7 sections in the specified order: HeroSection → TrustBar → TaglineSection → TeamSection → ClientSplitSection → TestimonialSection → CtaStrip.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all sections contain real Danish content as specified in the plan.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundaries introduced. Tel link and /kontakt navigation are as modeled in the plan's threat register (T-02-04, T-02-05).

## Self-Check: PASSED

- components/sections/ClientSplitSection.tsx: FOUND
- components/sections/CtaStrip.tsx: FOUND
- app/page.tsx: FOUND
- Commit b3d92a5: FOUND
- Commit 2ab4ff4: FOUND
- TypeScript: clean (npx tsc --noEmit exits 0)
