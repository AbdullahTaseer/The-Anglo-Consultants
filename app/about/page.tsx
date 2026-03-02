"use client";
import React, { useState } from "react";
import Link from "next/link";
import ApplyPopup from "@/components/ApplyPopup";
import { Landmark, Handshake, GraduationCap, ClipboardList, Scale, Target, Heart } from "lucide-react";
import { useHeroAnimation, useScrollFadeUp, useStaggerReveal, useSplitReveal } from "@/lib/gsap-animations";

const values = [
  {
    Icon: Scale,
    title: "Integrity",
    subtitle: "Unbiased Counsel",
    desc: "We offer unbiased advice. If a program is not right for a student's future, we say so—regardless of commercial pressures. Your career path comes before our sales.",
  },
  {
    Icon: Target,
    title: "Exclusivity",
    subtitle: "100% Türkiye",
    desc: "Our 100% focus on Türkiye enables stronger institutional relationships and sharper, country-specific expertise than any generalist agency can offer.",
  },
  {
    Icon: Heart,
    title: "Empathy",
    subtitle: "Like Family",
    desc: "We understand the parent's anxiety and the student's excitement. We treat every case with care—as if it were our own family taking this journey.",
  },
];

const achievements = [
  { Icon: Landmark,      title: "Dedicated Model",        desc: "Established a dedicated, Türkiye-only advisory model in Pakistan—the first of its kind in Islamabad." },
  { Icon: Handshake,     title: "Strategic Partnerships", desc: "Built deep, direct partnerships with leading foundation universities across Türkiye." },
  { Icon: GraduationCap, title: "Successful Placements",  desc: "Enabled admissions across Engineering, Medicine, Business, Arts & Social Sciences at UG, PG, and PhD levels." },
  { Icon: ClipboardList, title: "Golden File Process",    desc: "Developed our signature 'Golden File' documentation standard—zero-error consulate-grade submissions." },
];

