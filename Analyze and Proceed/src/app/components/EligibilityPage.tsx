import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, ArrowRight, ArrowLeft, User, IndianRupee, Clock, Building } from "lucide-react";
import { BRAND, buildWhatsappUrl } from "../brand";

const STEPS = [
  { label: "Basic Info", icon: User },
  { label: "Income Details", icon: IndianRupee },
  { label: "Loan Requirement", icon: Building },
  { label: "Confirmation", icon: CheckCircle },
];

interface FormState {
  name: string;
  phone: string;
  city: string;
  employmentType: string;
  monthlyIncome: string;
  existingEMI: string;
  loanAmount: string;
  tenure: string;
  loanType: string;
  consent: boolean;
}

const INITIAL_FORM: FormState = {
  name: "", phone: "", city: "", employmentType: "",
  monthlyIncome: "", existingEMI: "", loanAmount: "",
  tenure: "", loanType: "", consent: false,
};

export function EligibilityPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const isStep0Valid = form.name && form.phone && form.city;
  const isStep1Valid = form.employmentType && form.monthlyIncome;
  const isStep2Valid = form.loanAmount && form.tenure && form.loanType;
  const isStep3Valid = form.consent;

  const canProceed = [isStep0Valid, isStep1Valid, isStep2Valid, isStep3Valid][step];

  function next() {
    if (step < 3) setStep((s) => s + 1);
    else if (form.consent) {
      window.open(
        buildWhatsappUrl(
          `Hi, I submitted my eligibility details.\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nEmployment: ${form.employmentType}\nMonthly income: ${form.monthlyIncome}\nExisting EMI: ${form.existingEMI || "0"}\nLoan type: ${form.loanType}\nLoan amount: ${form.loanAmount}\nTenure: ${form.tenure}`
        ),
        "_blank",
        "noopener,noreferrer"
      );
      setSubmitted(true);
    }
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  function set(key: keyof FormState, val: string | boolean) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(16,201,133,0.1)" }}
          >
            <CheckCircle size={44} style={{ color: "#10C985" }} />
          </div>
          <h2 className="font-bold text-2xl mb-3" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Request Received!
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#5A6B8A" }}>
            Your request has been received. Our expert will review your details and contact you for guidance.
          </p>
          <div
            className="rounded-2xl p-4 text-xs text-left"
            style={{ background: "rgba(200,150,30,0.08)", border: "1px solid rgba(200,150,30,0.2)", color: "#7A5A10" }}
          >
            <strong>Disclaimer:</strong> This is an estimate only and does not guarantee loan approval.
            Final eligibility, rate, and approval depend on the lender's policy and verification.
          </div>
        </motion.div>
      </div>
    );
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
            Eligibility Check
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800 }}
          >
            Get Your Loan Eligibility Estimate
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            A simple 4-step process — no documents required at this stage. Just basic details.
          </motion.p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-16" style={{ background: "#F4F7FF" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: i <= step ? (i < step ? "#10C985" : "#0C2D6B") : "rgba(12,45,107,0.08)",
                      color: i <= step ? "#fff" : "#A3B4D6",
                    }}
                  >
                    {i < step ? <CheckCircle size={18} /> : <s.icon size={16} />}
                  </div>
                  <p className="text-xs mt-1.5 hidden sm:block font-medium" style={{ color: i === step ? "#0C2D6B" : "#A3B4D6", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {s.label}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-2 transition-all duration-300"
                    style={{ background: i < step ? "#10C985" : "rgba(12,45,107,0.12)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="rounded-3xl p-6 sm:p-8 shadow-xl" style={{ background: "#fff", border: "1px solid rgba(12,45,107,0.07)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <StepSection title="Tell us about yourself" subtitle="Quick and confidential. No documents needed.">
                    <Field label="Full Name">
                      <input className="ez-input" placeholder="e.g. Rajesh Kumar" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </Field>
                    <Field label="Phone Number">
                      <input className="ez-input" placeholder="e.g. 9876543210" pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    </Field>
                    <Field label="City">
                      <input className="ez-input" placeholder="e.g. Delhi, Mumbai, Noida" value={form.city} onChange={(e) => set("city", e.target.value)} />
                    </Field>
                  </StepSection>
                )}

                {step === 1 && (
                  <StepSection title="Income & Employment" subtitle="This helps estimate your loan eligibility range.">
                    <Field label="Employment Type">
                      <select className="ez-input" value={form.employmentType} onChange={(e) => set("employmentType", e.target.value)}>
                        <option value="">Select type</option>
                        <option>Salaried</option>
                        <option>Self-Employed (Business)</option>
                        <option>Self-Employed (Professional)</option>
                      </select>
                    </Field>
                    <Field label="Monthly Income (approximate)">
                      <input className="ez-input" placeholder="e.g. ₹60,000" value={form.monthlyIncome} onChange={(e) => set("monthlyIncome", e.target.value)} />
                    </Field>
                    <Field label="Existing Monthly EMI (if any)">
                      <input className="ez-input" placeholder="e.g. ₹5,000 or 0 if none" value={form.existingEMI} onChange={(e) => set("existingEMI", e.target.value)} />
                    </Field>
                  </StepSection>
                )}

                {step === 2 && (
                  <StepSection title="Loan Requirement" subtitle="What kind of loan guidance do you need?">
                    <Field label="Loan Type">
                      <select className="ez-input" value={form.loanType} onChange={(e) => set("loanType", e.target.value)}>
                        <option value="">Select loan type</option>
                        <option>Home Purchase Loan</option>
                        <option>Balance Transfer</option>
                        <option>Top-Up Loan</option>
                        <option>Construction Loan</option>
                        <option>Loan Against Property</option>
                        <option>Renovation Loan</option>
                        <option>NRI Home Loan</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <Field label="Loan Amount Required (approximate)">
                      <input className="ez-input" placeholder="e.g. ₹50,00,000" value={form.loanAmount} onChange={(e) => set("loanAmount", e.target.value)} />
                    </Field>
                    <Field label="Preferred Tenure">
                      <select className="ez-input" value={form.tenure} onChange={(e) => set("tenure", e.target.value)}>
                        <option value="">Select tenure</option>
                        <option>5 years</option>
                        <option>10 years</option>
                        <option>15 years</option>
                        <option>20 years</option>
                        <option>25 years</option>
                        <option>30 years</option>
                      </select>
                    </Field>
                  </StepSection>
                )}

                {step === 3 && (
                  <StepSection title="Review & Confirm" subtitle="Please read before submitting.">
                    <div className="rounded-2xl p-4 mb-5 text-xs leading-relaxed" style={{ background: "rgba(200,150,30,0.08)", border: "1px solid rgba(200,150,30,0.2)", color: "#7A5A10" }}>
                      <strong>Important Disclaimer:</strong> This is an estimate only and does not guarantee loan approval.
                      Final eligibility, rate, and approval depend on the lender's policy and verification.
                    </div>
                    <div className="rounded-2xl p-4 mb-5 text-xs space-y-1.5" style={{ background: "#F4F7FF" }}>
                      <p><strong style={{ color: "#0C2D6B" }}>Name:</strong> <span style={{ color: "#5A6B8A" }}>{form.name}</span></p>
                      <p><strong style={{ color: "#0C2D6B" }}>Phone:</strong> <span style={{ color: "#5A6B8A" }}>{form.phone}</span></p>
                      <p><strong style={{ color: "#0C2D6B" }}>Loan Type:</strong> <span style={{ color: "#5A6B8A" }}>{form.loanType}</span></p>
                      <p><strong style={{ color: "#0C2D6B" }}>Loan Amount:</strong> <span style={{ color: "#5A6B8A" }}>{form.loanAmount}</span></p>
                    </div>
                    <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: "#5A6B8A" }}>
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        className="mt-0.5"
                      />
                      {BRAND.consentText}
                    </label>
                  </StepSection>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <button
                onClick={prev}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: step === 0 ? "transparent" : "rgba(12,45,107,0.07)",
                  color: step === 0 ? "transparent" : "#0C2D6B",
                  visibility: step === 0 ? "hidden" : "visible",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={next}
                disabled={!canProceed}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(12,45,107,0.3)",
                }}
              >
                {step === 3 ? "Submit" : "Continue"} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .ez-input {
          width: 100%;
          padding: 0.625rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          outline: none;
          background: #EEF1F8;
          border: 1px solid rgba(12,45,107,0.08);
          color: #0A1628;
          transition: border-color 0.2s;
        }
        .ez-input:focus { border-color: rgba(12,45,107,0.3); }
      `}</style>
    </div>
  );
}

function StepSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-1" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
      <p className="text-sm mb-6" style={{ color: "#5A6B8A" }}>{subtitle}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
      {children}
    </div>
  );
}
