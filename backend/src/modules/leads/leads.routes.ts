import { Router } from "express";
import { validate } from "../../middleware/validate";
import {
  leadAssignSchema,
  leadCreateSchema,
  leadIdParamSchema,
  leadListQuerySchema,
  leadNoteCreateSchema,
  leadStatusUpdateSchema
} from "./leads.validation";
import {
  getAdminLeadById,
  getAdminLeads,
  patchLeadAssignment,
  patchLeadStatus,
  postLead,
  postLeadNote
} from "./leads.controller";

const publicRouter = Router();
const adminRouter = Router();

publicRouter.post("/", validate({ body: leadCreateSchema }), postLead);

adminRouter.get("/", validate({ query: leadListQuerySchema }), getAdminLeads);
adminRouter.get("/:id", validate({ params: leadIdParamSchema }), getAdminLeadById);
adminRouter.patch(
  "/:id/status",
  validate({ params: leadIdParamSchema, body: leadStatusUpdateSchema }),
  patchLeadStatus
);
adminRouter.patch(
  "/:id/assign",
  validate({ params: leadIdParamSchema, body: leadAssignSchema }),
  patchLeadAssignment
);
adminRouter.post(
  "/:id/notes",
  validate({ params: leadIdParamSchema, body: leadNoteCreateSchema }),
  postLeadNote
);

export { adminRouter as adminLeadRoutes, publicRouter as publicLeadRoutes };
