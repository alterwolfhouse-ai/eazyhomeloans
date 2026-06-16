import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/appError";

export async function loginAdmin(email: string, password: string) {
  const adminUser = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (!adminUser || !adminUser.isActive) {
    throw new AppError("Invalid email or password.", 401);
  }

  const passwordMatches = await bcrypt.compare(password, adminUser.passwordHash);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password.", 401);
  }

  const tokenOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  };

  const token = jwt.sign({ sub: adminUser.id }, env.JWT_SECRET, tokenOptions);

  return {
    token,
    adminUser: {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role
    }
  };
}
