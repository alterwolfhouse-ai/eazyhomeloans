import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import { createEmiCalculation } from "./emi.service";

export const calculateEmiController = asyncHandler(async (req, res) => {
  const result = await createEmiCalculation(req.body);
  return sendSuccess(res, "EMI estimate calculated.", result, 201);
});
