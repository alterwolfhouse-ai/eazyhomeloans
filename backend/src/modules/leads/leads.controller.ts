import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import {
  addLeadNote,
  assignLead,
  createLead,
  getLeadById,
  listLeads,
  updateLeadStatus
} from "./leads.service";

export const postLead = asyncHandler(async (req, res) => {
  const lead = await createLead(req.body);
  return sendSuccess(res, "Lead inquiry submitted successfully.", lead, 201);
});

export const getAdminLeads = asyncHandler(async (req, res) => {
  const leads = await listLeads(req.query as never);
  return sendSuccess(res, "Leads returned.", leads);
});

export const getAdminLeadById = asyncHandler(async (req, res) => {
  const lead = await getLeadById(String(req.params.id));
  return sendSuccess(res, "Lead returned.", lead);
});

export const patchLeadStatus = asyncHandler(async (req, res) => {
  const lead = await updateLeadStatus(String(req.params.id), req.body.status, req.adminUser!.id);
  return sendSuccess(res, "Lead status updated.", lead);
});

export const patchLeadAssignment = asyncHandler(async (req, res) => {
  const lead = await assignLead(String(req.params.id), req.body.adminUserId);
  return sendSuccess(res, "Lead assignment updated.", lead);
});

export const postLeadNote = asyncHandler(async (req, res) => {
  const note = await addLeadNote(String(req.params.id), req.adminUser!.id, req.body.note);
  return sendSuccess(res, "Lead note added.", note, 201);
});
