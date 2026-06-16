import { useState } from "react";
import { motion } from "motion/react";
import { Phone, MessageCircle, MapPin, User, CheckCircle, Send } from "lucide-react";
import { BRAND, buildWhatsappUrl } from "../brand";

const WHATSAPP_URL = BRAND.whatsappUrl;

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    message: "",
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) return;
    window.open(
      buildWhatsappUrl(
        `Hi, I want guidance for a home loan.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "Not provided"}\nCity: ${form.city}\nService: ${form.service}\nMessage: ${form.message || "No message"}`
      ),
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 60%, #1A4BAF 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 50%, #3B6FD6 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#E8B94A" }}>
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800 }}
          >
            Talk to a Home Loan Expert
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            We are here to guide you — no pressure, no fake promises, just clarity.
          </motion.p>
        </div>
      </section>

      <section className="py-16" style={{ background: "#F4F7FF" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: contact info */}
            <div className="flex flex-col gap-5">
              {/* Expert card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-6"
                style={{ background: "linear-gradient(135deg, #071B42, #0C2D6B)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(200,150,30,0.2)", border: "1px solid rgba(200,150,30,0.3)" }}
                  >
                    <User size={26} style={{ color: "#E8B94A" }} />
                  </div>
                  <div>
                    <p className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{BRAND.contactPerson}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Home Loan Guidance Expert</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <a href={BRAND.phoneHref} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <Phone size={16} style={{ color: "#E8B94A" }} />
                    </div>
                    <span className="text-sm text-white group-hover:underline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{BRAND.phoneDisplay}</span>
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,211,102,0.15)" }}>
                      <MessageCircle size={16} style={{ color: "#25D366" }} />
                    </div>
                    <span className="text-sm text-white group-hover:underline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>WhatsApp for Guidance</span>
                  </a>
                </div>
              </motion.div>

              {/* Address card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl p-6"
                style={{ background: "#fff", border: "1px solid rgba(12,45,107,0.08)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(12,45,107,0.07)" }}>
                    <MapPin size={18} style={{ color: "#0C2D6B" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Office</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#5A6B8A" }}>
                      Shop No. 5, JS Plaza,<br />
                      Harsh Vihar Road,<br />
                      Ghaziabad, UP — 201009
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick CTAs */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={BRAND.phoneHref}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105"
                  style={{ background: "rgba(12,45,107,0.07)", border: "1px solid rgba(12,45,107,0.1)" }}
                >
                  <Phone size={22} style={{ color: "#0C2D6B" }} />
                  <span className="text-xs font-semibold" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Call Now</span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105"
                  style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}
                >
                  <MessageCircle size={22} style={{ color: "#25D366" }} />
                  <span className="text-xs font-semibold" style={{ color: "#25D366", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>WhatsApp</span>
                </a>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-3xl overflow-hidden flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(12,45,107,0.06), rgba(26,75,175,0.08))", height: 180, border: "1px solid rgba(12,45,107,0.08)" }}
              >
                <div className="text-center">
                  <MapPin size={32} style={{ color: "rgba(12,45,107,0.3)" }} className="mx-auto mb-2" />
                  <p className="text-xs" style={{ color: "#5A6B8A" }}>JS Plaza, Harsh Vihar Road</p>
                  <p className="text-xs" style={{ color: "#A3B4D6" }}>Ghaziabad, UP 201009</p>
                </div>
              </div>
            </div>

            {/* Right: Lead form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl p-7 shadow-xl"
              style={{ background: "#fff", border: "1px solid rgba(12,45,107,0.07)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(16,201,133,0.1)" }}>
                    <CheckCircle size={38} style={{ color: "#10C985" }} />
                  </div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "#5A6B8A" }}>Our expert will call you soon with guidance.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-lg mb-1" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Send Us a Message</h3>
                  <p className="text-sm mb-6" style={{ color: "#5A6B8A" }}>We'll get back to you within the day.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Full Name</label>
                        <input
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.08)", color: "#0A1628" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Phone Number</label>
                        <input
                          required
                          placeholder="e.g. 9876543210"
                          pattern="[6-9][0-9]{9}"
                          title="Enter a valid 10-digit Indian mobile number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.08)", color: "#0A1628" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Email (optional)</label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.08)", color: "#0A1628" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>City</label>
                        <input
                          required
                          placeholder="e.g. Ghaziabad"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.08)", color: "#0A1628" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Service Interested In</label>
                      <select
                        required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.08)", color: form.service ? "#0A1628" : "#5A6B8A" }}
                      >
                        <option value="">Select a service</option>
                        <option>Home Purchase Loan</option>
                        <option>Balance Transfer</option>
                        <option>Top-Up Loan</option>
                        <option>Construction Loan</option>
                        <option>Loan Against Property</option>
                        <option>NRI Home Loan</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Message (optional)</label>
                      <textarea
                        placeholder="Any specific questions or details..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                        style={{ background: "#EEF1F8", border: "1px solid rgba(12,45,107,0.08)", color: "#0A1628" }}
                      />
                    </div>
                    <label className="flex items-start gap-3 text-xs cursor-pointer" style={{ color: "#5A6B8A" }}>
                      <input
                        type="checkbox"
                        required
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-0.5"
                      />
                      {BRAND.consentText}
                    </label>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        boxShadow: "0 4px 16px rgba(12,45,107,0.3)",
                      }}
                    >
                      <Send size={15} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
