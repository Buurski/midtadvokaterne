# MidtAdvokaterne A/S — Website Project

## What This Is

A professional marketing website for MidtAdvokaterne A/S, a Danish law firm in Ikast that has operated since 1964. The site's primary job is to answer one question every visitor brings: *"Can I trust these people with one of the most difficult things happening in my life right now?"*

This is not an app. It is a trust machine with a phone number.

## Core Value

A visitor arriving from a local Google search (e.g. "advokat skilsmisse Ikast") must immediately feel: *this firm is real, experienced, local, and approachable* — and be one tap away from calling.

## The Team

**Partners (Jurister):**
- Martin Plum Juul — Advokat og partner · mpj@midtadvokaterne.dk · 96 60 64 45 · Mob: 51 20 72 74
- Loa Nedergaard Olsen — Advokat og partner · lno@midtadvokaterne.dk · 96 60 64 44 · Mob: 21 22 65 19
- Jeanie Dam Meldgaard — Advokat (ikke partner) · jda@midtadvokaterne.dk

**Sekretærer:**
- Tina Riis Thygesen — tilknyttet Martin Plum Juul
- Line Lauridsen — tilknyttet Loa Nedergaard Olsen (på barsel)
- Heidi Bardtrum — tilknyttet Loa Nedergaard Olsen (vikar for Line)

**Firm phone:** 97 15 22 33  
**Address:** Sieferts Plads 5, 7430 Ikast  
**Founded:** 1964

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment | Vercel |
| Language | TypeScript |

## Brand

| Token | Value |
|---|---|
| Primary (navy) | #1A2B45 |
| Accent (amber) | #C4973A |
| Background | #F7F4EF |
| Text | #1C1C1C |
| Heading font | Playfair Display (serif) |
| Body font | Inter (sans-serif) |

## Pages

1. **Forside** (`/`) — Homepage with 8 sections
2. **Retsområder** (`/retsomraader`) — Practice areas, scrollable
3. **Om Os** (`/om-os`) — History from 1964 to today
4. **Kontakt** (`/kontakt`) — Form, map, phone, hours

## Key Decisions

| Decision | Rationale | Outcome |
|---|---|---|
| Framer Motion for animations | Ken Burns + scroll-reveal + stagger requires a mature animation library | Confirmed |
| No CMS at launch | Static content, small team, fast delivery | Confirmed |
| No backend at launch | Contact form via mailto or simple serverless action TBD | Pending |
| Danish as primary language | Target audience is local Danish speakers | Confirmed |

## Requirements

### Validated
*(None yet — ship to validate)*

### Active
- [ ] Four-page site: Forside, Retsområder, Om Os, Kontakt
- [ ] Homepage with Hero (Ken Burns), TrustBar, Tagline, Team, ClientSplit, Quote, CTA strip, Footer
- [ ] Scroll-triggered animations with prefers-reduced-motion support
- [ ] Team cards: B&W portrait → colour on hover, stagger reveal
- [ ] Contact page: form with GDPR checkbox, Google Maps embed, open/closed indicator
- [ ] SEO: meta tags per page, clean URLs, sitemap, robots.txt
- [ ] Cookie consent banner (EU/Danish law requirement)
- [ ] Mobile-first, <3s load, WebP images

### Out of Scope
- CMS / admin panel — static content at launch
- Client portal / authentication — not requested
- Blog — not in brief
- Multi-language (EN) — Danish only at launch

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions

---
*Last updated: April 2026 after initialization*
