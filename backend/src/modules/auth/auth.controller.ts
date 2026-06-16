import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import { loginAdmin } from "./auth.service";

export const login = asyncHandler(async (req, res) => {
  const data = await loginAdmin(req.body.email, req.body.password);
  return sendSuccess(res, "Admin login successful.", data);
});

export const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, "Admin profile returned.", req.adminUser);
});
