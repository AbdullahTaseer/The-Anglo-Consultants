"use client";
import React, { useState } from "react";
import { Target, ClipboardList, Plane, Handshake } from "lucide-react";
import { useHeroAnimation, useScaleIn, useStaggerReveal } from "@/lib/gsap-animations";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const steps = ["Your Details", "Academic Interest"];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "Pakistani",
    degree: "",
    language: "",
    program: "",
    fieldOfInterest: "",
    educationalBackground: "",
    question: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((f) => ({ ...f, [name]: value.replace(/\D/g, "") }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = step === 0 ? 50 : 100;

  const heroRef   = useHeroAnimation();
  const formRef   = useScaleIn();
  const whyRef    = useStaggerReveal();

  return (
    <>
      {/* Hero */}
      <div ref={heroRef} className="apply-hero-bg pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center gs-hero">
          <div className="inline-block bg-gold/15 text-gold text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-sm mb-4">
            Application Portal
          </div>
          <h1 className="font-display tracking-wider text-[clamp(2rem,4vw,3.2rem)] font-bold text-white mt-4 mb-7 leading-[1.15]">
            Start Your <em>Turkish University</em> Application
          </h1>
          <p className="text-white/70 leading-[1.7]">
            Fill out our 2-step assessment and get matched with top Turkish universities. A specialist will contact you within 24 hours.
          </p>
        </div>
      </div>

      {/* Application Form */}
      <section className="bg-bg py-16 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {!submitted ? (
            <div ref={formRef} className="bg-white rounded-xl border border-navy/10 shadow-[0_20px_60px_rgba(11,28,45,0.08)] overflow-hidden">
              {/* Progress Header */}
              <div className="bg-navy px-8 py-6">
                <div className="flex gap-2 mb-3">
                  {steps.map((s, i) => (
                    <div key={s} className="flex-1 flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[0.65rem] font-black transition-all duration-300 ${i <= step ? "bg-gold text-navy" : "bg-white/15 text-white/40"}`}>
                        {i < step ? "✓" : i + 1}
                      </div>
                      <span className={`text-[0.72rem] transition-all duration-300 ${i === step ? "font-bold text-white" : "text-white/50"}`}>{s}</span>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-px transition-all duration-300 ${i < step ? "bg-gold" : "bg-white/15"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-navy to-gold transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 sm:p-10">
                {/* Step 1 */}
                {step === 0 && (
                  <form onSubmit={handleNext}>
                    <h2 className="text-[1.4rem] font-bold text-navy mb-1">Step 1: Your Details</h2>
                    <p className="text-[0.88rem] text-[#888] mb-8">Tell us a bit about yourself so we can personalize your consultation.</p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">First Name *</label>
                          <input name="firstName" required value={form.firstName} onChange={handleChange}
                            className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="e.g. Ahmed" />
                        </div>
                        <div>
                          <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Last Name *</label>
                          <input name="lastName" required value={form.lastName} onChange={handleChange}
                            className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="e.g. Khan" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Email Address *</label>
                        <input name="email" type="email" required value={form.email} onChange={handleChange}
                          className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Phone / WhatsApp *</label>
                        <input name="phone" required value={form.phone} onChange={handleChange}
                          className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="03001234567 (digits only)" maxLength={15} />
                        <p className="text-[0.72rem] text-[#aaa] mt-1">Our specialist will contact you on this number within 24 hours.</p>
                      </div>
                      <div>
                        <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Nationality</label>
                        <input name="nationality" value={form.nationality} onChange={handleChange}
                          className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" />
                      </div>
                    </div>

                    <button type="submit" className="w-full mt-6 inline-flex items-center justify-center bg-navy hover:bg-navy-light text-white font-bold text-base py-3 rounded cursor-pointer transition-all duration-200 hover:-translate-y-0.5">
                      Continue to Step 2 →
                    </button>
                  </form>
                )}

                {/* Step 2 */}
                {step === 1 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-[1.4rem] font-bold text-navy mb-1">Step 2: Academic Interest</h2>
                    <p className="text-[0.88rem] text-[#888] mb-8">Help us match you with the right program and university.</p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Degree Level *</label>
                          <Select value={form.degree} onValueChange={(v) => setForm((f) => ({ ...f, degree: v }))} required>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Select level" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                              <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                              <SelectItem value="PhD">Doctoral (PhD)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Language</label>
                          <Select value={form.language} onValueChange={(v) => setForm((f) => ({ ...f, language: v }))}>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Any" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Turkish">Turkish</SelectItem>
                              <SelectItem value="Both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Field of Interest *</label>
                        <Select value={form.fieldOfInterest} onValueChange={(v) => setForm((f) => ({ ...f, fieldOfInterest: v }))} required>
                          <SelectTrigger className="w-full"><SelectValue placeholder="Select a field" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Engineering & Technology">Engineering & Technology</SelectItem>
                            <SelectItem value="Medicine & Health Sciences">Medicine & Health Sciences</SelectItem>
                            <SelectItem value="Business & Economics">Business & Economics</SelectItem>
                            <SelectItem value="Social Sciences">Social Sciences</SelectItem>
                            <SelectItem value="Law">Law</SelectItem>
                            <SelectItem value="Arts & Design">Arts & Design</SelectItem>
                            <SelectItem value="Architecture">Architecture</SelectItem>
                            <SelectItem value="Psychology">Psychology</SelectItem>
                            <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="Dentistry">Dentistry</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Program of Interest</label>
                        <input name="program" value={form.program} onChange={handleChange}
                          className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="e.g. Computer Engineering, Medicine, MBA..." />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Educational Background *</label>
                        <Select value={form.educationalBackground} onValueChange={(v) => setForm((f) => ({ ...f, educationalBackground: v }))} required>
                          <SelectTrigger className="w-full"><SelectValue placeholder="Select qualification" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Matriculation (Grade 10)">Matriculation (Grade 10)</SelectItem>
                            <SelectItem value="Intermediate (FSc / FA)">Intermediate (FSc / FA)</SelectItem>
                            <SelectItem value="A-Levels">A-Levels</SelectItem>
                            <SelectItem value="Bachelor's Degree">Bachelor&apos;s Degree</SelectItem>
                            <SelectItem value="Master's Degree">Master&apos;s Degree</SelectItem>
                            <SelectItem value="PhD">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-[0.72rem] font-bold text-navy tracking-widest uppercase mb-1">Your Question or Message</label>
                        <textarea name="question" value={form.question} onChange={handleChange}
                          className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit] resize-none" rows={4}
                          placeholder="Any specific questions, concerns, or requirements..." />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button type="button" onClick={() => setStep(0)}
                        className="flex-1 inline-flex items-center justify-center border-2 border-gold text-gold hover:bg-gold hover:text-navy font-bold text-sm py-3 rounded cursor-pointer transition-all duration-200">
                        ← Back
                      </button>
                      <button type="submit"
                        className="flex-2 inline-flex items-center justify-center bg-red hover:bg-red-hover text-white font-bold text-base py-3 rounded cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                        Begin My Journey →
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* Confirmation */
            <div className="bg-white rounded-xl border border-navy/10 shadow-[0_20px_60px_rgba(11,28,45,0.08)] px-8 py-16 sm:px-12 text-center">
              <div className="w-18 h-18 rounded-full bg-gold/12 border-2 border-gold flex items-center justify-center mx-auto mb-6 text-[1.8rem]">✓</div>
              <h2 className="text-[2rem] font-bold text-navy mb-3">Welcome to the Nova-Turk Family, {form.firstName}!</h2>
              <p className="text-[#555] leading-relaxed mb-4 text-[1.05rem]">
                A Nova-Turk Specialist will contact you on WhatsApp within <strong>24 hours</strong> to discuss your admission journey.
              </p>
              {form.program && (
                <div className="bg-navy/4 border border-navy/10 rounded-md px-4 py-3 mb-6 text-left">
                  <span className="text-[0.8rem] text-[#888]">Program of Interest: </span>
                  <strong className="text-navy">{form.program || form.fieldOfInterest}</strong>
                </div>
              )}
              <blockquote className="text-[1.05rem] text-navy italic leading-relaxed border-l-[3px] border-gold pl-5 text-left my-8">
                &ldquo;Your dream is no longer yours alone; from today, it is our shared mission. Welcome to Nova-Turk.&rdquo;
              </blockquote>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="/" className="inline-flex items-center justify-center bg-navy hover:bg-navy-light text-white font-bold px-6 py-3 rounded transition-colors">Back to Home</a>
                <a href="/universities" className="inline-flex items-center justify-center border-2 border-gold text-gold hover:bg-gold hover:text-navy font-bold px-6 py-3 rounded transition-colors">Explore Universities</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Apply Through Nova-Turk */}
      <section ref={whyRef as React.RefObject<HTMLElement>} className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-[clamp(1.5rem,3vw,2rem)] font-bold text-white mb-10 gs-stagger">Why Apply Through Nova-Turk?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: Target,        title: "100% Türkiye Focus", desc: "No generalist advice. Deep Turkish academic expertise." },
              { Icon: ClipboardList, title: "Zero-Error File",    desc: "Our 'Golden File' process ensures flawless submissions." },
              { Icon: Plane,         title: "Visa Support",       desc: "Expert consulate filing with high approval rates." },
              { Icon: Handshake,     title: "Free Service",       desc: "Our guidance is completely free for students." },
            ].map((item) => (
              <div key={item.title} className="gs-stagger text-center px-4 py-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 mb-3">
                  <item.Icon size={22} strokeWidth={1.8} color="var(--gold)" />
                </div>
                <div className="text-gold font-bold text-sm mb-1.5">{item.title}</div>
                <div className="text-white/60 text-[0.82rem] leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
