# DigitalStone AI Agency Website — Design Spec

**Date:** 2026-04-23  
**Status:** Approved  
**Source:** Claude Design handoff bundle (`digitalstonelanding/`)

---

## 1. Overview

A 5-page marketing website for DigitalStone AI Agency (AI automation and consulting). Implemented as a single `index.html` SPA with vanilla JS routing — no frameworks, no build tools, GitHub Pages compatible.

**Pages:** Home · Services · Case Studies · Links · Contact

---

## 2. Architecture

### Routing
- All 5 page views are `<div data-page="home|services|work|links|contact">` blocks inside `<main>`.
- A JS router in `main.js` sets `data-active="true"` on the target page and removes it from others.
- Every route change fires a GSAP 200ms fade-out → page swap → fade-in transition.
- `window.scrollTo(0, 0)` fires on every route change (instant, not smooth).
- Active nav link tracked via `data-route` attribute on `<a>` elements.

### ScrollSmoother
- `ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.2, effects: true })` initialized in `gsap-config.js` before all other ScrollTrigger instances.
- DOM: `<div id="smooth-wrapper"><div id="smooth-content">` wraps the full `<main>`.
- `scroll-behavior: smooth` removed from CSS to avoid conflict.
- `prefers-reduced-motion` check disables ScrollSmoother and all GSAP animations when true.

### File Structure
```
index.html
404.html
assets/
  css/
    style.css         # :root variables, resets, base typography
    components.css    # Nav, Footer, buttons, cards, form fields
    sections.css      # Per-section layout (hero, stats, process, etc.)
  js/
    gsap-config.js    # Plugin registration + ScrollSmoother init
    animations.js     # All GSAP timelines and ScrollTrigger instances
    main.js           # Router, nav, FAQ accordion, contact form
  images/
    logo/
      digitalstone-logo-trans.png   # transparent bg, used as hero watermark
      digitalstone-logo.png         # solid bg version
```

---

## 3. Design System

### Colors (all in `:root`)
| Variable | Value | Usage |
|---|---|---|
| `--ds-black` | `#000000` | Hero / dark sections |
| `--ds-light-gray` | `#f5f5f7` | Info sections |
| `--ds-white` | `#ffffff` | Text on dark, cards |
| `--ds-near-black` | `#1d1d1f` | Body text on light |
| `--ds-blue` | `#0071e3` | Primary CTA, focus ring |
| `--ds-link-blue` | `#0066cc` | Inline links on light bg |
| `--ds-bright-blue` | `#2997ff` | Links on dark bg, kickers |
| `--ds-surface-1..5` | `#272729`–`#242426` | Dark section cards |
| `--ds-brand-blue-1..3` | `#1ab6ff` / `#0085ff` / `#003b73` | Logo SVG only |

### Typography
- **Display:** SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif
- **Text:** SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif
- **Serif accent:** Times New Roman, Georgia, serif — italic only, blue or muted color
- Full type scale in CSS variables per `colors_and_type.css` (hero 56px → nano 10px)

### Layout
- `--ds-content-max: 980px` for most content; nav/footer use `max-width: 1200px`
- CSS Grid for page-level sections; Flexbox for component alignment
- `rem` / `%` for spacing; `px` only for borders and shadows

---

## 4. Pages & Sections

### Home
1. **Hero** — black bg, logo watermark (opacity 0.06), radial glow, floating border boxes, eyebrow chips, 72px H1 with serif italic accent, subtitle, two CTA pills, logo/partner strip (clients + tools)
2. **About** — black bg, tag pill + large statement heading, "Learn more" CTA
3. **Stats** — black bg, 56px H2, 4-column grid: 72px stat numbers, key, descriptor
4. **Approach** — light-gray bg, H2 + "More projects" CTA, 3-column project cards (IntakeAI · RAG-Eval · BI-Agent), 4-column value prop bar
5. **Winning Deployments** — black bg, 2-col: FAQ accordion (5 items) + campaign data table (5 rows)
6. **Partner CTA** — black bg, blue-gradient panel (linear-gradient 125deg), headline + "Hire consultant" CTA
7. **Closing** — light-gray bg, 2-col: H2 left + body text right

### Services
1. **Hero** — black bg, kicker, 68px H1, subtitle
2. **Services Grid** — light-gray bg, 2-col grid of 6 service cards (num, title, body, checklist)
3. **Process** — black bg, 5-row timeline (3-col: num · title · body)
4. **Skills** — light-gray bg, 4-col grid of 8 skill category cards
5. **CTA** — black bg, centered H2 + two CTA pills

### Case Studies
1. **Hero** — black bg, kicker, 68px H1, subtitle
2. **Filters** — black bg, pill buttons for vertical filter (All / Legal / Wellness / Hospitality / Infrastructure)
3. **Case Grid** — black bg, 2-col grid of 4 case tiles (badge, title, one-liner, "Read deep dive" link)
4. **Deep Dive** — light-gray bg, tab switcher + detailed case panel (client, stack, workflow steps, 2x2 metric grid, blockquote)
5. **CTA** — black bg, centered H2 + two CTA pills

