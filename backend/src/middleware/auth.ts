import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";

type JwtPayload = {
  sub: string;
};

export async function requireAdminAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw new AppError("Admin authentication token is required.", 401);
    }

    const token = authorization.slice("Bearer ".length);
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const adminUser = await prisma.adminUser.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true
      }
    });

    if (!adminUser || !adminUser.isActive) {
      throw new AppError("Admin account is inactive or does not exist.", 401);
    }

    req.adminUser = {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError("Invalid or expired admin token.", 401));
  }
}
