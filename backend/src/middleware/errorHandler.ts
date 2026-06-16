import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";
import { sendError } from "../utils/apiResponse";
import { env } from "../config/env";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return sendError(res, error.message, error.details, error.statusCode);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return sendError(res, "A record with this unique value already exists.", undefined, 409);
    }

    if (error.code === "P2025") {
      return sendError(res, "Record not found.", undefined, 404);
    }
  }

  const details = env.NODE_ENV === "production" ? undefined : { message: error.message };
  return sendError(res, "Internal server error.", details, 500);
}
