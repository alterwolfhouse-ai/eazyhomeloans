import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { createApp } from "./app";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`Eazy Home Loans backend running on http://localhost:${env.PORT}`);
  console.log(`Swagger docs available at http://localhost:${env.PORT}/api/docs`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received. Closing server...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
