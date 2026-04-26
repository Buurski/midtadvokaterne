# Project State — MidtAdvokaterne Website

## Current Status

**Phase:** 2 — Homepage  
**Current Plan:** 02-04 (complete — Phase 2 done)  
**Status:** Phase 2 complete, ready for Phase 3  
**Last updated:** 2026-04-27  
**Last session:** 2026-04-27 — Completed all 4 Phase 2 plans — Stopped at: None

## Phase Progress

| Phase | Status |
|---|---|
| 1: Foundation | ✅ Complete (3/3 plans complete) |
| 2: Homepage | ✅ Complete (4/4 plans complete) |
| 3: Inner Pages | ⬜ Not started |
| 4: Polish & Launch | ⬜ Not started |

## Decisions

- Tailwind v4 @theme (not @theme inline) used for brand tokens
- Fonts loaded with variable option so CSS vars can be referenced in @theme
- No dark mode block in globals.css — single light theme for law firm
- Hamburger icon animation uses Tailwind CSS transforms — no extra Framer Motion dependency for a 3-line icon
- MobileMenu rendered inside Navbar header element so it inherits fixed positioning and stacks correctly
- Footer as pure server component — no 'use client', zero client bundle impact
- TODO comments on CVR and phone placeholders for Phase 4 content pass

## Notes

Phase 2 complete. All 8 homepage sections built and wired: HeroSection (Ken Burns, Framer Motion fade-up), TrustBar (stagger), TaglineSection, TeamSection (B&W hover, stagger), ClientSplitSection (opposing slide-in), TestimonialSection, CtaStrip. Full prefers-reduced-motion support. TypeScript clean. Next: Phase 3 — Inner Pages.
