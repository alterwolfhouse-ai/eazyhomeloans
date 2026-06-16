import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { EligibilityPage } from "./components/EligibilityPage";
import { EMICalculatorPage } from "./components/EMICalculatorPage";
import { ContactPage } from "./components/ContactPage";
import { AdminLogin } from "./components/AdminLogin";
import { PrivacyPage } from "./components/PrivacyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes (no shared layout) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLogin />} />

        {/* Public routes with shared layout */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="eligibility" element={<EligibilityPage />} />
          <Route path="emi-calculator" element={<EMICalculatorPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
