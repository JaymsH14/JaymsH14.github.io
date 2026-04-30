# PLAN.md — DigitalStone AI Agency Website Build Plan

## Core Principles

Every decision made during this build is guided by three non-negotiable standards:

1. **GitHub Pages optimized** — The site must function flawlessly as a fully static site served from GitHub Pages. No server-side logic, no absolute paths, no build tools, no dependencies that require a backend. Every file, link, and asset reference must work in a static hosting environment.

2. **Clean file tree** — The project directory must be lean and purposeful. No orphaned files, no duplicate assets, no temp files, no unused scripts or stylesheets left in place. Every file in the repo exists for a reason. If it is not needed, it does not exist.

3. **Clean code** — HTML, CSS, and JS must be readable, consistently formatted, and well-commented. No dead code, no commented-out blocks left behind, no redundant styles, no copy-paste duplication. Code is written once and reused via CSS variables and shared components.

These three principles apply at every phase — not just the final audit.

---

## How to Use This File

This plan is executed alongside:

- **CLAUDE.md** — technical rules, architecture constraints, and stack decisions. Read it first. It is the law.
- **Claude Design handoff file** — visual source of truth for every layout, color, spacing, and component decision.

**Before writing a single line of code:**
1. Read `CLAUDE.md` in full
2. Open and review the Claude Design handoff file in full — inventory every section, component, and interaction
3. Complete the Pre-Build Checklist below
4. Execute phases in order — no skipping ahead, no parallel phase work

**Phase completion rule:** A phase is not complete until every checkbox is checked and the completion condition at the bottom of that phase is met. Do not begin the next phase until the current one is fully done.

---

## Pre-Build Checklist

- [ ] `CLAUDE.md` read in full
- [ ] Claude Design handoff file opened and reviewed in full
- [ ] All colors extracted and listed for CSS variable definition
- [ ] All fonts identified (family name, weights, italic variants)
- [ ] All page sections inventoried top to bottom
- [ ] All interactive elements identified (nav, buttons, forms, modals, accordions, etc.)
- [ ] All animation candidates noted (entrances, scroll effects, parallax, text splits, loops)
- [ ] Confirmed: no section, component, or asset will be built that is not in the design
- [ ] Confirmed: all planned files are necessary — no extras
- [ ] `studio/.gitkeep` placeholder understood — Studio directory is reserved, not built

---

## Phase 1 — Project Scaffold & Design Tokens

**Goal:** A correctly structured, empty project with all design tokens defined. No content yet — foundation only. The file tree created here is the final file tree. Nothing gets added later without a clear reason.

### File Structure

Create exactly this structure — no more, no less:

```
/
├── index.html               # Single entry point — required for GitHub Pages
├── 404.html                 # Static redirect back to index.html
├── CLAUDE.md                # Technical rules
├── PLAN.md                  # This file
├── assets/
│   ├── css/
│   │   ├── style.css        # CSS reset, :root variables, global base styles
│   │   ├── components.css   # Nav, buttons, cards, forms — reusable elements
│   │   └── sections.css     # Per-section styles in page order
│   ├── js/
│   │   ├── gsap-config.js   # Plugin registration and GSAP global defaults only
│   │   ├── animations.js    # All GSAP timelines and ScrollTrigger instances
│   │   └── main.js          # Nav toggle, form handling, non-animation interactions
│   └── images/
│       ├── logo/            # Logo files — SVG preferred
│       ├── hero/            # Hero section imagery only
│       └── general/         # All other site images
├── pages/                   # Reserved for future multi-page expansion — empty now
└── studio/
    └── .gitkeep             # Reserved for Studio branch — do not build here
```

**File tree rules:**
- If a file is not in this tree, it should not exist in the repo
- Do not create test files, scratch files, or backup files
- Do not create additional JS or CSS files beyond what is listed — add to the existing files
- All filenames: lowercase, hyphens only, no spaces, no uppercase

### Tasks

- [ ] Create the full file structure above — exactly as shown, nothing extra
- [ ] Verify `studio/.gitkeep` is in place
- [ ] Verify `pages/` directory exists and is empty

