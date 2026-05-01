/* ==========================================================================
   main.js — DigitalStone AI
   Router, nav, FAQ accordion, case filter/tabs, contact form.
   No GSAP animation code — that lives in animations.js.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Router
   -------------------------------------------------------------------------- */

const PAGES = ["home", "services", "work", "links", "contact"];

function showPage(route) {
  if (!PAGES.includes(route)) route = "home";

  const currentPage = document.querySelector(".page-view[data-active='true']");
  const targetPage  = document.querySelector(`[data-page="${route}"]`);
  if (!targetPage || currentPage === targetPage) return;

  /* Update nav + mobile nav active states */
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === route);
  });

  /* Update document title */
  const titles = {
    home:     "DigitalStone AI — Intelligence that runs",
    services: "Services & Skills — DigitalStone AI",
    work:     "Case Studies — DigitalStone AI",
    links:    "Links — DigitalStone AI",
    contact:  "Contact — DigitalStone AI",
  };
  document.title = titles[route] || "DigitalStone AI";

  /* Update meta description */
  const descriptions = {
    home:     "DigitalStone AI — AI automation and consulting. We design, build, and run AI systems that drive measurable outcomes for operators, founders, and agencies.",
    services: "Six practice areas from AI automation systems to managed operations. We design, build, and run AI — not just advise. Free 45-minute diagnostic.",
    work:     "Case studies across legal, wellness, hospitality, and infrastructure. Live AI systems measured in production — not demos, not decks.",
    links:    "Where to find DigitalStone AI, the tools we use, and the resources that shape how we build AI systems.",
    contact:  "Start a project with DigitalStone AI. Free 45-minute diagnostic. We'll tell you whether AI is the right tool before you spend a dollar.",
  };
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute("content", descriptions[route] || descriptions.home);

  closeMobileNav();

  const swap = () => {
    if (currentPage) currentPage.removeAttribute("data-active");
    targetPage.setAttribute("data-active", "true");
    window.scrollTo({ top: 0, behavior: "instant" });
    if (window.animatePage) window.animatePage(route);
  };

  if (currentPage && window.pageTransition) {
    window.pageTransition(currentPage, targetPage, swap);
  } else {
    swap();
  }
}

/* Wire all [data-route] anchors */
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  if (!link) return;
  e.preventDefault();
  showPage(link.dataset.route);
});

/* --------------------------------------------------------------------------
   Mobile nav — hamburger, focus trap, keyboard close
   -------------------------------------------------------------------------- */

const navEl      = document.getElementById("main-nav");
const hamburger  = navEl.querySelector(".ds-hamburger");
const mobileNav  = document.getElementById("mobile-nav");

function openMobileNav() {
  navEl.classList.add("nav-open");
  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "Close menu");
  mobileNav.removeAttribute("aria-hidden");
  trapFocus(mobileNav);
}

function closeMobileNav() {
  navEl.classList.remove("nav-open");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Open menu");
  mobileNav.setAttribute("aria-hidden", "true");
  releaseFocus();
}

hamburger.addEventListener("click", () => {
  navEl.classList.contains("nav-open") ? closeMobileNav() : openMobileNav();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navEl.classList.contains("nav-open")) {
    closeMobileNav();
    hamburger.focus();
  }
});

/* --------------------------------------------------------------------------
   Focus trap utility
   -------------------------------------------------------------------------- */

const FOCUSABLE_SEL = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
let _trapEl = null, _firstFocus = null, _lastFocus = null;

function trapFocus(el) {
  _trapEl = el;
  const focusable = Array.from(el.querySelectorAll(FOCUSABLE_SEL));
  _firstFocus = focusable[0];
  _lastFocus  = focusable[focusable.length - 1];
  if (_firstFocus) _firstFocus.focus();
  el.addEventListener("keydown", _onTrapKey);
}

function releaseFocus() {
  if (_trapEl) _trapEl.removeEventListener("keydown", _onTrapKey);
  _trapEl = _firstFocus = _lastFocus = null;
}

