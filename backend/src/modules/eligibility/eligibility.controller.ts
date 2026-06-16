import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import { createEligibilityCheck } from "./eligibility.service";

export const checkEligibility = asyncHandler(async (req, res) => {
  const result = await createEligibilityCheck(req.body);
  return sendSuccess(res, "Eligibility estimate calculated.", result, 201);
});
