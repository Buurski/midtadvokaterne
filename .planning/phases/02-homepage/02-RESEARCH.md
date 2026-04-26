# Phase 2: Homepage — Research

**Researched:** 2026-04-26
**Domain:** Next.js 16 / React 19 / Framer Motion 12 / Tailwind CSS v4 — animated marketing homepage
**Confidence:** HIGH

---

## Summary

Phase 2 builds the complete homepage for MidtAdvokaterne: 8 sections, 7 distinct animation types, team portraits with B&W-to-colour hover, and full `prefers-reduced-motion` compliance. The foundation (Navbar, Footer, brand tokens, fonts) is already wired into the root layout — Phase 2 only needs to replace `app/page.tsx` and create section components under `components/`.

The stack is locked: Next.js 16 App Router, React 19, Framer Motion 12, Tailwind CSS v4 with `@theme` tokens. All animation patterns are achievable with Framer Motion's `whileInView` + `variants` + `staggerChildren` — no third-party animation library is needed beyond what is already installed.

Ken Burns (slow zoom/pan loop) is best implemented as a pure CSS `@keyframes` animation on the `<img>` tag inside the Next.js `<Image fill>` wrapper. This avoids Framer Motion's JavaScript overhead for a purely decorative continuous loop, and is more GPU-friendly.

**Primary recommendation:** CSS `@keyframes` for Ken Burns; Framer Motion `whileInView` + `variants` + `stagger()` for all scroll-triggered reveals; `useReducedMotion()` hook to collapse all durations to zero.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Hero section render + Ken Burns | Browser / Client | Frontend Server (SSR) | CSS animation runs client-side; Image served SSR |
| Scroll-triggered reveals | Browser / Client | — | Intersection Observer / Framer Motion runs in browser |
| Team card hover (B&W → colour) | Browser / Client | — | Pure CSS transition on img filter |
| `prefers-reduced-motion` guard | Browser / Client | — | `useReducedMotion` reads OS media query at runtime |
| Image serving (hero, portraits) | CDN / Static | Frontend Server | next/image optimises + serves via Vercel CDN |
| Page metadata (SEO) | Frontend Server (SSR) | — | Next.js `export const metadata` in server component |

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HOME-01 | Hero section — full-viewport, Ken Burns animation, headline fade-up, two CTAs, scroll indicator | CSS `@keyframes` for Ken Burns; Framer Motion `animate` + `initial` on load for headline; `<Image fill priority>` |
| HOME-02 | Trust bar — 4 trust signals, staggered fade-in on scroll enter | `whileInView` + `variants` with `stagger(0.15)` on parent |
| HOME-03 | Tagline section — large centred serif quote, body text, generous white space | Server component; `whileInView` slide-up on heading |
| HOME-04 | Team section — partner cards (large) + staff grid, staggered scroll-reveal | `whileInView` + `staggerChildren`; CSS `filter: grayscale()` transition on hover |
| HOME-05 | Client split — Privat/Erhverv two-column, slide-in from opposite sides | `whileInView` with `initial={{ x: -80 }}` / `initial={{ x: 80 }}` per column |
| HOME-06 | Quote/testimonial — full-width centred, intentionally still | Static server component; no animation |
| HOME-07 | CTA strip — large phone number (click-to-call), contact button | Static or light fade-in; `tel:` href |
| TEAM-01 | Team card: portrait (B&W default), name (serif), title, practice areas, phone | CSS `filter: grayscale(100%)` on `<Image>`; `transition-property: filter` |
| TEAM-02 | Desktop hover: lift translateY(-8px) + B&W → colour (300ms) | Tailwind `hover:` + `transition` utilities; no JS needed |
| ANIM-01 | Ken Burns on hero image — 12–15s loop | CSS `@keyframes kenburns` with `scale` + `translate`; `animation-duration: 14s` |
| ANIM-02 | Hero headline fade-up (800ms), subtitle 300ms later | Framer Motion `motion.h1` with `initial/animate`; subtitle uses `transition={{ delay: 0.3 }}` |
| ANIM-03 | Trust bar staggered fade-in L→R (150ms delay each) | `stagger(0.15)` on parent `motion.div`; `viewport={{ once: true }}` |
| ANIM-04 | Section headings slide up on scroll enter (500ms) | `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 24 }}`; `viewport={{ once: true }}` |
| ANIM-05 | Team cards staggered slide-up + fade (120ms stagger) | `stagger(0.12)` on parent; `viewport={{ once: true, amount: 0.2 }}` |
| ANIM-06 | Client split cards slide in from opposite sides (600ms) | Two `motion.div`s with mirrored `initial.x`; `whileInView`; `viewport={{ once: true }}` |
| ANIM-07 | All animations respect `prefers-reduced-motion` | `useReducedMotion()` hook; all durations become 0; CSS animation paused via `@media (prefers-reduced-motion: reduce)` |
</phase_requirements>

