"use client";
import { useState, useEffect, useRef } from "react";
import { X, CheckCircle } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ApplyPopupProps {
  open: boolean;
  onClose: () => void;
  prefilledProgram?: string;
}

export default function ApplyPopup({ open, onClose, prefilledProgram }: ApplyPopupProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "Pakistani",
    degree: "",
    language: "",
    program: prefilledProgram || "",
    fieldOfInterest: "",
    educationalBackground: "",
    question: "",
  });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefilledProgram) setForm((f) => ({ ...f, program: prefilledProgram }));
  }, [prefilledProgram]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((f) => ({ ...f, [name]: value.replace(/\D/g, "") }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSelect = (name: string) => (value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.degree) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      firstName: "", lastName: "", email: "", phone: "",
      nationality: "Pakistani", degree: "", language: "",
      program: "", fieldOfInterest: "", educationalBackground: "", question: "",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-navy/75 backdrop-blur-sm animate-fade-in"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-135 max-h-[90vh] overflow-y-auto bg-white rounded-lg p-8 shadow-[0_40px_100px_rgba(11,28,45,0.4)] animate-fade-up sm:p-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-[#0B1C2D]/07 text-[#0B1C2D] hover:bg-[#0B1C2D]/12 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-8 rounded-full bg-[#D4AF37]" />
                <h2 className="text-xl font-bold text-[#0B1C2D]">
                  Start Your Journey with a Specialist.
                </h2>
              </div>
              <p className="text-sm ml-3 text-[#666]">
                Fill in your details and an advisor from The Anglo Consultants will contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </p>
              )}
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">First Name *</label>
                  <input name="firstName" required value={form.firstName} onChange={handleChange}
                    className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-charcoal text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="e.g. Ahmed" />
                </div>
                <div>
                  <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Last Name *</label>
                  <input name="lastName" required value={form.lastName} onChange={handleChange}
                    className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-charcoal text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="e.g. Khan" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Email Address *</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-charcoal text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="your@email.com" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Phone / WhatsApp *</label>
                <input name="phone" required value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-charcoal text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="03001234567 (digits only)" maxLength={15} />
              </div>

              {/* Degree + Language */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Degree Level *</label>
                  <Select value={form.degree} onValueChange={handleSelect("degree")} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                      <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                      <SelectItem value="PhD">Doctoral (PhD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Language</label>
                  <Select value={form.language} onValueChange={handleSelect("language")}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Turkish">Turkish</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Field of Interest */}
              <div>
                <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Field of Interest</label>
                <Select value={form.fieldOfInterest} onValueChange={handleSelect("fieldOfInterest")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering & Technology">Engineering & Technology</SelectItem>
                    <SelectItem value="Medicine & Health Sciences">Medicine & Health Sciences</SelectItem>
                    <SelectItem value="Business & Economics">Business & Economics</SelectItem>
                    <SelectItem value="Social Sciences">Social Sciences</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Arts & Design">Arts & Design</SelectItem>
                    <SelectItem value="Architecture">Architecture</SelectItem>
                    <SelectItem value="Psychology">Psychology</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Program */}
              <div>
                <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Program of Interest</label>
                <input name="program" value={form.program} onChange={handleChange}
                  className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-charcoal text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit]" placeholder="e.g. Computer Engineering, Medicine, MBA..." />
              </div>

              {/* Educational Background */}
              <div>
                <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Educational Background</label>
                <Select value={form.educationalBackground} onValueChange={handleSelect("educationalBackground")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Matriculation (Grade 10)">Matriculation (Grade 10)</SelectItem>
                    <SelectItem value="Intermediate (Grade 12 / FSc / FA)">Intermediate (FSc / FA)</SelectItem>
                    <SelectItem value="A-Levels">A-Levels</SelectItem>
                    <SelectItem value="Bachelor's Degree">Bachelor&apos;s Degree</SelectItem>
                    <SelectItem value="Master's Degree">Master&apos;s Degree</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Question */}
              <div>
                <label className="block text-[0.75rem] font-bold text-navy tracking-widest uppercase mb-1">Your Question (Optional)</label>
                <textarea name="question" value={form.question} onChange={handleChange}
                  className="w-full px-4 py-3 border-[1.5px] border-[#dde3ea] rounded bg-bg text-charcoal text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 font-[inherit] resize-none" rows={3}
                  placeholder="Any specific question or requirement..." />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center bg-red hover:bg-red-hover text-white font-bold text-base py-3 rounded cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? "Sending…" : "Light My Path →"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#D4AF37]/15">
              <CheckCircle size={36} strokeWidth={1.8} color="#D4AF37" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#0B1C2D]">
              Thank you, {form.firstName}!
            </h3>
            <p className="mb-1 text-[#555]">
              A Specialist from The Anglo Consultants will contact you on WhatsApp within 24 hours.
            </p>
            {form.program && (
              <p className="text-sm font-semibold text-[#D4AF37]">
                Regarding: {form.program}
              </p>
            )}
            <div className="mt-4 p-3 rounded bg-[#0B1C2D]/05">
              <p className="text-xs text-[#777]">
                 &ldquo;Your dream is no longer yours alone; from today, it is our shared mission.&rdquo;
              </p>
            </div>
            <button onClick={handleReset} className="mt-6 w-full inline-flex items-center justify-center bg-navy hover:bg-navy-light text-white font-bold py-3 rounded cursor-pointer transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
