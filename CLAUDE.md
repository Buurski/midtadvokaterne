# MidtAdvokaterne — Project Instructions

## Project Overview

Building the website for **MidtAdvokaterne A/S**, a Danish law firm in Ikast founded in 1964. Multi-page marketing site aimed at private individuals and business clients in the Ikast-Herning area.

**Full brief:** See `MidtAdvokaterne_Website_Brief.md`  
**Planning docs:** See `.planning/`

**Current phase:** Phase 1 — Foundation  
**Stack:** Next.js 15 App Router · TypeScript · Tailwind CSS · Framer Motion · Vercel

---

## Brand

| Token | Value |
|---|---|
| Primary navy | `#1A2B45` |
| Accent amber | `#C4973A` |
| Background | `#F7F4EF` |
| Text | `#1C1C1C` |
| Heading font | Playfair Display (serif) |
| Body font | Inter (sans-serif) |

---

## Pages

| Route | Page |
|---|---|
| `/` | Forside (Homepage) |
| `/retsomraader` | Retsområder (Practice Areas) |
| `/om-os` | Om Os / Vores Historie |
| `/kontakt` | Kontakt |

---

## How Claude Should Operate

- **Claude writes all code.** The user directs; Claude executes.
- **Primary language:** Danish for all user-facing content.
- **Tone:** Warm, clear, calm — no legal jargon. Speaks to stressed people, not lawyers.
- **Do not introduce backend logic** (database, auth, server actions beyond contact form) without discussing first.
- **Ask before any paid API calls** (maps APIs with billing, email services, etc.).

---

## Active Skills

> **Primary design skill: `huashu-design`** — invoke this for every UI component and page section, without exception.

Use these skills proactively — invoke them before starting any relevant task:

| Skill | When to use |
|---|---|
| `huashu-design` | Building any UI component or page section |
| `ui-ux-pro-max` | Any design, layout, or UX decision |
| `frontend-design:frontend-design` | Building frontend components |
| `figma:figma-implement-design` | Translating designs from Figma/Claude Design into code |
| `superpowers:brainstorm` | Before starting a new feature or section |
| `simplify` | After completing a chunk of code |

---

## Animation Rules (from brief)

All animations must respect `prefers-reduced-motion`. When that setting is enabled, all animations are disabled and content appears instantly.

| Element | Animation | Duration |
|---|---|---|
| Hero image | Ken Burns slow zoom/pan | 12–15s loop |
| Hero headline | Fade up on load | 800ms |
| Trust bar items | Staggered fade in, L→R | 150ms delay each |
| Section headings | Slide up on scroll enter | 500ms |
| Team cards | Staggered slide up + fade | 120ms stagger |
| Team card hover | Lift + B&W → colour | 300ms |
| Client split cards | Slide in from opposite sides | 600ms |
| Nav bar | Transparent → solid on scroll | 300ms |

---

## File Structure

```
app/
  layout.tsx          # Root layout, fonts, global nav + footer
  page.tsx            # Homepage
  retsomraader/
    page.tsx
  om-os/
    page.tsx
  kontakt/
    page.tsx
components/
  nav/
  hero/
  team/
  footer/
  ...
public/
  images/             # All site images (WebP preferred)
.planning/            # GSD planning docs
```
