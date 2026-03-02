"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ApplyPopup from "@/components/ApplyPopup";
import { universities } from "@/lib/data";
import {
  Search,
  GraduationCap,
  Star,
  BadgeCheck,
  Plane,
  Sparkles,
  Globe,
  Landmark,
  Wallet,
  MapPinned,
  ArrowRight,
} from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const steps = [
  { num: "01", Icon: Search,       title: "Discovery",       desc: "Profile assessment to understand your dream and academic direction." },
  { num: "02", Icon: GraduationCap,title: "Selection",       desc: "Curated shortlist of top Turkish universities aligned with your budget and GPA." },
  { num: "03", Icon: Star,         title: "The Golden File", desc: "Document preparation, notarization, and professional Turkish translation." },
  { num: "04", Icon: BadgeCheck,   title: "Acceptance",      desc: "Securing official acceptance letters and scholarship opportunities." },
  { num: "05", Icon: Plane,        title: "Visa Filing",     desc: "Zero-error documentation aligned with consulate requirements." },
  { num: "06", Icon: Sparkles,     title: "Anatolian Arrival",desc: "Post-visa briefing on accommodation, flight booking, and Ikamet steps." },
];

const whyCards = [
  {
    Icon: Globe,
    title: "Global Standing",
    desc: "Turkish degrees are aligned with the European Bologna Process—recognized by universities and employers worldwide.",
  },
  {
    Icon: Landmark,
    title: "Cultural Harmony",
    desc: "A home away from home. Familiar values, warm hospitality, and modern academic standards.",
  },
  {
    Icon: Wallet,
    title: "Financial Logic",
    desc: "World-class education at a fraction of UK, USA, or Australian costs. Quality without compromise.",
  },
  {
    Icon: MapPinned,
    title: "Strategic Location",
    desc: "Istanbul—the gateway between East and West. A vibrant student city with a rich cultural heritage.",
  },
];

const featuredUnis = universities.slice(0, 3);

