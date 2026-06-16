import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Home, Phone, MessageCircle, CheckCircle, ArrowRight,
  FileText, Calculator, Shield, Star, ChevronDown,
  TrendingUp, Users, Clock, Award, Layers,
  Building, RotateCcw, PlusCircle, Hammer, Landmark,
  Globe, UserPlus, Zap, CreditCard, HelpCircle,
} from "lucide-react";
import { BRAND, buildWhatsappUrl } from "../brand";

const WHATSAPP_URL = BRAND.whatsappUrl;

// --- Reusable fade-up container ---
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- SERVICES ---
const SERVICES = [
  { icon: Home, label: "New Home Purchase Loan", desc: "Guidance for buying your dream home — first-time buyers to upgrade buyers." },
  { icon: Hammer, label: "Home Construction Loan", desc: "Build your custom home with structured loan disbursement guidance." },
  { icon: Layers, label: "Plot + Construction Loan", desc: "Combined loan guidance for land purchase and construction." },
  { icon: RotateCcw, label: "Balance Transfer", desc: "Transfer your existing home loan for potentially better terms." },
  { icon: PlusCircle, label: "Top-Up Loan", desc: "Extra funds on your existing home loan for any personal need." },
  { icon: Hammer, label: "Renovation Loan", desc: "Upgrade, repair, or improve your existing home affordably." },
  { icon: Building, label: "Home Extension Loan", desc: "Add rooms or floors to your current property with guided financing." },
  { icon: Landmark, label: "Loan Against Property", desc: "Unlock the value of your owned property for business or personal needs." },
  { icon: Globe, label: "NRI Home Loan", desc: "Home loan guidance for non-resident Indians investing in India." },
  { icon: UserPlus, label: "Joint Home Loan", desc: "Apply together for higher eligibility and shared repayment." },
  { icon: Zap, label: "Pre-Approved Loan", desc: "Get clarity on your eligibility before selecting your property." },
  { icon: Building, label: "Builder Project Support", desc: "Guidance for buying in builder projects with documentation support." },
];

// --- PROCESS STEPS ---
const PROCESS_STEPS = [
  { num: "01", label: "Share Your Requirement", desc: "Tell us your loan type, amount needed, and city — quick, confidential, and no documents yet.", icon: FileText },
  { num: "02", label: "Get Eligibility Guidance", desc: "We assess your income, EMI capacity, and loan requirement to give you a clear estimate.", icon: TrendingUp },
  { num: "03", label: "Prepare Documents", desc: "We guide you on which documents are likely needed — no uploads required at this stage.", icon: CheckCircle },
  { num: "04", label: "Toward Approval & Disbursement", desc: "We guide you through lender interactions, application steps, and disbursement process.", icon: Award },
];

// --- PAIN POINTS ---
const PAIN_POINTS = [
  { q: "Which loan type is right for me?", icon: HelpCircle },
  { q: "Can I transfer my existing home loan?", icon: RotateCcw },
  { q: "Can I get a top-up on my current loan?", icon: PlusCircle },
  { q: "What documents will I need?", icon: FileText },
  { q: "How much EMI can I comfortably afford?", icon: Calculator },
  { q: "What happens after I submit my details?", icon: CheckCircle },
];

// --- FAQ ---
const FAQ = [
  {
    q: "Do you guarantee loan approval?",
    a: "No. We are a loan guidance service. We help you understand eligibility, documentation, and the process — final approval depends on the lender's policy and verification.",
  },
  {
    q: "Do I need to upload any documents now?",
    a: "No. We do not ask for Aadhaar, PAN, salary slips, bank statements, or any sensitive documents. We only collect basic contact and requirement details to guide you.",
  },
  {
    q: "What types of home loans can you guide me on?",
    a: "We cover new home purchase loans, construction loans, balance transfers, top-up loans, home renovation loans, home extension loans, loan against property, NRI home loans, and more.",
  },
  {
    q: "Is this service free?",
    a: "We provide initial guidance and process clarity. Please contact us for complete details on our service model.",
  },
  {
    q: "Will my details be shared without consent?",
    a: "No. We contact you only after your explicit consent, based on the details you submit through our form.",
  },
  {
    q: "Are the EMI and eligibility estimates accurate?",
    a: "These are indicative estimates only and do not guarantee approval. Final eligibility, rate, and approval depend on the lender's policy and independent verification.",
  },
];

