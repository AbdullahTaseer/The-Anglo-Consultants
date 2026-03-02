"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ApplyPopup from "./ApplyPopup";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/universities", label: "Universities" },
    { href: "/programs", label: "Programs" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-100 h-18 bg-navy transition-all duration-300 ${scrolled ? "shadow-2xl" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-gold">
              <span className="text-sm font-black text-navy">NT</span>
            </div>
            <div>
              <div className="font-bold text-white text-base leading-tight tracking-wide">Nova-Turk</div>
              <div className="text-xs leading-tight text-gold tracking-widest">Education</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  pathname === link.href ? "text-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setPopupOpen(true)}
            className="hidden md:inline-flex items-center justify-center bg-red hover:bg-red-hover text-white text-sm font-bold px-5 py-2 rounded cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Apply Now
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 w-0" : "w-5"}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 px-4 text-sm font-semibold rounded-sm transition-colors ${
                  pathname === link.href ? "text-gold bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setPopupOpen(true); }}
              className="mt-2 w-full inline-flex items-center justify-center bg-red hover:bg-red-hover text-white font-bold py-2.5 rounded cursor-pointer transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </nav>

      <ApplyPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
