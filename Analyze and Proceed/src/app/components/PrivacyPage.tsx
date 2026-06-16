import { motion } from "motion/react";
import { Shield, FileText } from "lucide-react";
import { BRAND } from "../brand";

const SECTIONS = [
  {
    title: `1. About ${BRAND.name}`,
    content: `${BRAND.name} is a home loan guidance and assistance service operated by ${BRAND.contactPerson}, located at ${BRAND.addressShort}. We are not a direct lender, bank, or NBFC. We provide guidance and process support to individuals seeking home loans.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect only the basic information you voluntarily provide through our contact forms: your full name, phone number, city, and loan requirement type. We do NOT collect, request, or store sensitive financial documents such as Aadhaar, PAN, salary slips, bank statements, or property papers through this website.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `Your information is used solely to contact you for the purpose of providing home loan guidance - only after your explicit consent. We do not use your information for unsolicited marketing or share it with third parties without your consent.`,
  },
  {
    title: "4. Consent",
    content: `We contact you only after you explicitly check the consent checkbox in our forms. By submitting a form with consent, you authorize ${BRAND.name} to contact you via phone or WhatsApp for guidance related to the service you selected.`,
  },
  {
    title: "5. Data Security",
    content: `We take reasonable precautions to protect the information you share with us. However, no internet transmission is 100% secure. Please do not share sensitive financial documents through this website.`,
  },
  {
    title: "6. No Loan Guarantee",
    content: `${BRAND.name} does not guarantee loan approval, specific interest rates, or specific loan amounts. All eligibility and EMI figures presented on this website are indicative estimates only. Final approval, rate, and terms depend entirely on the lender's independent policy and verification.`,
  },
  {
    title: "7. Disclaimer on EMI and Eligibility",
    content: `All EMI calculations and eligibility estimates on this website are based on the figures entered by the user and standard assumptions. These are for planning purposes only and do not constitute a financial commitment or guarantee from any lender. Final eligibility, rate, and approval depend on the lender's policy and verification.`,
  },
  {
    title: "8. Third-Party Lenders",
    content: `${BRAND.name} may guide you toward suitable lenders based on your profile. We do not represent, endorse, or guarantee any specific bank or NBFC. We do not use real bank or NBFC logos to imply partnership. All loan processing is subject to the respective lender's terms and conditions.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy and Disclaimer from time to time. We recommend reviewing this page periodically. Continued use of our website after updates implies acceptance of the revised policy.`,
  },
  {
    title: "10. Contact",
    content: `For any privacy-related questions or concerns, please contact:\n\n${BRAND.contactPerson}\n${BRAND.addressShort}\nPhone: ${BRAND.phoneDisplay}\nWebsite: ${BRAND.websiteUrl}`,
  },
];

export function PrivacyPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 60%, #1A4BAF 100%)" }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ background: "rgba(200,150,30,0.15)", color: "#E8B94A", border: "1px solid rgba(200,150,30,0.25)" }}
          >
            <Shield size={12} /> Legal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800 }}
          >
            Privacy Policy &amp; Disclaimer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Last updated: June 2026
          </motion.p>
        </div>
      </section>

      <section className="py-16" style={{ background: "#F4F7FF" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Disclaimer banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 mb-10"
            style={{ background: "rgba(200,150,30,0.08)", border: "1px solid rgba(200,150,30,0.25)" }}
          >
            <div className="flex items-start gap-3">
              <FileText size={18} style={{ color: "#C8961E", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "#7A5A10", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Important Notice</p>
                <p className="text-xs leading-relaxed" style={{ color: "#7A5A10" }}>
                  {BRAND.name} is a loan guidance service, not a bank, NBFC, or direct lender. We do not guarantee loan approval,
                  specific interest rates, or specific loan amounts. All EMI and eligibility figures are indicative estimates only.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="flex flex-col gap-6">
            {SECTIONS.map((sec, i) => (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl p-6"
                style={{ background: "#fff", border: "1px solid rgba(12,45,107,0.07)" }}
              >
                <h3 className="font-bold text-sm mb-3" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sec.title}</h3>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#5A6B8A" }}>{sec.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
