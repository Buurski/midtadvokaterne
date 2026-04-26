---
phase: 02-homepage
verified: 2026-04-27T00:00:00Z
status: human_needed
score: 7/7
overrides_applied: 0
human_verification:
  - test: "Hero fills viewport with Ken Burns animation running"
    expected: "At 1440px desktop and 375px mobile, hero occupies 100svh with no content visible below the fold. Ken Burns slow zoom is visible after ~3s on the hero image."
    why_human: "CSS animation and viewport sizing cannot be confirmed without a browser render."
  - test: "Hero headline fade-up and subtitle delay"
    expected: "Headline fades up over 800ms on page load. Subtitle text appears 300ms after headline starts."
    why_human: "Animation timing requires visual inspection in a running browser."
  - test: "Trust bar stagger reveal on scroll"
    expected: "Scrolling the trust bar into view shows items fading in left-to-right with 150ms stagger between each."
    why_human: "Scroll-triggered animation timing requires browser observation."
  - test: "Team card hover: lift + B&W to colour"
    expected: "Hovering a partner card lifts it (translateY -8px) and switches the portrait from greyscale to colour over 300ms."
    why_human: "CSS hover transitions require interactive browser testing."
  - test: "Client split opposing slide-in"
    expected: "Scrolling ClientSplitSection into view shows Privat card sliding from the left and Erhverv card sliding from the right, 600ms each."
    why_human: "Directional scroll animation requires visual confirmation."
  - test: "prefers-reduced-motion disables all animations"
    expected: "Enabling prefers-reduced-motion in Chrome DevTools (Rendering panel) makes all content appear instantly with no motion."
    why_human: "Requires toggling OS/browser reduced-motion setting and observing the page."
  - test: "Mobile 375px full-page scroll"
    expected: "All 7 sections stack correctly, no horizontal overflow, all text legible, CTA buttons reachable."
    why_human: "Responsive layout requires device/emulator verification."
---

# Phase 2: Homepage Verification Report

**Phase Goal:** Complete, animated homepage that earns trust and converts visitors to enquiries.
**Verified:** 2026-04-27
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Hero fills full viewport (100svh) with Ken Burns animation | VERIFIED | `HeroSection.tsx` line 10: `h-svh min-h-[600px] overflow-hidden`; `globals.css` lines 21–32: `@keyframes kenBurns` 14s loop with `.ken-burns` applied to Image via className |
| 2 | Headline fades up 800ms on load; subtitle 300ms later | VERIFIED | `HeroSection.tsx` lines 28–67: two `motion.div` elements, headline `duration: 0.8`, subtitle `delay: 0.3`, both use `animate` (not `whileInView`) so trigger on mount |
| 3 | Two CTA buttons link to /kontakt and /retsomraader | VERIFIED | `HeroSection.tsx` lines 54–66: amber `<a href="/kontakt">` and outlined `<a href="/retsomraader">` |
| 4 | Scroll indicator visible at bottom of hero | VERIFIED | `HeroSection.tsx` lines 71–90: scroll indicator with `animate-bounce` and chevron SVG; hidden only when `reducedMotion` is true (acceptable — decorative element) |
| 5 | Trust bar shows 4 trust signals with stagger fade-in on scroll enter | VERIFIED | `TrustBar.tsx`: 4 items with `staggerChildren: 0.15`, `whileInView="visible"`, `viewport={{ once: true }}`, `useReducedMotion` applied |
| 6 | Tagline section shows large centred serif heading with slide-up animation | VERIFIED | `TaglineSection.tsx` lines 11–16: `motion.div` with `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 24 }}`, 500ms |
| 7 | Testimonial section is full-width navy, centred quote, zero animation | VERIFIED | `TestimonialSection.tsx`: no `motion` import, no "use client", pure server component with static blockquote |
| 8 | Team section: 2 partner cards (large) + 4 staff cards, stagger slide-up on scroll | VERIFIED | `TeamSection.tsx`: `partners` array (2 items, `isPartner: true`), `staff` array (4 items), `staggerChildren: 0.12`, `whileInView="visible"` on both grids |
| 9 | Team card B&W default, colour on hover (300ms), lift on hover | VERIFIED | `TeamCard.tsx` lines 47–49: `grayscale group-hover:grayscale-0 transition-[filter] duration-300`; line 36: `group-hover:-translate-y-2 transition-transform duration-300` |
| 10 | Line Lauridsen shows "På barsel" badge; Heidi Bardtrum shows no photo (initials placeholder) | VERIFIED | `TeamSection.tsx` line 47: `notice: "På barsel"`; line 53: Heidi has no `imageSrc`; `TeamCard.tsx` lines 51–55: navy placeholder with initials when no `imageSrc` |
| 11 | Client split: Privat slides from left, Erhverv slides from right (600ms) | VERIFIED | `ClientSplitSection.tsx` lines 29–32: `initial={{ opacity: 0, x: -48 }}`; lines 78–83: `initial={{ opacity: 0, x: 48 }}`, both 600ms, `whileInView` |
| 12 | CTA strip shows large click-to-call phone and contact button | VERIFIED | `CtaStrip.tsx` lines 8–13: `<a href="tel:97152233">97 15 22 33</a>`; lines 17–21: `<a href="/kontakt">Send os en besked</a>` |
| 13 | app/page.tsx assembles all 7 sections in correct order | VERIFIED | `app/page.tsx`: imports and renders all 7 components in order: HeroSection, TrustBar, TaglineSection, TeamSection, ClientSplitSection, TestimonialSection, CtaStrip |
| 14 | All animations respect prefers-reduced-motion | VERIFIED (code) | Every client component calls `useReducedMotion()` and collapses durations to 0; `globals.css` line 30–32: `.ken-burns { animation: none }` under `prefers-reduced-motion: reduce` |

