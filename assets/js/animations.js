/* ==========================================================================
   animations.js — DigitalStone AI
   GSAP core + ScrollTrigger only. No Club plugins required.
   ========================================================================== */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
   Utility — scoped ScrollTrigger fade-up
   -------------------------------------------------------------------------- */

function stFadeUp(els, triggerEl, overrides = {}) {
  if (!els) return;
  const targets = typeof els === "string" ? document.querySelectorAll(els) : els;
  if (!targets || (targets.length !== undefined && !targets.length)) return;
  gsap.from(targets, {
    autoAlpha: 0,
    y: 28,
    duration: 0.65,
    ease: "power2.out",
    scrollTrigger: {
      trigger: triggerEl || (targets[0] || targets),
      start: "top 85%",
      once: true,
    },
    ...overrides,
  });
}

/* --------------------------------------------------------------------------
   Nav entrance
   -------------------------------------------------------------------------- */

function animateNavEntrance() {
  if (prefersReduced) {
    gsap.set("#main-nav", { opacity: 1, y: 0 });
    return;
  }
  gsap.to("#main-nav", {
    opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.1,
  });
}

/* --------------------------------------------------------------------------
   Hero entrance — staggered fade-in sequence on home page load
   -------------------------------------------------------------------------- */

function animateHeroEntrance() {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  if (prefersReduced) {
    gsap.set([".hero-eyebrow", ".hero-h1", ".hero-sub", ".hero-ctas .pill-btn", ".logo-item"], { autoAlpha: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set(".hero-eyebrow",        { autoAlpha: 0, y: 18 });
  gsap.set(".hero-h1",             { autoAlpha: 0, y: 44 });
  gsap.set(".hero-sub",            { autoAlpha: 0, y: 22 });
  gsap.set(".hero-ctas .pill-btn", { autoAlpha: 0, y: 16 });
  gsap.set(".logo-item",           { autoAlpha: 0 });

  gsap.timeline({ defaults: { ease: "power2.out" } })
    .to(".hero-eyebrow",        { autoAlpha: 1, y: 0, duration: 0.45 }, 0.38)
    .to(".hero-h1",             { autoAlpha: 1, y: 0, duration: 0.6 }, 0.5)
    .to(".hero-sub",            { autoAlpha: 1, y: 0, duration: 0.5 }, 0.84)
    .to(".hero-ctas .pill-btn", { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.09 }, 0.94)
    .to(".logo-item",           { autoAlpha: 1, duration: 0.35, stagger: { each: 0.038, from: "start" } }, 1.04);

  /* Subtle ambient pulse on the hero glow */
  gsap.to(".hero-glow", {
    scale: 1.12, opacity: 0.75, duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut",
  });
}

/* --------------------------------------------------------------------------
   Page hero entrance — fade-in for Services, Cases, Links, Contact pages
   -------------------------------------------------------------------------- */

function animatePageHero(route) {
  if (prefersReduced) return;
  const page = document.querySelector(`[data-page="${route}"]`);
  if (!page) return;

  const kicker = page.querySelector(".kicker");
  const h1     = page.querySelector(".page-h1");
  const sub    = page.querySelector(".page-sub");
  const els    = [kicker, h1, sub].filter(Boolean);

  gsap.set(els, { autoAlpha: 0, y: 24 });

  gsap.timeline({ defaults: { ease: "power2.out" } })
    .to(kicker, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.1)
    .to(h1,     { autoAlpha: 1, y: 0, duration: 0.55 }, 0.22)
    .to(sub,    { autoAlpha: 1, y: 0, duration: 0.5 }, 0.55);
}

/* --------------------------------------------------------------------------
   Home — scroll animations
   -------------------------------------------------------------------------- */

function initHomeScrollAnimations() {
  const page = document.querySelector('[data-page="home"]');
  if (!page) return;

  /* About */
  gsap.from(page.querySelector(".about-tag"), {
    autoAlpha: 0, x: -20, duration: 0.5,
    scrollTrigger: { trigger: "#about", start: "top 82%", once: true },
  });
  gsap.from(page.querySelector(".about-h2"), {
    autoAlpha: 0, y: 30, duration: 0.65,
    scrollTrigger: { trigger: "#about", start: "top 78%", once: true }, delay: 0.1,
  });
  gsap.from(page.querySelector(".about-cta"), {
    autoAlpha: 0, y: 18, duration: 0.5,
    scrollTrigger: { trigger: "#about", start: "top 75%", once: true }, delay: 0.25,
  });

  /* Stats heading */
  gsap.from(page.querySelector(".stats-h2"), {
    autoAlpha: 0, y: 32, duration: 0.65,
    scrollTrigger: { trigger: "#stats", start: "top 80%", once: true },
  });

  /* Stats count-up numbers */
  page.querySelectorAll(".stat-number").forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const obj    = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 1.8, ease: "power2.out", immediateRender: false,
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      onStart()    { el.textContent = "0" + suffix; },
      onUpdate()   { el.textContent = Math.round(obj.val) + suffix; },
      onComplete() { el.textContent = target + suffix; },
    });
  });

  /* Stat items stagger */
  stFadeUp(page.querySelectorAll(".stat-item"), "#stats", { stagger: 0.1, y: 20, delay: 0.1 });

  /* Approach */
  gsap.from(page.querySelector(".approach-h2"), {
    autoAlpha: 0, y: 28, duration: 0.65,
    scrollTrigger: { trigger: "#approach", start: "top 82%", once: true },
  });
  stFadeUp(page.querySelectorAll(".project-card"), "#approach", { stagger: 0.1, y: 40, scale: 0.97, duration: 0.65, delay: 0.1 });
  stFadeUp(page.querySelectorAll(".value-item"), page.querySelector(".value-row"), { stagger: 0.08, y: 18 });

  /* Deployments */
  gsap.from(page.querySelector(".deployments-h2"), {
    autoAlpha: 0, y: 28, duration: 0.6,
    scrollTrigger: { trigger: "#deployments", start: "top 82%", once: true },
  });
  stFadeUp(page.querySelectorAll(".faq-item"), page.querySelector(".faq-stack"), { stagger: 0.07, y: 20 });
  gsap.from(page.querySelector(".campaign-table"), {
    autoAlpha: 0, y: 28, duration: 0.7,
    scrollTrigger: { trigger: page.querySelector(".campaign-table"), start: "top 85%", once: true }, delay: 0.15,
  });
  page.querySelectorAll(".campaign-row").forEach((row, i) => {
    gsap.from(row, {
      autoAlpha: 0, x: 20, duration: 0.4, delay: i * 0.07,
      scrollTrigger: { trigger: page.querySelector(".campaign-table"), start: "top 82%", once: true },
    });
  });

  /* Partner panel */
  gsap.from(page.querySelector(".partner-panel"), {
    autoAlpha: 0, scale: 0.97, y: 24, duration: 0.75, ease: "power2.out",
    scrollTrigger: { trigger: "#partner", start: "top 82%", once: true },
  });

  /* Closing */
  gsap.from(page.querySelector(".closing-h2"), {
    autoAlpha: 0, y: 28, duration: 0.65,
    scrollTrigger: { trigger: "#closing", start: "top 82%", once: true },
  });
  gsap.from(page.querySelector(".closing-body"), {
    autoAlpha: 0, y: 22, duration: 0.6,
    scrollTrigger: { trigger: "#closing", start: "top 80%", once: true }, delay: 0.18,
  });
}

