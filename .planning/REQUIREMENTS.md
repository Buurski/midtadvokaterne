# Requirements — MidtAdvokaterne Website

## v1 Requirements

### Pages
- [ ] **PAGES-01**: User can navigate to Forside (`/`)
- [ ] **PAGES-02**: User can navigate to Retsområder (`/retsomraader`)
- [ ] **PAGES-03**: User can navigate to Om Os (`/om-os`)
- [ ] **PAGES-04**: User can navigate to Kontakt (`/kontakt`)

### Homepage Sections
- [ ] **HOME-01**: Hero section — full-viewport, Ken Burns image animation, headline fade-up, two CTA buttons, scroll indicator
- [ ] **HOME-02**: Trust bar — 4 trust signals with staggered fade-in on scroll enter
- [ ] **HOME-03**: Tagline section — large centred serif quote, body text, generous white space
- [ ] **HOME-04**: Team section — partner cards (large) + staff cards (grid), staggered scroll-reveal
- [ ] **HOME-05**: Client split — Privat / Erhverv two-column section, slide-in from opposite sides
- [ ] **HOME-06**: Quote / testimonial — full-width, centred, no animation (intentionally still)
- [ ] **HOME-07**: CTA strip — large phone number (click-to-call), contact button
- [ ] **HOME-08**: Footer — 3 columns (address/CVR, nav links, hours/contact), copyright + privacy link

### Team
- [ ] **TEAM-01**: Each team card shows portrait (B&W default), name (serif), title, practice areas, phone (clickable)
- [ ] **TEAM-02**: Desktop hover on team card: lift translateY(-8px) + B&W → colour photo transition (300ms)

### Navigation
- [ ] **NAV-01**: Navbar transparent over hero, transitions to solid navy/white on scroll past hero (300ms)
- [ ] **NAV-02**: Mobile hamburger menu

### Animations
- [ ] **ANIM-01**: Ken Burns effect on hero image — 12–15s slow zoom/pan loop
- [ ] **ANIM-02**: Hero headline fade-up on load (800ms), subtitle 300ms later
- [ ] **ANIM-03**: Trust bar items staggered fade-in left to right (150ms delay each)
- [ ] **ANIM-04**: Section headings slide up on scroll enter (500ms)
- [ ] **ANIM-05**: Team cards staggered slide-up + fade left to right (120ms stagger)
- [ ] **ANIM-06**: Client split cards slide in from opposite sides (600ms)
- [ ] **ANIM-07**: All animations respect `prefers-reduced-motion` — content appears instantly if enabled

### Practice Areas Page
- [ ] **AREA-01**: Each of the 8 practice areas has its own section with icon, plain-language description (2–3 paragraphs), responsible partner name + photo, CTA
- [ ] **AREA-02**: Clean dividers, generous white space between sections

### About & History Page
- [ ] **HIST-01**: Four narrative chapters (1964, 1981, Growth, Today)
- [ ] **HIST-02**: Values grid at bottom (Nærhed, Erfaring, Ærlighed, Engagement)

### Contact Page
- [ ] **CONT-01**: Contact form — name, phone, email, subject dropdown, message, GDPR checkbox, submit button
- [ ] **CONT-02**: Submit button has loading state animation on click
- [ ] **CONT-03**: Google Maps embed showing Sieferts Plads 5, 7430 Ikast
- [ ] **CONT-04**: Visual open/closed indicator (green/red dot) based on current time vs. opening hours
- [ ] **CONT-05**: Phone number large, click-to-call (`tel:` link)

### Performance & Technical
- [ ] **PERF-01**: All images served as WebP, lazy-loaded below the fold
- [ ] **PERF-02**: Page load under 3 seconds on mobile (3G)
- [ ] **PERF-03**: HTTPS enforced (Vercel default)
- [ ] **PERF-04**: `sitemap.xml` and `robots.txt` present
- [ ] **PERF-05**: Clean URL structure — no `.aspx`, no trailing IDs

### SEO & Legal
- [ ] **SEO-01**: Unique meta title + description per page (Danish, keyword-optimised)
- [ ] **SEO-02**: Cookie consent banner (EU/Danish law)
- [ ] **SEO-03**: Privacy policy page linked in footer

---

## v2 Requirements (Deferred)

- Client testimonials with real names (pending client approval)
- Google Reviews embed / link
- Multi-language toggle (Danish/English)
- Blog or news section
- CMS for content editing

---

## Out of Scope

- Authentication / client portal — not requested
- E-commerce or payments — not a law firm product
- Job listings page — not in brief
- Live chat widget — not in brief

---

## Traceability

| Phase | Requirements Covered |
|---|---|
| Phase 1: Foundation | NAV-01, NAV-02, HOME-08, PERF-03, PERF-05 |
| Phase 2: Homepage | HOME-01–07, TEAM-01–02, ANIM-01–07 |
| Phase 3: Inner Pages | PAGES-02–04, AREA-01–02, HIST-01–02, CONT-01–05 |
| Phase 4: Polish & Launch | PERF-01–02, PERF-04, SEO-01–03 |
