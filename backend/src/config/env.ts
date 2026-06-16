import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z
    .string()
    .url()
    .default("postgresql://postgres:postgres@localhost:5432/easy_home_loans?schema=public"),
  JWT_SECRET: z.string().min(16).default("development-secret-change-me"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  CORS_ORIGIN: z.string().default("http://localhost:3000,http://localhost:5173"),
  DEFAULT_FOIR_PERCENTAGE: z.coerce.number().min(20).max(80).default(50),
  DEFAULT_ANNUAL_INTEREST_RATE: z.coerce.number().min(1).max(30).default(9)
});

export const env = envSchema.parse(process.env);

export const corsOrigins = env.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