/* --------------------------------------------------------------------------
   Services — scroll animations
   -------------------------------------------------------------------------- */

function initServicesScrollAnimations() {
  const page = document.querySelector('[data-page="services"]');
  if (!page) return;

  stFadeUp(page.querySelectorAll(".service-card"), "#services-grid", { stagger: 0.09, y: 32, scale: 0.98 });

  gsap.from(page.querySelector(".process-h2"), {
    autoAlpha: 0, y: 28, duration: 0.65,
    scrollTrigger: { trigger: "#process", start: "top 82%", once: true },
  });
  page.querySelectorAll(".process-row").forEach((row, i) => {
    gsap.from(row, {
      autoAlpha: 0, x: -28, duration: 0.55, ease: "power2.out", delay: i * 0.09,
      scrollTrigger: { trigger: page.querySelector(".process-list"), start: "top 82%", once: true },
    });
  });

  gsap.from(page.querySelector(".skills-h2"), {
    autoAlpha: 0, y: 28, duration: 0.65,
    scrollTrigger: { trigger: "#skills", start: "top 82%", once: true },
  });
  stFadeUp(page.querySelectorAll(".skill-card"), "#skills", { stagger: 0.06, y: 20 });

  gsap.from(page.querySelector(".sv-cta .cta-h2"), {
    autoAlpha: 0, y: 28, duration: 0.65,
    scrollTrigger: { trigger: "#services-cta", start: "top 82%", once: true },
  });
  gsap.from(page.querySelectorAll(".sv-cta .pill-btn"), {
    autoAlpha: 0, y: 18, stagger: 0.09, duration: 0.45,
    scrollTrigger: { trigger: "#services-cta", start: "top 80%", once: true }, delay: 0.2,
  });
}