---

## Standard Stack

### Core (already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | ^12.38.0 | Scroll-triggered reveals, stagger, load animations | Already in package.json; whileInView + variants cover all phase needs |
| next/image | 16.2.4 (next) | Hero image, team portraits | fill + priority for hero; automatic WebP, lazy below fold |
| tailwindcss | ^4 | Layout, spacing, hover utilities | Already configured with brand tokens |

### No Additional Libraries Needed

All animation requirements are satisfied by the existing stack. Specifically:

- Ken Burns: CSS `@keyframes` — no new dependency
- Scroll reveal: Framer Motion `whileInView` — already installed
- Stagger: Framer Motion `stagger()` utility from `"motion/react"` — already installed
- Reduced motion: `useReducedMotion` from `"motion/react"` — already installed
- B&W hover: CSS `filter` transition — no dependency

**Installation:** No new packages required for Phase 2.

---

## Architecture Patterns

### System Architecture Diagram

```
app/page.tsx (Server Component — assembles sections)
  │
  ├── <HeroSection />         ← 'use client' (Framer Motion load anims + CSS Ken Burns)
  ├── <TrustBar />            ← 'use client' (whileInView stagger)
  ├── <TaglineSection />      ← 'use client' (whileInView heading)
  ├── <TeamSection />         ← 'use client' (whileInView stagger + hover)
  ├── <ClientSplit />         ← 'use client' (whileInView slide-in)
  ├── <QuoteSection />        ← Server Component (intentionally still)
  └── <CTAStrip />            ← Server Component (static content)

Each 'use client' section:
  Browser reads OS prefers-reduced-motion
       ↓
  useReducedMotion() → shouldReduce: boolean
       ↓
  All transition durations: shouldReduce ? 0 : N
  CSS animation: @media (prefers-reduced-motion: reduce) { animation: none }
```

### Recommended Component Structure

```
components/
├── nav/           # Phase 1 (done)
│   ├── Navbar.tsx
│   └── MobileMenu.tsx
├── footer/        # Phase 1 (done)
│   └── Footer.tsx
├── hero/
│   └── HeroSection.tsx      # Ken Burns + headline fade-up + CTAs + scroll indicator
├── trust/
│   └── TrustBar.tsx         # 4 trust signals, stagger reveal
├── tagline/
│   └── TaglineSection.tsx   # Large serif quote, body text
├── team/
│   ├── TeamSection.tsx      # Section shell + grid layout
│   └── TeamCard.tsx         # Individual card (portrait, name, title, phone)
├── clients/
│   └── ClientSplit.tsx      # Privat / Erhverv two-column slide-in
├── quote/
│   └── QuoteSection.tsx     # Full-width testimonial (server component, no animation)
└── cta/
    └── CTAStrip.tsx         # Phone number + contact button (server component)
```

### Pattern 1: Ken Burns via CSS @keyframes (ANIM-01)

**What:** Slow 12–15s looping zoom+pan on hero background image
**When to use:** Any continuously looping decorative image animation
**Why CSS not Framer Motion:** CSS animations run on the compositor thread (GPU). Framer Motion JS animations share the main thread and add startup cost. For a perpetual loop with no user interaction, CSS is strictly better.

```css
/* In globals.css or a <style> tag in HeroSection.tsx */
@keyframes kenburns {
  0%   { transform: scale(1.0) translate(0%, 0%); }
  50%  { transform: scale(1.08) translate(-1.5%, -1%); }
  100% { transform: scale(1.0) translate(0%, 0%); }
}

@media (prefers-reduced-motion: reduce) {
  .ken-burns {
    animation: none !important;
  }
}
```

