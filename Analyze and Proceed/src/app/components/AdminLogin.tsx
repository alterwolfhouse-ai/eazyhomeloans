import { motion } from "motion/react";
import { Home, Lock, Phone, Shield } from "lucide-react";
import { Link } from "react-router";
import { BRAND, BrandWordmark } from "../brand";

export function AdminLogin() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 60%, #1A4BAF 100%)" }}
    >
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 30%, #3B6FD6 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #C8961E, #E8B94A)", boxShadow: "0 0 32px rgba(200,150,30,0.4)" }}
          >
            <Home size={28} style={{ color: "#071B42" }} />
          </div>
          <p className="font-bold text-xl text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <BrandWordmark light />
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Admin Portal</p>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} style={{ color: "#E8B94A" }} />
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Secure Admin Access</p>
          </div>

          <div
            className="rounded-2xl px-4 py-4 mb-5"
            style={{ background: "rgba(200,150,30,0.1)", border: "1px solid rgba(200,150,30,0.2)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Admin access is available only through the secure backend deployment. This public website does not expose an admin login form.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #C8961E, #E8B94A)",
                color: "#071B42",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 4px 16px rgba(200,150,30,0.3)",
              }}
            >
              <Home size={15} /> Back Home
            </Link>
            <a
              href={BRAND.phoneHref}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.14)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <Phone size={15} /> Contact
            </a>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <Shield size={12} />
            <span>Admin access only. Unauthorized use is prohibited.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
