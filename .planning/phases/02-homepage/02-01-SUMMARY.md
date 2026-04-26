---
phase: 02-homepage
plan: 01
subsystem: hero
tags: [hero, animation, ken-burns, framer-motion, tailwind]
dependency_graph:
  requires: []
  provides: [HeroSection]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [Ken Burns CSS animation, Framer Motion fade-up, useReducedMotion]
key_files:
  created:
    - components/hero/HeroSection.tsx
  modified:
    - app/globals.css
decisions:
  - "Used CSS @keyframes for Ken Burns (not JS) — compositor-thread only, no layout thrash"
  - "Scroll indicator hidden entirely (not just static) when reduced-motion is active"
  - "Plain <a> tags used for CTAs — no Next.js Link needed for same-site anchors at this stage"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-27"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 02 Plan 01: Hero Section Summary

Full-viewport hero with Ken Burns team photo, Framer Motion fade-up headline, amber/outlined CTA buttons, and prefers-reduced-motion support.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add Ken Burns @keyframes to globals.css | e25963d | app/globals.css |
| 2 | Build HeroSection component | 8769717 | components/hero/HeroSection.tsx |

## Deviations from Plan

None — plan executed exactly as written.

Note: TypeScript reports `Cannot find module 'motion/react'` for both HeroSection.tsx and the pre-existing TrustBar.tsx. This is a pre-existing tsconfig limitation (`moduleResolution: bundler` + subpath exports), not introduced by this plan. Next.js resolves the import correctly at build time. `skipLibCheck: true` is already set.

## Self-Check: PASSED

- `components/hero/HeroSection.tsx` — created and committed (8769717)
- `app/globals.css` — updated with kenBurns keyframes (e25963d)
- Both commits verified in git log