**Score:** 7/7 roadmap success criteria verified in code (14/14 detailed truths verified in code)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `components/hero/HeroSection.tsx` | Full-viewport hero, Ken Burns, CTAs | VERIFIED | Exports `HeroSection`, substantive implementation, imported and used in `app/page.tsx` |
| `app/globals.css` | `@keyframes kenBurns` + `.ken-burns` | VERIFIED | Lines 21–32 contain both keyframe and utility class with reduced-motion override |
| `components/sections/TrustBar.tsx` | 4-item staggered trust bar | VERIFIED | Exports `TrustBar`, 4 items, stagger variants, whileInView wired |
| `components/sections/TaglineSection.tsx` | Centred serif heading + body | VERIFIED | Exports `TaglineSection`, motion heading slide-up, amber divider |
| `components/sections/TestimonialSection.tsx` | Still quote block | VERIFIED | Exports `TestimonialSection`, no motion wrappers (intentionally still) |
| `components/team/TeamCard.tsx` | Card with B&W hover + lift | VERIFIED | Exports `TeamCard` and `TeamCardProps`, grayscale/lift CSS, notice badge, placeholder initials |
| `components/team/TeamSection.tsx` | Partner + staff layout, stagger | VERIFIED | Exports `TeamSection`, both partner and staff arrays, staggerChildren 0.12, imports TeamCard |
| `components/sections/ClientSplitSection.tsx` | Opposing slide-in split | VERIFIED | Exports `ClientSplitSection`, x: -48 left / x: 48 right, 600ms, reduced-motion aware |
| `components/sections/CtaStrip.tsx` | Phone CTA + contact button | VERIFIED | Exports `CtaStrip`, tel:97152233, /kontakt link, amber background |
| `app/page.tsx` | 7 sections assembled | VERIFIED | Server component, 7 imports, 7 JSX usages in correct order, no placeholder content |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `HeroSection.tsx` | `public/images/team/team-hero.png` | `<Image fill>` with ken-burns class | WIRED | `src="/images/team/team-hero.png"` on line 15 |
| `HeroSection.tsx` | `motion/react` | `useReducedMotion()` + `motion.div` | WIRED | Lines 4, 7, 28, 39 |
| `TrustBar.tsx` | `motion/react` | `whileInView` + staggerChildren | WIRED | Lines 3, 12–27, 32–37 |
| `TaglineSection.tsx` | `motion/react` | `whileInView` slide-up | WIRED | Lines 3, 11–16 |
| `TeamCard.tsx` | `public/images/team/*.png/.jpg` | `<Image fill>` with grayscale hover | WIRED | Line 46: `src={\`/images/team/${imageSrc}\`}` |
| `TeamSection.tsx` | `motion/react` | `whileInView` + staggerChildren 0.12 | WIRED | Lines 3, 60–63, 95–107, 110–122 |
| `TeamSection.tsx` | `TeamCard` | Import + JSX spread | WIRED | Line 4 import; used in both partner and staff map loops |
| `ClientSplitSection.tsx` | `motion/react` | `whileInView` with x slide-in | WIRED | Lines 3, 29–32, 78–83 |
| `app/page.tsx` | All 7 section components | Import + JSX usage | WIRED | Lines 1–7 imports; lines 11–19 JSX |

---

### Data-Flow Trace (Level 4)

Not applicable. All section content is static/hardcoded — no external data sources, no API routes, no DB queries. This is expected and correct for a static marketing homepage at this phase.

---

### Behavioral Spot-Checks

