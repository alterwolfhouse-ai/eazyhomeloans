import { z } from "zod";

export const loanServiceCreateSchema = z.object({
  slug: z.string().trim().min(2).max(120).optional(),
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().min(2).max(1000),
  isActive: z.boolean().optional(),
  displayOrder: z.coerce.number().int().min(0).optional()
});

export const loanServiceUpdateSchema = loanServiceCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required."
);

export const loanServiceIdParamSchema = z.object({
  id: z.string().min(1)
});
