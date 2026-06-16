import { useState } from "react";
import { motion } from "motion/react";
import { Home, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { BRAND, BrandWordmark } from "../brand";

export function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("Admin access will be connected through the secure backend deployment. This public GitHub Pages site does not expose admin login.");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071B42 0%, #0C2D6B 60%, #1A4BAF 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 30%, #3B6FD6 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Brand */}
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

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} style={{ color: "#E8B94A" }} />
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Secure Admin Access</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>Email Address</label>
              <input
                type="email"
                required
                placeholder={BRAND.adminEmail}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs rounded-xl px-3 py-2" style={{ background: "rgba(212,24,61,0.12)", color: "#FF6B87", border: "1px solid rgba(212,24,61,0.2)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 mt-2"
              style={{
                background: "linear-gradient(135deg, #C8961E, #E8B94A)",
                color: "#071B42",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 4px 16px rgba(200,150,30,0.3)",
              }}
            >
              Sign In to Admin
            </button>
          </form>

          <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <Shield size={12} />
            <span>Admin access only. Unauthorized use is prohibited.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
