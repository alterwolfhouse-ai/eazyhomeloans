import { Router } from "express";
import { requireAdminAuth } from "../../middleware/auth";
import { authRoutes } from "../auth/auth.routes";
import { getMe } from "../auth/auth.controller";
import { adminLeadRoutes } from "../leads/leads.routes";
import { adminLoanServiceRoutes } from "../loanServices/loanServices.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use(requireAdminAuth);
router.get("/me", getMe);
router.use("/leads", adminLeadRoutes);
router.use("/loan-services", adminLoanServiceRoutes);

export { router as adminRoutes };
