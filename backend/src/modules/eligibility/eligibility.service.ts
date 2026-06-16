import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import { ESTIMATE_DISCLAIMER } from "../consent/consent.constants";
import { calculateEligibilityEstimate } from "../../utils/loanMath";
import { AppError } from "../../utils/appError";

export async function createEligibilityCheck(input: {
  leadId?: string;
  monthlyIncome: number;
  existingEmi: number;
  requestedLoanAmount: number;
  tenureYears: number;
  annualInterestRate?: number;
}) {
  if (input.leadId) {
    const lead = await prisma.lead.findUnique({
      where: { id: input.leadId },
      select: { id: true }
    });

    if (!lead) {
      throw new AppError("Lead not found for eligibility check.", 404);
    }
  }

  const annualInterestRate = input.annualInterestRate ?? env.DEFAULT_ANNUAL_INTEREST_RATE;
  const estimate = calculateEligibilityEstimate({
    monthlyIncome: input.monthlyIncome,
    existingEmi: input.existingEmi,
    tenureYears: input.tenureYears,
    annualInterestRate,
    foirPercentage: env.DEFAULT_FOIR_PERCENTAGE
  });

  const record = await prisma.eligibilityCheck.create({
    data: {
      leadId: input.leadId,
      monthlyIncome: input.monthlyIncome,
      existingEmi: input.existingEmi,
      requestedLoanAmount: input.requestedLoanAmount,
      tenureYears: input.tenureYears,
      annualInterestRate,
      estimatedEligibleAmount: estimate.estimatedEligibleAmount,
      estimatedMaxEmi: estimate.estimatedMaxEmi,
      disclaimer: ESTIMATE_DISCLAIMER
    }
  });

  return {
    id: record.id,
    leadId: input.leadId,
    monthlyIncome: input.monthlyIncome,
    existingEmi: input.existingEmi,
    requestedLoanAmount: input.requestedLoanAmount,
    tenureYears: input.tenureYears,
    annualInterestRate,
    estimatedEligibleAmount: estimate.estimatedEligibleAmount,
    estimatedMaxEmi: estimate.estimatedMaxEmi,
    isWithinEstimatedEligibility: input.requestedLoanAmount <= estimate.estimatedEligibleAmount,
    assumptions: {
      foirPercentage: env.DEFAULT_FOIR_PERCENTAGE,
      annualInterestRate,
      tenureYears: input.tenureYears
    },
    disclaimer: ESTIMATE_DISCLAIMER,
    createdAt: record.createdAt
  };
}
