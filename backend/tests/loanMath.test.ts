import { describe, expect, it } from "vitest";
import { calculateEligibilityEstimate, calculateEmi } from "../src/utils/loanMath";

describe("loanMath", () => {
  it("calculates EMI totals for a normal home-loan estimate", () => {
    const result = calculateEmi(5_000_000, 9, 20);

    expect(result.monthlyEmi).toBeGreaterThan(40_000);
    expect(result.monthlyEmi).toBeLessThan(50_000);
    expect(result.totalPayment).toBeGreaterThan(5_000_000);
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 5_000_000, 2);
  });

  it("calculates EMI safely when interest rate is zero", () => {
    const result = calculateEmi(1_200_000, 0, 10);

    expect(result.monthlyEmi).toBe(10_000);
    expect(result.totalPayment).toBe(1_200_000);
    expect(result.totalInterest).toBe(0);
  });

  it("calculates FOIR-style estimated eligibility", () => {
    const result = calculateEligibilityEstimate({
      monthlyIncome: 85_000,
      existingEmi: 10_000,
      tenureYears: 20,
      annualInterestRate: 9,
      foirPercentage: 50
    });

    expect(result.estimatedMaxEmi).toBe(32_500);
    expect(result.estimatedEligibleAmount).toBeGreaterThan(3_000_000);
  });

  it("does not return negative eligibility when existing EMI exceeds FOIR capacity", () => {
    const result = calculateEligibilityEstimate({
      monthlyIncome: 50_000,
      existingEmi: 40_000,
      tenureYears: 20,
      annualInterestRate: 9,
      foirPercentage: 50
    });

    expect(result.estimatedMaxEmi).toBe(0);
    expect(result.estimatedEligibleAmount).toBe(0);
  });
});