**Design Token Extraction — `style.css` `:root` block:**
- [ ] All brand colors → `--color-*` (e.g., `--color-primary`, `--color-bg`, `--color-text-muted`)
- [ ] All font families → `--font-heading`, `--font-body`, `--font-mono` (if applicable)
- [ ] Font size scale → `--text-xs` through `--text-6xl` (or match design scale exactly)
- [ ] Spacing scale → `--space-xs` through `--space-3xl`
- [ ] Border radii → `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- [ ] Box shadows → `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- [ ] Z-index scale → `--z-base`, `--z-nav`, `--z-overlay`, `--z-modal`
- [ ] Transition speeds → `--transition-fast`, `--transition-base`, `--transition-slow`
- [ ] Max content width → `--container-max`
- [ ] Section padding → `--section-padding-y`, `--section-padding-x`

**`index.html` base setup:**
- [ ] `<meta charset>`, `<meta viewport>`, `<meta description>`, OG tags
- [ ] Favicon `<link>` (placeholder if asset not yet available)
- [ ] Google Fonts `<link>` tags — only fonts used in the design
- [ ] GSAP CDN `<script>` tags in correct load order (per `CLAUDE.md`):
  1. `gsap.min.js`
  2. `ScrollTrigger.min.js`
  3. `ScrollSmoother.min.js` (only if used)
  4. `SplitText.min.js` (only if used)
  5. Additional plugins (only if used)
  6. `./assets/js/gsap-config.js`
  7. `./assets/js/animations.js`
  8. `./assets/js/main.js`
- [ ] CSS `<link>` tags: `style.css` → `components.css` → `sections.css`
- [ ] Semantic shell: `<header>`, `<main>`, `<footer>` — empty, no content yet
- [ ] All paths are relative (e.g., `./assets/css/style.css` — never `/assets/css/style.css`)

**`404.html` setup:**
- [ ] Meta refresh redirect to `./index.html`
- [ ] Minimal markup — no external dependencies needed

**`gsap-config.js` setup:**
- [ ] `gsap.registerPlugin(...)` — only plugins that will actually be used
- [ ] GSAP global defaults (`gsap.defaults({...})`) if applicable
- [ ] No animation code in this file — registration only

**`style.css` global base:**
- [ ] CSS reset (minimal — box-sizing, margin, padding reset)
- [ ] `*, *::before, *::after { box-sizing: border-box }`
- [ ] Body font, background, color from CSS variables
- [ ] `scroll-behavior: smooth` — only if ScrollSmoother is NOT being used

**Phase 1 Complete When:** File tree exactly matches the structure above with no extra files, `:root` variables fully populated from the design, `index.html` opens in browser with zero console errors, GSAP loads and registers plugins without errors.

---

## Phase 2 — Navigation & Header

**Goal:** Fully functional, responsive, accessible, GSAP-animated navigation — pixel-faithful to the design.

### Tasks

**HTML — `index.html`:**
- [ ] `<header>` with `<nav>` — semantic structure only, no presentational markup
- [ ] Logo: SVG inline or `<img>` with `alt` text
- [ ] Nav links: `<ul>` → `<li>` → `<a>` structure with `href="#section-id"` anchors
- [ ] CTA button (if present in design)
- [ ] Hamburger toggle button with `aria-expanded` and `aria-controls` attributes
- [ ] Mobile nav panel with `id` matching `aria-controls`

**CSS — `components.css`:**
- [ ] Desktop nav layout matching design — use CSS variables for all values
- [ ] `position: fixed` sticky nav with correct z-index (`--z-nav`)
- [ ] Scroll state class (e.g., `.nav--scrolled`) for background/shadow change on scroll
- [ ] Hover states using CSS `transition` only (no GSAP on hover — per `CLAUDE.md`)
- [ ] Mobile nav panel: hidden by default, open state class
- [ ] Hamburger icon styles and open/close state
- [ ] Active nav link class (`.nav-link--active`)
- [ ] Responsive: desktop styles at `min-width: 1200px`, stacked at mobile default

**JS — `main.js`:**
- [ ] Hamburger toggle: open/close mobile menu, toggle `aria-expanded`
- [ ] Close mobile menu on: Escape key, backdrop click, nav link click
- [ ] Focus trap inside open mobile menu
- [ ] Scroll state class added to `<header>` when page scrolls past threshold

