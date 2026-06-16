import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes";
import { brand } from "../config/brand";
import { eligibilityRoutes } from "../modules/eligibility/eligibility.routes";
import { emiRoutes } from "../modules/emi/emi.routes";
import { publicLeadRoutes } from "../modules/leads/leads.routes";
import { publicLoanServiceRoutes } from "../modules/loanServices/loanServices.routes";
import { sendSuccess } from "../utils/apiResponse";

const router = Router();

router.get("/health", (_req, res) => {
  return sendSuccess(res, "Server is healthy.", {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

router.get("/brand", (_req, res) => {
  return sendSuccess(res, "Brand information returned.", brand);
});

router.use("/loan-services", publicLoanServiceRoutes);
router.use("/leads", publicLeadRoutes);
router.use("/emi", emiRoutes);
router.use("/eligibility", eligibilityRoutes);
router.use("/admin", adminRoutes);

export { router as apiRoutes };
