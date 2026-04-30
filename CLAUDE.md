# CLAUDE.md — DigitalStone AI Agency Website

## Project Overview

This is the main business website for **DigitalStone AI Agency**. It is a fully static site (HTML, CSS, vanilla JavaScript only — no frameworks, no build tools) deployed via **GitHub Pages** to an existing repository. The goal is to faithfully implement the provided Claude design file into clean, production-ready static files.

A **Studio branch** (DigitalStone AI Studio) is planned as a future addition. Architecture decisions should keep that expansion in mind without building it now.

---

## Deployment Target

- **Platform:** GitHub Pages (static hosting only)
- **Deployment method:** Direct file upload to existing repo — no CI/CD pipeline required
- **Entry point:** `index.html` must live at the repo root
- **No server-side code:** No Node.js, no Python, no build step, no package.json required
- **No client-side frameworks:** No React, Vue, or Angular — vanilla JS only

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts (loaded via `<link>` in `<head>`) |
| Icons | Font Awesome CDN or inline SVG only |
| Animations | GSAP (GreenSock) via CDN — primary animation library |
| Animation Plugins | GSAP ScrollTrigger, ScrollSmoother, SplitText, MorphSVG as needed (CDN) |
| Forms | Static HTML forms (no backend — use Formspree or similar if contact form is needed) |

---

## File Structure

```
/
├── index.html               # Main entry point (required for GitHub Pages)
├── CLAUDE.md                # This file
├── assets/
│   ├── css/
│   │   ├── style.css        # Global styles, CSS variables, typography
│   │   ├── components.css   # Reusable component styles (cards, buttons, nav)
│   │   └── sections.css     # Page-section-specific styles
│   ├── js/
│   │   ├── main.js          # Primary JS — nav, scroll, general interactions
│   │   ├── animations.js    # GSAP timelines, ScrollTrigger, entrance animations
│   │   └── gsap-config.js   # GSAP plugin registration and global defaults
│   └── images/
│       ├── logo/            # Logo files (SVG preferred)
│       ├── hero/            # Hero section imagery
│       └── general/         # All other site imagery
├── pages/                   # Reserved for future multi-page expansion
└── studio/                  # RESERVED — do not build, do not delete
    └── .gitkeep
```

> **Note:** The `studio/` directory is intentionally reserved and empty. Do not build into it during this phase. It will house the DigitalStone AI Studio branch in a future phase.

---

## Design Implementation Rules

These rules govern how Claude Code should translate the provided Claude design file into code.

### General
- Implement the design **pixel-faithfully** — do not improvise layout, spacing, color, or typography unless a conflict with static deployment requires it
- Use **CSS custom properties** (`--var-name`) for all colors, font sizes, spacing units, and border radii defined in the design
- All CSS variables should be declared in `:root` inside `style.css`
- Do not add sections, components, or content that are not present in the design file

### Typography
- Match font families, weights, and sizes exactly as shown in the design
- Use `rem` units for font sizes (base: `16px`)
- Line heights and letter spacing should match the design

### Colors
- Extract every color from the design and define it as a CSS variable
- Name variables semantically: `--color-primary`, `--color-bg`, `--color-text-muted`, etc.

### Spacing & Layout
- Use CSS Grid for page-level layout and major section structure
- Use Flexbox for component-level alignment
- Use `rem` or `%` for spacing — avoid fixed `px` values for layout (fine for borders, shadows)

### Responsiveness
- Mobile-first approach: base styles target mobile, media queries scale up
- Breakpoints:
  - Mobile: default (< 768px)
  - Tablet: `min-width: 768px`
  - Desktop: `min-width: 1200px`
- Navigation must collapse to a hamburger menu on mobile

### Images
- Use descriptive `alt` attributes on all `<img>` tags
- Prefer SVG for logos and icons
- Use `loading="lazy"` on all below-fold images
- Do not hotlink external images — all images go in `assets/images/`