function _onTrapKey(e) {
  if (e.key !== "Tab") return;
  if (e.shiftKey && document.activeElement === _firstFocus) {
    e.preventDefault(); _lastFocus.focus();
  } else if (!e.shiftKey && document.activeElement === _lastFocus) {
    e.preventDefault(); _firstFocus.focus();
  }
}

/* --------------------------------------------------------------------------
   Nav scroll state
   -------------------------------------------------------------------------- */

function updateNavScrollState() {
  navEl.classList.toggle("nav--scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", updateNavScrollState, { passive: true });

/* --------------------------------------------------------------------------
   FAQ Accordion
   GSAP height tween via window.animateFaqToggle (set by animations.js).
   Only one item open at a time.
   -------------------------------------------------------------------------- */

let _openFaqItem = null;

function initFaq() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  /* Set initial display state — GSAP owns display from here */
  items.forEach((item, i) => {
    const body   = item.querySelector(".faq-body");
    const header = item.querySelector(".faq-header");
    if (i === 0) {
      _openFaqItem = item;
      header.setAttribute("aria-expanded", "true");
      body.classList.remove("faq-body--closed");
    } else {
      header.setAttribute("aria-expanded", "false");
      gsap.set(body, { display: "none" });
    }
  });

  items.forEach((item) => {
    const header = item.querySelector(".faq-header");
    const toggle = () => _toggleFaqItem(item);
    header.addEventListener("click", toggle);
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });
}

function _toggleFaqItem(item) {
  const header = item.querySelector(".faq-header");
  const body   = item.querySelector(".faq-body");
  const isOpen = header.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    /* Close this item */
    header.setAttribute("aria-expanded", "false");
    if (window.animateFaqToggle) {
      window.animateFaqToggle(body, false);
    } else {
      body.classList.add("faq-body--closed");
    }
    _openFaqItem = null;
  } else {
    /* Close any currently open item first */
    if (_openFaqItem) {
      const prevHeader = _openFaqItem.querySelector(".faq-header");
      const prevBody   = _openFaqItem.querySelector(".faq-body");
      prevHeader.setAttribute("aria-expanded", "false");
      if (window.animateFaqToggle) {
        window.animateFaqToggle(prevBody, false);
      } else {
        prevBody.classList.add("faq-body--closed");
      }
    }
    /* Open new item */
    header.setAttribute("aria-expanded", "true");
    if (window.animateFaqToggle) {
      window.animateFaqToggle(body, true);
    } else {
      body.classList.remove("faq-body--closed");
    }
    _openFaqItem = item;
  }
}

/* --------------------------------------------------------------------------
   Case Filters — show/hide tiles by vertical
   -------------------------------------------------------------------------- */

function initCaseFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      _filterCaseTiles(btn.dataset.filter);
    });
  });
}

function _filterCaseTiles(vertical) {
  document.querySelectorAll(".case-tile").forEach((tile) => {
    const show = vertical === "All" || tile.dataset.vertical === vertical;
    if (show) {
      tile.removeAttribute("hidden");
    } else {
      tile.setAttribute("hidden", "");
    }
  });
}

/* --------------------------------------------------------------------------
   Case Tiles — click to switch deep-dive panel + scroll to it
   -------------------------------------------------------------------------- */

function initCaseTiles() {
  const tiles = document.querySelectorAll(".case-tile");
  if (!tiles.length) return;

  tiles.forEach((tile) => {
    const activate = () => {
      const caseId = tile.dataset.case;
      /* Mark tile active */
      tiles.forEach((t) => t.classList.remove("is-active-tile"));
      tile.classList.add("is-active-tile");
      /* Switch deep-dive panel */
      _switchCasePanel(caseId);
      /* Scroll to deep-dive section */
      const deepDive = document.getElementById("deep-dive");
      if (deepDive) {
        deepDive.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    tile.addEventListener("click", activate);
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
  });
}

/* --------------------------------------------------------------------------
   Case Deep-Dive Tab Switcher
   -------------------------------------------------------------------------- */

function initCaseTabs() {
  const tabs = document.querySelectorAll(".case-tab");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => _switchCasePanel(tab.dataset.case));
    /* Arrow key navigation between tabs */
    tab.addEventListener("keydown", (e) => {
      const allTabs = Array.from(tabs);
      const idx     = allTabs.indexOf(tab);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        allTabs[(idx + 1) % allTabs.length].focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        allTabs[(idx - 1 + allTabs.length) % allTabs.length].focus();
      }
    });
  });
}