export default function AboutPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  const heroRef       = useHeroAnimation();
  const overviewRef   = useSplitReveal();
  const historyRef    = useScrollFadeUp();
  const founderRef    = useSplitReveal();
  const valuesRef     = useStaggerReveal();
  const achieveRef    = useSplitReveal();
  const missionRef    = useStaggerReveal();

  return (
    <>
      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          background: `linear-gradient(135deg, rgba(11,28,45,0.97) 0%, rgba(11,28,45,0.80) 100%), url('https://images.unsplash.com/photo-1496016943515-7d33598c11e6?w=1800&q=80') center/cover no-repeat`,
          padding: "6rem 0 5rem",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center gs-hero">
          <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
            About Nova-Turk
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: "#fff",
              marginTop: "1rem",
              marginBottom: "1.25rem",
              lineHeight: 1.15,
            }}
          >
            More Than a Consultancy—
            <br />
            <em style={{ color: "var(--gold)" }}>A Shared Mission.</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Bridging the distance between Pakistani aspirations and Turkish excellence.
          </p>
        </div>
      </div>

      {/* Gold accent strip */}
      <div style={{ height: "4px", background: "linear-gradient(to right, var(--gold), rgba(212,175,55,0.1))" }} />

      {/* Company Overview */}
      <section ref={overviewRef as React.RefObject<HTMLElement>} style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="gs-left">
              <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Who We Are</div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline mt-2" style={{ marginBottom: "1.5rem" }}>
                Nova-Turk Education
              </h2>
              <p style={{ color: "#555", lineHeight: 1.85, fontSize: "1rem", marginBottom: "1.25rem" }}>
                Nova-Turk Education is a specialized education consultancy headquartered in Islamabad, Pakistan, dedicated exclusively to the Turkish academic landscape. We serve as a focused bridge between the aspirations of Pakistani students and the world-class opportunities offered by universities in Türkiye.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, fontSize: "1rem", marginBottom: "1.25rem" }}>
                We guide applicants to Undergraduate (UG), Postgraduate (PG), and Doctoral (PhD) programs with expert, honest, and end-to-end support—from the first consultation to the first day on campus.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, fontSize: "1rem" }}>
                By specializing 100% in Türkiye, Nova-Turk has developed deep insight into university expectations, documentation standards, and consular requirements—transforming complex processes into clear pathways.
              </p>
            </div>
            <div className="gs-right" style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                alt="Education consultation"
                style={{ width: "100%", borderRadius: "8px", boxShadow: "0 20px 60px rgba(11,28,45,0.15)" }}
              />
              {/* Floating Stat */}
              <div style={{
                position: "absolute", bottom: "-24px", right: "-24px",
                background: "var(--navy)", borderRadius: "8px", padding: "1.5rem",
                boxShadow: "0 10px 40px rgba(11,28,45,0.25)",
                border: "1px solid rgba(212,175,55,0.2)"
              }}>
                <div style={{ color: "var(--gold)", fontSize: "2.2rem", fontWeight: 700 }}>100%</div>
                <div style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600, marginTop: "0.25rem" }}>Türkiye Specialized</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>No other country. No distractions.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section ref={historyRef as React.RefObject<HTMLElement>} style={{ background: "var(--bg)", padding: "5rem 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center gs-fade">
          <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Our Story</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline-center mt-2" style={{ marginBottom: "1.5rem" }}>
            Built on Conviction
          </h2>
          <p style={{ color: "#555", lineHeight: 1.85, fontSize: "1.05rem", maxWidth: "720px", margin: "0 auto" }}>
            Nova-Turk Education was founded on a singular conviction: <strong>student success is more than admission—it is fulfillment.</strong> Built through dedicated experience within Türkiye's education ecosystem, the company was established to remove uncertainty, reduce risk, and simplify every step of the journey for students and parents.
          </p>
        </div>
      </section>

      {/* Founder's Full Message */}
      <section
        ref={founderRef as React.RefObject<HTMLElement>}
        style={{
          background: `linear-gradient(135deg, rgba(11,28,45,0.97) 0%, rgba(11,28,45,0.93) 100%), url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1800&q=80') center/cover no-repeat`,
          padding: "6rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left Visual */}
            <div className="lg:col-[span_2] gs-left">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80"
                alt="Founder"
                style={{ width: "100%", borderRadius: "8px", border: "3px solid rgba(212,175,55,0.3)" }}
              />
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "6px", padding: "1.25rem", marginTop: "1.5rem",
                backdropFilter: "blur(8px)"
              }}>
                <div style={{ color: "var(--gold)", fontSize: "1.4rem", fontWeight: 700 }}>
                  Founder & CEO
                </div>
                <div style={{ color: "#fff", fontWeight: 600, marginTop: "0.25rem" }}>Nova-Turk Education</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "0.2rem" }}>Islamabad, Pakistan</div>
              </div>
            </div>

            {/* Right Message */}
            <div className="lg:col-[span_3] gs-right">
              <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
                Message from the Founder
              </div>
              <h2 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700, color: "#fff", marginTop: "1rem", marginBottom: "2rem", lineHeight: 1.3
              }}>
                "Your dream is no longer yours alone; from today, it is our shared mission."
              </h2>

              <div style={{ borderLeft: "2px solid rgba(212,175,55,0.5)", paddingLeft: "1.5rem" }}>
                {[
                  "Every great journey begins with a spark of inspiration, but for a student, that spark is often a deeply personal and sacred dream.",
                  "At Nova-Turk Education, we don't just process applications—we ignite futures. We understand that behind every application is a parent's hope and a student's lifelong ambition. We recognize that when a student walks through our doors in Islamabad, they aren't just bringing us documents; they are entrusting us with their aspirations, their fears, and their highest ambitions.",
                  "We understand how 'touchy' and sensitive this stage of life is. We know that behind every dream of studying in Türkiye, there is a heart full of eagerness and a mind seeking a place where it truly belongs.",
                  "Our mission was born from this very understanding. Having dedicated years to the Turkish academic landscape, we have seen firsthand that a student's success is not merely a matter of admission—it is a matter of fulfillment. We don't just see Undergraduate, Postgraduate, or PhD programs as academic milestones; we see them as the realization of a lifelong inspiration.",
                  "We take this responsibility personally. We know the weight of a parent's trust and the vulnerability of a student's ambition. That is why we have chosen to specialize exclusively in Türkiye—to ensure that our guidance is not just 'broad,' but 'perfect.'",
                  "At Nova-Turk, our promise is simple yet profound: We see your light, and we will ensure it shines. We are committed to lighting your path until your aspirations find their home in the historic and vibrant campuses of Türkiye.",
                ].map((para, i) => (
                  <p key={i} style={{
                    color: i === 5 ? "var(--gold)" : "rgba(255,255,255,0.78)",
                    lineHeight: 1.85,
                    fontSize: i === 5 ? "1.05rem" : "0.96rem",
                    marginBottom: "1.1rem",
                    fontStyle: i === 5 ? "italic" : "normal",
                    fontWeight: i === 5 ? 600 : 400,
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nova Standard Values */}
      <section ref={valuesRef as React.RefObject<HTMLElement>} style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 gs-stagger">
            <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Core Values</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline-center mt-2">
              The "Nova" Standard
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="gs-stagger group rounded-lg text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  padding: "2rem 1.75rem",
                  background: "var(--bg)",
                  borderTop: "3px solid var(--navy)",
                }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl"
                  style={{ background: "rgba(11,28,45,0.07)" }}>
                  <val.Icon size={28} strokeWidth={1.6} color="var(--navy)" />
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--navy)" }}>
                  {val.title}
                </h3>
                <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
                  {val.subtitle}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Achievements */}
      <section ref={achieveRef as React.RefObject<HTMLElement>} style={{ background: "var(--bg)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="gs-left">
              <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Track Record</div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline mt-2" style={{ marginBottom: "1.5rem" }}>
                Our Expertise & Key Achievements
              </h2>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: "2rem" }}>
                Nova-Turk Education does not simply "place" students—we mentor them. Our specialization and experience allow us to navigate Turkish academic systems with precision and confidence.
              </p>
              <div className="space-y-5">
                {achievements.map((ach) => (
                  <div key={ach.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{
                      width: "44px", height: "44px", background: "var(--navy)",
                      borderRadius: "6px", display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0
                    }}>
                      <ach.Icon size={22} strokeWidth={1.8} color="var(--gold)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem" }}>{ach.title}</div>
                      <div style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>{ach.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Islamabad Office */}
            <div className="gs-right">
              <div style={{
                borderRadius: "8px", overflow: "hidden",
                boxShadow: "0 20px 60px rgba(11,28,45,0.12)"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
                  alt="Islamabad Office"
                  style={{ width: "100%", height: "260px", objectFit: "cover" }}
                />
                <div style={{ background: "var(--navy)", padding: "2rem" }}>
                  <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    Our Local Presence
                  </div>
                  <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Islamabad Headquarters
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                    Visit us at our Islamabad headquarters for a face-to-face consultation. We believe in the power of a personal handshake—because some conversations change lives.
                  </p>
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="btn-gold text-sm"
                    style={{ textTransform: "none" }}
                  >
                    Book a Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef as React.RefObject<HTMLElement>} style={{ background: "var(--navy)", padding: "5rem 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center gs-stagger">
          <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Our Mission</div>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 700, color: "#fff", marginTop: "1rem", marginBottom: "1.5rem", lineHeight: 1.4
          }}>
            Expert, Empathetic, and Uncompromisingly Honest Guidance
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            To provide expert, empathetic, and uncompromisingly honest guidance for students aspiring to study in Türkiye—ensuring the right academic match, a flawless application process, and confident transition to life and study in Turkey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPopupOpen(true)} className="btn-red" style={{ textTransform: "none", fontSize: "1rem" }}>
              Begin My Journey
            </button>
            <Link href="/universities" className="btn-gold" style={{ textTransform: "none", fontSize: "1rem" }}>
              Explore Universities
            </Link>
          </div>
        </div>
      </section>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
