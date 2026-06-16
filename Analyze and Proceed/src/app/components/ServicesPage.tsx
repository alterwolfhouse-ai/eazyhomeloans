import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Home, Hammer, Layers, RotateCcw, PlusCircle, Building,
  Landmark, Globe, UserPlus, Zap, ArrowRight, Phone, MessageCircle,
} from "lucide-react";
import { BRAND } from "../brand";

const WHATSAPP_URL = BRAND.whatsappUrl;

const CATEGORIES = ["All", "Purchase", "Transfer & Top-Up", "Specialized", "NRI & Joint"];

const SERVICES = [
  {
    icon: Home, category: "Purchase",
    label: "New Home Purchase Loan",
    desc: "Buying your first home or upgrading to a bigger one? We guide you on eligibility, documentation, and the process — so you know exactly what to expect before you apply.",
    tags: ["First Home", "Residential", "Ready-to-move"],
  },
  {
    icon: Hammer, category: "Purchase",
    label: "Home Construction Loan",
    desc: "Planning to build your own home on owned land? We help you understand how construction loans are disbursed in stages, documentation requirements, and what lenders typically look for.",
    tags: ["Self-Construction", "Plot Owned", "Stage Disbursement"],
  },
  {
    icon: Layers, category: "Purchase",
    label: "Plot + Construction Loan",
    desc: "Purchasing land and then building on it? We explain combined loan structures, how lenders evaluate such cases, and what documentation is typically required.",
    tags: ["Land + Build", "Combined Loan"],
  },
  {
    icon: RotateCcw, category: "Transfer & Top-Up",
    label: "Home Loan Balance Transfer",
    desc: "Already have a home loan and want to explore better terms? We guide you on what to compare, how balance transfers work, what the process involves, and what fees to watch for.",
    tags: ["Refinance", "Existing Loan", "Better Terms"],
  },
  {
    icon: PlusCircle, category: "Transfer & Top-Up",
    label: "Top-Up Loan",
    desc: "Need extra funds on your existing home loan? A top-up loan may be an option. We help you understand eligibility criteria and the process to access additional financing.",
    tags: ["Additional Funds", "Existing Borrowers"],
  },
  {
    icon: Hammer, category: "Purchase",
    label: "Home Renovation Loan",
    desc: "Upgrading or repairing your existing home? We guide you on renovation loan options, eligibility basics, and how to approach lenders for home improvement needs.",
    tags: ["Interior", "Repair", "Upgrade"],
  },
  {
    icon: Building, category: "Purchase",
    label: "Home Extension Loan",
    desc: "Adding floors or rooms to your property? We help you understand the loan structure and process for home extension, so you can plan your renovation journey confidently.",
    tags: ["Additional Floor", "Room Addition"],
  },
  {
    icon: Landmark, category: "Specialized",
    label: "Loan Against Property",
    desc: "Own a property and need funds for business or personal needs? We guide you on how loan against property works, what lenders look for, and the documentation process.",
    tags: ["LAP", "Business Use", "Owned Property"],
  },
  {
    icon: Globe, category: "NRI & Joint",
    label: "NRI Home Loan",
    desc: "Non-resident Indian looking to invest in Indian property? We help you understand the eligibility conditions, documentation process, and how to apply from abroad.",
    tags: ["Non-Resident", "NRI", "India Property"],
  },
  {
    icon: UserPlus, category: "NRI & Joint",
    label: "Joint Home Loan",
    desc: "Applying with a co-borrower (spouse, parent, or sibling)? Joint home loans can potentially improve eligibility. We explain how co-applicant rules work and what's needed.",
    tags: ["Co-Applicant", "Spouse", "Higher Eligibility"],
  },
  {
    icon: Zap, category: "Specialized",
    label: "Pre-Approved Loan",
    desc: "Want to know your eligibility before shortlisting a property? Pre-approval can give you clarity on your budget. We guide you through the pre-approval process.",
    tags: ["Budget Planning", "Before Property Hunt"],
  },
  {
    icon: Building, category: "Specialized",
    label: "Builder Project Support",
    desc: "Buying in a builder project? We help you understand lender-approved project requirements, builder paperwork, and how to navigate documentation for under-construction properties.",
    tags: ["Under Construction", "Builder", "New Project"],
  },
];

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 60%, #1A4BAF 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 50%, #3B6FD6 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#E8B94A" }}
          >
            Our Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
          >
            Every Home Loan Type, Guided Clearly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            From first-home purchases to NRI investments and balance transfers — expert guidance with
            no fake promises, no document uploads, and full transparency.
          </motion.p>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ background: "#fff", borderBottom: "1px solid rgba(12,45,107,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeCategory === cat ? "#0C2D6B" : "rgba(12,45,107,0.06)",
                  color: activeCategory === cat ? "#fff" : "#5A6B8A",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16" style={{ background: "#F4F7FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-6 flex flex-col group"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(12,45,107,0.08)",
                  boxShadow: "0 2px 16px rgba(12,45,107,0.05)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(12,45,107,0.08), rgba(26,75,175,0.14))" }}
                >
                  <svc.icon size={22} style={{ color: "#0C2D6B" }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {svc.label}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#5A6B8A" }}>{svc.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: "rgba(12,45,107,0.06)", color: "#0C2D6B" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: "#C8961E" }}
                >
                  Get Guidance <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mid-page CTA */}
          {filtered.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-3xl p-8 text-center"
              style={{
                background: "linear-gradient(135deg, #071B42, #0C2D6B)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Not sure which loan type suits you?
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                Talk to our expert — Niteen Sharma — for personalized guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                href={BRAND.phoneHref}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Phone size={14} /> {BRAND.phoneDisplay}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #C8961E, #E8B94A)", color: "#071B42", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <MessageCircle size={14} /> WhatsApp Expert
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
