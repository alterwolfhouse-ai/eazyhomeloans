import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loanServices = [
  {
    slug: "new-home-purchase-loan",
    name: "New Home Purchase Loan",
    description: "Assistance for customers buying a ready or under-construction residential property."
  },
  {
    slug: "home-construction-loan",
    name: "Home Construction Loan",
    description: "Guidance for customers who own land and need funding to construct a home."
  },
  {
    slug: "plot-purchase-construction-loan",
    name: "Plot Purchase + Construction Loan",
    description: "Support for customers buying a plot and planning residential construction."
  },
  {
    slug: "home-loan-balance-transfer",
    name: "Home Loan Balance Transfer",
    description: "Help existing borrowers compare transfer options for better loan terms."
  },
  {
    slug: "top-up-loan",
    name: "Top-Up Loan",
    description: "Additional funding support for customers with an eligible existing home loan."
  },
  {
    slug: "home-renovation-improvement-loan",
    name: "Home Renovation / Improvement Loan",
    description: "Funding assistance for home repairs, upgrades, interiors, and improvements."
  },
  {
    slug: "home-extension-loan",
    name: "Home Extension Loan",
    description: "Loan assistance for adding space or expanding an existing residential property."
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    description: "Guidance for customers seeking funding against an owned residential or commercial property."
  },
  {
    slug: "nri-home-loan",
    name: "NRI Home Loan",
    description: "Home loan support for eligible non-resident Indian customers."
  },
  {
    slug: "joint-home-loan",
    name: "Joint Home Loan",
    description: "Assistance for co-applicants applying together to improve eligibility or share ownership."
  },
  {
    slug: "pre-approved-home-loan",
    name: "Pre-Approved Home Loan",
    description: "Eligibility guidance before a customer finalizes a property."
  },
  {
    slug: "builder-project-loan-support",
    name: "Builder Project Loan Support",
    description: "Loan assistance for customers purchasing in supported builder projects."
  }
];

async function main() {
  for (const [index, service] of loanServices.entries()) {
    await prisma.loanService.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description,
        displayOrder: index + 1,
        isActive: true
      },
      create: {
        ...service,
        displayOrder: index + 1,
        isActive: true
      }
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Alter Labs Admin";

  if (!adminEmail || !adminPassword) {
    console.warn("Skipping admin seed because ADMIN_EMAIL or ADMIN_PASSWORD is missing.");
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      name: adminName,
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true
    },
    create: {
      name: adminName,
      email: adminEmail.toLowerCase(),
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