**JS — `animations.js`:**
- [ ] Nav entrance animation on page load (GSAP timeline, not ScrollTrigger)
- [ ] Active section highlighting via ScrollTrigger — adds `.nav-link--active` class as sections enter viewport

**Phase 2 Complete When:** Nav is pixel-faithful to design at all breakpoints, hamburger menu opens/closes correctly, keyboard navigation works fully, active states update on scroll, entrance animation plays on load, zero console errors.

---

## Phase 3 — Hero Section

**Goal:** Hero section built, styled, and animated — the first and highest-impact section of the site.

### Tasks

**HTML — `index.html`:**
- [ ] Hero `<section>` with a meaningful `id` (e.g., `id="hero"`)
- [ ] All hero content from the design: headline, subheadline, body copy, CTA(s), imagery
- [ ] Decorative elements (if any) as `aria-hidden="true"`
- [ ] Hero image: `alt` text, no `loading="lazy"` (above the fold — load eagerly)

**CSS — `sections.css`:**
- [ ] Full-bleed layout, height, background treatment per design
- [ ] All typography sizing from CSS variables
- [ ] Responsive layout: mobile default → tablet → desktop
- [ ] No fixed pixel heights — use `min-height` with viewport units

**JS — `animations.js`:**
- [ ] Hero entrance timeline — staggered sequence: headline → subheadline → body → CTA → image
- [ ] SplitText on headline (if design intent supports it)
- [ ] Parallax or background animation (if in design)
- [ ] Timeline tied to page load — not ScrollTrigger
- [ ] `prefers-reduced-motion` check — skip all hero animation if active

**Phase 3 Complete When:** Hero matches design at all breakpoints, entrance animation plays cleanly on load, no layout shift, images load correctly, mobile layout is solid.

---

## Phase 4 — Core Content Sections

**Goal:** All remaining page sections from the design, built top to bottom, fully styled and responsive. Animations are stubs only — polished in Phase 5.

### Code cleanliness rules for this phase:
- Each section gets a clear `id` and a comment in `sections.css` marking where its styles begin
- No copy-paste CSS — if two sections share styles, extract to a shared class in `components.css`
- No inline styles on any element
- No placeholder or lorem ipsum content — use only content from the design handoff

### Tasks

- [ ] For each section in the design (fill in from design handoff, top to bottom):
  - [ ] Section: *(identify from design)*
    - [ ] Semantic HTML with meaningful `id` and `aria-label` if needed
    - [ ] Styles in `sections.css` under clearly labeled section comment
    - [ ] Responsive at all three breakpoints
    - [ ] GSAP ScrollTrigger entrance stub in `animations.js` — basic fade or slide only, marked `// TODO: Polish in Phase 5`
  - [ ] Section: *(identify from design)*
  - [ ] Section: *(identify from design)*
  - [ ] Section: *(identify from design)*
  - [ ] Section: *(identify from design)*

- [ ] Reusable components — add to `components.css` (not per-section CSS):
  - [ ] Card component (all card variants in design)
  - [ ] Button variants (primary, secondary, ghost — whatever the design uses)
  - [ ] Badges or tags (if present)
  - [ ] Section headings / eyebrow text (if shared style across sections)
  - [ ] Decorative dividers (if present)

**Phase 4 Complete When:** Every section from the design exists in the DOM, all content matches the design handoff, every section is responsive at all breakpoints, no broken layouts, no inline styles, no duplicate CSS.

---

## Phase 5 — GSAP Animations (Full Pass)

**Goal:** All scroll-triggered and load animations implemented and polished. This is the full GSAP pass — replace all Phase 4 stubs and complete every animation in the design.

### Code cleanliness rules for this phase:
- All animation code lives in `animations.js` — no GSAP calls in `main.js` or inline `<script>` tags
- Each animation block is clearly commented with the section it belongs to
- Kill and clean up any ScrollTrigger instances that are no longer needed
- After this phase, there should be zero `// TODO` comments remaining in `animations.js`

### Tasks

