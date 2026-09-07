"use client";
import React, { useState, useRef } from "react";
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
} from "lucide-react";
import UniversityCard from "@/components/UniversityCard";
import {
  useHeroAnimation,
  useScrollFadeUp,
  useStaggerReveal,
  useCardReveal,
  useSplitReveal,
} from "@/lib/gsap-animations";

const steps = [
  { num: "01", Icon: Search, title: "Discovery", desc: "Profile assessment to understand your dream and academic direction." },
  { num: "02", Icon: GraduationCap, title: "Selection", desc: "Curated shortlist of top Turkish universities aligned with your budget and GPA." },
  { num: "03", Icon: Star, title: "The Golden File", desc: "Document preparation, notarization, and professional Turkish translation." },
  { num: "04", Icon: BadgeCheck, title: "Acceptance", desc: "Securing official acceptance letters and scholarship opportunities." },
  { num: "05", Icon: Plane, title: "Visa Filing", desc: "Zero-error documentation aligned with consulate requirements." },
  { num: "06", Icon: Sparkles, title: "Anatolian Arrival", desc: "Post-visa briefing on accommodation, flight booking, and Ikamet steps." },
];

const whyCards = [
  {
    Icon: Globe,
    title: "Internationally Recognized",
    desc: "Degrees aligned with the European Bologna Process—recognized by HEC Pakistan, YÖK Türkiye, and employers worldwide.",
  },
  {
    Icon: Landmark,
    title: "Culturally Welcoming",
    desc: "A home away from home. Familiar values, warm hospitality, and a welcoming environment for Pakistani students.",
  },
  {
    Icon: Wallet,
    title: "Affordable Tuition",
    desc: "Quality education at a fraction of UK, USA, or Australian costs. Affordable fees compared to many Western destinations.",
  },
  {
    Icon: GraduationCap,
    title: "Modern Universities",
    desc: "Contemporary universities offering diverse academic programs across all disciplines and degree levels.",
  },
  {
    Icon: MapPinned,
    title: "Strategic Location",
    desc: "Gateway connecting Europe and Asia. Istanbul—a vibrant student city with rich cultural heritage.",
  },
];

const featuredUnis = universities.slice(0, 3);

