"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { universities } from "@/lib/data";
import ApplyPopup from "@/components/ApplyPopup";
import type { Program } from "@/lib/data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useHeroAnimation, useScrollFadeUp, useStaggerReveal } from "@/lib/gsap-animations";

const LEVEL_CLASSES: Record<string, string> = {
  UG:  "badge-ug",
  PG:  "badge-pg",
  PhD: "badge-phd",
};

function ProgramRow({ prog, uniName, onInquire }: { prog: Program; uniName: string; onInquire: () => void }) {
  const badgeClass = LEVEL_CLASSES[prog.level] ?? "bg-gray-200 text-gray-700";
  return (
    <div className="flex items-center justify-between gap-3 bg-white border border-navy/10 rounded-[10px] py-2.5 px-3.5 transition-all duration-200 hover:border-navy/20 hover:shadow-[0_2px_12px_rgba(11,28,45,0.07)]">
      <div className="min-w-0 flex-1">
        <p className="text-[0.83rem] font-bold text-navy leading-[1.35] mb-1">
          {prog.name}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[0.6rem] font-extrabold px-2 py-0.5 rounded-full tracking-[0.04em] ${badgeClass}`}>
            {prog.level}
          </span>
          {prog.language && (
            <span className="text-[0.65rem] text-gray-400 flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <circle cx="4.5" cy="4.5" r="4" stroke="currentColor" strokeWidth="1"/>
                <path d="M1 4.5h7M4.5 1c-1 1.5-1 5 0 7M4.5 1c1 1.5 1 5 0 7" stroke="currentColor" strokeWidth="0.8"/>
              </svg>
              {prog.language}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onInquire}
        title={`Inquire about ${prog.name}`}
        className="shrink-0 inline-flex items-center gap-1.5 bg-navy text-white text-[0.65rem] font-bold py-1.5 px-2.5 rounded-lg border-none cursor-pointer tracking-[0.03em] transition-colors duration-200 hover:bg-navy-light whitespace-nowrap"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M9 7.167l-1.75-.208a.833.833 0 0 0-.692.233l-1.275 1.275A7.425 7.425 0 0 1 2.533 5.717L3.812 4.44a.833.833 0 0 0 .234-.692L3.833 2a.833.833 0 0 0-.829-.75H1.667A.833.833 0 0 0 .833 2.167 8.158 8.158 0 0 0 9 9.333.833.833 0 0 0 9.833 8.5V8a.833.833 0 0 0-.833-.833z" fill="currentColor"/>
        </svg>
        Inquire
      </button>
    </div>
  );
}

function ProgramsContent() {
  const searchParams = useSearchParams();
  const preselectedUni = searchParams.get("university");

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"ALL" | "UG" | "PG" | "PhD">("ALL");
  const [selectedUniFilter, setSelectedUniFilter] = useState<string>(preselectedUni || "ALL");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupProgram, setPopupProgram] = useState("");

  const handleInquire = (program: string, uniName: string) => {
    setPopupProgram(`${program} — ${uniName}`);
    setPopupOpen(true);
  };

  const searchLower = search.toLowerCase();
  const displayData = universities
    .filter((uni) => selectedUniFilter === "ALL" || uni.id === selectedUniFilter)
    .map((uni) => {
      const faculties = uni.faculties
        .map((fac) => {
          const programs = fac.programs.filter((p) => {
            const levelMatch = levelFilter === "ALL" || p.level === levelFilter;
            const searchMatch =
              search === "" ||
              p.name.toLowerCase().includes(searchLower) ||
              fac.name.toLowerCase().includes(searchLower) ||
              uni.name.toLowerCase().includes(searchLower);
            return levelMatch && searchMatch;
          });
          return { ...fac, programs };
        })
        .filter((f) => f.programs.length > 0);
      return { ...uni, faculties };
    })
    .filter((uni) => uni.faculties.length > 0);

  const totalPrograms = displayData.reduce(
    (sum, uni) => sum + uni.faculties.reduce((s, f) => s + f.programs.length, 0),
    0
  );

  const hasActiveFilter = search !== "" || levelFilter !== "ALL" || selectedUniFilter !== "ALL";

  const heroRef    = useHeroAnimation();
  const listRef    = useScrollFadeUp(".gs-fade");
  const ctaRef     = useStaggerReveal();

  return (
    <>
      {/* ── Hero ── */}
      <div ref={heroRef} className="programs-hero-bg pt-22 pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center gs-hero">
          <div className="inline-flex items-center gap-2 mb-5 bg-gold/10 border border-gold/30 rounded-full py-1.5 px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold">
              Curriculum Hub
            </span>
          </div>

          <h1 className="font-display tracking-wider text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white mb-4 leading-tight">
            Explore <em className="text-gold">All Programs</em>
          </h1>
          <p className="text-white/65 text-[1.05rem] max-w-130 mx-auto mb-10 leading-[1.75]">
            Browse hundreds of undergraduate, postgraduate, and doctoral programs across premier Turkish universities.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto bg-white rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.2)] flex items-center p-1.5 pl-[1.1rem] gap-2">
            <Search size={17} strokeWidth={2.2} className="shrink-0 text-navy/35" />
            <input
              type="text"
              placeholder="Search programs, faculties, universities…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none outline-none text-[0.9rem] text-navy bg-transparent py-2.5 font-[inherit]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                type="button"
                className="shrink-0 w-6.5 h-6.5 rounded-full border-none bg-navy/8 text-gray-600 cursor-pointer flex items-center justify-center text-[0.7rem]"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              className="shrink-0 bg-navy text-white border-none rounded-[10px] py-2.5 px-4 text-[0.8rem] font-bold cursor-pointer transition-colors duration-200 hover:bg-navy-light"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="sticky z-50 top-18 bg-[rgba(247,249,252,0.92)] backdrop-blur-xl border-b border-navy/10 shadow-[0_4px_24px_rgba(11,28,45,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">

            <div className="flex flex-wrap items-center gap-3">
              {/* Segmented level control */}
              <div className="inline-flex bg-navy/5 rounded-[10px] p-0.75 gap-0.5">
                {(["ALL", "UG", "PG", "PhD"] as const).map((lvl) => {
                  const active = levelFilter === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={`py-1.5 px-3.5 rounded-lg text-[0.72rem] font-bold border-none cursor-pointer tracking-[0.03em] transition-all duration-200 ${
                        active ? "bg-white text-navy shadow-[0_1px_4px_rgba(11,28,45,0.12),0_0_0_0.5px_rgba(11,28,45,0.06)]" : "bg-transparent text-gray-500"
                      }`}
                    >
                      {lvl === "ALL" ? "All" : lvl}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-px h-5.5 bg-navy/10 shrink-0" />

              {/* University select */}
              <Select value={selectedUniFilter} onValueChange={setSelectedUniFilter}>
                <SelectTrigger
                  className={`text-xs font-semibold h-8.5 w-50 rounded-[10px] shadow-none pl-3 ${
                    selectedUniFilter !== "ALL"
                      ? "border-[1.5px] border-navy bg-navy text-white"
                      : "border-[1.5px] border-navy/15 bg-white text-gray-700"
                  }`}
                >
                  <svg
                    width="10" height="12" viewBox="0 0 10 12" fill="none"
                    className={`shrink-0 ${selectedUniFilter !== "ALL" ? "opacity-85" : "opacity-45"}`}
                  >
                    <rect x="1" y="1" width="8" height="10" rx="1" stroke={selectedUniFilter !== "ALL" ? "#fff" : "var(--navy)"} strokeWidth="1.2"/>
                    <path d="M3 4h4M3 6.5h4M3 9h2.5" stroke={selectedUniFilter !== "ALL" ? "#fff" : "var(--navy)"} strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  <SelectValue placeholder="All Universities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Universities</SelectItem>
                  {universities.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear */}
              {hasActiveFilter && (
                <button
                  onClick={() => { setSearch(""); setLevelFilter("ALL"); setSelectedUniFilter("ALL"); }}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-[0.7rem] font-bold border-[1.5px] border-red/25 bg-red/5 text-red cursor-pointer transition-colors duration-150 hover:bg-red/10"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  Reset
                </button>
              )}
            </div>

            {/* Result count chip */}
            <div className="inline-flex items-center gap-1.5 bg-navy/5 rounded-lg py-1.5 px-3">
              <span className="text-base font-extrabold text-navy leading-none">
                {totalPrograms}
              </span>
              <span className="text-[0.72rem] text-gray-500 font-semibold">
                {totalPrograms === 1 ? "program" : "programs"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Programs List ── */}
      <section ref={listRef as React.RefObject<HTMLElement>} className="bg-bg py-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {displayData.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-navy/10">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-[1.1rem] font-bold text-navy mb-2">
                No programs found
              </h3>
              <p className="text-gray-400 mb-6 text-[0.9rem]">
                Try a different search term or adjust your filters.
              </p>
              <button
                onClick={() => { setSearch(""); setLevelFilter("ALL"); setSelectedUniFilter("ALL"); }}
                className="btn-navy normal-case text-[0.85rem]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {displayData.map((uni) => (
                <div
                  key={uni.id}
                  className="gs-fade bg-white rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(11,28,45,0.05),0_4px_20px_rgba(11,28,45,0.05)] border border-navy/10"
                >
                  {/* University header */}
                  <div className="flex items-center gap-3.5 py-4 px-5 border-b border-navy/10 bg-navy/5">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-[10px] overflow-hidden border-2 border-gold shrink-0">
                      <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-extrabold text-navy leading-tight mb-0.5">
                        {uni.name}
                      </h2>
                      <div className="flex items-center gap-1.5">
                        <svg width="9" height="11" viewBox="0 0 9 11" fill="none" className="text-gray-400">
                          <path d="M4.5 0C2.01 0 0 2.01 0 4.5c0 3.375 4.5 6.5 4.5 6.5S9 7.875 9 4.5C9 2.01 6.99 0 4.5 0zm0 6.125A1.625 1.625 0 1 1 4.5 2.875a1.625 1.625 0 0 1 0 3.25z" fill="currentColor"/>
                        </svg>
                        <span className="text-[0.72rem] text-gray-400">{uni.city}, Türkiye</span>
                      </div>
                    </div>

                    <div className="shrink-0 inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 rounded-lg py-1.5 px-3">
                      <span className="text-[0.88rem] font-extrabold text-navy leading-none">
                        {uni.faculties.reduce((s, f) => s + f.programs.length, 0)}
                      </span>
                      <span className="text-[0.65rem] text-gray-500 font-semibold">programs</span>
                    </div>
                  </div>

                  {/* Faculty accordions */}
                  <div className="p-4 px-5 pb-5">
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={`${uni.id}-${uni.faculties[0]?.name}`}
                      className="space-y-2"
                    >
                      {uni.faculties.map((faculty) => {
                        const key = `${uni.id}-${faculty.name}`;
                        return (
                          <AccordionItem key={key} value={key}>
                            <AccordionTrigger>
                              <div className="flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-lg bg-white/10 inline-flex items-center justify-center text-base shrink-0">
                                  {faculty.icon}
                                </span>
                                <span className="font-semibold text-sm">{faculty.name}</span>
                                <span className="text-[0.62rem] font-extrabold py-0.5 px-2 rounded-full bg-gold/25 text-gold tracking-[0.04em]">
                                  {faculty.programs.length}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                                {faculty.programs.map((prog: Program) => (
                                  <ProgramRow
                                    key={prog.name + prog.level}
                                    prog={prog}
                                    uniName={uni.name}
                                    onInquire={() => handleInquire(prog.name, uni.name)}
                                  />
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="cta-section-bg py-20 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-70 h-70 rounded-full bg-gold/7 pointer-events-none" />
        <div className="absolute -bottom-15 -left-15 w-50 h-50 rounded-full bg-gold/5 pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center gs-stagger relative">
          <div className="inline-flex items-center gap-2 mb-5 bg-gold/10 border border-gold/25 rounded-full py-1.5 px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            <span className="text-xs font-bold tracking-[0.14em] uppercase text-gold">
              Free Guidance
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-white mb-4 leading-tight">
            Found Your Program?
          </h2>
          <p className="text-white/60 leading-[1.75] mb-8 text-[0.95rem]">
            Click Inquire next to any program, or start a free consultation with our admission specialists.
          </p>
          <button
            onClick={() => { setPopupProgram(""); setPopupOpen(true); }}
            className="btn-gold text-[0.95rem] normal-case py-3.5 px-9"
          >
            Start Free Consultation →
          </button>
        </div>
      </section>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} prefilledProgram={popupProgram} />
    </>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
          Loading programs…
        </div>
      }
    >
      <ProgramsContent />
    </Suspense>
  );
}