/* --------------------------------------------------------------------------
   Cases — scroll animations
   -------------------------------------------------------------------------- */

function initCasesScrollAnimations() {
  const page = document.querySelector('[data-page="work"]');
  if (!page) return;

  stFadeUp(page.querySelectorAll(".filter-btn"), "#case-filters", { stagger: 0.07, y: 16, duration: 0.4 });
  stFadeUp(page.querySelectorAll(".case-tile"), "#cases-grid", { stagger: 0.09, y: 32, scale: 0.98 });

  gsap.from(page.querySelectorAll(".case-tab"), {
    autoAlpha: 0, y: 18, stagger: 0.06, duration: 0.45,
    scrollTrigger: { trigger: "#deep-dive", start: "top 84%", once: true },
  });
  /* The active deep-dive panel is shown/hidden by the tab switcher
     (animateCasePanel); a separate scroll-reveal here fought that logic and
     could leave the panel blank, so it is intentionally omitted. */

  gsap.from(page.querySelector(".cases-cta .cta-h2"), {
    autoAlpha: 0, y: 28, duration: 0.65,
    scrollTrigger: { trigger: "#cases-cta", start: "top 82%", once: true },
  });
}

/* --------------------------------------------------------------------------
   Links — scroll animations
   -------------------------------------------------------------------------- */

function initLinksScrollAnimations() {
  const page = document.querySelector('[data-page="links"]');
  if (!page) return;

  stFadeUp(page.querySelectorAll(".link-section-card"), "#links-grid", { stagger: 0.09, y: 28 });

  page.querySelectorAll(".link-section-card").forEach((card, ci) => {
    card.querySelectorAll(".link-row").forEach((row, ri) => {
      gsap.from(row, {
        autoAlpha: 0, x: -18, duration: 0.45, ease: "power2.out",
        delay: ci * 0.06 + ri * 0.05,
        scrollTrigger: { trigger: card, start: "top 84%", once: true },
      });
    });
  });

  gsap.from(page.querySelector(".lk-cta .cta-h2"), {
    autoAlpha: 0, y: 28, duration: 0.65,
    scrollTrigger: { trigger: "#links-cta", start: "top 82%", once: true },
  });
}

/* --------------------------------------------------------------------------
   Contact — scroll animations
   -------------------------------------------------------------------------- */

function initContactScrollAnimations() {
  const page = document.querySelector('[data-page="contact"]');
  if (!page) return;

  gsap.from(page.querySelector(".contact-card"), {
    autoAlpha: 0, y: 28, scale: 0.98, duration: 0.7, ease: "power2.out",
    scrollTrigger: { trigger: "#contact-content", start: "top 82%", once: true },
  });
  stFadeUp(page.querySelectorAll(".info-card"), "#contact-content", { stagger: 0.1, y: 22, delay: 0.1 });
  gsap.from(page.querySelector(".tips-card"), {
    autoAlpha: 0, y: 22, duration: 0.6,
    scrollTrigger: { trigger: "#contact-content", start: "top 78%", once: true }, delay: 0.4,
  });
}

/* --------------------------------------------------------------------------
   Footer — ScrollTrigger entrance (always in DOM, init once)
   -------------------------------------------------------------------------- */

function initFooterAnimation() {
  if (prefersReduced) return;

  gsap.from(".footer-brand", {
    autoAlpha: 0, y: 28, duration: 0.65, ease: "power2.out",
    scrollTrigger: { trigger: ".ds-footer", start: "top 88%", once: true },
  });
  gsap.from(".footer-col", {
    autoAlpha: 0, y: 22, duration: 0.55, ease: "power2.out", stagger: 0.1,
    scrollTrigger: { trigger: ".ds-footer", start: "top 85%", once: true }, delay: 0.15,
  });
  gsap.from(".footer-bottom", {
    autoAlpha: 0, y: 14, duration: 0.45, ease: "power2.out",
    scrollTrigger: { trigger: ".footer-bottom", start: "top 95%", once: true },
  });
}

