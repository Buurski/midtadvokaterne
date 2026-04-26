# Project State — MidtAdvokaterne Website

## Current Status

**Phase:** 1 — Foundation  
**Current Plan:** 01-03 (complete — Phase 1 done)  
**Status:** Phase 1 complete, ready for Phase 2  
**Last updated:** 2026-04-26  
**Last session:** 2026-04-26 — Completed 01-03-PLAN.md — Stopped at: None

## Phase Progress

| Phase | Status |
|---|---|
| 1: Foundation | ✅ Complete (3/3 plans complete) |
| 2: Homepage | ⬜ Not started |
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

Phase 1 complete. Footer server component (3 columns: address/CVR, nav links, hours/phone) wired into root layout. Full page shell ready. Next: Phase 2 — Homepage.
