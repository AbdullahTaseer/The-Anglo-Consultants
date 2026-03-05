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
      <div ref={heroRef} className="about-hero-bg pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center gs-hero">
          <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
            About Nova-Turk
          </div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white mt-4 mb-5 leading-[1.15]">
            More Than a Consultancy—
            <br />
            <em className="text-gold">A Shared Mission.</em>
          </h1>
          <p className="text-white/75 text-[1.1rem] max-w-150 mx-auto leading-[1.7]">
            Bridging the distance between Pakistani aspirations and Turkish excellence.
          </p>
        </div>
      </div>

      {/* Gold accent strip */}
      <div className="h-1 bg-linear-to-r from-gold to-gold/10" />

      {/* Company Overview */}
      <section ref={overviewRef as React.RefObject<HTMLElement>} className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="gs-left">
              <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Who We Are</div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline mt-2 mb-6">
                Nova-Turk Education
              </h2>
              <p className="text-[#555] leading-[1.85] text-base mb-5">
                Nova-Turk Education is a specialized education consultancy headquartered in Islamabad, Pakistan, dedicated exclusively to the Turkish academic landscape. We serve as a focused bridge between the aspirations of Pakistani students and the world-class opportunities offered by universities in Türkiye.
              </p>
              <p className="text-[#555] leading-[1.85] text-base mb-5">
                We guide applicants to Undergraduate (UG), Postgraduate (PG), and Doctoral (PhD) programs with expert, honest, and end-to-end support—from the first consultation to the first day on campus.
              </p>
              <p className="text-[#555] leading-[1.85] text-base">
                By specializing 100% in Türkiye, Nova-Turk has developed deep insight into university expectations, documentation standards, and consular requirements—transforming complex processes into clear pathways.
              </p>
            </div>
            <div className="gs-right relative">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                alt="Education consultation"
                className="w-full rounded-lg shadow-[0_20px_60px_rgba(11,28,45,0.15)]"
              />
              {/* Floating Stat */}
              <div className="absolute -bottom-6 -right-6 bg-navy rounded-lg p-6 shadow-[0_10px_40px_rgba(11,28,45,0.25)] border border-gold/20">
                <div className="text-gold text-[2.2rem] font-bold">100%</div>
                <div className="text-white text-[0.78rem] font-semibold mt-1">Türkiye Specialized</div>
                <div className="text-white/50 text-[0.7rem]">No other country. No distractions.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section ref={historyRef as React.RefObject<HTMLElement>} className="bg-bg py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center gs-fade">
          <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Our Story</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline-center mt-2 mb-6">
            Built on Conviction
          </h2>
          <p className="text-[#555] leading-[1.85] text-[1.05rem] max-w-180 mx-auto">
            Nova-Turk Education was founded on a singular conviction: <strong>student success is more than admission—it is fulfillment.</strong> Built through dedicated experience within Türkiye's education ecosystem, the company was established to remove uncertainty, reduce risk, and simplify every step of the journey for students and parents.
          </p>
        </div>
      </section>

      {/* Founder's Full Message */}
      <section ref={founderRef as React.RefObject<HTMLElement>} className="founder-section-bg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left Visual */}
            <div className="lg:col-[span_2] gs-left">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80"
                alt="Founder"
                className="w-full rounded-lg border-[3px] border-gold/30"
              />
              <div className="bg-white/5 border border-gold/20 rounded-md p-5 mt-6 backdrop-blur-sm">
                <div className="text-gold text-[1.4rem] font-bold">
                  Founder & CEO
                </div>
                <div className="text-white font-semibold mt-1">Nova-Turk Education</div>
                <div className="text-white/50 text-[0.8rem] mt-0.5">Islamabad, Pakistan</div>
              </div>
            </div>

            {/* Right Message */}
            <div className="lg:col-[span_3] gs-right">
              <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
                Message from the Founder
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-white mt-4 mb-8 leading-[1.3]">
                "Your dream is no longer yours alone; from today, it is our shared mission."
              </h2>

              <div className="border-l-2 border-gold/50 pl-6">
                {[
                  "Every great journey begins with a spark of inspiration, but for a student, that spark is often a deeply personal and sacred dream.",
                  "At Nova-Turk Education, we don't just process applications—we ignite futures. We understand that behind every application is a parent's hope and a student's lifelong ambition. We recognize that when a student walks through our doors in Islamabad, they aren't just bringing us documents; they are entrusting us with their aspirations, their fears, and their highest ambitions.",
                  "We understand how 'touchy' and sensitive this stage of life is. We know that behind every dream of studying in Türkiye, there is a heart full of eagerness and a mind seeking a place where it truly belongs.",
                  "Our mission was born from this very understanding. Having dedicated years to the Turkish academic landscape, we have seen firsthand that a student's success is not merely a matter of admission—it is a matter of fulfillment. We don't just see Undergraduate, Postgraduate, or PhD programs as academic milestones; we see them as the realization of a lifelong inspiration.",
                  "We take this responsibility personally. We know the weight of a parent's trust and the vulnerability of a student's ambition. That is why we have chosen to specialize exclusively in Türkiye—to ensure that our guidance is not just 'broad,' but 'perfect.'",
                  "At Nova-Turk, our promise is simple yet profound: We see your light, and we will ensure it shines. We are committed to lighting your path until your aspirations find their home in the historic and vibrant campuses of Türkiye.",
                ].map((para, i) => (
                  <p
                    key={i}
                    className={`leading-[1.85] mb-[1.1rem] ${i === 5 ? "text-gold text-[1.05rem] italic font-semibold" : "text-white/78 text-[0.96rem] font-normal"}`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nova Standard Values */}
      <section ref={valuesRef as React.RefObject<HTMLElement>} className="bg-white py-20">
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
                className="gs-stagger group rounded-lg text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl py-8 px-7 bg-bg border-t-[3px] border-navy"
              >
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy/[0.07]">
                  <val.Icon size={28} strokeWidth={1.6} color="var(--navy)" />
                </div>
                <h3 className="text-xl font-bold mb-1 text-navy">
                  {val.title}
                </h3>
                <div className="text-xs font-bold tracking-widest uppercase mb-4 text-gold">
                  {val.subtitle}
                </div>
                <p className="text-sm leading-relaxed text-[#666]">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Achievements */}
      <section ref={achieveRef as React.RefObject<HTMLElement>} className="bg-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="gs-left">
              <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Track Record</div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline mt-2 mb-6">
                Our Expertise & Key Achievements
              </h2>
              <p className="text-[#555] leading-[1.85] mb-8">
                Nova-Turk Education does not simply "place" students—we mentor them. Our specialization and experience allow us to navigate Turkish academic systems with precision and confidence.
              </p>
              <div className="space-y-5">
                {achievements.map((ach) => (
                  <div key={ach.title} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-md bg-navy flex items-center justify-center shrink-0">
                      <ach.Icon size={22} strokeWidth={1.8} color="var(--gold)" />
                    </div>
                    <div>
                      <div className="font-bold text-navy mb-1">{ach.title}</div>
                      <div className="text-[#666] text-[0.88rem] leading-[1.6]">{ach.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Islamabad Office */}
            <div className="gs-right">
              <div className="rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(11,28,45,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
                  alt="Islamabad Office"
                  className="w-full h-65 object-cover"
                />
                <div className="bg-navy p-8">
                  <div className="text-gold font-bold text-[0.75rem] tracking-[0.15em] uppercase mb-3">
                    Our Local Presence
                  </div>
                  <h3 className="text-white text-[1.2rem] font-bold mb-3">
                    Islamabad Headquarters
                  </h3>
                  <p className="text-white/70 text-[0.9rem] leading-[1.65] mb-5">
                    Visit us at our Islamabad headquarters for a face-to-face consultation. We believe in the power of a personal handshake—because some conversations change lives.
                  </p>
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="btn-gold text-sm normal-case"
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
      <section ref={missionRef as React.RefObject<HTMLElement>} className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center gs-stagger">
          <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Our Mission</div>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-white mt-4 mb-6 leading-[1.4]">
            Expert, Empathetic, and Uncompromisingly Honest Guidance
          </h2>
          <p className="text-white/75 text-[1.05rem] leading-[1.8] mb-10">
            To provide expert, empathetic, and uncompromisingly honest guidance for students aspiring to study in Türkiye—ensuring the right academic match, a flawless application process, and confident transition to life and study in Turkey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPopupOpen(true)} className="btn-red normal-case text-base">
              Begin My Journey
            </button>
            <Link href="/universities" className="btn-gold normal-case text-base">
              Explore Universities
            </Link>
          </div>
        </div>
      </section>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