function _switchCasePanel(caseId) {
  const tabs    = document.querySelectorAll(".case-tab");
  const panels  = document.querySelectorAll(".case-panel");
  const outPanel = document.querySelector(".case-panel.is-active");
  const inPanel  = document.querySelector(`.case-panel[data-case="${caseId}"]`);

  if (!inPanel || outPanel === inPanel) return;

  /* Update tabs */
  tabs.forEach((t) => {
    const active = t.dataset.case === caseId;
    t.classList.toggle("is-active", active);
    t.setAttribute("aria-selected", String(active));
  });

  /* Sync tile active state */
  document.querySelectorAll(".case-tile").forEach((tile) => {
    tile.classList.toggle("is-active-tile", tile.dataset.case === caseId);
  });

  /* Animate the panel transition */
  if (window.animateCasePanel) {
    window.animateCasePanel(outPanel, inPanel);
  } else {
    outPanel.classList.remove("is-active");
    inPanel.classList.add("is-active");
  }
}

/* --------------------------------------------------------------------------
   Contact Form — validation, async submit, success/error states
   -------------------------------------------------------------------------- */

/* Pre-fill templates keyed by project type value */
const PROJECT_TYPE_TEMPLATES = {
  "AI Automation System":
    "I'm looking to build an AI automation system to handle [specific workflow]. The process currently involves [manual steps] and I want to automate [which parts]. My goal is [desired outcome].",
  "Lead Capture & Intake Agent":
    "I need an AI-powered lead capture and intake agent for my business. I'm currently losing [estimated %] of inquiries — especially after-hours. I'd like a system that qualifies leads, books appointments, and follows up automatically.",
  "Retrieval & RAG Evaluation":
    "I have an AI assistant or knowledge base that needs evaluation. I'm concerned about hallucinations and retrieval accuracy. I'd like benchmarking, a faithfulness report, and pipeline improvements to reach production quality.",
  "Business Intelligence Agent":
    "I want a business intelligence agent that pulls data from my systems and delivers plain-English summaries — ideally via SMS or email — without requiring a dashboard login.",
  "Computer Vision & Inspection":
    "I need a computer vision pipeline to process footage or images and produce structured inspection reports with defect classification, severity scoring, and consistent output.",
  "AI Strategy Consulting":
    "I'd like a free diagnostic session to explore where AI can add real value in my business. I want an honest assessment — including whether AI is the right tool — before committing any budget.",
  "Managed AI Operations":
    "I have an existing AI system that needs ongoing monitoring, tuning, and improvement. I'm looking for a partner to run operations, catch regressions, and deliver regular intelligence briefs.",
  "Custom AI Solution":
    "I have a specific challenge that doesn't fit neatly into a category. I'd like to describe it and get your honest take on whether and how AI can help.",
};