```tsx
// HeroSection.tsx — Source: Next.js Image fill docs + CSS keyframes pattern
// [CITED: nextjs.org/docs/app/api-reference/components/image]
'use client'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Image container — position:relative required for fill */}
      <div className="absolute inset-0">
        <Image
          src="/images/team/team-hero.png"
          alt="MidtAdvokaterne team"
          fill
          priority          // LCP image — load immediately
          className="object-cover ken-burns"
          style={{ transformOrigin: 'center center' }}
          sizes="100vw"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-navy/60" />
      </div>
      {/* Text content above overlay */}
      ...
    </section>
  )
}
```

**Critical gotcha:** Next.js `<Image fill>` sets `position: absolute` on the `<img>` tag. The Ken Burns `transform` applies to the `<img>` directly. The parent `<div>` must have `position: relative` (or `absolute`/`fixed`) AND `overflow: hidden` to clip the scale. Without `overflow: hidden`, the scaled image bleeds outside the hero container.

### Pattern 2: Hero Headline Fade-Up on Load (ANIM-02)

**What:** `h1` fades up 800ms on page load; subtitle 300ms later
**When to use:** Above-the-fold load animations (not scroll-triggered)

```tsx
// [CITED: motion.dev/docs/react-animation]
'use client'
import { motion } from 'motion/react'
import { useReducedMotion } from 'motion/react'

export function HeroSection() {
  const shouldReduce = useReducedMotion()

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.8, ease: 'easeOut' }}
      >
        Juridisk rådgivning du kan stole på
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.8, delay: shouldReduce ? 0 : 0.3, ease: 'easeOut' }}
      >
        Erfarne advokater i Ikast siden 1964
      </motion.p>
    </>
  )
}
```

### Pattern 3: Scroll-Triggered Stagger (ANIM-03, ANIM-05)

**What:** N items reveal with a fixed delay between each
**When to use:** Trust bar (4 items, 150ms apart), team cards (N cards, 120ms apart)

```tsx
// [CITED: motion.dev/docs/react-animation#variants]
import { motion, stagger } from 'motion/react'
import { useReducedMotion } from 'motion/react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // 120ms for team cards (use 0.15 for trust bar)
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function TeamSection() {
  const shouldReduce = useReducedMotion()

  const safeContainerVariants = shouldReduce
    ? { hidden: {}, visible: {} }
    : containerVariants

  const safeItemVariants = shouldReduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : itemVariants

  return (
    <motion.div
      variants={safeContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {teamMembers.map((member) => (
        <motion.div key={member.id} variants={safeItemVariants}>
          <TeamCard member={member} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

**Key decision — `whileInView` vs `useInView` + `useAnimation`:**
Use `whileInView` for Phase 2. It is simpler (no imperative `controls.start()`), handles viewport entry/exit automatically, and the `viewport={{ once: true }}` option covers the standard "reveal once on scroll down" pattern. [CITED: motion.dev/docs/react-scroll-animations] `useInView` + `useAnimation` is only needed when you want to trigger imperative side effects (e.g., analytics events) alongside the animation, or when animating non-`motion` elements.

### Pattern 4: Client Split Slide-In from Opposite Sides (ANIM-06)

**What:** Left column slides in from left; right column slides in from right
**When to use:** Two-column sections where directionality reinforces the content split

```tsx
// [ASSUMED — pattern is standard Framer Motion, direction mirrors are well-documented]
'use client'
import { motion } from 'motion/react'
import { useReducedMotion } from 'motion/react'

export function ClientSplit() {
  const shouldReduce = useReducedMotion()
  const offset = shouldReduce ? 0 : 80

  return (
    <div className="grid md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -offset }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Privat */}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: offset }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Erhverv */}
      </motion.div>
    </div>
  )
}
```

### Pattern 5: B&W to Colour Hover (TEAM-02)

**What:** Portrait default is greyscale; on hover transitions to full colour (300ms)
**When to use:** Team cards on desktop
**Why CSS not JS:** Pure CSS filter transitions run on compositor, zero JS involved. No Framer Motion needed.

```tsx
// [CITED: CLAUDE.md animation rules]
// The img element inside Next.js <Image> receives the className:
<div className="relative overflow-hidden rounded-lg">
  <Image
    src={member.portrait}
    alt={member.name}
    fill
    className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
  />
