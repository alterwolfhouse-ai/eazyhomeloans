import { describe, expect, it } from "vitest";
import { EmploymentType } from "@prisma/client";
import { leadCreateSchema } from "../src/modules/leads/leads.validation";

describe("leadCreateSchema", () => {
  it("supports short public lead forms by defaulting employment type", () => {
    const result = leadCreateSchema.parse({
      fullName: "Aarav Sharma",
      phone: "9876543210",
      city: "Mumbai",
      serviceId: "service_123",
      consentAccepted: true
    });

    expect(result.employmentType).toBe(EmploymentType.OTHER);
  });

  it("requires consent to be accepted", () => {
    expect(() =>
      leadCreateSchema.parse({
        fullName: "Aarav Sharma",
        phone: "9876543210",
        city: "Mumbai",
        serviceId: "service_123",
        consentAccepted: false
      })
    ).toThrow();
  });
});
