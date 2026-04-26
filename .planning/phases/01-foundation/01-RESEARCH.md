# Phase 1: Foundation - Research

**Researched:** 2026-04-26
**Domain:** Next.js App Router, Tailwind CSS v4, Framer Motion, Google Fonts
**Confidence:** HIGH

---

## Summary

Phase 1 establishes the structural skeleton for the MidtAdvokaterne site: brand tokens, typography, a scroll-aware navbar, and a 3-column footer. The project already has a working Next.js 16.2.4 scaffold with Tailwind CSS v4 (via `@tailwindcss/postcss`) and Framer Motion 12 installed. The current `globals.css` and `layout.tsx` use Geist fonts and placeholder tokens — both must be replaced.

Tailwind v4 is a significant departure from v3: there is no `tailwind.config.js` for theme extension. All brand tokens (colors, fonts) are declared in `globals.css` using the `@theme` directive with CSS custom properties. This is the most critical difference from the project description's "extend" mental model.

The `framer-motion` package (v12) has been renamed to `motion` internally but the package name `framer-motion` still works. Imports should use `"framer-motion"` as that is what is installed. The scroll-aware navbar uses `useScroll` + `useMotionValueEvent` from Framer Motion — these require `"use client"` in App Router.

**Primary recommendation:** Replace `globals.css` with brand tokens via `@theme`, update `layout.tsx` with Playfair Display + Inter from `next/font/google`, build a `"use client"` Navbar component with Framer Motion scroll detection, and a static 3-column Footer.

---

## Project Constraints (from CLAUDE.md)

- Primary language: **Danish** for all user-facing content
- Do not introduce backend logic without discussion
- Ask before any paid API calls
- **Primary design skill: `huashu-design`** — invoke for every UI component and page section, without exception
- All animations must respect `prefers-reduced-motion` (content appears instantly if enabled)
- Nav animation: transparent → solid on scroll, 300ms duration

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Brand tokens (colors, fonts) | Frontend (CSS) | — | CSS custom properties in globals.css via @theme |
| Navigation scroll detection | Browser / Client | — | Requires window scroll events; must be "use client" |
| Navbar rendering | Frontend Server (SSR) | Client (scroll logic) | Shell renders server-side; scroll state is client |
| Footer rendering | Frontend Server (SSR) | — | Pure static markup, no interactivity |
| Font loading | Frontend Server (SSR) | — | next/font loads at build time, inlines CSS |
| Root layout wiring | Frontend Server (SSR) | — | app/layout.tsx is a server component |

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Navbar transparent over hero, transitions to solid navy/white on scroll past hero (300ms) | useScroll + useMotionValueEvent pattern; CSS transition 300ms |
| NAV-02 | Mobile hamburger menu | useState toggle; Framer Motion AnimatePresence for menu open/close |
| HOME-08 | Footer — 3 columns (address/CVR, nav links, hours/contact), copyright + privacy link | CSS Grid / Flexbox responsive pattern |
| PERF-03 | HTTPS enforced | Vercel default — no code required |
| PERF-05 | Clean URL structure (no .aspx, no trailing IDs) | Next.js App Router folder-based routing — satisfied by default |
</phase_requirements>

---

## Standard Stack

### Core (already installed — verified from package.json)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.4 | App Router framework | Project requirement |
| react | 19.2.4 | UI rendering | Bundled with Next.js |
| framer-motion | ^12.38.0 | Scroll detection + animations | Project requirement |
| tailwindcss | ^4 | Utility CSS | Project requirement |
| @tailwindcss/postcss | ^4 | PostCSS integration for Tailwind v4 | Required by Tailwind v4 |
| typescript | ^5 | Type safety | Project requirement |

[VERIFIED: package.json in project root]

**No additional packages need to be installed for Phase 1.**

---

## Architecture Patterns

### System Architecture Diagram

```
Browser Request
      |
      v
app/layout.tsx (Server Component)
  ├── next/font/google → Playfair Display + Inter CSS injected at build time
  ├── globals.css → @theme tokens (navy, amber, off-white) → Tailwind utilities
  ├── <Navbar /> ──→ "use client" component
  │     ├── useScroll() → scrollY motion value
  │     ├── useMotionValueEvent → scrolled: boolean state
  │     └── Renders: logo | nav links | hamburger (mobile)
  ├── {children} (page content)
  └── <Footer /> (Server Component — static)
        └── 3-column grid: address | nav | hours
```

### Recommended Project Structure
```
app/
  layout.tsx          # Root layout — fonts, Navbar, Footer
  page.tsx            # Homepage placeholder (currently exists)
  globals.css         # @import tailwindcss + @theme brand tokens
components/
  nav/
    Navbar.tsx        # "use client" scroll-aware navbar
    MobileMenu.tsx    # "use client" hamburger drawer
  footer/
    Footer.tsx        # Server component, 3 columns
```

