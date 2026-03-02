import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Hero: fade-up children with stagger ─────────────────────────────── */
export function useHeroAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".gs-hero > *");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

/* ─── Fade-up on scroll for any section ───────────────────────────────── */
export function useScrollFadeUp(selector = ".gs-fade") {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(el.querySelectorAll(selector)).forEach((target) => {
        gsap.fromTo(
          target,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: target,
              start: "top 88%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, [selector]);
  return ref;
}

/* ─── Staggered children — group trigger (small sets: CTAs, step grids) ── */
export function useStaggerReveal(selector = ".gs-stagger", stagger = 0.1) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(selector);
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [selector, stagger]);
  return ref;
}

/* ─── Individual card reveal — subtle slide-up as each card enters view ── */
export function useCardReveal(selector = ".gs-card") {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(el.querySelectorAll(selector)).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 30 },
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [selector]);
  return ref;
}

/* ─── Slide-in from left / right (two-col layouts) ────────────────────── */
export function useSplitReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const left  = el.querySelector(".gs-left");
      const right = el.querySelector(".gs-right");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
      });
      if (left)  tl.fromTo(left,  { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0);
      if (right) tl.fromTo(right, { opacity: 0, x:  50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0.15);
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

/* ─── Scale-in for single hero elements (form card, images) ───────────── */
export function useScaleIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.96, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}