</div>
// Parent card div must have className="group" for the group-hover to work
```

**Tailwind v4 note:** `grayscale` and `grayscale-0` are standard Tailwind utilities. `transition-[filter]` uses the arbitrary transition-property syntax. Alternatively use `transition` (which includes `filter` by default in Tailwind) with `duration-300`.

**Gotcha with next/image and CSS filters:** Next.js `<Image>` renders an `<img>` tag — CSS `filter` applies to `<img>` directly. This works correctly. The `group-hover:grayscale-0` utility toggles `filter: grayscale(0%)`. No special handling needed.

### Pattern 6: useReducedMotion Universal Guard (ANIM-07)

**What:** One hook call at the section level collapses all animation durations to 0 when OS reduced motion is enabled
**When to use:** Every animated client component in Phase 2

```tsx
// [CITED: motion.dev/docs/react-use-reduced-motion]
// Import from "motion/react" (the v12 package name — NOT "framer-motion")
import { useReducedMotion } from 'motion/react'

export function AnimatedSection() {
  const shouldReduce = useReducedMotion()

  // Pattern: collapse duration, collapse offset
  const dur = (n: number) => shouldReduce ? 0 : n
  const offset = (n: number) => shouldReduce ? 0 : n
  ...
}
```

**Important:** In Framer Motion v12, the package is `"motion/react"` (not `"framer-motion"`). Both names resolve because `framer-motion` re-exports from `motion/react`, but using `"motion/react"` directly is the v12 canonical import. `useReducedMotion` returns `true` (reduced motion preferred), `false` (no preference), or `null` (SSR). Treat `null` as `false` (animations enabled by default until client hydrates — consistent with pattern established in Phase 1 Navbar). [CITED: motion.dev/docs/react-use-reduced-motion]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll detection | `useEffect` + `IntersectionObserver` | Framer Motion `whileInView` | Already handles threshold, once, root container |
| Stagger delays | Manual `i * 0.12` delay on each item | `staggerChildren` in variants | Declarative, re-orders automatically when list changes |
| Reduced motion | `window.matchMedia('prefers-reduced-motion')` listener | `useReducedMotion()` | SSR-safe, reactive to OS changes, already tested |
| Ken Burns in JS | Framer Motion `animate` with scale/translate keyframes | CSS `@keyframes` | CSS runs on compositor thread; JS animate would cause layout recalculation on every frame |
| B&W filter toggle | JS `onMouseEnter`/`onMouseLeave` setState | Tailwind `group-hover:grayscale-0` | Zero JS, runs on compositor |

---

## Common Pitfalls

### Pitfall 1: Ken Burns bleeding outside hero
**What goes wrong:** Scaled image extends beyond the section boundary, visible on other sections
**Why it happens:** `overflow: hidden` not set on the image's parent container
**How to avoid:** The `relative overflow-hidden` container wrapping `<Image fill>` must have `overflow-hidden`. The outermost `<section>` also needs `overflow-hidden`.
**Warning signs:** White/image edges visible above the navigation bar or below the hero boundary

### Pitfall 2: `<Image fill>` parent missing `position: relative`
**What goes wrong:** Build warning "Image with src X has "fill" but is missing ... position 'relative'"  — image renders at 0×0 or in wrong position
**Why it happens:** Next.js `fill` sets `position: absolute` on `<img>`. Absolute positioning requires a positioned ancestor.
**How to avoid:** Always wrap `<Image fill>` in a `<div className="relative ...">` (or `absolute`, `fixed`). [CITED: nextjs.org/docs/app/api-reference/components/image]

### Pitfall 3: Framer Motion import from wrong package
**What goes wrong:** `import { motion } from 'framer-motion'` vs `import { motion } from 'motion/react'` — both work, but `useReducedMotion` from `framer-motion` may behave differently in v12
**Why it happens:** The library renamed its main entry from `framer-motion` to `motion/react` in v11+
**How to avoid:** Use `import { motion, useReducedMotion, stagger } from 'motion/react'` consistently throughout Phase 2

### Pitfall 4: `whileInView` firing on every scroll (up and down)
**What goes wrong:** Cards re-animate every time the user scrolls past the section
**Why it happens:** `viewport={{ once: false }}` (the default) — animation re-triggers on every enter
**How to avoid:** Always use `viewport={{ once: true }}` for reveal animations. Only omit `once` for interactive feedback (e.g., a progress indicator).

### Pitfall 5: `group-hover` not working on team cards
**What goes wrong:** `group-hover:grayscale-0` has no effect
**Why it happens:** The parent element doesn't have the `group` class, or the `group` is on a non-ancestor element
**How to avoid:** The outermost wrapping `<div>` of `TeamCard` must have `className="group ..."`. The `<Image>` with `group-hover:grayscale-0` must be a descendant of that element.

### Pitfall 6: Hero `<Image priority>` vs lazy loading
**What goes wrong:** Hero image loads lazily, causing layout shift and poor LCP
**Why it happens:** Forgetting `priority` prop on the LCP image
**How to avoid:** The hero `<Image>` always gets `priority` prop. All below-fold images omit it (lazy by default). [CITED: nextjs.org/docs/app/api-reference/components/image]

### Pitfall 7: Loa Nedergaard Olsen filename double-dot
**What goes wrong:** `<Image src="/images/team/loa-nedergaard-olsen..png">` — note the double dot
**Why it happens:** The file was saved with a double dot in its name
**How to avoid:** The image path in code must be exactly `/images/team/loa-nedergaard-olsen..png` (with double dot). Do not "fix" the filename in code — it will 404. The actual file on disk has this name.

---

## Code Examples

### Section Heading Slide-Up (ANIM-04)
```tsx
// Source: motion.dev/docs/react-scroll-animations [CITED]
import { motion } from 'motion/react'
import { useReducedMotion } from 'motion/react'

