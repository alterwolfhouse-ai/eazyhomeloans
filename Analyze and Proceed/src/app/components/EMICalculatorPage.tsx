import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Calculator, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "../brand";

const WHATSAPP_URL = BRAND.whatsappUrl;

function calcEMI(principal: number, annualRate: number, tenureYears: number): number {
  if (!principal || !annualRate || !tenureYears) return 0;
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function formatINR(n: number): string {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = calcEMI(loanAmount, rate, tenure);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const chartData = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: Math.round(totalInterest) },
  ];

  const COLORS = ["#0C2D6B", "#C8961E"];

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
            EMI Calculator
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800 }}
          >
            Plan Your Repayments
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            Adjust loan amount, interest rate, and tenure to estimate your monthly EMI.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16" style={{ background: "#F4F7FF" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-6 sm:p-8 shadow-xl"
              style={{ background: "#fff", border: "1px solid rgba(12,45,107,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)" }}>
                  <Calculator size={18} className="text-white" />
                </div>
                <h2 className="font-bold text-base" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Input Details</h2>
              </div>

              <SliderField
                label="Loan Amount"
                value={loanAmount}
                display={formatINR(loanAmount)}
                min={500000}
                max={50000000}
                step={100000}
                onChange={setLoanAmount}
                marks={["₹5L", "₹1Cr", "₹2Cr", "₹5Cr"]}
              />
              <SliderField
                label="Interest Rate (% per annum)"
                value={rate}
                display={`${rate.toFixed(1)}%`}
                min={6}
                max={15}
                step={0.1}
                onChange={setRate}
                marks={["6%", "9%", "12%", "15%"]}
              />
              <SliderField
                label="Loan Tenure (years)"
                value={tenure}
                display={`${tenure} yr`}
                min={1}
                max={30}
                step={1}
                onChange={setTenure}
                marks={["1yr", "10yr", "20yr", "30yr"]}
              />

              <div
                className="mt-6 rounded-2xl p-4 text-xs leading-relaxed"
                style={{ background: "rgba(200,150,30,0.08)", border: "1px solid rgba(200,150,30,0.2)", color: "#7A5A10" }}
              >
                <strong>Disclaimer:</strong> This is an estimate only and does not guarantee loan approval.
                Final eligibility, rate, and approval depend on the lender's policy and verification.
              </div>
            </motion.div>

            {/* Result card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              {/* EMI highlight */}
              <div
                className="rounded-3xl p-7 text-center"
                style={{ background: "linear-gradient(135deg, #071B42, #0C2D6B)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Est. Monthly EMI
                </p>
                <motion.p
                  key={Math.round(emi)}
                  initial={{ scale: 0.9, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-bold mb-1 text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)" }}
                >
                  {formatINR(Math.round(emi))}
                </motion.p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>per month (estimate)</p>
              </div>

              {/* Breakdown */}
              <div className="rounded-3xl p-6 shadow-xl" style={{ background: "#fff", border: "1px solid rgba(12,45,107,0.07)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-3 flex-1">
                    <SummaryRow label="Principal Amount" value={formatINR(loanAmount)} color="#0C2D6B" />
                    <SummaryRow label="Total Interest (est.)" value={formatINR(Math.round(totalInterest))} color="#C8961E" />
                    <div className="h-px" style={{ background: "rgba(12,45,107,0.08)" }} />
                    <SummaryRow label="Total Payment (est.)" value={formatINR(Math.round(totalPayment))} color="#0C2D6B" bold />
                  </div>
                  <div className="w-32 h-32 ml-4 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={28} outerRadius={52} dataKey="value" strokeWidth={0}>
                          {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v: number) => formatINR(v)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex gap-4 text-xs">
                  {chartData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                      <span style={{ color: "#5A6B8A" }}>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <Link
                  to="/eligibility"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #0C2D6B, #1A4BAF)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Check Eligibility <ArrowRight size={14} />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "#E8FAF2", color: "#10C985", border: "1px solid rgba(16,201,133,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SliderField({ label, value, display, min, max, step, onChange, marks }: {
  label: string; value: number; display: string; min: number; max: number;
  step: number; onChange: (v: number) => void; marks: string[];
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-semibold" style={{ color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
        <span
          className="px-3 py-0.5 rounded-full text-xs font-bold"
          style={{ background: "rgba(12,45,107,0.08)", color: "#0C2D6B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {display}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0C2D6B ${pct}%, rgba(12,45,107,0.12) ${pct}%)`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        {marks.map((m) => (
          <span key={m} className="text-xs" style={{ color: "#A3B4D6" }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, color, bold }: { label: string; value: string; color: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs" style={{ color: "#5A6B8A" }}>{label}</span>
      <span className={`text-sm ${bold ? "font-bold" : "font-semibold"}`} style={{ color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</span>
    </div>
  );
}