Step 7b: SKIPPED — Cannot verify animations (Ken Burns, fade-up, whileInView scroll triggers) or hover interactions without a running browser. See Human Verification section.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| HOME-01 | 02-01 | Hero: full-viewport, Ken Burns, headline fade-up, CTAs, scroll indicator | SATISFIED | `HeroSection.tsx` implements all five sub-requirements |
| HOME-02 | 02-02 | Trust bar — 4 trust signals, staggered fade-in | SATISFIED | `TrustBar.tsx` with 4 items and stagger variants |
| HOME-03 | 02-02 | Tagline section — centred serif quote, body text | SATISFIED | `TaglineSection.tsx` with heading, divider, body |
| HOME-04 | 02-03 | Team section — partner cards + staff grid, staggered reveal | SATISFIED | `TeamSection.tsx` with both layouts and stagger |
| HOME-05 | 02-04 | Client split — Privat/Erhverv, slide-in from opposite sides | SATISFIED | `ClientSplitSection.tsx` with x: ±48 animations |
| HOME-06 | 02-02 | Testimonial — full-width, centred, no animation | SATISFIED | `TestimonialSection.tsx` is a plain server component |
| HOME-07 | 02-04 | CTA strip — large phone click-to-call, contact button | SATISFIED | `CtaStrip.tsx` with tel: link and /kontakt button |
| TEAM-01 | 02-03 | Cards show portrait (B&W), name, title, practice areas, phone | SATISFIED | `TeamCard.tsx` implements all fields with correct rendering |
| TEAM-02 | 02-03 | Hover: lift (-8px) + B&W → colour (300ms) | SATISFIED (code) | `grayscale group-hover:grayscale-0` + `group-hover:-translate-y-2` in `TeamCard.tsx` |
| ANIM-01 | 02-01 | Ken Burns 12–15s loop | SATISFIED | 14s loop in `globals.css` |
| ANIM-02 | 02-01 | Hero headline 800ms fade-up, subtitle 300ms later | SATISFIED | `HeroSection.tsx` motion.div with these exact values |
| ANIM-03 | 02-02 | Trust bar stagger 150ms per item | SATISFIED | `staggerChildren: 0.15` in `TrustBar.tsx` |
| ANIM-04 | 02-02 | Section headings slide up 500ms on scroll enter | SATISFIED | `TaglineSection.tsx`, `TeamSection.tsx`, `ClientSplitSection.tsx` all use 500ms whileInView heading |
| ANIM-05 | 02-03 | Team cards stagger slide-up 120ms | SATISFIED | `staggerChildren: 0.12` in `TeamSection.tsx` |
| ANIM-06 | 02-04 | Client split slide-in from opposite sides 600ms | SATISFIED | `ClientSplitSection.tsx` x: -48/48 at 600ms |
| ANIM-07 | All plans | All animations respect prefers-reduced-motion | SATISFIED (code) | All client components use `useReducedMotion()`; ken-burns CSS override present |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `components/team/TeamSection.tsx` | 6 | `// TODO: extract to CMS or data file` | Info | Intentional — plan explicitly instructed this TODO comment be added; not a blocker |

No placeholder content, no stub implementations, no empty return values, no hardcoded empty arrays passed to renderers.

---

### Human Verification Required

#### 1. Hero viewport fill and Ken Burns animation

**Test:** Open `http://localhost:3000` on a 1440px desktop browser. Observe the hero section on first load.
**Expected:** Hero occupies the full viewport height with no content visible below the fold. After 3–5 seconds, a slow zoom/pan movement is visible on the team photo.
**Why human:** CSS `h-svh` rendering and `@keyframes` animation playback require a live browser.

#### 2. Hero headline and subtitle timing

**Test:** Hard-reload the page and observe the headline area.
**Expected:** "Vi er her, når det betyder mest." fades up over 800ms. The subtitle paragraph begins appearing 300ms after the headline starts.
**Why human:** Animation timing requires visual observation.

#### 3. Trust bar stagger reveal

**Test:** On the live page, scroll to the TrustBar section (dark navy, just below hero).
**Expected:** The four trust signals — 60+, 2, 100%, 4.9★ — fade in from bottom-to-top and left-to-right, 150ms apart.
**Why human:** Scroll-triggered whileInView animation cannot be confirmed without browser interaction.

#### 4. Team card hover interactions

**Test:** On a desktop browser, hover over one of the two partner cards (Martin Plum Juul or Loa Nedergaard Olsen).
**Expected:** The card lifts up (~8px), and the portrait transitions from black-and-white to full colour over 300ms.
**Why human:** CSS hover transitions require interactive browser testing.

#### 5. Client split slide-in animation

**Test:** Scroll to the "Din situation, vores ekspertise" section.
**Expected:** The Privat (navy) card slides in from the left; the Erhverv card slides in from the right, with ~150ms offset.
**Why human:** Opposing directional animations require visual confirmation.

#### 6. prefers-reduced-motion

**Test:** In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Hard-reload.
**Expected:** All content (hero headline, trust bar items, team cards, client split cards) appears instantly with no motion. Hero image is static (no zoom/pan).
**Why human:** Requires toggling the browser media feature emulation setting.

#### 7. Mobile layout at 375px

**Test:** Use Chrome DevTools device emulator at 375px width and scroll the full page top to bottom.
**Expected:** All 7 sections stack in single-column layout where appropriate, no horizontal scroll, all text is legible, CTA buttons are full-width or appropriately sized.
**Why human:** Responsive layout correctness requires visual inspection at target viewport.

---

### Gaps Summary

No code-level gaps found. All 7 roadmap success criteria are implemented and wired. All 16 requirements (HOME-01–07, TEAM-01–02, ANIM-01–07) are satisfied in the codebase.

The `human_needed` status reflects that 7 animation/visual behaviors cannot be confirmed programmatically. These are standard human checks for any animation-heavy UI phase — they are not indicators of missing implementation.

---

_Verified: 2026-04-27_
_Verifier: Claude (gsd-verifier)_
