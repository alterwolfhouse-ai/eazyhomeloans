import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";

const app = createApp();

describe("app", () => {
  it("returns the health response shape", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Server is healthy.");
    expect(response.body.data.status).toBe("ok");
  });

  it("returns public-safe brand information", async () => {
    const response = await request(app).get("/api/brand");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Eazy Home Loans");
    expect(response.body.data.domain).toBe("eazyhomeloans.in");
    expect(response.body.data).not.toHaveProperty("brandKit");
  });

  it("returns validation errors through the shared response format", async () => {
    const response = await request(app).post("/api/leads").send({});

    expect(response.status).toBe(422);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed.");
  });
});
