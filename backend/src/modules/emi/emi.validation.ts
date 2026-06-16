import { z } from "zod";

export const emiCalculationSchema = z.object({
  principal: z.coerce.number().positive().max(1_000_000_000),
  annualInterestRate: z.coerce.number().positive().max(100),
  tenureYears: z.coerce.number().int().positive().max(40)
});
