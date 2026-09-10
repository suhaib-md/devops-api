import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("devops-api", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/time returns time, hostname and version", async () => {
    const res = await request(app).get("/api/time");
    expect(res.status).toBe(200);
    expect(new Date(res.body.time).toString()).not.toBe("Invalid Date");
    expect(res.body.hostname).toBeTypeOf("string");
    expect(res.body.version).toBe("dev");
  });

  it("unknown routes return 404", async () => {
    const res = await request(app).get("/nope");
    expect(res.status).toBe(404);
  });
});
