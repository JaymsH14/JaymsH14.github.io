/* ==========================================================================
   gsap-config.js — DigitalStone AI
   Plugin registration and global GSAP defaults.
   Uses GSAP core + ScrollTrigger only (both free, no Club license needed).
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: "power2.out",
  duration: 0.7,
});