export default function HomePage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const heroRef = useHeroAnimation();
  const trustRef = useScrollFadeUp();
  const roadmapRef = useStaggerReveal();
  const whyRef = useStaggerReveal();
  const uniRef = useCardReveal();
  const founderRef = useSplitReveal();

  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="sm:min-h-screen h-auto hero-bg flex items-center relative overflow-hidden"
      >
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-gold to-transparent" />

        {/* Decorative circles */}
        <div className="absolute -right-25 top-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-gold/10 pointer-events-none" />
        <div className="absolute -right-12.5 top-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-gold/15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-24">
          {/* gs-hero: GSAP animates direct children with stagger */}
          <div className="max-w-3xl gs-hero">
            <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
              Islamabad · Türkiye · Excellence
            </div>

            <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.4rem)] font-bold text-white leading-tight mb-6">
              Lighting the Path to{" "}
              <span className="text-gold">Turkish Academia.</span>
            </h1>

            <p className="text-[clamp(1rem,2vw,1.2rem)] text-white/82 max-w-150 leading-[1.7] mb-10">
              Specialized guidance for Pakistani students aspiring to Undergraduate,
              Postgraduate, and PhD excellence in Türkiye.
            </p>

            <div className="flex max-[374px]:flex-col gap-4">
              <Link href="/apply" className="btn-red text-base">
                Apply Now
              </Link>
              <Link href="/universities" className="btn-gold text-base">
                Explore Universities
              </Link>
            </div>

            <div className="mt-14 flex max-sm:justify-between sm:gap-8">
              {[
                { val: "100%", label: "Türkiye Focused" },
                { val: "16+", label: "Partner Universities" },
                { val: "UG·PG·PhD", label: "All Degree Levels" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-gold text-[clamp(1.4rem,3vw,2rem)] font-bold">
                    {stat.val}
                  </div>
                  <div className="text-white/60 text-[0.72rem] tracking-[0.08em] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/40 text-[0.65rem] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-linear-to-b from-gold/70 to-transparent animate-[fadeIn_1s_infinite_alternate]" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — TRUST BAR
      ═══════════════════════════════════════════ */}
      <div
        ref={trustRef as React.RefObject<HTMLDivElement>}
        className="bg-white border-b border-navy/8 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            <p className="gs-fade text-gray-500 text-[0.78rem] tracking-[0.07em] uppercase font-semibold">
              Degrees Recognized by HEC Pakistan & Globally via Bologna Process
            </p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 md:gap-4">
              {["HEC Pakistan", "YÖK Türkiye", "Bologna Process", "Ministry of Education"].map((name) => (
                <div key={name} className="gs-fade">
                  <div className="bg-bg border border-navy/10 rounded-md py-1.5 px-4 font-bold text-[0.72rem] text-navy tracking-[0.05em] whitespace-nowrap">
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
        ref={roadmapRef as React.RefObject<HTMLElement>}
        className="bg-navy py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-14 gs-stagger">
            <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
              Our Proven Process
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-white leading-tight gold-underline-center mt-2">
              The Anglo Consultants 6-Step Success Roadmap
            </h2>
            <p className="text-white/65 max-w-135 mx-auto mt-5 leading-[1.7]">
              A structured, mentor-led journey from your first consultation to your first day on a Turkish campus.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="gs-stagger text-center group"
              >
                {/* Icon Circle */}
                <div className="relative mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-110 bg-white/5 border-2 border-gold">
                  <step.Icon size={26} strokeWidth={1.8} className="text-gold" />
                  <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-gold text-navy text-[0.6rem] font-extrabold flex items-center justify-center">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-white font-bold text-[0.9rem] mb-2">
                  {step.title}
                </h3>
                <p className="text-white/55 text-[0.78rem] leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/about" className="btn-gold normal-case">
              Learn About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — WHY TÜRKIYE
      ═══════════════════════════════════════════ */}
      <section ref={whyRef as React.RefObject<HTMLElement>} className="bg-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 gs-stagger">
            <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">Why Türkiye</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline-center mt-2">
              Why Pakistani Students Choose Türkiye
            </h2>
            <p className="text-gray-600 max-w-130 mx-auto mt-5 leading-[1.7]">
              A destination of high-value, globally respected education—suited to Pakistani students seeking quality, affordability, and cultural comfort.
            </p>
          </div>
          <div className="grid min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="why-card gs-stagger"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-navy/5">
                  <card.Icon size={24} strokeWidth={1.8} className="text-navy" />
                </div>
                <h3 className="text-[1.05rem] font-bold text-navy mb-2.5">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-[0.88rem] leading-[1.65]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — FEATURED INSTITUTIONS
      ═══════════════════════════════════════════ */}
      <section ref={uniRef as React.RefObject<HTMLElement>} className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 gs-stagger">
            <div>
              <div className="inline-block bg-navy/8 text-navy text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-2">Partner Institutions</div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-navy leading-tight gold-underline mt-2">Featured Universities</h2>
            </div>
            <Link href="/universities" className="btn-navy text-sm normal-case whitespace-nowrap">
              View All 16+ Universities →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredUnis.map((uni) => (
              <UniversityCard
                key={uni.id}
                uni={uni}
                className="gs-card"
                onFeeRequest={() => setPopupOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — FOUNDER'S MESSAGE
      ═══════════════════════════════════════════ */}
      <section
        ref={founderRef as React.RefObject<HTMLElement>}
        className="founder-bg py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="gs-left">
              <div className="relative rounded-lg overflow-hidden max-w-115">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
                  alt="Student walking on campus"
                  className="w-full h-95 object-cover"
                />
                <div className="absolute inset-0 image-overlay-gradient" />
              </div>
            </div>

            {/* Right: Quote */}
            <div className="gs-right">
              <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
                A Word from our Founder
              </div>

              <blockquote className="text-[clamp(1.1rem,2.5vw,1.4rem)] text-white leading-[1.7] my-6 border-l-4 border-gold pl-6">
                "Every great journey begins with a spark of inspiration, but for a student, that spark is often a deeply personal and sacred dream…
              </blockquote>

              <p className="text-white/70 leading-[1.7] text-[0.95rem] mb-6">
                Every application carries a parent's trust and a student's lifelong ambition. We exist to protect that dream and guide it with care, clarity, and purpose.
              </p>

              <p className="text-gold text-[1.1rem] italic mb-8">
                "We see your light, and we will ensure it shines."
              </p>

              <div className="mb-8">
                <div className="text-white font-bold text-[0.9rem]">
                  Founder & CEO, The Anglo Consultants
                </div>
                <div className="text-white/50 text-[0.8rem] mt-1">
                  Islamabad, Pakistan
                </div>
              </div>

              <Link href="/about" className="btn-gold normal-case">
                Read the Full Message
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
          className="bg-[#C62828] text-white cursor-pointer font-bold hover:bg-[#a81e1e] [writing-mode:vertical-rl] py-4 px-3 rounded-l rounded-r-none text-lg tracking-[0.08em] normal-case"
        >
          Apply Now
        </button>
      </div>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
