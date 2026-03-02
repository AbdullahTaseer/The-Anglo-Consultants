"use client";
import { useState } from "react";
import Link from "next/link";
import { universities } from "@/lib/data";
import ApplyPopup from "@/components/ApplyPopup";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function UniversitiesPage() {
  const [levelFilter, setLevelFilter] = useState<"ALL" | "UG" | "PG" | "PhD">("ALL");
  const [cityFilter, setCityFilter] = useState<string>("ALL");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState<string>("");

  const cities = ["ALL", ...Array.from(new Set(universities.map((u) => u.city)))];

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

  return (
    <>
      <div
        style={{
          background: `linear-gradient(135deg, rgba(11,28,45,0.97) 0%, rgba(11,28,45,0.85) 100%), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1800&q=80') center/cover no-repeat`,
          padding: "5rem 0 4rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
            Institution Portfolio
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
            Premier Institutions of <em>Türkiye</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Discover world-class campuses where your future begins. Browse our curated portfolio of partner universities.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-[#0B1C2D]/10 sticky top-18 z-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0B1C2D]">
                Filter by:
              </span>

              {/* Academic Level pills */}
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

              {/* City — shadcn Select */}
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-40">
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

            <span className="text-sm text-[#888]">
              Showing <strong className="text-[#0B1C2D]">{filtered.length}</strong> universities
            </span>
          </div>
        </div>
      </div>

      {/* University Grid */}
      <section style={{ background: "var(--bg)", padding: "3.5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: "#888", fontSize: "1.1rem" }}>No universities match your filters. Try adjusting.</p>
              <button onClick={() => { setLevelFilter("ALL"); setCityFilter("ALL"); }} className="btn-navy mt-4" style={{ textTransform: "none" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((uni) => {
                const ugCount = uni.faculties.flatMap((f) => f.programs).filter((p) => p.level === "UG").length;
                const pgCount = uni.faculties.flatMap((f) => f.programs).filter((p) => p.level === "PG").length;
                const phdCount = uni.faculties.flatMap((f) => f.programs).filter((p) => p.level === "PhD").length;
                return (
                  <div key={uni.id} className="uni-card flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden shrink-0" style={{ height: "180px" }}>
                      <img
                        src={uni.image}
                        alt={uni.name}
                        className="w-full h-full object-cover transition-transform duration-400"
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(11,28,45,0.65))" }} />
                      <div className="absolute bottom-2.5 left-2.5 text-[0.6rem] font-black tracking-widest uppercase px-2 py-0.5 rounded-sm"
                        style={{ background: "var(--gold)", color: "var(--navy)" }}>
                        {uni.city}
                      </div>
                    </div>

                    {/* Content — flex-col grow so buttons always at bottom */}
                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="font-bold text-[0.95rem] leading-snug mb-2.5" style={{ color: "var(--navy)" }}>
                        {uni.name}
                      </h3>

                      {/* Program counts */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {ugCount > 0 && (
                          <span className="badge-ug text-[0.62rem] font-bold px-2 py-0.5 rounded">
                            UG: {ugCount}
                          </span>
                        )}
                        {pgCount > 0 && (
                          <span className="badge-pg text-[0.62rem] font-bold px-2 py-0.5 rounded">
                            PG: {pgCount}
                          </span>
                        )}
                        {phdCount > 0 && (
                          <span className="badge-phd text-[0.62rem] font-bold px-2 py-0.5 rounded">
                            PhD: {phdCount}
                          </span>
                        )}
                      </div>

                      {/* Top Faculties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {uni.topFaculties.slice(0, 2).map((f) => (
                          <span key={f} className="text-[0.62rem] font-semibold px-2 py-0.5 rounded-sm border"
                            style={{ background: "var(--bg)", color: "#555", borderColor: "rgba(11,28,45,0.1)" }}>
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Actions — pushed to bottom with mt-auto */}
                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={`/programs?university=${uni.id}`}
                          className="btn-red flex-1 text-center"
                          style={{ fontSize: "0.8rem", padding: "0.6rem 0.5rem" }}
                        >
                          View Programs
                        </Link>
                        <button
                          onClick={() => handleRequestFee(uni.name)}
                          className="btn-gold flex-1 text-center"
                          style={{ fontSize: "0.8rem", padding: "0.6rem 0.5rem" }}
                        >
                          Fee Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "var(--navy)", padding: "4rem 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Not Sure Which University Is Right for You?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Our specialists match you with the perfect institution based on your academic profile, budget, and career goals.
          </p>
          <button onClick={() => setPopupOpen(true)} className="btn-gold" style={{ fontSize: "1rem", textTransform: "none" }}>
            Get a Free Consultation →
          </button>
        </div>
      </section>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} prefilledProgram={selectedUni} />
    </>
  );
}
