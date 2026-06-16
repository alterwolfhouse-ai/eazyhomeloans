import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");
const indexPath = join(distDir, "index.html");
const notFoundPath = join(distDir, "404.html");
const cnamePath = join(distDir, "CNAME");

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html was not found. Run the Vite build first.");
}

copyFileSync(indexPath, notFoundPath);
writeFileSync(cnamePath, "eazyhomeloans.in\n", "utf8");
