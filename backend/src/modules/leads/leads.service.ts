import type { LeadSource, LeadStatus, Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { DEFAULT_CONSENT_TEXT } from "../consent/consent.constants";
import { AppError } from "../../utils/appError";

type CreateLeadInput = {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  state?: string;
  employmentType: Prisma.LeadCreateInput["employmentType"];
  monthlyIncome?: number;
  loanAmountRequired?: number;
  propertyValue?: number;
  existingLoan?: boolean;
  existingBank?: string;
  serviceId: string;
  message?: string;
  source?: LeadSource;
  consentAccepted: true;
  consentText?: string;
};

export async function createLead(input: CreateLeadInput) {
  const service = await prisma.loanService.findFirst({
    where: {
      id: input.serviceId,
      isActive: true
    }
  });

  if (!service) {
    throw new AppError("Selected loan service is not available.", 404);
  }

  return prisma.lead.create({
    data: {
      fullName: input.fullName,
      phone: input.phone,
      email: input.email,
      city: input.city,
      state: input.state,
      employmentType: input.employmentType,
      monthlyIncome: input.monthlyIncome,
      loanAmountRequired: input.loanAmountRequired,
      propertyValue: input.propertyValue,
      existingLoan: input.existingLoan,
      existingBank: input.existingBank,
      serviceId: input.serviceId,
      message: input.message,
      source: input.source,
      consentAccepted: true,
      consentText: input.consentText || DEFAULT_CONSENT_TEXT,
      consentTimestamp: new Date()
    },
    include: {
      service: true
    }
  });
}

export async function listLeads(filters: {
  page: number;
  limit: number;
  status?: LeadStatus;
  serviceId?: string;
  assignedToId?: string;
  source?: LeadSource;
}) {
  const where: Prisma.LeadWhereInput = {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.serviceId ? { serviceId: filters.serviceId } : {}),
    ...(filters.assignedToId ? { assignedToId: filters.assignedToId } : {}),
    ...(filters.source ? { source: filters.source } : {})
  };

  const skip = (filters.page - 1) * filters.limit;

  const [items, total] = await prisma.$transaction([
    prisma.lead.findMany({
      where,
      skip,
      take: filters.limit,
      orderBy: { createdAt: "desc" },
      include: {
        service: true,
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    }),
    prisma.lead.count({ where })
  ]);

  return {
    items,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.ceil(total / filters.limit)
    }
  };
}

export async function getLeadById(id: string) {
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      service: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      notes: {
        orderBy: { createdAt: "desc" },
        include: {
          adminUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      },
      statusHistory: {
        orderBy: { createdAt: "desc" },
        include: {
          changedBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      },
      eligibilityChecks: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!lead) {
    throw new AppError("Lead not found.", 404);
  }

  return lead;
}

export async function updateLeadStatus(id: string, newStatus: LeadStatus, changedById: string) {
  const existingLead = await prisma.lead.findUnique({
    where: { id }
  });

  if (!existingLead) {
    throw new AppError("Lead not found.", 404);
  }

  if (existingLead.status === newStatus) {
    return getLeadById(id);
  }

  await prisma.$transaction([
    prisma.lead.update({
      where: { id },
      data: { status: newStatus }
    }),
    prisma.leadStatusHistory.create({
      data: {
        leadId: id,
        oldStatus: existingLead.status,
        newStatus,
        changedById
      }
    })
  ]);

  return getLeadById(id);
}

export async function assignLead(id: string, adminUserId?: string | null) {
  if (adminUserId) {
    const adminUser = await prisma.adminUser.findFirst({
      where: {
        id: adminUserId,
        isActive: true
      }
    });

    if (!adminUser) {
      throw new AppError("Assigned admin user not found or inactive.", 404);
    }
  }

  return prisma.lead.update({
    where: { id },
    data: {
      assignedToId: adminUserId || null
    },
    include: {
      service: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function addLeadNote(id: string, adminUserId: string, note: string) {
  const lead = await prisma.lead.findUnique({
    where: { id },
    select: { id: true }
  });

  if (!lead) {
    throw new AppError("Lead not found.", 404);
  }

  return prisma.leadNote.create({
    data: {
      leadId: id,
      adminUserId,
      note
    },
    include: {
      adminUser: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}