export default function HomePage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const trustRef = useInView();
  const roadmapRef = useInView(0.05);
  const whyRef = useInView();
  const uniRef = useInView();
  const founderRef = useInView();

  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, rgba(11,28,45,0.96) 0%, rgba(11,28,45,0.80) 60%, rgba(11,28,45,0.70) 100%), url('https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1800&q=90') center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: "linear-gradient(to right, var(--gold), transparent)"
        }} />

        {/* Decorative circle */}
        <div style={{
          position: "absolute", right: "-100px", top: "50%", transform: "translateY(-50%)",
          width: "600px", height: "600px", borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.1)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", right: "-50px", top: "50%", transform: "translateY(-50%)",
          width: "400px", height: "400px", borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.15)", pointerEvents: "none"
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-24">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Islamabad · Türkiye · Excellence
            </div>

            {/* Main Headline */}
            <h1
              className="animate-fade-up font-display"
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.12,
                marginBottom: "1.5rem",
                animationDelay: "0.2s",
              }}
            >
              Lighting the Path to{" "}
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Turkish Academia.</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="animate-fade-up"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(255,255,255,0.82)",
                maxWidth: "600px",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                animationDelay: "0.35s",
              }}
            >
              Specialized guidance for Pakistani students aspiring to Undergraduate,
              Postgraduate, and PhD excellence in Türkiye.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <Link href="/apply" className="btn-red" style={{ fontSize: "1rem" }}>
                Apply Now
              </Link>
              <Link href="/universities" className="btn-gold" style={{ fontSize: "1rem" }}>
                Explore Universities
              </Link>
            </div>

            {/* Stats Bar */}
            <div
              className="mt-14 grid grid-cols-3 gap-8 max-w-lg animate-fade-up"
              style={{ animationDelay: "0.65s" }}
            >
              {[
                { val: "100%", label: "Türkiye Focused" },
                { val: "16+", label: "Partner Universities" },
                { val: "UG·PG·PhD", label: "All Degree Levels" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div style={{ color: "var(--gold)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700 }}>
                    {stat.val}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.25rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{
            width: "1px", height: "40px",
            background: "linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)",
            animation: "fadeIn 1s infinite alternate"
          }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — TRUST BAR
      ═══════════════════════════════════════════ */}
      <div
        ref={trustRef.ref}
        className={`observe-fade ${trustRef.visible ? "visible" : ""}`}
        style={{ background: "#fff", borderBottom: "1px solid rgba(11,28,45,0.08)", padding: "1.5rem 0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            <p style={{ color: "#888", fontSize: "0.78rem", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600 }}>
              Degrees Recognized by HEC Pakistan & Globally via Bologna Process
            </p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 md:gap-4">
              {["HEC Pakistan", "YÖK Türkiye", "Bologna Process", "Ministry of Education"].map((name, i) => (
                <div key={name} className={`observe-fade ${trustRef.visible ? "visible" : ""} observe-fade-delay-${i + 1}`}>
                  <div style={{
                    background: "var(--bg)", border: "1px solid rgba(11,28,45,0.1)", borderRadius: "6px",
                    padding: "0.4rem 1rem", fontWeight: 700, fontSize: "0.72rem",
                    color: "var(--navy)", letterSpacing: "0.05em", whiteSpace: "nowrap",
                  }}>
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 3 — 6-STEP ROADMAP
      ═══════════════════════════════════════════ */}
      <section
        ref={roadmapRef.ref}
        style={{ background: "var(--navy)", padding: "5rem 0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className={`text-center mb-14 observe-fade ${roadmapRef.visible ? "visible" : ""}`}>
            <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
              Our Proven Process
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-white leading-tight gold-underline-center mt-2">
              The Nova-Turk 6-Step Success Roadmap
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "540px", margin: "1.2rem auto 0", lineHeight: 1.7 }}>
              A structured, mentor-led journey from your first consultation to your first day on a Turkish campus.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`observe-fade observe-fade-delay-${i + 1} ${roadmapRef.visible ? "visible" : ""} text-center group`}
              >
                {/* Icon Circle */}
                <div className="relative mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.06)", border: "2px solid var(--gold)" }}>
                  <step.Icon size={26} strokeWidth={1.8} color="var(--gold)" />
                  <div style={{
                    position: "absolute", top: "-10px", right: "-10px",
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "var(--gold)", color: "var(--navy)",
                    fontSize: "0.6rem", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {step.num}
                  </div>
                </div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/about" className="btn-gold" style={{ textTransform: "none" }}>
              Learn About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — WHY TÜRKIYE
      ═══════════════════════════════════════════ */}
      <section ref={whyRef.ref} style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 observe-fade ${whyRef.visible ? "visible" : ""}`}>
              <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Why Türkiye</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline-center mt-2">
              Why Pakistani Students Choose Türkiye
            </h2>
            <p style={{ color: "#666", maxWidth: "520px", margin: "1.2rem auto 0", lineHeight: 1.7 }}>
              A destination of high-value, globally respected education—suited to Pakistani students seeking quality, affordability, and cultural comfort.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyCards.map((card, i) => (
              <div
                key={card.title}
                className={`why-card observe-fade observe-fade-delay-${i + 1} ${whyRef.visible ? "visible" : ""}`}
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg"
                  style={{ background: "rgba(11,28,45,0.06)" }}>
                  <card.Icon size={24} strokeWidth={1.8} color="var(--navy)" />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.65rem" }}>
                  {card.title}
                </h3>
                <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — FEATURED INSTITUTIONS
      ═══════════════════════════════════════════ */}
      <section ref={uniRef.ref} style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 observe-fade ${uniRef.visible ? "visible" : ""}`}>
            <div>
              <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-2">Partner Institutions</div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline mt-2">Featured Universities</h2>
            </div>
            <Link href="/universities" className="btn-navy text-sm" style={{ textTransform: "none", whiteSpace: "nowrap" }}>
              View All 16+ Universities →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredUnis.map((uni, i) => (
              <div
                key={uni.id}
                className={`uni-card flex flex-col observe-fade observe-fade-delay-${i + 1} ${uniRef.visible ? "visible" : ""}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden shrink-0" style={{ height: "200px" }}>
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(11,28,45,0.7))" }} />
                  <div className="absolute bottom-3 left-3 text-[0.62rem] font-black tracking-widest uppercase px-2 py-0.5 rounded-sm"
                    style={{ background: "var(--gold)", color: "var(--navy)" }}>
                    {uni.city}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-bold text-[1.05rem] leading-snug mb-2" style={{ color: "var(--navy)" }}>
                    {uni.name}
                  </h3>
                  <p className="text-[0.83rem] leading-relaxed mb-3" style={{ color: "#777" }}>
                    {uni.description.slice(0, 90)}...
                  </p>

                  {/* Top Faculties */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {uni.topFaculties.slice(0, 3).map((f) => (
                      <span key={f} className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-sm border"
                        style={{ background: "var(--bg)", color: "var(--navy)", borderColor: "rgba(11,28,45,0.1)" }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link href="/universities" className="btn-red flex-1 text-center"
                      style={{ fontSize: "0.8rem", padding: "0.6rem 0.5rem" }}>
                      View Programs
                    </Link>
                    <button
                      onClick={() => setPopupOpen(true)}
                      className="btn-gold flex-1 text-center"
                      style={{ fontSize: "0.8rem", padding: "0.6rem 0.5rem" }}
                    >
                      Request Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — FOUNDER'S MESSAGE
      ═══════════════════════════════════════════ */}
      <section
        ref={founderRef.ref}
        style={{
          background: `linear-gradient(135deg, rgba(11,28,45,0.97) 0%, rgba(11,28,45,0.92) 100%), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80') center/cover no-repeat`,
          padding: "5rem 0"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Logo + Image */}
            <div className={`observe-fade ${founderRef.visible ? "visible" : ""}`}>
              <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", maxWidth: "460px" }}>
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
                  alt="Student walking on campus"
                  style={{ width: "100%", height: "380px", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom right, rgba(11,28,45,0.3), rgba(11,28,45,0.1))"
                }} />
                {/* Overlay Logo */}
                <div style={{
                  position: "absolute", bottom: "24px", left: "24px",
                  background: "rgba(11,28,45,0.85)", backdropFilter: "blur(8px)",
                  borderRadius: "6px", padding: "1rem 1.5rem",
                  border: "1px solid rgba(212,175,55,0.3)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "36px", height: "36px", background: "var(--gold)",
                      borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <span style={{ fontWeight: 900, color: "var(--navy)", fontSize: "0.85rem" }}>NT</span>
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Nova-Turk</div>
                      <div style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.08em" }}>Education</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quote */}
            <div className={`observe-fade observe-fade-delay-2 ${founderRef.visible ? "visible" : ""}`}>
              <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
                A Word from our Founder
              </div>

              <blockquote style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: "#fff", lineHeight: 1.7, margin: "1.5rem 0",
                borderLeft: "3px solid var(--gold)", paddingLeft: "1.5rem"
              }}>
                "Every great journey begins with a spark of inspiration, but for a student, that spark is often a deeply personal and sacred dream…
              </blockquote>

              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Every application carries a parent's trust and a student's lifelong ambition. We exist to protect that dream and guide it with care, clarity, and purpose.
              </p>

              <p style={{
                color: "var(--gold)", fontSize: "1.1rem",
                fontStyle: "italic", marginBottom: "2rem"
              }}>
                "We see your light, and we will ensure it shines."
              </p>

              <div style={{ marginBottom: "2rem" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
                  Founder & CEO, Nova-Turk Education
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                  Islamabad, Pakistan
                </div>
              </div>

              <Link href="/about" className="btn-gold" style={{ textTransform: "none" }}>
                Read the Full Message →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STICKY APPLY BUTTON
      ═══════════════════════════════════════════ */}
      <div className="sticky-apply">
        <button
          onClick={() => setPopupOpen(true)}
          className="btn-red"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            textTransform: "none",
            padding: "1rem 0.75rem",
            borderRadius: "4px 0 0 4px",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
          }}
        >
          Apply Now ↑
        </button>
      </div>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
