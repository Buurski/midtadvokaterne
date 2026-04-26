---
phase: 02-homepage
plan: 02
subsystem: homepage-sections
tags: [trust-bar, tagline, testimonial, scroll-animation, framer-motion]
dependency_graph:
  requires: []
  provides: [TrustBar, TaglineSection, TestimonialSection]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [whileInView scroll-reveal, staggerChildren, useReducedMotion]
key_files:
  created:
    - components/sections/TrustBar.tsx
    - components/sections/TaglineSection.tsx
    - components/sections/TestimonialSection.tsx
  modified: []
decisions:
  - TestimonialSection is a server component (no "use client") — intentionally zero animation per HOME-06
  - Pre-existing motion/react TS2307 error affects all motion components in project; not introduced by this plan
metrics:
  duration: ~10min
  completed: 2026-04-27
---

# Phase 02 Plan 02: TrustBar, TaglineSection, TestimonialSection Summary

Three middle-section components built with staggered scroll-reveal (TrustBar), heading slide-up (TaglineSection), and intentional stillness (TestimonialSection).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | TrustBar — 4 staggered trust signals | 6c1b6d1 | components/sections/TrustBar.tsx |
| 2 | TaglineSection and TestimonialSection | 276579b | components/sections/TaglineSection.tsx, components/sections/TestimonialSection.tsx |

## What Was Built

**TrustBar** — Navy background section with 4 trust signal items in a 2-col (mobile) / 4-col (desktop) grid. Items stagger fade-in L→R via `staggerChildren: 0.15` on `whileInView`. Each item shows amber stat number, off-white label, muted sub-text.

**TaglineSection** — Off-white section with large Playfair Display heading ("Juridisk hjælp, der tager dig alvorligt."), amber horizontal divider, and body paragraph. Heading wraps in a `motion.div` with `whileInView` slide-up 500ms.

**TestimonialSection** — Navy server component with a large decorative quote mark, blockquote, and attribution. No motion wrappers — intentionally still per HOME-06.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all content is production Danish copy matching the brief.

## Threat Flags

None — all content is static, hardcoded, no user input or external data.

## Self-Check: PASSED

- [x] components/sections/TrustBar.tsx — exists, committed at 6c1b6d1
- [x] components/sections/TaglineSection.tsx — exists, committed at 276579b
- [x] components/sections/TestimonialSection.tsx — exists, committed at 276579b
- [x] TypeScript: only pre-existing motion/react TS2307 error; no new errors introduced
