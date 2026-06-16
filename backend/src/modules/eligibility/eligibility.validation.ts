import { z } from "zod";

export const eligibilityCheckSchema = z.object({
  leadId: z.string().min(1).optional(),
  monthlyIncome: z.coerce.number().positive().max(100_000_000),
  existingEmi: z.coerce.number().nonnegative().max(100_000_000).default(0),
  requestedLoanAmount: z.coerce.number().positive().max(1_000_000_000),
  tenureYears: z.coerce.number().int().positive().max(40),
  annualInterestRate: z.coerce.number().positive().max(100).optional()
});