/* Pre-fill templates keyed by quick-starter option value */
const STARTER_TEMPLATES = {
  "afterhours":
    "I'm losing customers who reach out after business hours. I need a conversational agent that responds within seconds, qualifies the lead, and books a time on my calendar — all without human involvement.",
  "hallucinations":
    "My AI assistant is nearly ready to go live, but I'm not confident it's accurate. I need a thorough evaluation of faithfulness, retrieval precision, and hallucination rate before putting it in front of customers.",
  "weekly-reports":
    "I want a system that pulls data from my business tools each week and sends me a concise, plain-English brief — key patterns, what's working, what's not — delivered straight to my phone or inbox.",
  "intake":
    "My intake process is manual, slow, and inconsistent. I want an AI system that handles the initial conversation, qualifies the lead, captures the right information, and hands off to my team — 24 hours a day.",
  "inspection":
    "I have large volumes of inspection footage or images that currently require manual review. I need an AI pipeline that classifies issues, scores severity, and generates a structured report automatically.",
  "assessment":
    "I'm not sure where AI fits in my business or whether it's the right tool. I'd like a free, no-pressure diagnostic to identify real opportunities and get a realistic picture of what's possible and what it would cost.",
  "managed":
    "I've built or deployed an AI system, but I need someone to monitor it, catch problems early, and keep it performing well over time. I'm looking for a managed operations partner.",
};

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const typeSelect    = form.querySelector("#project-type");
  const starterSelect = form.querySelector("#project-starter");
  const detailsField  = form.querySelector("#project-details");

  /* Auto-fill project details from Project Type dropdown */
  if (typeSelect && detailsField) {
    typeSelect.addEventListener("change", () => {
      const tpl = PROJECT_TYPE_TEMPLATES[typeSelect.value];
      if (tpl) {
        detailsField.value = tpl;
        if (starterSelect) starterSelect.value = "";
        _clearFieldError(detailsField);
      }
    });
  }

  /* Auto-fill project details from Quick Project Starter dropdown */
  if (starterSelect && detailsField) {
    starterSelect.addEventListener("change", () => {
      const tpl = STARTER_TEMPLATES[starterSelect.value];
      if (tpl) {
        detailsField.value = tpl;
        if (typeSelect) typeSelect.value = "";
        _clearFieldError(detailsField);
      }
    });
  }

  /* Submit handler */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!_validateForm(form)) return;

    const submit = form.querySelector(".form-submit");
    submit.textContent = "Sending…";
    submit.disabled = true;

    try {
      const res = await fetch(form.action, {
        method:  "POST",
        body:    new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        _showFormSuccess();
      } else {
        _showFormSubmitError(form, "Something went wrong. Please try again.");
        submit.textContent = "Send message ›";
        submit.disabled = false;
      }
    } catch {
      _showFormSubmitError(form, "Network error. Please check your connection and try again.");
      submit.textContent = "Send message ›";
      submit.disabled = false;
    }
  });

  /* Clear field errors on input */
  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => _clearFieldError(field));
    field.addEventListener("change", () => _clearFieldError(field));
  });
}

function _validateForm(form) {
  let valid = true;

  form.querySelectorAll(".field-error").forEach((el) => el.remove());
  form.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));

  const name    = form.querySelector('[name="name"]');
  const email   = form.querySelector('[name="email"]');
  const details = form.querySelector('[name="project_details"]');

  if (!name.value.trim()) {
    _addFieldError(name, "Name is required."); valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    _addFieldError(email, "A valid email address is required."); valid = false;
  }
  if (!details.value.trim()) {
    _addFieldError(details, "Please add some project details."); valid = false;
  }

  return valid;
}

function _addFieldError(input, message) {
  input.classList.add("input-error");
  const err = document.createElement("span");
  err.className   = "field-error";
  err.textContent = message;
  err.setAttribute("role", "alert");
  input.closest("label").appendChild(err);
}

function _clearFieldError(input) {
  input.classList.remove("input-error");
  const label = input.closest("label");
  if (label) label.querySelectorAll(".field-error").forEach((el) => el.remove());
}

function _showFormSubmitError(form, message) {
  let errEl = form.querySelector(".form-submit-error");
  if (!errEl) {
    errEl = document.createElement("p");
    errEl.className = "form-submit-error";
    errEl.setAttribute("role", "alert");
    form.querySelector(".form-footer").prepend(errEl);
  }
  errEl.textContent = message;
}

function _showFormSuccess() {
  const defaultState  = document.getElementById("form-default");
  const successState  = document.getElementById("form-success");

  if (defaultState)  defaultState.classList.remove("form-state--visible");
  if (successState)  {
    successState.classList.add("form-state--visible");
    /* Animate success state in if GSAP is available */
    if (window.gsap) {
      gsap.from(".form-success-icon", { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });
      gsap.from("#form-success .form-title, #form-success .form-intro, #form-success .pill-btn", {
        autoAlpha: 0, y: 16, stagger: 0.1, duration: 0.4, ease: "power2.out", delay: 0.2,
      });
    }
  }
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
  initFaq();
  initCaseFilters();
  initCaseTiles();
  initCaseTabs();
  initContactForm();
});
