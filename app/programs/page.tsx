"use client";
import { useState, Suspense } from "react";
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

const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
  UG:  { bg: "#e8f4f8", color: "#0B5394" },
  PG:  { bg: "#fef3e2", color: "#986D00" },
  PhD: { bg: "#f3e8f4", color: "#6B3774" },
};

function ProgramRow({ prog, uniName, onInquire }: { prog: Program; uniName: string; onInquire: () => void }) {
  const lc = LEVEL_COLORS[prog.level] ?? { bg: "#eee", color: "#333" };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        background: "#fff",
        border: "1px solid rgba(11,28,45,0.07)",
        borderRadius: 10,
        padding: "0.7rem 0.9rem",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(11,28,45,0.16)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(11,28,45,0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(11,28,45,0.07)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: "0.83rem", fontWeight: 700, color: "var(--navy)", lineHeight: 1.35, marginBottom: "0.3rem" }}>
          {prog.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.6rem", fontWeight: 800, padding: "0.18rem 0.55rem",
            borderRadius: 100, background: lc.bg, color: lc.color, letterSpacing: "0.04em",
          }}>
            {prog.level}
          </span>
          {prog.language && (
            <span style={{ fontSize: "0.65rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: 3 }}>
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
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: "var(--navy)",
          color: "#fff",
          fontSize: "0.65rem",
          fontWeight: 700,
          padding: "0.35rem 0.7rem",
          borderRadius: 7,
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.03em",
          transition: "background 0.18s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--navy-light)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--navy)"; }}
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

  return (
    <>
      {/* ── Hero ── */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(11,28,45,0.97) 0%, rgba(11,28,45,0.82) 100%), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80') center/cover no-repeat`,
          padding: "5.5rem 0 4.5rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
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
              Curriculum Hub
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1rem",
              lineHeight: 1.12,
            }}
          >
            Explore <em style={{ color: "var(--gold)" }}>All Programs</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
            Browse hundreds of undergraduate, postgraduate, and doctoral programs across premier Turkish universities.
          </p>

          {/* Search bar */}
          <div
            className="relative max-w-2xl mx-auto"
            style={{
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              padding: "0.35rem 0.35rem 0.35rem 1.1rem",
              gap: 8,
            }}
          >
            <Search size={17} strokeWidth={2.2} color="rgba(11,28,45,0.35)" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search programs, faculties, universities…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "0.9rem",
                color: "var(--navy)",
                background: "transparent",
                padding: "0.55rem 0",
                fontFamily: "inherit",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(11,28,45,0.08)",
                  color: "#666",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                }}
              >
                ✕
              </button>
            )}
            <button
              style={{
                flexShrink: 0,
                background: "var(--navy)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "0.55rem 1.1rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.18s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--navy-light)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--navy)"; }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
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
                        boxShadow: active
                          ? "0 1px 4px rgba(11,28,45,0.12), 0 0 0 0.5px rgba(11,28,45,0.06)"
                          : "none",
                      }}
                    >
                      {lvl === "ALL" ? "All" : lvl}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 22, background: "rgba(11,28,45,0.1)", flexShrink: 0 }} />

              {/* University select */}
              <Select value={selectedUniFilter} onValueChange={setSelectedUniFilter}>
                <SelectTrigger
                  className="text-xs font-semibold"
                  style={{
                    height: 34,
                    width: 200,
                    borderRadius: 10,
                    border: selectedUniFilter !== "ALL"
                      ? "1.5px solid var(--navy)"
                      : "1.5px solid rgba(11,28,45,0.14)",
                    background: selectedUniFilter !== "ALL" ? "var(--navy)" : "#fff",
                    color: selectedUniFilter !== "ALL" ? "#fff" : "#444",
                    boxShadow: "none",
                    paddingLeft: "0.75rem",
                  }}
                >
                  <svg
                    width="10" height="12" viewBox="0 0 10 12" fill="none"
                    style={{ flexShrink: 0, opacity: selectedUniFilter !== "ALL" ? 0.85 : 0.45 }}
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
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(198,40,40,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(198,40,40,0.05)"; }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  Reset
                </button>
              )}
            </div>

            {/* Result count chip */}
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
              <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>
                {totalPrograms}
              </span>
              <span style={{ fontSize: "0.72rem", color: "#888", fontWeight: 600 }}>
                {totalPrograms === 1 ? "program" : "programs"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Programs List ── */}
      <section style={{ background: "var(--bg)", padding: "3rem 0 4rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {displayData.length === 0 ? (
            <div
              className="text-center py-20"
              style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(11,28,45,0.07)" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
                No programs found
              </h3>
              <p style={{ color: "#9ca3af", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                Try a different search term or adjust your filters.
              </p>
              <button
                onClick={() => { setSearch(""); setLevelFilter("ALL"); setSelectedUniFilter("ALL"); }}
                className="btn-navy"
                style={{ textTransform: "none", fontSize: "0.85rem" }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {displayData.map((uni) => (
                <div
                  key={uni.id}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(11,28,45,0.05), 0 4px 20px rgba(11,28,45,0.05)",
                    border: "1px solid rgba(11,28,45,0.06)",
                  }}
                >
                  {/* University header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "1.1rem 1.4rem",
                      borderBottom: "1px solid rgba(11,28,45,0.07)",
                      background: "rgba(11,28,45,0.02)",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        overflow: "hidden",
                        border: "2px solid var(--gold)",
                        flexShrink: 0,
                      }}
                    >
                      <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h2
                        style={{
                          fontSize: "1rem",
                          fontWeight: 800,
                          color: "var(--navy)",
                          lineHeight: 1.3,
                          marginBottom: "0.15rem",
                        }}
                      >
                        {uni.name}
                      </h2>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                          <path d="M4.5 0C2.01 0 0 2.01 0 4.5c0 3.375 4.5 6.5 4.5 6.5S9 7.875 9 4.5C9 2.01 6.99 0 4.5 0zm0 6.125A1.625 1.625 0 1 1 4.5 2.875a1.625 1.625 0 0 1 0 3.25z" fill="#9ca3af"/>
                        </svg>
                        <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{uni.city}, Türkiye</span>
                      </div>
                    </div>

                    <div
                      style={{
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.3)",
                        borderRadius: 8,
                        padding: "0.3rem 0.75rem",
                      }}
                    >
                      <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>
                        {uni.faculties.reduce((s, f) => s + f.programs.length, 0)}
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "#888", fontWeight: 600 }}>programs</span>
                    </div>
                  </div>

                  {/* Faculty accordions */}
                  <div style={{ padding: "1rem 1.4rem 1.4rem" }}>
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
                                <span
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    background: "rgba(255,255,255,0.1)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1rem",
                                    flexShrink: 0,
                                  }}
                                >
                                  {faculty.icon}
                                </span>
                                <span className="font-semibold text-sm">{faculty.name}</span>
                                <span
                                  style={{
                                    fontSize: "0.62rem",
                                    fontWeight: 800,
                                    padding: "0.15rem 0.5rem",
                                    borderRadius: 100,
                                    background: "rgba(212,175,55,0.25)",
                                    color: "var(--gold)",
                                    letterSpacing: "0.04em",
                                  }}
                                >
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
        style={{
          background: `linear-gradient(135deg, var(--navy) 0%, #122840 100%)`,
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: 280, height: 280, borderRadius: "50%", background: "rgba(212,175,55,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: 200, height: 200, borderRadius: "50%", background: "rgba(212,175,55,0.05)", pointerEvents: "none" }} />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center" style={{ position: "relative" }}>
          <div
            className="inline-flex items-center gap-2 mb-5"
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
            className="font-display"
            style={{
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Found Your Program?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "2rem", fontSize: "0.95rem" }}>
            Click Inquire next to any program, or start a free consultation with our admission specialists.
          </p>
          <button
            onClick={() => { setPopupProgram(""); setPopupOpen(true); }}
            className="btn-gold"
            style={{ fontSize: "0.95rem", textTransform: "none", padding: "0.85rem 2.2rem" }}
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
        <div className="min-h-[60vh] flex items-center justify-center" style={{ color: "#9ca3af" }}>
          Loading programs…
        </div>
      }
    >
      <ProgramsContent />
    </Suspense>
  );
}
