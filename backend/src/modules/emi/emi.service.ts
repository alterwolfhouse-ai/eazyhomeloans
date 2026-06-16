import { prisma } from "../../config/prisma";
import { ESTIMATE_DISCLAIMER } from "../consent/consent.constants";
import { calculateEmi } from "../../utils/loanMath";

export async function createEmiCalculation(input: {
  principal: number;
  annualInterestRate: number;
  tenureYears: number;
}) {
  const estimate = calculateEmi(input.principal, input.annualInterestRate, input.tenureYears);

  const record = await prisma.emiCalculation.create({
    data: {
      principal: input.principal,
      annualInterestRate: input.annualInterestRate,
      tenureYears: input.tenureYears,
      monthlyEmi: estimate.monthlyEmi,
      totalInterest: estimate.totalInterest,
      totalPayment: estimate.totalPayment,
      disclaimer: ESTIMATE_DISCLAIMER
    }
  });

  return {
    id: record.id,
    principal: input.principal,
    annualInterestRate: input.annualInterestRate,
    tenureYears: input.tenureYears,
    ...estimate,
    disclaimer: ESTIMATE_DISCLAIMER,
    createdAt: record.createdAt
  };
}
