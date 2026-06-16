import type { AdminRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      adminUser?: {
        id: string;
        name: string;
        email: string;
        role: AdminRole;
      };
    }
  }
}

export {};