### Pattern 1: Tailwind v4 Brand Tokens via @theme

**What:** Define all brand colors and fonts as CSS custom properties inside `@theme {}` in `globals.css`. Tailwind v4 reads these at build time and generates utility classes (e.g., `bg-navy`, `text-amber`, `font-heading`).

**When to use:** Any time a brand color or font needs to be available as a Tailwind utility class.

**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme (verified 2026-04-26) */
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-navy: #1A2B45;
  --color-amber: #C4973A;
  --color-off-white: #F7F4EF;
  --color-text: #1C1C1C;

  /* Wipe default palette (optional — keeps utilities focused) */
  /* --color-*: initial; */  /* Uncomment only if default colors are unwanted */

  /* Fonts — CSS var name becomes Tailwind class: font-heading, font-body */
  --font-heading: var(--font-playfair), "Playfair Display", Georgia, serif;
  --font-body: var(--font-inter), "Inter", system-ui, sans-serif;
}
```

[VERIFIED: tailwindcss.com/docs/theme, 2026-04-26]

### Pattern 2: Google Fonts via next/font in App Router

**What:** Import fonts from `next/font/google` in `app/layout.tsx`. They self-host automatically — no external font requests at runtime.

**When to use:** Any time Google Fonts are required in Next.js App Router.

**Example:**
```tsx
// Source: node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md (verified)
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair', // exposes as CSS var for @theme
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-off-white text-text">
        {children}
      </body>
    </html>
  )
}
```

[VERIFIED: Next.js 16 bundled docs, 2026-04-26]

**Key detail:** Use `variable` (not `className`) to expose font as a CSS custom property. The `@theme` entry then references `var(--font-playfair)` so Tailwind utilities (`font-heading`) resolve correctly.

### Pattern 3: Scroll-Aware Navbar (transparent → solid)

**What:** Client component that listens to `scrollY` via Framer Motion's `useScroll`. When scroll > threshold (e.g., 80px), switches CSS classes from transparent to solid navy.

**When to use:** Navbar that overlays a hero section and becomes opaque on scroll.

**Example:**
```tsx
// Source: motion.dev/motion/use-scroll (verified 2026-04-26)
'use client'

import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-navy text-white shadow-md'
          : 'bg-transparent text-white'
        }
      `}
    >
      {/* logo + nav links + mobile hamburger */}
    </header>
  )
}
```

[VERIFIED: motion.dev/motion/use-scroll, 2026-04-26]

**Critical:** `useScroll` and `useMotionValueEvent` require `'use client'` directive — they use browser APIs.

### Pattern 4: Mobile Hamburger Menu

**What:** A boolean `isOpen` state toggles a mobile drawer. Framer Motion `AnimatePresence` + `motion.div` animate the enter/exit.

**Example:**
```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

// Inside Navbar:
const [isOpen, setIsOpen] = useState(false)

// Hamburger button:
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-label={isOpen ? 'Luk menu' : 'Åbn menu'}
  className="md:hidden"
>
  {/* icon */}
</button>

// Mobile drawer:
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-navy px-6 py-8 md:hidden"
    >
      {/* nav links stacked vertically */}
    </motion.div>
  )}
</AnimatePresence>
```

[ASSUMED — pattern based on Framer Motion API; AnimatePresence is stable and well-documented]

**prefers-reduced-motion:** Wrap all Framer Motion transitions:
```tsx
// Respect motion preference globally
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()
const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }
```

### Pattern 5: Responsive 3-Column Footer

**What:** CSS Grid footer that collapses to single column on mobile.

**Example:**
```tsx
// Static server component
export function Footer() {
  return (
    <footer className="bg-navy text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Address / CVR */}
        <div>
          <p className="font-heading text-lg mb-2">MidtAdvokaterne A/S</p>
          <address className="not-italic text-sm leading-relaxed opacity-80">
            Sieferts Plads 5<br />
            7430 Ikast<br />
            CVR: XXXXXXXX
          </address>
        </div>

        {/* Column 2: Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-amber transition-colors">Forside</a></li>
            <li><a href="/retsomraader" className="hover:text-amber transition-colors">Retsområder</a></li>
            <li><a href="/om-os" className="hover:text-amber transition-colors">Om Os</a></li>
            <li><a href="/kontakt" className="hover:text-amber transition-colors">Kontakt</a></li>
            <li><a href="/privatlivspolitik" className="hover:text-amber transition-colors">Privatlivspolitik</a></li>
          </ul>
        </nav>

        {/* Column 3: Hours / Contact */}
        <div className="text-sm">
          <p className="font-heading text-base mb-2">Åbningstider</p>
          <p className="opacity-80">Man–tor: 8:00–16:30</p>
          <p className="opacity-80">Fre: 8:00–15:00</p>
          <a href="tel:+4587000000" className="block mt-4 text-amber font-semibold">
            +45 87 00 00 00
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex justify-between">
        <span>© {new Date().getFullYear()} MidtAdvokaterne A/S</span>
        <a href="/privatlivspolitik" className="hover:text-white/80 transition-colors">Privatlivspolitik</a>
      </div>
    </footer>
  )
}
```

