"use client";
import React, { useState, useEffect, useRef } from "react";
import { universities } from "@/lib/data";
import ApplyPopup from "@/components/ApplyPopup";
import UniversityCard from "@/components/UniversityCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useHeroAnimation, useStaggerReveal, useCardReveal } from "@/lib/gsap-animations";

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-1">
      <span ref={ref} className="font-display font-bold text-white text-[clamp(2rem,4vw,2.8rem)] leading-none">
        {count}{suffix}
      </span>
      <span className="text-xs font-semibold tracking-widest uppercase text-gold/85">
        {label}
      </span>
    </div>
  );
}

export default function UniversitiesPage() {
  const [levelFilter, setLevelFilter] = useState<"ALL" | "UG" | "PG" | "PhD">("ALL");
  const [cityFilter, setCityFilter] = useState<string>("ALL");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState<string>("");

  const heroRef  = useHeroAnimation();
  const gridRef  = useCardReveal();
  const ctaRef   = useStaggerReveal();

  const cities = ["ALL", ...Array.from(new Set(universities.map((u) => u.city)))];
  const totalPrograms = universities.reduce(
    (acc, u) => acc + u.faculties.reduce((a, f) => a + f.programs.length, 0),
    0
  );

  const filtered = universities.filter((uni) => {
    const cityMatch = cityFilter === "ALL" || uni.city === cityFilter;
    const levelMatch =
      levelFilter === "ALL" ||
      uni.faculties.some((f) => f.programs.some((p) => p.level === levelFilter));
    return cityMatch && levelMatch;
  });

  const handleRequestFee = (uniName: string) => {
    setSelectedUni(`Inquiry for ${uniName}`);
    setPopupOpen(true);
  };

  const hasActiveFilter = levelFilter !== "ALL" || cityFilter !== "ALL";

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div ref={heroRef} className="universities-hero-bg pt-22 pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center gs-hero">
          <div className="inline-flex items-center gap-2 mb-5 pill-badge">
            <span className="pill-dot" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold">
              Institution Portfolio
            </span>
          </div>

          <h1 className="font-display tracking-wide text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white mb-[1.1rem] leading-[1.12]">
            Premier Institutions <br className="hidden sm:block" />
            of <em className="text-gold italic">Turkiye</em>
          </h1>

          <p className="text-white/65 text-[1.05rem] max-w-130 mx-auto mb-12 leading-[1.75]">
            Discover world-class campuses where your future begins. Browse our curated portfolio of partner universities.
          </p>

          {/* Stats row */}
          <div className="inline-flex flex-wrap justify-center gap-8 sm:gap-14 border-t border-white/10 pt-8">
            <StatItem value={universities.length} label="Partner Universities" />
            <StatItem value={totalPrograms} suffix="+" label="Programs Offered" />
            <StatItem value={cities.length - 1} label="Cities Covered" />
          </div>
        </div>
      </div>

      {/* ── Filter Bar ───────────────────────────────────── */}
      <div className="sticky z-50 top-18 filter-bar-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">

            {/* Left group */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Segmented level control */}
              <div className="inline-flex segmented-bg">
                {(["ALL", "UG", "PG", "PhD"] as const).map((lvl) => {
                  const active = levelFilter === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={`py-[0.32rem] px-[0.85rem] rounded-lg text-[0.72rem] font-bold border-none cursor-pointer tracking-[0.03em] transition-all duration-200 ${active ? "segmented-btn-active" : "segmented-btn-inactive"}`}
                    >
                      {lvl === "ALL" ? "All" : lvl}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-px h-5.5 bg-navy/10 shrink-0" />

              {/* City select — pill styled */}
              <div className="relative">
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger
                    className={`text-xs font-semibold select-trigger-neutral ${cityFilter !== "ALL" ? "select-trigger-active" : ""}`}
                  >
                    <svg
                      width="10" height="12" viewBox="0 0 10 12" fill="none"
                      className={`shrink-0 ${cityFilter !== "ALL" ? "opacity-85" : "opacity-50"}`}
                    >
                      <path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                        fill={cityFilter !== "ALL" ? "#fff" : "var(--navy)"} />
                    </svg>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c === "ALL" ? "All Cities" : c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear filters */}
              {hasActiveFilter && (
                <button
                  onClick={() => { setLevelFilter("ALL"); setCityFilter("ALL"); }}
                  className="inline-flex items-center gap-1.5 py-[0.32rem] px-3 rounded-lg text-[0.7rem] font-bold filter-clear-btn cursor-pointer transition-colors duration-150 tracking-[0.02em]"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  Reset
                </button>
              )}
            </div>

            {/* Right: result count */}
            <div className="inline-flex items-center gap-1.5 bg-navy/5 rounded-lg py-[0.3rem] px-3">
              <span className="text-base font-extrabold text-navy leading-none">
                {filtered.length}
              </span>
              <span className="text-[0.72rem] text-[#888] font-semibold">
                {filtered.length === 1 ? "university" : "universities"}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── University Grid ───────────────────────────────── */}
      <section ref={gridRef as React.RefObject<HTMLElement>} className="bg-bg py-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-navy/[0.07]">
              <div className="text-[2.5rem] mb-4">🔍</div>
              <p className="text-[#888] text-base mb-6">
                No universities match your filters.
              </p>
              <button
                onClick={() => { setLevelFilter("ALL"); setCityFilter("ALL"); }}
                className="btn-navy normal-case text-[0.85rem]"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((uni) => (
                <UniversityCard
                  key={uni.id}
                  uni={uni}
                  className="gs-card"
                  onFeeRequest={handleRequestFee}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section ref={ctaRef as React.RefObject<HTMLElement>} className="cta-section-bg py-20 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="cta-deco-circle-top" />
        <div className="cta-deco-circle-bottom" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="gs-stagger inline-flex items-center gap-2 mb-5 pill-badge-alt">
            <span className="pill-dot" />
            <span className="text-xs font-bold tracking-[0.14em] uppercase text-gold">
              Free Guidance
            </span>
          </div>

          <h2 className="gs-stagger font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-white mb-4 leading-[1.2]">
            Not Sure Which University<br className="hidden sm:block" /> Is Right for You?
          </h2>
          <p className="gs-stagger text-white/60 leading-[1.75] mb-8 text-[0.95rem]">
            Our specialists match you with the perfect institution based on your academic profile, budget, and career goals.
          </p>
          <button
            onClick={() => setPopupOpen(true)}
            className="gs-stagger btn-gold text-[0.95rem] normal-case py-[0.85rem] px-[2.2rem]"
          >
            Get a Free Consultation
          </button>
        </div>
      </section>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} prefilledProgram={selectedUni} />
    </>
  );
}