// --- TRUST ITEMS ---
const TRUST_ITEMS = [
  { icon: Shield, label: "Expert Guidance" },
  { icon: Layers, label: "Multiple Loan Types" },
  { icon: CheckCircle, label: "Clear Process" },
  { icon: Star, label: "No False Promises" },
  { icon: Users, label: "Consent-Based Contact" },
];

export function HomePage() {
  const [formData, setFormData] = useState({
    name: "", phone: "", city: "", service: "", consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.consent) return;
    window.open(
      buildWhatsappUrl(
        `Hi, I want guidance for a home loan.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nService: ${formData.service || "Not selected"}`
      ),
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  }

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section
        className="relative min-h-[92vh] flex items-center"
        style={{
          background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 55%, #1A4BAF 100%)",
        }}
      >
        {/* Bg decorations */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 100% 30%, #3B6FD6 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 10% 80%, #C8961E 0%, transparent 55%)",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(200,150,30,0.18)", color: "#E8B94A", border: "1px solid rgba(200,150,30,0.3)" }}
            >
              <Star size={12} /> Home Loans Made Simple
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white mb-6 leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800 }}
            >
              Home Loans Made{" "}
              <span
                className="relative"
                style={{ color: "#E8B94A" }}
              >
                Easier, Faster
              </span>{" "}
              &amp; Clearer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.72)", maxWidth: "520px" }}
            >
              Get expert guidance for home loans, balance transfers, top-up loans, loan against property,
              and construction loans — with clear support from eligibility to process guidance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/eligibility"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #C8961E, #E8B94A)",
                  color: "#071B42",
                  boxShadow: "0 0 24px rgba(200,150,30,0.45)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Check Eligibility <ArrowRight size={16} />
              </Link>
              <a
                href={BRAND.phoneHref}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Phone size={15} /> Talk to Loan Expert
              </a>
            </motion.div>

            {/* Trust mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12"
            >
              {[
                { val: "12+", label: "Loan Types" },
                { val: "100%", label: "Consent-Based" },
                { val: "Free", label: "Initial Guidance" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-bold text-xl text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.val}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating form + visual cards */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Floating background cards */}
            <motion.div
              className="absolute -top-8 -left-4 floating-slow hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="glass-card rounded-2xl px-5 py-4 shadow-xl" style={{ minWidth: 200 }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,201,133,0.15)" }}>
                    <CheckCircle size={18} style={{ color: "#10C985" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Expert Review</p>
                    <p className="text-xs" style={{ color: "#5A6B8A" }}>Same day guidance</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-2 floating-delay hidden lg:block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="glass-card rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,150,30,0.15)" }}>
                    <Calculator size={18} style={{ color: "#C8961E" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>EMI Estimate</p>
                    <p className="text-xs" style={{ color: "#5A6B8A" }}>Indicative only</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lead Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm"
            >
              <div className="glass-card rounded-3xl p-6 shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                <p className="font-bold text-base mb-1" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Get Loan Guidance
                </p>
                <p className="text-xs mb-5" style={{ color: "#5A6B8A" }}>Quick, free, no documents needed</p>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,201,133,0.12)" }}>
                      <CheckCircle size={32} style={{ color: "#10C985" }} />
                    </div>
                    <p className="font-semibold text-sm" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Request Received!</p>
                    <p className="text-xs mt-2" style={{ color: "#5A6B8A" }}>Our expert will contact you shortly for guidance.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.1)", color: "#0A1628" }}
                    />
                    <input
                      required
                      placeholder="Phone Number"
                      pattern="[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.1)", color: "#0A1628" }}
                    />
                    <input
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.1)", color: "#0A1628" }}
                    />
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.1)", color: formData.service ? "#0A1628" : "#5A6B8A" }}
                    >
                      <option value="">Service Required</option>
                      <option>Home Purchase Loan</option>
                      <option>Balance Transfer</option>
                      <option>Top-Up Loan</option>
                      <option>Construction Loan</option>
                      <option>Loan Against Property</option>
                      <option>NRI Home Loan</option>
                      <option>Other</option>
                    </select>
                    <label className="flex items-start gap-2.5 text-xs cursor-pointer" style={{ color: "#5A6B8A" }}>
                      <input
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5"
                      />
                      {BRAND.consentText}
                    </label>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)",
                        color: "#fff",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        boxShadow: "0 4px 16px rgba(12,45,107,0.35)",
                      }}
                    >
                      Get Expert Guidance →
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section style={{ background: "#fff", borderBottom: "1px solid rgba(12,45,107,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {TRUST_ITEMS.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ background: "rgba(12,45,107,0.05)", border: "1px solid rgba(12,45,107,0.08)" }}
              >
                <t.icon size={15} style={{ color: "#C8961E" }} />
                <span className="text-xs font-semibold" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 section-depth" style={{ background: "#F4F7FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C8961E" }}>Our Services</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0C2D6B" }}>
              Every Type of Home Loan, Guided Clearly
            </h2>
            <p className="mt-3 max-w-lg mx-auto text-sm leading-relaxed" style={{ color: "#5A6B8A" }}>
              From your first home to investment property — we guide you through every loan type with transparency and expertise.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.label} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full rounded-2xl p-5 cursor-pointer group"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(12,45,107,0.08)",
                    boxShadow: "0 2px 16px rgba(12,45,107,0.06)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, rgba(12,45,107,0.08), rgba(26,75,175,0.12))" }}
                  >
                    <svc.icon size={20} style={{ color: "#0C2D6B" }} />
                  </div>
                  <p className="font-semibold text-sm mb-2" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{svc.label}</p>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#5A6B8A" }}>{svc.desc}</p>
                  <Link
                    to="/contact"
                    className="flex items-center gap-1 text-xs font-semibold transition-colors"
                    style={{ color: "#C8961E" }}
                  >
                    Get Guidance <ArrowRight size={12} />
                  </Link>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse 50% 60% at 85% 40%, #1A4BAF 0%, transparent 65%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#E8B94A" }}>How It Works</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#fff" }}>
              Your Loan Journey, Step by Step
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div
                  className="relative rounded-2xl p-6 h-full"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #C8961E, #E8B94A)" }}
                    >
                      <step.icon size={18} style={{ color: "#071B42" }} />
                    </div>
                    <span className="font-bold text-2xl" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.num}</span>
                  </div>
                  <p className="font-semibold text-sm mb-2 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{step.desc}</p>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div
                      className="absolute top-10 -right-3 w-6 h-px hidden lg:block"
                      style={{ background: "rgba(200,150,30,0.4)" }}
                    />
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ELIGIBILITY PREVIEW ===== */}
      <section className="py-24 section-depth" style={{ background: "#F4F7FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C8961E" }}>Eligibility Check</p>
              <h2 className="mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)", fontWeight: 800, color: "#0C2D6B" }}>
                Get an Estimate of Your Loan Eligibility
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#5A6B8A" }}>
                Share basic income and requirement details to get an indicative eligibility overview.
                No documents needed at this stage.
              </p>
              <div className="rounded-2xl p-4 mb-6" style={{ background: "rgba(200,150,30,0.08)", border: "1px solid rgba(200,150,30,0.2)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#7A5A10" }}>
                  <strong>Disclaimer:</strong> This is an estimate only and does not guarantee loan approval.
                  Final eligibility, rate, and approval depend on the lender's policy and verification.
                </p>
              </div>
              <Link
                to="/eligibility"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)", boxShadow: "0 4px 16px rgba(12,45,107,0.3)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Check My Eligibility <ArrowRight size={15} />
              </Link>
            </FadeUp>

            <FadeUp delay={0.15} className="floating">
              <div className="glass-card rounded-3xl p-6 shadow-2xl" style={{ border: "1px solid rgba(12,45,107,0.1)" }}>
                <p className="font-semibold text-sm mb-5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Eligibility Preview</p>
                {[
                  { label: "Monthly Income", placeholder: "e.g. ₹60,000", type: "text" },
                  { label: "Existing Monthly EMI", placeholder: "e.g. ₹5,000 (if any)", type: "text" },
                  { label: "Loan Amount Required", placeholder: "e.g. ₹50,00,000", type: "text" },
                  { label: "Desired Tenure", placeholder: "e.g. 20 years", type: "text" },
                ].map((field) => (
                  <div key={field.label} className="mb-3">
                    <label className="block text-xs font-medium mb-1" style={{ color: "#5A6B8A" }}>{field.label}</label>
                    <input
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.08)", color: "#0A1628" }}
                      readOnly
                    />
                  </div>
                ))}
                <Link
                  to="/eligibility"
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Get Full Eligibility Check →
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== EMI CALCULATOR PREVIEW ===== */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp delay={0.1} className="order-2 lg:order-1 floating-slow">
              <div
                className="rounded-3xl p-7 shadow-2xl"
                style={{ background: "linear-gradient(135deg, #071B42, #0C2D6B)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p className="font-semibold text-sm mb-5 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>EMI Calculator Preview</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Loan Amount", val: "₹50,00,000" },
                    { label: "Interest Rate (est.)", val: "Custom" },
                    { label: "Tenure", val: "20 Years" },
                    { label: "Est. Monthly EMI", val: "—" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</p>
                      <p className="font-bold text-sm text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.val}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  * Estimates are indicative only. Final EMI depends on lender's rate and policy.
                </p>
                <Link
                  to="/emi-calculator"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #C8961E, #E8B94A)", color: "#071B42", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Open Full Calculator <Calculator size={15} />
                </Link>
              </div>
            </FadeUp>

            <FadeUp className="order-1 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C8961E" }}>EMI Calculator</p>
              <h2 className="mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)", fontWeight: 800, color: "#0C2D6B" }}>
                Plan Your Repayments with Confidence
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#5A6B8A" }}>
                Use our interactive EMI calculator to get indicative monthly payment estimates.
                Adjust loan amount, rate, and tenure to plan your budget.
              </p>
              <Link
                to="/emi-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)", boxShadow: "0 4px 16px rgba(12,45,107,0.3)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Try EMI Calculator <ArrowRight size={15} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== PAIN POINTS ===== */}
      <section className="py-24 section-depth" style={{ background: "#F4F7FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C8961E" }}>We Understand Your Concerns</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#0C2D6B" }}>
              Confused about EMI, documents, eligibility, or bank options?
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <FadeUp key={p.q} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-5 flex items-start gap-4"
                  style={{ background: "#fff", border: "1px solid rgba(12,45,107,0.07)", boxShadow: "0 2px 16px rgba(12,45,107,0.05)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(12,45,107,0.07)" }}>
                    <p.icon size={18} style={{ color: "#0C2D6B" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.q}</p>
                    <Link to="/contact" className="text-xs font-medium mt-1.5 inline-block" style={{ color: "#C8961E" }}>
                      Ask an expert →
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C8961E" }}>FAQ</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#0C2D6B" }}>
              Common Questions, Clear Answers
            </h2>
          </FadeUp>

          <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <FadeUp key={item.q} delay={i * 0.05}>
                <Accordion.Item
                  value={`item-${i}`}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#F4F7FF", border: "1px solid rgba(12,45,107,0.08)" }}
                >
                  <Accordion.Trigger
                    className="w-full flex items-center justify-between px-5 py-4 text-left group"
                    style={{ color: "#0C2D6B" }}
                  >
                    <span className="font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.q}</span>
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0 ml-4"
                      style={{ color: "#C8961E" }}
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[slideDown_200ms_ease-out] data-[state=closed]:animate-[slideUp_200ms_ease-out]">
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#5A6B8A" }}>{item.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              </FadeUp>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 60%, #1A4BAF 100%)" }}
      >
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #3B6FD6 0%, transparent 65%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#E8B94A" }}>Ready to Begin?</p>
            <h2 className="text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800 }}>
              Ready to make your home loan journey simpler?
            </h2>
            <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Talk to {BRAND.contactPerson} and get expert guidance with no pressure, no false promises, just clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link
                to="/eligibility"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #C8961E, #E8B94A)", color: "#071B42", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 0 24px rgba(200,150,30,0.4)" }}
              >
                Check Eligibility <ArrowRight size={16} />
              </Link>
              <a
                href={BRAND.phoneHref}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <Phone size={15} /> Call Now
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: "rgba(37,211,102,0.15)", color: "#25D366", border: "1px solid rgba(37,211,102,0.25)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <MessageCircle size={15} /> WhatsApp Expert
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              <span>{BRAND.contactPerson}</span>
              <span className="hidden sm:block opacity-40">|</span>
              <a href={BRAND.phoneHref} style={{ color: "rgba(255,255,255,0.6)" }}>{BRAND.phoneDisplay}</a>
              <span className="hidden sm:block opacity-40">|</span>
              <span>{BRAND.addressShort}</span>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
