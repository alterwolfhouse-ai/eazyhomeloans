import { EmploymentType, LeadSource, LeadStatus } from "@prisma/client";
import { z } from "zod";

const optionalMoneySchema = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? undefined : value),
  z.coerce.number().nonnegative().optional()
);

const indianMobileSchema = z
  .string()
  .trim()
  .regex(/^(\+91[-\s]?)?[6-9]\d{9}$/, "Phone must be a valid Indian mobile number.");

export const leadCreateSchema = z
  .object({
    fullName: z.string().trim().min(2).max(160),
    phone: indianMobileSchema,
    email: z
      .preprocess(
        (value) => (value === "" || value === null || value === undefined ? undefined : value),
        z.string().trim().email().optional()
      ),
    city: z.string().trim().min(2).max(120),
    state: z.string().trim().max(120).optional(),
    employmentType: z.nativeEnum(EmploymentType).default(EmploymentType.OTHER),
    monthlyIncome: optionalMoneySchema,
    loanAmountRequired: optionalMoneySchema,
    propertyValue: optionalMoneySchema,
    existingLoan: z.boolean().optional(),
    existingBank: z.string().trim().max(160).optional(),
    serviceId: z.string().min(1),
    message: z.string().trim().max(2000).optional(),
    source: z.nativeEnum(LeadSource).default(LeadSource.WEBSITE),
    consentAccepted: z.literal(true, {
      errorMap: () => ({ message: "Consent must be accepted before submitting a lead." })
    }),
    consentText: z.string().trim().max(2000).optional()
  })
  .refine((value) => value.existingLoan || !value.existingBank, {
    message: "existingBank should only be sent when existingLoan is true.",
    path: ["existingBank"]
  });

export const leadIdParamSchema = z.object({
  id: z.string().min(1)
});

export const leadListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.nativeEnum(LeadStatus).optional(),
  serviceId: z.string().min(1).optional(),
  assignedToId: z.string().min(1).optional(),
  source: z.nativeEnum(LeadSource).optional()
});

export const leadStatusUpdateSchema = z.object({
  status: z.nativeEnum(LeadStatus)
});

export const leadAssignSchema = z.object({
  adminUserId: z.string().min(1).nullable().optional()
});

export const leadNoteCreateSchema = z.object({
  note: z.string().trim().min(2).max(3000)
});