- [ ] Replace all Phase 4 ScrollTrigger stubs with full polished animations
- [ ] Full animation implementation per section (driven by design handoff intent):
  - [ ] Staggered entrance reveals (cards, lists, grid items)
  - [ ] Text split animations via SplitText (headlines, subheadlines)
  - [ ] Parallax on images or background layers
  - [ ] Pinned scroll sequences (if in design)
  - [ ] Horizontal scroll sections (if in design)
  - [ ] SVG path draws or morphs (if in design)
  - [ ] Number/counter animations (if in design)
  - [ ] Looping ambient animations (if in design)
- [ ] Refine and finalize hero entrance timeline from Phase 3
- [ ] Audit all ScrollTrigger instances:
  - [ ] No conflicts between triggers
  - [ ] Correct `start` and `end` values — test with markers, then remove markers before completion
  - [ ] ScrollSmoother compatibility verified (if used)
- [ ] `prefers-reduced-motion` — full audit:
  - [ ] All GSAP animations wrapped in the reduced-motion check
  - [ ] Site is fully usable with animations disabled
- [ ] Mobile animation audit:
  - [ ] Animations perform well on mobile (no jank)
  - [ ] Complex animations simplified or disabled on mobile if performance requires it

**Phase 5 Complete When:** All animations are polished and complete, zero `// TODO` comments in `animations.js`, all ScrollTrigger markers removed, `prefers-reduced-motion` confirmed working, mobile animations tested and smooth.

---

## Phase 6 — Footer

**Goal:** Footer built, styled, and animated — forward-compatible with the future Studio branch.

### Tasks

**HTML — `index.html`:**
- [ ] `<footer>` with semantic structure from the design handoff
- [ ] Logo
- [ ] Navigation links (structured as a `<nav>` with `aria-label="Footer navigation"`)
- [ ] Social media links with `aria-label` on each
- [ ] Legal / copyright line
- [ ] Studio link placeholder comment in markup: `<!-- Studio link: add here in Phase 2 -->`

**CSS — `sections.css`:**
- [ ] Footer styles matching design exactly
- [ ] Responsive layout at all breakpoints
- [ ] All values from CSS variables — no hardcoded colors or spacing

**JS — `animations.js`:**
- [ ] ScrollTrigger entrance animation for footer (if applicable per design)

**Phase 6 Complete When:** Footer matches design at all breakpoints, all links work, Studio placeholder comment is in place, keyboard navigable.

---

## Phase 7 — Forms & Interactive Elements

**Goal:** All interactive elements beyond the nav are fully functional, accessible, and visually complete.

### Tasks

- [ ] Inventory all interactive elements from the design handoff

**For each form:**
- [ ] Semantic HTML with `<label>` for every input — no exceptions
- [ ] Form styles in `components.css` using CSS variables
- [ ] Formspree action URL (or `mailto:` fallback) — per `CLAUDE.md` (no backend)
- [ ] Client-side validation in `main.js` — required field checks before submit
- [ ] Success state UI (confirmation message, not an alert)
- [ ] Error state UI (inline field errors)
- [ ] Form submit confirmed working under static hosting

**For each modal or overlay:**
- [ ] HTML structure appended to end of `<body>`
- [ ] GSAP open/close animation in `animations.js`
- [ ] Focus trap on open in `main.js`
- [ ] Close on: Escape key, backdrop click, close button
- [ ] `aria-modal="true"` and `role="dialog"` attributes

**For each accordion, tab, or toggle:**
- [ ] HTML structure with correct ARIA attributes (`aria-expanded`, `aria-controls`)
- [ ] GSAP animation for open/close in `animations.js`
- [ ] State managed in `main.js`

**Phase 7 Complete When:** All interactive elements function correctly, forms handle success and error states, all modals are keyboard accessible, zero ARIA violations on interactive components.

---

## Phase 8 — Polish, Accessibility & GitHub Pages Audit

**Goal:** Production-ready. The site is visually perfect, code is clean, accessibility passes, and GitHub Pages compatibility is fully verified.

### Visual QA

- [ ] Full page comparison against Claude Design handoff — section by section
- [ ] All hover states match design
- [ ] All focus states are visible and styled
- [ ] All spacing and alignment correct at mobile, tablet, and desktop
- [ ] Fonts loaded correctly — correct weights and styles, no FOUT
- [ ] All images display correctly

