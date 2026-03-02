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
import { Search, PhoneCall } from "lucide-react";

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

  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(11,28,45,0.97) 0%, rgba(11,28,45,0.82) 100%), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80') center/cover no-repeat`,
          padding: "5rem 0 4rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
            Curriculum Hub
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 700,
              color: "#fff",
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Explore <em>All Programs</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Browse hundreds of undergraduate, postgraduate, and doctoral programs across premier Turkish universities.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={18} strokeWidth={2} color="rgba(11,28,45,0.45)" />
            </div>
            <input
              type="text"
              className="search-bar"
              placeholder="What would you like to study? (e.g. Medicine, Computer Engineering, MBA...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="bg-white border-b border-[#0B1C2D]/10 sticky top-18 z-50"
        style={{ padding: "1rem 0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0B1C2D]">
                Filter:
              </span>

              {/* Level pill buttons */}
              <div className="flex items-center gap-1.5">
                {(["ALL", "UG", "PG", "PhD"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`px-4 py-1.5 rounded text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                      levelFilter === lvl
                        ? "bg-[#0B1C2D] text-white border-transparent"
                        : "bg-transparent text-[#2E2E2E] border-[#dde3ea] hover:border-[#0B1C2D]"
                    }`}
                  >
                    {lvl === "ALL" ? "All Levels" : lvl}
                  </button>
                ))}
              </div>

              {/* University shadcn Select */}
              <Select value={selectedUniFilter} onValueChange={setSelectedUniFilter}>
                <SelectTrigger className="w-44 sm:w-52">
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
            </div>

            <div className="flex items-center gap-3">
              {(search || levelFilter !== "ALL" || selectedUniFilter !== "ALL") && (
                <button
                  onClick={() => { setSearch(""); setLevelFilter("ALL"); setSelectedUniFilter("ALL"); }}
                  className="text-xs font-semibold text-[#C62828] cursor-pointer bg-transparent border-none hover:underline"
                >
                  Clear filters ✕
                </button>
              )}
              <span className="text-sm text-[#888]">
                <strong className="text-[#0B1C2D]">{totalPrograms}</strong> programs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Accordions */}
      <section style={{ background: "var(--bg)", padding: "3.5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {displayData.length === 0 ? (
            <div className="text-center py-16">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              <h3 className="text-xl font-bold text-[#0B1C2D] mb-2">No programs found</h3>
              <p className="text-[#888] mb-4">Try a different search term or adjust your filters.</p>
              <button
                onClick={() => { setSearch(""); setLevelFilter("ALL"); setSelectedUniFilter("ALL"); }}
                className="btn-navy"
                style={{ textTransform: "none" }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {displayData.map((uni) => (
                <div key={uni.id}>
                  {/* University Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-[#D4AF37] shrink-0">
                      <img
                        src={uni.image}
                        alt={uni.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#0B1C2D] leading-tight">
                        {uni.name}
                      </h2>
                      <span className="text-xs text-[#888]">{uni.city}, Türkiye</span>
                    </div>
                    <span className="ml-auto text-xs font-semibold text-[#0B1C2D] bg-white border border-[#0B1C2D]/10 rounded px-2.5 py-1">
                      {uni.faculties.reduce((s, f) => s + f.programs.length, 0)} programs
                    </span>
                  </div>

                  {/* shadcn Accordion — multiple open at once */}
                  <Accordion type="multiple" className="space-y-2.5">
                    {uni.faculties.map((faculty) => {
                      const key = `${uni.id}-${faculty.name}`;
                      return (
                        <AccordionItem key={key} value={key}>
                          <AccordionTrigger>
                            <div className="flex items-center gap-3">
                              <span className="text-xl leading-none">{faculty.icon}</span>
                              <span className="font-semibold">{faculty.name}</span>
                              <span className="ml-1 bg-[#D4AF37]/20 text-[#D4AF37] text-[0.65rem] font-bold px-2 py-0.5 rounded">
                                {faculty.programs.length}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                              {faculty.programs.map((prog: Program) => (
                                <div
                                  key={prog.name + prog.level}
                                  className="flex items-center justify-between gap-2 bg-[#F7F9FC] rounded border border-[#0B1C2D]/07 px-3 py-2.5 group"
                                >
                                  <div className="min-w-0">
                                    <p className="text-[0.83rem] font-semibold text-[#0B1C2D] leading-snug mb-1 truncate">
                                      {prog.name}
                                    </p>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span
                                        className={`badge-${prog.level.toLowerCase()} text-[0.6rem] font-bold px-1.5 py-0.5 rounded-sm`}
                                      >
                                        {prog.level}
                                      </span>
                                      {prog.language && (
                                        <span className="text-[0.6rem] text-[#888]">
                                          {prog.language}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleInquire(prog.name, uni.name)}
                                    title="Inquire for Admission & Fees"
                                    className="shrink-0 w-7 h-7 rounded flex items-center justify-center border border-[#C62828]/25 bg-[#C62828]/08 text-[#C62828] transition-colors duration-150 hover:bg-[#C62828] hover:text-white hover:border-[#C62828] cursor-pointer"
                                  >
                                    <PhoneCall size={11} strokeWidth={2.5} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "var(--navy)", padding: "4rem 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Found Your Program?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Click the phone icon next to any program, or get a free consultation with our specialists.
          </p>
          <button
            onClick={() => { setPopupProgram(""); setPopupOpen(true); }}
            className="btn-gold"
            style={{ fontSize: "1rem", textTransform: "none" }}
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
        <div className="min-h-[60vh] flex items-center justify-center text-[#888]">
          Loading programs...
        </div>
      }
    >
      <ProgramsContent />
    </Suspense>
  );
}
