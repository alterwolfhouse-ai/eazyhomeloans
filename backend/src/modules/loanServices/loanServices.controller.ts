import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import {
  createLoanService,
  disableLoanService,
  listAdminLoanServices,
  listPublicLoanServices,
  updateLoanService
} from "./loanServices.service";

export const getPublicLoanServices = asyncHandler(async (_req, res) => {
  const services = await listPublicLoanServices();
  return sendSuccess(res, "Loan services returned.", services);
});

export const getAdminLoanServices = asyncHandler(async (_req, res) => {
  const services = await listAdminLoanServices();
  return sendSuccess(res, "Loan services returned.", services);
});

export const postLoanService = asyncHandler(async (req, res) => {
  const service = await createLoanService(req.body);
  return sendSuccess(res, "Loan service created.", service, 201);
});

export const patchLoanService = asyncHandler(async (req, res) => {
  const service = await updateLoanService(String(req.params.id), req.body);
  return sendSuccess(res, "Loan service updated.", service);
});

export const deleteLoanService = asyncHandler(async (req, res) => {
  const service = await disableLoanService(String(req.params.id));
  return sendSuccess(res, "Loan service disabled.", service);
});
