import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/appError";
import { slugify } from "../../utils/slugify";

export async function listPublicLoanServices() {
  return prisma.loanService.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }]
  });
}

export async function listAdminLoanServices() {
  return prisma.loanService.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }]
  });
}

export async function createLoanService(input: {
  slug?: string;
  name: string;
  description: string;
  isActive?: boolean;
  displayOrder?: number;
}) {
  const slug = input.slug ? slugify(input.slug) : slugify(input.name);

  if (!slug) {
    throw new AppError("A valid loan service slug is required.", 422);
  }

  return prisma.loanService.create({
    data: {
      slug,
      name: input.name,
      description: input.description,
      isActive: input.isActive ?? true,
      displayOrder: input.displayOrder ?? 0
    }
  });
}

export async function updateLoanService(
  id: string,
  input: {
    slug?: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    displayOrder?: number;
  }
) {
  const data = {
    ...input,
    ...(input.slug ? { slug: slugify(input.slug) } : {})
  };

  return prisma.loanService.update({
    where: { id },
    data
  });
}

export async function disableLoanService(id: string) {
  return prisma.loanService.update({
    where: { id },
    data: { isActive: false }
  });
}