### Code Cleanliness Audit

- [ ] Zero inline styles on any element
- [ ] Zero `// TODO` or `// FIXME` comments remaining
- [ ] Zero commented-out code blocks left in any file
- [ ] No unused CSS classes or selectors
- [ ] No unused JS variables or functions
- [ ] No duplicate style definitions — if a style appears twice, refactor it
- [ ] All CSS sections labeled with comments matching the section they style
- [ ] File tree matches Phase 1 structure exactly — no extra files added during the build
- [ ] All filenames are lowercase with hyphens — zero spaces, zero uppercase

### Accessibility Audit

- [ ] All images have descriptive `alt` text
- [ ] All interactive elements reachable and operable via keyboard
- [ ] All form inputs have associated `<label>` elements
- [ ] Color contrast passes WCAG AA for all text
- [ ] Semantic HTML correct throughout — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] No `<div>` or `<span>` used where a semantic element should be
- [ ] `prefers-reduced-motion` confirmed working — test by enabling in OS settings

### Performance Audit

- [ ] Only GSAP plugins actually used are loaded via CDN
- [ ] No unused CSS or JS files in the repo
- [ ] All images compressed and correctly sized
- [ ] `loading="lazy"` on all below-fold images, absent on above-fold images
- [ ] Zero render-blocking resources
- [ ] Browser console: zero errors, zero warnings

### GitHub Pages Compatibility Audit

- [ ] Every asset path in HTML, CSS, and JS is relative — zero absolute paths with leading `/`
- [ ] `index.html` is at repo root
- [ ] `404.html` is at repo root and redirects to `./index.html`
- [ ] `studio/.gitkeep` is present
- [ ] Site tested via local static file server (e.g., `python -m http.server`) to simulate Pages behavior — not `file://` protocol
- [ ] All anchor links scroll to correct sections
- [ ] All external links open correctly

**Phase 8 Complete When:** Every checklist item above is checked. Zero exceptions. The site is visually accurate, code is clean with no dead weight, accessibility passes, and static hosting is fully verified.

---

## Phase 9 — GitHub Pages Deployment

**Goal:** Site is live on the existing GitHub Pages repo and fully functional on the live URL.

### Tasks

- [ ] Final file tree review — confirm it exactly matches Phase 1 structure, nothing extra
- [ ] Upload all files to the existing GitHub repository
- [ ] Confirm GitHub Pages is set to serve from the correct branch and root (`/`)
- [ ] Wait for Pages build to complete
- [ ] Test live URL — full pass:
  - [ ] Site loads at the correct GitHub Pages URL
  - [ ] Zero 404s in browser network tab
  - [ ] All animations play correctly
  - [ ] All nav links scroll to correct sections
  - [ ] All forms submit correctly
  - [ ] All modals and interactive elements function
  - [ ] Mobile tested on the live URL
  - [ ] `404.html` tested — navigate to a bad URL, confirm redirect to home

**Phase 9 Complete When:** Site is live, all functionality confirmed on the live GitHub Pages URL, mobile verified.

---

## Future Phase — Studio Branch (Do Not Build Now)

When DigitalStone AI Studio is ready:

- A new design handoff will be provided
- Studio pages will live under `/studio/` in the same repo
- `studio/.gitkeep` will be replaced with actual content
- Nav and footer will be updated to include Studio links (placeholder comments already in the markup)
- CSS variable system will be extended with Studio brand tokens — no existing variables modified
- A new phase plan section will be added to this file

**No Studio work is in scope for the current build.**

---

## Phase Status Tracker

| Phase | Description | Status |
|---|---|---|
| Pre-Build | Checklist & design review | ✅ Complete |
| 1 | Scaffold & design tokens | ✅ Complete |
| 2 | Navigation & header | ✅ Complete |
| 3 | Hero section | ✅ Complete |
| 4 | Core content sections | ✅ Complete |
| 5 | GSAP animations — full pass | ✅ Complete |
| 6 | Footer | ✅ Complete |
| 7 | Forms & interactive elements | ✅ Complete |
| 8 | Polish, accessibility & GitHub Pages audit | ✅ Complete |
| 9 | GitHub Pages deployment | ⏳ Manual — push when ready |
