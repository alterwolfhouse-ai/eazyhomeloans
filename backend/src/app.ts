import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { corsOrigins } from "./config/env";
import { openApiDocument } from "./config/openapi";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { apiRoutes } from "./routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || corsOrigins.includes("*") || corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error("Not allowed by CORS"));
      },
      credentials: true
    })
  );
  app.use(express.json({ limit: "1mb" }));

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.use("/api", apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