[ASSUMED — standard Tailwind responsive grid pattern]

### Anti-Patterns to Avoid

- **Using tailwind.config.js for brand tokens:** In Tailwind v4, `extend.colors` in config is NOT the right place. Use `@theme` in CSS. [VERIFIED: tailwindcss.com/docs/theme]
- **Importing framer-motion in Server Components:** Anything that uses `useScroll`, `motion.*`, `AnimatePresence` MUST have `'use client'` — it will error otherwise.
- **Using className (not variable) for multi-font layout:** If two fonts are needed (`font-heading` and `font-body`), both must be loaded with `variable:` option in layout.tsx and then referenced via `@theme`. Using `className` only applies the font to the `<html>` element.
- **Forgetting `lang="da"`:** The root `<html>` must have `lang="da"` per the Danish content requirement.
- **Geist fonts leftover:** The scaffolded `layout.tsx` imports Geist fonts. These must be removed completely — they create unused CSS variables and font downloads.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading / FOUT prevention | Manual `<link>` tags to Google Fonts | `next/font/google` | Self-hosts, eliminates layout shift, automatic subset optimisation |
| Scroll position tracking | `window.addEventListener('scroll', ...)` + manual cleanup | `useScroll` + `useMotionValueEvent` from framer-motion | Correct cleanup, motion value avoids re-render on every frame |
| CSS animation for nav transition | Custom keyframe animations | Tailwind `transition-all duration-300` + conditional classes | Simpler, consistent with design system |

---

## Common Pitfalls

### Pitfall 1: Tailwind v4 Token Naming and Colons
**What goes wrong:** Developer writes `--color-navy-500` expecting Tailwind to generate `bg-navy-500`, but forgets the token must be spelled exactly the way the utility class is wanted.
**Why it happens:** Tailwind v4 maps `--color-{name}` → `bg-{name}`. If you use `--color-brand-navy` the class becomes `bg-brand-navy`. Simple tokens like `--color-navy` → `bg-navy` work cleanly.
**How to avoid:** Keep token names short: `--color-navy`, `--color-amber`, `--color-off-white`. Verify utilities by running `npm run dev` and checking classes work in the browser.

### Pitfall 2: Framer Motion Server Component Error
**What goes wrong:** `Error: You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client"`
**Why it happens:** `useScroll`, `motion.div`, `AnimatePresence` are all browser APIs. App Router defaults to server components.
**How to avoid:** Add `'use client'` as the very first line of any component that imports from `framer-motion`.
**Warning signs:** Build error mentioning `useState` or `useEffect` inside a server component.

### Pitfall 3: Font Variable Not Reaching @theme
**What goes wrong:** `font-heading` class has no effect; browser shows fallback serif.
**Why it happens:** The font was loaded with `className` instead of `variable`, so the CSS custom property (`--font-playfair`) is never injected into `<html>`. The `@theme` reference `var(--font-playfair)` resolves to empty.
**How to avoid:** Use `variable: '--font-playfair'` in the `next/font/google` call; apply `playfair.variable` to the `<html>` className.

### Pitfall 4: Next.js Version Discrepancy
**What goes wrong:** Documentation examples (and the brief) reference Next.js 15, but the installed version is **16.2.4**.
**Why it happens:** The `package.json` shows `"next": "16.2.4"` — this is ahead of typical documentation.
**How to avoid:** Read bundled docs in `node_modules/next/dist/docs/` rather than assuming online docs match the installed version. The AGENTS.md also warns: "Read the relevant guide in `node_modules/next/dist/docs/` before writing any code."

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js / npm | All | ✓ | (inferred from package-lock.json present) | — |
| next | App framework | ✓ | 16.2.4 | — |
| framer-motion | Scroll navbar, animations | ✓ | ^12.38.0 | — |
| tailwindcss | Styling | ✓ | ^4 | — |
| @tailwindcss/postcss | Tailwind v4 PostCSS pipeline | ✓ | ^4 | — |
| Vercel | Deployment (PERF-03 HTTPS) | — | — | Local dev unaffected; deploy later |

[VERIFIED: package.json]

---

## huashu-design Skill — How to Invoke