### Animations
- **GSAP is the primary and preferred animation library** — do not use CSS keyframes or Intersection Observer for anything GSAP can handle
- Load GSAP core and all required plugins via CDN in `<head>` before any custom scripts
- Register all plugins in `gsap-config.js` before use:
  ```js
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, MorphSVGPlugin);
  ```
- All timelines and ScrollTrigger instances are defined in `animations.js`
- Do not mix GSAP and CSS `transition`/`animation` on the same property of the same element — pick one
- CSS `transition` is acceptable for simple hover states only (e.g., button color, link underline)
- GSAP ScrollTrigger is the standard for all scroll-driven effects — do not use Intersection Observer for animation triggers
- **Do not limit animation ambition** — complex sequences, pinned sections, horizontal scrolling, parallax layers, text splits, SVG morphs, staggered reveals, and timeline scrubbing are all in scope
- If ScrollSmoother is used, initialize it before all other ScrollTrigger instances
- Ensure all GSAP animations respect `prefers-reduced-motion`:
  ```js
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) { /* initialize GSAP animations */ }
  ```
- GSAP CDN load order in `<head>`:
  1. `gsap.min.js`
  2. `ScrollTrigger.min.js`
  3. `ScrollSmoother.min.js` (if used)
  4. `SplitText.min.js` (if used)
  5. Any other plugins
  6. `gsap-config.js` (plugin registration)
  7. `animations.js`
  8. `main.js`

---

## Navigation

- Navigation should be **sticky** (fixed to top on scroll)
- Active section highlighting driven by GSAP ScrollTrigger (not Intersection Observer)
- Smooth scroll behavior handled by GSAP or ScrollSmoother — remove `scroll-behavior: smooth` from CSS if ScrollSmoother is active to avoid conflicts
- Mobile hamburger menu must be fully keyboard accessible
- Nav entrance animation should be handled by GSAP on page load

---

## Performance Rules

- No unused CSS or JS
- No jQuery — vanilla JS only (GSAP is the approved exception to the "no large libraries" rule)
- External resources (fonts, icons) loaded via CDN `<link>` in `<head>`, not JS
- GSAP and its plugins are loaded via CDN — do not bundle or self-host unless specifically instructed
- Only load GSAP plugins that are actually used — do not load the full plugin suite by default
- Defer or async all non-critical scripts: `<script defer src="..."></script>`
- GSAP scripts must load before `animations.js` and `main.js`
- Minification is not required for this phase but keep code clean and well-commented

---

## Accessibility

- All images have descriptive `alt` text
- All interactive elements are keyboard navigable
- Sufficient color contrast (WCAG AA minimum)
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- Form inputs must have associated `<label>` elements

---

## GitHub Pages Compatibility Rules

- **No absolute server paths** — all links and asset references must be relative (e.g., `./assets/css/style.css` not `/assets/css/style.css`)
- **No `.htaccess` or server config files** — GitHub Pages does not support them
- **404 handling:** Create a `404.html` file at root that redirects to `index.html`
- **No server-side forms** — if a contact form is present, use [Formspree](https://formspree.io) or make it a `mailto:` link
- All filenames must be lowercase with hyphens (no spaces, no uppercase) for cross-platform compatibility

---

## Future Studio Branch (Phase 2 — Do Not Build Now)

When the Studio branch is added, it will live under `/studio/` as a sub-section or separate page of the same site. The following should be kept in mind during Phase 1:

- Do not hard-code navigation in a way that makes adding a "Studio" nav item difficult
- CSS variable naming should be generic enough to extend to a secondary brand palette
- The `studio/` directory is already reserved at root — do not remove it

---

## How to Use This File

1. Review this CLAUDE.md fully before writing any code
2. Open the provided Claude design file and use it as the source of truth for all visual decisions
3. Build `index.html` first, then extract styles into the CSS files
4. Reference this file whenever making an architectural decision
5. If the design file conflicts with a rule in this document, **the design file wins on visual decisions** and **this document wins on technical/deployment decisions**
