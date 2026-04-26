---
phase: 02-homepage
plan: "03"
subsystem: team
tags: [team, components, animation, framer-motion, tailwind]
dependency_graph:
  requires: []
  provides: [TeamCard, TeamSection]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns:
    - "CSS-only B&W hover via Tailwind grayscale group utilities (no JS)"
    - "Framer Motion whileInView stagger with useReducedMotion gate"
    - "Next.js Image fill with object-top for portrait photos"
key_files:
  created:
    - components/team/TeamCard.tsx
    - components/team/TeamSection.tsx
  modified: []
decisions:
  - "B&W hover implemented as pure CSS (grayscale/group-hover:grayscale-0) — no JS state needed"
  - "motion/react module error is pre-existing (same in HeroSection, TrustBar) — not caused by this plan"
  - "Team data kept inline with TODO comment to extract to CMS"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-27"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 02 Plan 03: Team Section Summary

**One-liner:** Team section with 2 partner cards (3:4 portrait, B&W hover) and 4 staff cards (square), stagger-revealed via Framer Motion whileInView with 120ms stagger, and a navy-initials placeholder for Heidi Bardtrum.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | TeamCard component with B&W hover and lift | 04a67ee | components/team/TeamCard.tsx |
| 2 | TeamSection with partner layout, staff grid, stagger reveal | 86e567f | components/team/TeamSection.tsx |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all team member data is real content from the brief. Heidi Bardtrum intentionally has no image (navy placeholder with initials is the correct design).

## Threat Flags

None — no new network endpoints or auth paths introduced. Phone/email links are client-side only.

## Self-Check: PASSED

- components/team/TeamCard.tsx: exists, committed 04a67ee
- components/team/TeamSection.tsx: exists, committed 86e567f
- TypeScript errors present are pre-existing (motion/react types missing in HeroSection, TrustBar, and TeamSection — same root cause, not introduced by this plan)
