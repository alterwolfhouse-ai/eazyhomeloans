import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject, ZodTypeAny } from "zod";
import { AppError } from "../utils/appError";

type ValidationSchemas = {
  body?: AnyZodObject | ZodTypeAny;
  params?: AnyZodObject | ZodTypeAny;
  query?: AnyZodObject | ZodTypeAny;
};

export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      next();
    } catch (error) {
      next(new AppError("Validation failed.", 422, error));
    }
  };
}
