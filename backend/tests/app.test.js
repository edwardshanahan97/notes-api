import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

console.log("Session secret loaded:", Boolean(process.env.SESSION_SECRET));

describe("Notes API", () => {
  it("rejects unauthenticated requests", async () => {
    const response = await request(app).get("/api/notes");

    expect(response.status).toBe(401);
  });
});