function SectionHeading({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.h2
      className="font-heading text-navy text-4xl"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.8 }}
    >
      {children}
    </motion.h2>
  )
}
```

### Team Card with Group Hover
```tsx
// Source: Tailwind CSS docs + Next.js Image docs [CITED]
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative rounded-lg overflow-hidden shadow-md hover:-translate-y-2 transition-transform duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={member.portrait}
          alt={member.name}
          fill
          className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-heading text-navy text-lg">{member.name}</h3>
        <p className="text-sm text-text/70">{member.title}</p>
        <a href={`tel:${member.phone}`} className="text-amber text-sm mt-1 block">
          {member.phone}
        </a>
      </div>
    </div>
  )
}
```

---

## Team Data

The following team members are confirmed by available portrait files:

| Name | Portrait File | Notes |
|------|---------------|-------|
| Martin Plum Juul | `/images/team/martin-plum-juul.png` | Partner |
| Loa Nedergaard Olsen | `/images/team/loa-nedergaard-olsen..png` | Partner — double dot in filename |
| Jeanie Dam Meldgaard | `/images/team/jeanie-dam-meldgaard.png` | |
| Tina Riis Thygesen | `/images/team/tina-riis-thygesen.jpg` | |
| Line Lauridsen | `/images/team/line-lauridsen.jpg` | |

Hero images available: `team-hero.png`, `team-hero2.png`, `martinogloa.jpg`
Building images: `exterior-front.png`, `exterior-front-greyscale.png`
Logo: `/images/brand/logo.png`

**Title/practice area data for team cards:** Not available in project files. The planner must flag this as content that needs to be provided or assumed before team cards can render with real data.

---

## huashu-design Skill Invocation Pattern

The CLAUDE.md marks `huashu-design` as the primary design skill — "invoke this for every UI component and page section, without exception."

Reading the SKILL.md reveals that `huashu-design` is designed for **HTML prototype/demo output** (slides, interactive demos, animations), not for production Next.js component code. The SKILL.md explicitly states: "Not suitable for: production-grade Web App, SEO website, system requiring backend — use frontend-design skill for these."

**Resolution for plan tasks:** Each plan task should instruct the executor to:
1. Read the project's existing brand context (CLAUDE.md + globals.css) as the "design system" input for huashu-design — satisfying the skill's requirement to "start from existing context."
2. Apply huashu-design's anti-slop principles and design taste standards when making visual decisions within the Next.js component code.
3. The skill is used as a **design taste advisor**, not as a code generator outputting HTML prototypes.

**Practical instruction for plan tasks:**
> "Before building this section, invoke `huashu-design` skill. Use the existing brand tokens (navy #1A2B45, amber #C4973A, off-white #F7F4EF, Playfair Display + Inter) as the design context. Apply huashu-design's anti-slop principles: no decorative icons, no filler, no gradient abuse. Each section component should have one deliberate visual decision done at 120%."

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm run dev | ✓ | (project running) | — |
| framer-motion | All animations | ✓ | ^12.38.0 (package.json) | — |
| next/image | Hero + portraits | ✓ | 16.2.4 (next) | — |
| tailwindcss v4 | All styling | ✓ | ^4 | — |
| Portrait images | Team section | ✓ | Files confirmed in brief | — |
| Team content data | Team cards | UNKNOWN | Not in project files | Use placeholder content with TODO comments |

**Missing with no fallback:** None — all tools available.
**Missing with fallback:** Team member titles/practice areas — use placeholder text marked with TODO for Phase 4 content pass.

---

## Validation Architecture

No automated test framework is configured in this project (no `jest.config.*`, `vitest.config.*`, `playwright.config.*` detected). Phase 2 validation is manual, via browser inspection.

### Phase Gate Checklist (manual)
| Req ID | Behavior | Validated By |
|--------|----------|-------------|
| HOME-01 + ANIM-01 | Hero fills viewport; Ken Burns loop visible | Visual inspect — `npm run dev` |
| ANIM-02 | Headline fades up; subtitle 300ms later | Visual inspect, DevTools timeline |
| HOME-02 + ANIM-03 | Trust bar items stagger on scroll | Scroll test in browser |
| HOME-04 + TEAM-02 + ANIM-05 | Team cards stagger; hover lifts + colour | Hover each card on desktop |
| HOME-05 + ANIM-06 | Client split slides from opposite sides | Scroll test |
| ANIM-07 | All animation disabled with reduced motion | DevTools: Rendering → Emulate `prefers-reduced-motion: reduce` |
| Responsive | 375px mobile + 1440px desktop | DevTools device toolbar |

---

## Security Domain

Phase 2 is static frontend with no forms, API calls, or user input. No ASVS categories apply.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Team member titles and practice areas are not yet available in the codebase | Team Data | Low — placeholder text strategy is robust |
| A2 | `framer-motion` and `motion/react` resolve to identical exports in v12 | Pattern 6 | Low — both package entry points are officially equivalent |
| A3 | The `loa-nedergaard-olsen..png` double-dot filename will serve correctly from Next.js static `/public` folder | Team Data | Medium — Windows FS allows it, Vercel Linux FS confirmed by Phase 1 SUMMARY note about case-sensitive paths |

---

## Open Questions

1. **Team member content (titles, practice areas)**
   - What we know: Portrait files exist for 5 team members
   - What's unclear: Danish titles, which practice areas each handles, phone numbers
   - Recommendation: Plan tasks should use placeholder Danish text with TODO comments; real content pass in Phase 4

2. **Which hero image to use: `team-hero.png` or `team-hero2.png`?**
   - What we know: Both exist; `team-hero.png` described as "full team, no background"
   - What's unclear: Which has better composition for a dark-overlay hero
   - Recommendation: Plan task should implement with `team-hero.png` as primary; leave a code comment noting `team-hero2.png` as alternative

3. **Trust bar content**
   - What we know: 4 trust signals needed (HOME-02)
   - What's unclear: The actual Danish copy for each signal (e.g., "Siden 1964", "Gratis første konsultation", etc.)
   - Recommendation: Use realistic Danish placeholder content matching law firm conventions; flag for client review

---

## Sources

### Primary (HIGH confidence)
- `motion.dev/docs/react-scroll-animations` — whileInView vs useInView, viewport.once
- `motion.dev/docs/react-use-reduced-motion` — hook API, v12 import path
- `motion.dev/docs/react-animation#variants` — staggerChildren, delayChildren, stagger() utility
- `nextjs.org/docs/app/api-reference/components/image` — fill prop, parent positioning requirements, priority
- Project `package.json` — confirmed framer-motion ^12.38.0 installed
- Phase 1 SUMMARY files — confirmed patterns: `useReducedMotion`, `useScroll`, named exports, client component boundary at component level

### Secondary (MEDIUM confidence)
- CLAUDE.md animation rules table — confirmed all 7 animation specs and durations
- Phase 1 SUMMARY (01-02) — established pattern: `shouldReduceMotion ? 0 : N` for durations

### Tertiary (LOW confidence)
- None — all critical claims verified via official docs or project files

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed via package.json; no new dependencies required
- Animation patterns: HIGH — verified against motion.dev official docs
- Next.js Image: HIGH — verified against nextjs.org official docs (v16)
- Pitfalls: HIGH — derived from official API constraints, not guesswork
- Team content data: LOW — file existence confirmed; actual content unknown

**Research date:** 2026-04-26
**Valid until:** 2026-05-26 (Framer Motion and Next.js APIs are stable; 30-day window)
