# DigitalStone AI Website

Public static website for DigitalStone AI, an AI automation and consulting agency.

The site is hosted with GitHub Pages at:

https://www.digitalstoneai.com

## Overview

This repository contains a fully static marketing website built with HTML, CSS, and vanilla JavaScript. There is no build system, package manager, backend server, or framework required.

The main entry point is `index.html` at the repository root. Supporting styles, scripts, and images live under `assets/`.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- GSAP via CDN for animation
- GitHub Pages for hosting

## Project Structure

```text
/
+-- index.html
+-- 404.html
+-- CNAME
+-- README.md
+-- robots.txt
+-- sitemap.xml
+-- _config.yml
+-- assets/
|   +-- css/
|   +-- images/
|   +-- js/
+-- studio/
    +-- .gitkeep
```

## Key Files

- `index.html` - Main website page.
- `404.html` - GitHub Pages fallback redirect.
- `CNAME` - Custom domain configuration for `www.digitalstoneai.com`.
- `robots.txt` - Search crawler rules.
- `sitemap.xml` - Sitemap for search engines.
- `_config.yml` - GitHub Pages configuration.
- `assets/css/` - Site styles.
- `assets/js/` - Navigation, animation, and interaction scripts.
- `assets/images/` - Public website images and logos.
- `studio/` - Reserved for a future DigitalStone AI Studio section.

## Local Preview

Because this is a static site, it can be previewed by opening `index.html` directly in a browser.

For a local server preview, run any simple static server from the repository root, such as:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

Deployment happens through GitHub Pages. Changes pushed to the publishing branch will be served as the public website.

Important deployment notes:

- Keep `index.html` at the repository root.
- Keep asset paths relative, such as `./assets/css/style.css`.
- Do not add server-side code or build-only dependencies.
- Keep public-facing files only in the repo because the source repository is public.

## Maintenance Notes

- Update content directly in `index.html`.
- Update global styles in `assets/css/style.css`.
- Update reusable component styling in `assets/css/components.css`.
- Update section-specific styling in `assets/css/sections.css`.
- Update general interactions in `assets/js/main.js`.
- Update GSAP animation behavior in `assets/js/animations.js`.
- Update GSAP plugin registration in `assets/js/gsap-config.js`.

## Future Studio Section

The `studio/` directory is intentionally reserved for a future DigitalStone AI Studio expansion. It is currently excluded from the GitHub Pages build in `_config.yml`.