The `huashu-design` skill lives at `C:/Users/Buur/.claude/skills/huashu-design/`. It is scoped to **HTML-based visual prototyping** (hi-fi mockups, design variants, interactive demos, animations). It is NOT a production web code skill — it is for design output.

**Per CLAUDE.md:** "invoke this for every UI component or page section, without exception."

**How plan tasks should instruct executors:**
> Before implementing this component, invoke the `huashu-design` skill to produce a hi-fi HTML prototype of the design. Review the prototype output for visual quality and correctness, then implement the approved design in the Next.js component.

The skill's core workflow:
1. Start from existing context (brand tokens, screenshots, Figma links) — do NOT design from scratch
2. Produce HTML prototype using React + Babel (the skill's output medium)
3. Apply 5-dimension expert review: philosophy consistency / visual hierarchy / detail execution / functionality / innovation
4. Iterate before handing to production implementation

**Trigger words from SKILL.md:** "做原型", "prototype", "hi-fi设计", "UI mockup", "做个好看的", "做个可视化" — or simply invoking before any component build.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` extend.colors | `@theme { --color-* }` in CSS | Tailwind v4 | No JS config needed for brand tokens |
| `tailwind.config.js` extend.fontFamily | `@theme { --font-* }` in CSS | Tailwind v4 | Font utilities declared in CSS |
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | Late 2024 rebrand | Both work; project has `framer-motion` installed so use that |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Mobile hamburger menu uses `AnimatePresence` + `motion.div` | Pattern 4 | Executor may need to adjust animation approach; low risk |
| A2 | Footer column content (phone number, hours, CVR) uses placeholder values | Pattern 5 code | Real content must be supplied before launch; no build risk |
| A3 | Scroll threshold for navbar transition is 80px | Pattern 3 | May need tuning once hero height is known in Phase 2 |

---

## Open Questions

1. **Real content for footer**
   - What we know: 3 columns are defined (address, nav, hours)
   - What's unclear: Actual phone number, CVR number, full address, opening hours
   - Recommendation: Use placeholder values for Phase 1; mark with `{/* TODO: real content */}` comments

2. **Navbar logo asset**
   - What we know: Company is MidtAdvokaterne, brand uses navy + amber
   - What's unclear: Is there a logo SVG/image file, or should Phase 1 use a text wordmark?
   - Recommendation: Use text wordmark in Playfair Display for Phase 1; replace with asset in Phase 2

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no test config files found |
| Config file | None — no Wave 0 test setup required for this phase |
| Quick run command | `npm run build` (type-check + build verification) |
| Full suite command | `npm run lint && npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Navbar renders + scroll transition works | Manual / smoke | `npm run dev` + visual check | ❌ |
| NAV-02 | Hamburger opens/closes on mobile | Manual | Dev tools mobile viewport | ❌ |
| HOME-08 | Footer renders 3 columns | Manual / smoke | `npm run build` (no TS errors) | ❌ |
| PERF-03 | HTTPS enforced | Manual | Deploy to Vercel | N/A (Vercel default) |
| PERF-05 | Clean URL structure | Smoke | `npm run build` + verify routes | ❌ |

This is a UI/visual phase — automated unit tests are not the primary verification mechanism. The success criteria are best verified by running `npm run dev` and visually confirming each criterion.

### Wave 0 Gaps
- [ ] No test framework installed — acceptable for Phase 1 (visual phase)
- [ ] TypeScript compilation via `npm run build` acts as the type-level gate

---

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` — next/font/google API, variable fonts pattern
- `https://tailwindcss.com/docs/theme` — @theme directive, --color-* and --font-* namespaces [fetched 2026-04-26]
- `package.json` in project root — installed versions
- `app/globals.css` — existing Tailwind v4 setup (@import "tailwindcss", @theme inline)

### Secondary (MEDIUM confidence)
- `https://motion.dev/motion/use-scroll/` — useScroll + useMotionValueEvent API [fetched 2026-04-26]
- `C:/Users/Buur/.claude/skills/huashu-design/SKILL.md` — skill invocation protocol

### Tertiary (LOW confidence)
- WebSearch: Framer Motion navbar patterns in Next.js App Router — confirms `'use client'` requirement and useScroll approach

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified from package.json
- Tailwind v4 token approach: HIGH — verified from official tailwindcss.com/docs
- Next.js font setup: HIGH — verified from bundled Next.js docs
- Framer Motion scroll pattern: HIGH — verified from motion.dev
- Footer / hamburger implementation: MEDIUM — standard patterns, not gotcha-prone
- huashu-design skill invocation: HIGH — read SKILL.md directly

**Research date:** 2026-04-26
**Valid until:** 2026-05-26 (stable stack — no fast-moving parts)
