import { Router } from "express";
import { validate } from "../../middleware/validate";
import { eligibilityCheckSchema } from "./eligibility.validation";
import { checkEligibility } from "./eligibility.controller";

const router = Router();

router.post("/check", validate({ body: eligibilityCheckSchema }), checkEligibility);

export { router as eligibilityRoutes };
