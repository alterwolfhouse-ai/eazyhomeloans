export type EmiEstimate = {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
};

export type EligibilityEstimateInput = {
  monthlyIncome: number;
  existingEmi: number;
  tenureYears: number;
  annualInterestRate: number;
  foirPercentage: number;
};

export type EligibilityEstimate = {
  estimatedEligibleAmount: number;
  estimatedMaxEmi: number;
};

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateEmi(
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): EmiEstimate {
  const tenureMonths = tenureYears * 12;
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const monthlyEmi =
    monthlyInterestRate === 0
      ? principal / tenureMonths
      : (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, tenureMonths)) /
        (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEmi: roundMoney(monthlyEmi),
    totalInterest: roundMoney(totalInterest),
    totalPayment: roundMoney(totalPayment)
  };
}

export function calculateEligibilityEstimate(
  input: EligibilityEstimateInput
): EligibilityEstimate {
  const tenureMonths = input.tenureYears * 12;
  const monthlyInterestRate = input.annualInterestRate / 12 / 100;
  const foirBasedEmi = input.monthlyIncome * (input.foirPercentage / 100);
  const estimatedMaxEmi = Math.max(foirBasedEmi - input.existingEmi, 0);

  const estimatedEligibleAmount =
    monthlyInterestRate === 0
      ? estimatedMaxEmi * tenureMonths
      : (estimatedMaxEmi *
          (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1)) /
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths));

  return {
    estimatedEligibleAmount: roundMoney(estimatedEligibleAmount),
    estimatedMaxEmi: roundMoney(estimatedMaxEmi)
  };
}
