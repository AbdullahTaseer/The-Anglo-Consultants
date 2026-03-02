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
      <span ref={ref} className="font-display font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1 }}>
        {count}{suffix}
      </span>
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.85)" }}>
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
      <div
        ref={heroRef}
        style={{
          background: `linear-gradient(135deg, rgba(11,28,45,0.97) 0%, rgba(11,28,45,0.82) 100%), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1800&q=80') center/cover no-repeat`,
          padding: "5.5rem 0 4.5rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center gs-hero">
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "var(--gold)" }}>
              Institution Portfolio
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1.1rem",
              lineHeight: 1.12,
            }}
          >
            Premier Institutions <br className="hidden sm:block" />
            of <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Türkiye</em>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              maxWidth: "520px",
              margin: "0 auto 3rem",
              lineHeight: 1.75,
            }}
          >
            Discover world-class campuses where your future begins. Browse our curated portfolio of partner universities.
          </p>

          {/* Stats row */}
          <div
            className="inline-flex flex-wrap justify-center gap-8 sm:gap-14"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "2rem",
            }}
          >
            <StatItem value={universities.length} label="Partner Universities" />
            <StatItem value={totalPrograms} suffix="+" label="Programs Offered" />
            <StatItem value={cities.length - 1} label="Cities Covered" />
          </div>
        </div>
      </div>

      {/* ── Filter Bar ───────────────────────────────────── */}
      <div
        className="sticky z-50"
        style={{
          top: 72,
          background: "rgba(247,249,252,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(11,28,45,0.07)",
          boxShadow: "0 4px 24px rgba(11,28,45,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">

            {/* Left group */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Segmented level control */}
              <div
                style={{
                  display: "inline-flex",
                  background: "rgba(11,28,45,0.06)",
                  borderRadius: 10,
                  padding: "3px",
                  gap: 2,
                }}
              >
                {(["ALL", "UG", "PG", "PhD"] as const).map((lvl) => {
                  const active = levelFilter === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      style={{
                        padding: "0.32rem 0.85rem",
                        borderRadius: 8,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "0.03em",
                        transition: "background 0.18s, color 0.18s, box-shadow 0.18s",
                        background: active ? "#fff" : "transparent",
                        color: active ? "var(--navy)" : "#888",
                        boxShadow: active ? "0 1px 4px rgba(11,28,45,0.12), 0 0 0 0.5px rgba(11,28,45,0.06)" : "none",
                      }}
                    >
                      {lvl === "ALL" ? "All" : lvl}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 22, background: "rgba(11,28,45,0.1)", flexShrink: 0 }} />

              {/* City select — pill styled */}
              <div style={{ position: "relative" }}>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger
                    className="text-xs font-semibold"
                    style={{
                      height: 34,
                      width: 148,
                      borderRadius: 10,
                      border: cityFilter !== "ALL"
                        ? "1.5px solid var(--navy)"
                        : "1.5px solid rgba(11,28,45,0.14)",
                      background: cityFilter !== "ALL" ? "var(--navy)" : "#fff",
                      color: cityFilter !== "ALL" ? "#fff" : "#444",
                      boxShadow: "none",
                      paddingLeft: "0.75rem",
                    }}
                  >
                    <svg
                      width="10" height="12" viewBox="0 0 10 12" fill="none"
                      style={{ flexShrink: 0, opacity: cityFilter !== "ALL" ? 0.85 : 0.5 }}
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
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "0.32rem 0.75rem",
                    borderRadius: 8,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    border: "1.5px solid rgba(198,40,40,0.25)",
                    background: "rgba(198,40,40,0.05)",
                    color: "var(--red)",
                    cursor: "pointer",
                    transition: "background 0.15s",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(198,40,40,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(198,40,40,0.05)"; }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  Reset
                </button>
              )}
            </div>

            {/* Right: result count */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(11,28,45,0.05)",
                borderRadius: 8,
                padding: "0.3rem 0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "var(--navy)",
                  lineHeight: 1,
                }}
              >
                {filtered.length}
              </span>
              <span style={{ fontSize: "0.72rem", color: "#888", fontWeight: 600 }}>
                {filtered.length === 1 ? "university" : "universities"}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── University Grid ───────────────────────────────── */}
      <section ref={gridRef as React.RefObject<HTMLElement>} style={{ background: "var(--bg)", padding: "3rem 0 4rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div
              className="text-center py-20"
              style={{
                background: "#fff",
                borderRadius: 12,
                border: "1px solid rgba(11,28,45,0.07)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
              <p style={{ color: "#888", fontSize: "1rem", marginBottom: "1.5rem" }}>
                No universities match your filters.
              </p>
              <button
                onClick={() => { setLevelFilter("ALL"); setCityFilter("ALL"); }}
                className="btn-navy"
                style={{ textTransform: "none", fontSize: "0.85rem" }}
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
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        style={{
          background: `linear-gradient(135deg, var(--navy) 0%, #122840 100%)`,
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(212,175,55,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(212,175,55,0.05)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center" style={{ position: "relative" }}>
          <div
            className="gs-stagger inline-flex items-center gap-2 mb-5"
            style={{
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.25)",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            <span className="text-xs font-bold tracking-[0.14em] uppercase" style={{ color: "var(--gold)" }}>
              Free Guidance
            </span>
          </div>

          <h2
            className="gs-stagger font-display"
            style={{
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Not Sure Which University<br className="hidden sm:block" /> Is Right for You?
          </h2>
          <p className="gs-stagger" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "2rem", fontSize: "0.95rem" }}>
            Our specialists match you with the perfect institution based on your academic profile, budget, and career goals.
          </p>
          <button
            onClick={() => setPopupOpen(true)}
            className="gs-stagger btn-gold"
            style={{ fontSize: "0.95rem", textTransform: "none", padding: "0.85rem 2.2rem" }}
          >
            Get a Free Consultation
          </button>
        </div>
      </section>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} prefilledProgram={selectedUni} />
    </>
  );
}
