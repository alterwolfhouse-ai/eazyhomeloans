import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageCircle, Menu, X, Home, ChevronDown } from "lucide-react";
import { BRAND, BrandWordmark } from "../brand";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Eligibility", href: "/eligibility" },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_URL = BRAND.whatsappUrl;
const CALL_URL = BRAND.phoneHref;

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 2px 24px rgba(12,45,107,0.1)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)" }}
              >
                <Home size={18} className="text-white" />
              </div>
              <div>
                <span
                  className="font-bold text-lg leading-none"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: scrolled ? "#0C2D6B" : "#0C2D6B",
                  }}
                >
                  <BrandWordmark />
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative text-sm font-semibold transition-colors"
                    style={{
                      color: active ? "#0C2D6B" : "#374151",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {link.label}
                    {active && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: "#C8961E" }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: "#E8FAF2",
                  color: "#10C985",
                  border: "1px solid rgba(16,201,133,0.25)",
                }}
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
              <a
                href={CALL_URL}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 glow-navy"
                style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)" }}
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg"
              style={{ color: "#0C2D6B" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
              style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)" }}
            >
              <div className="px-4 py-4 flex flex-col gap-3 border-t border-border">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-2 text-sm font-semibold"
                    style={{
                      color:
                        location.pathname === link.href ? "#0C2D6B" : "#374151",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-3 pt-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: "#E8FAF2", color: "#10C985" }}
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                  <a
                    href={CALL_URL}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)" }}
                  >
                    <Phone size={14} /> Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp CTA */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl pulse-glow transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#071B42" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 80% 50%, #1A4BAF 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1A4BAF, #C8961E)" }}
              >
                <Home size={18} className="text-white" />
              </div>
              <span
                className="font-bold text-xl text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <BrandWordmark light />
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Expert home loan guidance for new purchases, balance transfers, top-ups, and more.
              We help you navigate the process with clarity and confidence.
            </p>
            <div className="flex gap-3">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "rgba(37,211,102,0.15)", color: "#25D366", border: "1px solid rgba(37,211,102,0.25)" }}
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href={BRAND.phoneHref}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "rgba(12,45,107,0.4)", color: "#A8C4FF", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Phone size={14} /> {BRAND.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: "#C8961E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Services</p>
            <ul className="space-y-2.5">
              {["Home Purchase Loan", "Balance Transfer", "Top-Up Loan", "Construction Loan", "Loan Against Property", "NRI Home Loan"].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: "#C8961E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact</p>
            <ul className="space-y-2.5 mb-6">
              <li className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Niteen Sharma</li>
              <li>
                <a href={BRAND.phoneHref} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Shop No. 5, JS Plaza,<br />Harsh Vihar Road, 201009
              </li>
            </ul>
            <p className="text-sm font-semibold mb-3" style={{ color: "#C8961E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Legal</p>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>Privacy Policy</Link></li>
              <li><Link to="/privacy" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Copyright {new Date().getFullYear()} {BRAND.name}. All rights reserved. {BRAND.domain}
          </p>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            We are a loan guidance service, not a direct lender. All eligibility and EMI figures are estimates only.
          </p>
        </div>
      </div>
    </footer>
  );
}