/* --------------------------------------------------------------------------
   Page transition — fade out active page, swap, fade in
   -------------------------------------------------------------------------- */

function pageTransition(outEl, inEl, callback) {
  if (prefersReduced) { callback(); return; }
  gsap.to(outEl, {
    autoAlpha: 0, duration: 0.18, ease: "power1.in",
    onComplete() {
      /* Clear GSAP inline styles from outgoing page so it renders
         correctly next time it becomes the incoming page. */
      gsap.set(outEl, { clearProps: "opacity,visibility" });
      callback();
      gsap.set(inEl, { clearProps: "opacity,visibility" });
      gsap.from(inEl, { autoAlpha: 0, duration: 0.24, ease: "power1.out" });
    },
  });
}

/* --------------------------------------------------------------------------
   FAQ accordion height tween (called from main.js)
   -------------------------------------------------------------------------- */

function animateFaqToggle(bodyEl, open) {
  if (prefersReduced) {
    gsap.set(bodyEl, { display: open ? "block" : "none", clearProps: "height,opacity,paddingBottom" });
    return;
  }
  if (open) {
    gsap.set(bodyEl, { display: "block" });
    gsap.from(bodyEl, { height: 0, opacity: 0, paddingBottom: 0, duration: 0.32, ease: "power2.out" });
  } else {
    gsap.to(bodyEl, {
      height: 0, opacity: 0, paddingBottom: 0, duration: 0.26, ease: "power2.in",
      onComplete() { gsap.set(bodyEl, { display: "none", clearProps: "height,opacity,paddingBottom" }); },
    });
  }
}

/* --------------------------------------------------------------------------
   Case panel crossfade (called from main.js)
   -------------------------------------------------------------------------- */

function animateCasePanel(outEl, inEl) {
  /* Cancel any in-flight tweens (rapid tab clicks) and swap panels immediately,
     so the switch never depends on an animation finishing. */
  gsap.killTweensOf([outEl, inEl]);
  outEl.classList.remove("is-active");
  inEl.classList.add("is-active");
  /* Strip any inline styles a previous tween left behind so both panels are in
     a known, visible state before we animate. */
  gsap.set([outEl, inEl], { clearProps: "all" });

  if (prefersReduced) return;

  /* fromTo with an EXPLICIT visible end state. Unlike gsap.from(), this never
     captures a stale hidden state as the target, so the panel always finishes
     visible even if it was mid-transition or previously hidden. */
  gsap.fromTo(
    inEl,
    { autoAlpha: 0, y: 12 },
    { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out", clearProps: "opacity,visibility,transform" }
  );
}

/* --------------------------------------------------------------------------
   Per-page scroll animation orchestrator — lazy init per page
   -------------------------------------------------------------------------- */

const _initializedPages = new Set();

function initPageScrollAnimations(route) {
  if (prefersReduced || _initializedPages.has(route)) return;
  _initializedPages.add(route);

  switch (route) {
    case "home":     initHomeScrollAnimations();     break;
    case "services": initServicesScrollAnimations(); break;
    case "work":     initCasesScrollAnimations();    break;
    case "links":    initLinksScrollAnimations();    break;
    case "contact":  initContactScrollAnimations();  break;
  }

  /* Double rAF: browser applies layout on tick 1, paints on tick 2 —
     ScrollTrigger then measures correct element positions. */
  requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
}

/* --------------------------------------------------------------------------
   Public API — consumed by main.js
   -------------------------------------------------------------------------- */

window.animatePage = function (route) {
  if (route === "home") {
    animateHeroEntrance();
  } else {
    animatePageHero(route);
  }
  initPageScrollAnimations(route);
};

window.animateFaqToggle  = animateFaqToggle;
window.animateCasePanel  = animateCasePanel;
window.pageTransition    = pageTransition;

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  animateNavEntrance();
  initFooterAnimation();
  /* animateHeroEntrance() and scroll animations are triggered by
     window.animatePage() which main.js calls after the page is visible. */
});
