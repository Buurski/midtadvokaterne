# Roadmap — MidtAdvokaterne Website

**4 phases** | **32 requirements mapped** | All v1 requirements covered ✓

| # | Phase | Goal | Requirements | Success Criteria |
|---|---|---|---|---|
| 1 | Foundation | Working Next.js app with brand system, nav, footer | NAV-01, NAV-02, HOME-08, PERF-03, PERF-05 | Dev server runs; nav visible; footer renders; brand tokens applied |
| 2 | Homepage | Complete homepage with all 8 sections and animations | HOME-01–07, TEAM-01–02, ANIM-01–07 | Full homepage scrolls beautifully; all animations work; team cards hover correctly |
| 3 | Inner Pages | Retsområder, Om Os, Kontakt fully implemented | PAGES-02–04, AREA-01–02, HIST-01–02, CONT-01–05 | All 3 inner pages complete; form submits; map embeds; open indicator works |
| 4 | Polish & Launch | SEO, performance, legal compliance, Vercel deploy | PERF-01–02, PERF-04, SEO-01–03 | Lighthouse ≥90; sitemap exists; cookie banner shows; live on Vercel |

---

## Phase Details

### Phase 1: Foundation
**Goal:** Working Next.js project with brand design system, responsive navigation, and footer — the skeleton every other page builds on.

**Requirements:** NAV-01, NAV-02, HOME-08, PERF-03, PERF-05

**Success criteria:**
1. `npm run dev` runs without errors
2. Navigation bar renders with correct brand colours and transitions transparent → solid on scroll
3. Mobile hamburger menu opens/closes
4. Footer renders with 3 columns (address, nav, hours)
5. Tailwind brand tokens (navy, amber, off-white) applied globally
6. Playfair Display + Inter fonts load correctly

---

### Phase 2: Homepage
**Goal:** Complete, animated homepage that earns trust and converts visitors to enquiries.

**Requirements:** HOME-01–07, TEAM-01–02, ANIM-01–07

**Success criteria:**
1. Hero section fills viewport with Ken Burns animation running (12–15s loop)
2. Hero headline fades up on load; subtitle appears 300ms later
3. Trust bar items stagger in on scroll
4. Team section reveals cards with stagger; hover lifts card and switches B&W → colour
5. Client split cards slide in from opposite sides
6. All animations disabled cleanly when `prefers-reduced-motion` is set
7. Page renders correctly on mobile (375px) and desktop (1440px)

---

### Phase 3: Inner Pages
**Goal:** All inner pages fully functional — practice areas, firm history, and contact.

**Requirements:** PAGES-02–04, AREA-01–02, HIST-01–02, CONT-01–05

**Success criteria:**
1. Retsområder page lists all 8 practice areas with descriptions, partner attribution, and CTAs
2. Om Os page tells firm history in 4 chapters with values grid at bottom
3. Contact form renders with all fields including GDPR checkbox
4. Google Maps embed shows Sieferts Plads 5 correctly
5. Open/closed indicator shows correct state based on current time
6. Phone numbers are `tel:` links and trigger dialler on mobile

---

### Phase 4: Polish & Launch
**Goal:** Production-ready — fast, indexed, legally compliant, deployed.

**Requirements:** PERF-01–02, PERF-04, SEO-01–03

**Success criteria:**
1. All images converted to WebP and lazy-loaded
2. Lighthouse Performance score ≥ 90 on mobile
3. `sitemap.xml` accessible at `/sitemap.xml`
4. `robots.txt` accessible at `/robots.txt`
5. Cookie consent banner appears on first visit
6. Privacy policy page exists and is linked in footer
7. Site live on Vercel with custom domain (or vercel.app URL at minimum)
8. Each page has unique Danish meta title + description

---

*Roadmap created: April 2026*
