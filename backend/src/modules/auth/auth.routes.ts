import { Router } from "express";
import { validate } from "../../middleware/validate";
import { loginSchema } from "./auth.validation";
import { login } from "./auth.controller";

const router = Router();

router.post("/login", validate({ body: loginSchema }), login);

export { router as authRoutes };