### Links
1. **Hero** — black bg, kicker, 68px H1, subtitle
2. **Link Grid** — light-gray bg, 2-col grid of 5 link sections (Find us, Writing, Talks, Tools, Reading list)
3. **CTA** — black bg, centered H2 + single CTA

### Contact
1. **Hero** — black bg, kicker, 68px H1, subtitle
2. **Content** — light-gray bg, 2-col: contact form left (name, email, company, budget, goal textarea, submit) + info cards right (email, phone, office) + "Before you write" dark card

---

## 5. GSAP Animation Plan

All animations gated behind `prefers-reduced-motion` check. ScrollSmoother initialized first.

| Element | Animation | Trigger |
|---|---|---|
| Nav bar | `y: -60, opacity: 0` → default, duration 0.6 | Page load |
| Hero H1 words | SplitText word stagger, `y: 40, opacity: 0`, stagger 0.08 | Page load |
| Hero eyebrow chips | Stagger `y: 20, opacity: 0`, stagger 0.06 | Page load, after H1 |
| Hero subtitle + CTAs | `y: 24, opacity: 0`, delayed | Page load |
| Hero glow div | ScrollSmoother data-speed="0.4" parallax | Scroll |
| Hero float boxes | data-speed="0.6", "0.75", "0.85" | Scroll |
| Logo strip items | Stagger `opacity: 0` → 1, left-to-right, 0.04s each | ScrollTrigger enter |
| Section H2s | `y: 30, opacity: 0` → default | ScrollTrigger enter |
| Stat numbers | Count-up from 0 to target value | ScrollTrigger enter |
| Project cards | Stagger `y: 40, scale: 0.97, opacity: 0`, 0.1s stagger | ScrollTrigger enter |
| Process rows | Stagger `x: -24, opacity: 0`, 0.08s stagger | ScrollTrigger enter |
| Skills tiles | Stagger `y: 20, opacity: 0`, 0.06s stagger | ScrollTrigger enter |
| Partner panel | `scale: 0.97, opacity: 0` → default | ScrollTrigger enter |
| Partner glow | data-speed="0.5" parallax | Scroll |
| Case tiles | Stagger `y: 30, opacity: 0`, 0.08s stagger | ScrollTrigger enter |
| FAQ accordion | GSAP `height` tween on open/close (no CSS transition) | Click |
| Footer | `y: 20, opacity: 0` → default, stagger cols | ScrollTrigger enter |
| Page transition | `opacity: 0` (200ms) → swap → `opacity: 1` (200ms) | Route change |
| Link rows | Stagger `x: -16, opacity: 0`, 0.05s stagger | ScrollTrigger enter |
| Info cards | Stagger `y: 20, opacity: 0`, 0.1s stagger | ScrollTrigger enter |

---

## 6. Components

### Nav
- Sticky, `position: fixed`, glassmorphism (`rgba(0,0,0,0.72)` + `backdrop-filter: saturate(180%) blur(20px)`)
- Logo: inline SVG StoneMark + "DigitalStone AI" wordmark
- Links: Home · Services · Case studies · Links · Contact (active state: opacity 1 vs 0.78)
- Right: "Start a project ›" pill outline button
- Mobile: hamburger menu (keyboard accessible, GSAP slide-down reveal)

### Footer
- Black bg, 2-col top (tagline left, 3-col link grid right), divider, bottom copyright row
- All nav links wired to router

### PillBtn
- Variants: `fill` (blue bg), `white` (white bg), `outline-dark` (white border), `outline-light` (black border)
- Border-radius: 980px

### ProjectCard
- Tones: `blue` (dark navy + blue glow), `dark` (#1d1d1f), `light` (white)
- Hover: `transform: translateY(-4px)` via GSAP (not CSS transition)

### FAQAccordion
- GSAP `height` tween, chevron rotates 180° on open
- Only one item open at a time

### CaseDeepDive
- Tab switcher (4 tabs) with GSAP crossfade between active panel
- Metric grid: 2×2, large number + label

### ContactForm
- Action: `https://formspree.io/f/YOUR_FORM_ID` (placeholder, user replaces)
- Success state: checkmark animation + message

---

## 7. GSAP CDN Load Order

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollSmoother.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
<script defer src="assets/js/gsap-config.js"></script>
<script defer src="assets/js/animations.js"></script>
<script defer src="assets/js/main.js"></script>
```

---

## 8. Accessibility & Performance

- All images: descriptive `alt` text; hero watermark and decorative elements: `aria-hidden="true"`
- `loading="lazy"` on all below-fold images
- All interactive elements keyboard-navigable; mobile hamburger fully accessible
- WCAG AA color contrast on all text/background pairs
- No unused CSS or JS loaded; GSAP plugins loaded only if used
- GitHub Pages: all asset paths relative (`./assets/...`), no absolute paths

---

## 9. Open Items / Decisions Made

| Item | Decision |
|---|---|
| Page architecture | Single `index.html`, SPA JS routing |
| Smooth scroll | ScrollSmoother enabled, `smooth: 1.2` |
| Animation level | Approach B — layered cinematic |
| Contact form backend | Formspree placeholder endpoint |
| Logo images | Extracted from design bundle |
| Studio dir | Reserved, untouched (`studio/.gitkeep`) |
