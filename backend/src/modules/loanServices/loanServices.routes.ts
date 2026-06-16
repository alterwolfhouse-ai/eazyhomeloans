import { Router } from "express";
import { validate } from "../../middleware/validate";
import {
  loanServiceCreateSchema,
  loanServiceIdParamSchema,
  loanServiceUpdateSchema
} from "./loanServices.validation";
import {
  deleteLoanService,
  getAdminLoanServices,
  getPublicLoanServices,
  patchLoanService,
  postLoanService
} from "./loanServices.controller";

const publicRouter = Router();
const adminRouter = Router();

publicRouter.get("/", getPublicLoanServices);

adminRouter.get("/", getAdminLoanServices);
adminRouter.post("/", validate({ body: loanServiceCreateSchema }), postLoanService);
adminRouter.patch(
  "/:id",
  validate({ params: loanServiceIdParamSchema, body: loanServiceUpdateSchema }),
  patchLoanService
);
adminRouter.delete(
  "/:id",
  validate({ params: loanServiceIdParamSchema }),
  deleteLoanService
);

export { adminRouter as adminLoanServiceRoutes, publicRouter as publicLoanServiceRoutes };
