import { Router } from "express";
import { validate } from "../../middleware/validate";
import { emiCalculationSchema } from "./emi.validation";
import { calculateEmiController } from "./emi.controller";

const router = Router();

router.post("/calculate", validate({ body: emiCalculationSchema }), calculateEmiController);

export { router as emiRoutes };
