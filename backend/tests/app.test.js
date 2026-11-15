import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import pool from "../database/db.js";

describe("Notes API", () => {
  it("rejects unauthenticated requests", async () => {
    const response = await request(app).get("/api/notes");

    expect(response.status).toBe(401);
  });
});

describe("Authentication API", () => {
  const agent = request.agent(app);
  const email = "auth-test@test.com";
  const password = "passwordtest1234";

  beforeAll(async () => {
    if (process.env.DB_NAME !== "notes_test_db") {
      throw new Error("Tests must use notes_test_db");
    }

    await pool.query("DELETE FROM users WHERE email = $1", [email]);

    const response = await agent
      .post("/api/auth/register")
      .set("Origin", process.env.CLIENT_ORIGIN)
      .send({
        name: "Test User",
        email,
        password,
      });

    expect(response.status).toBe(201);
  });

  it("check authenticated session", async () => {
    const response = await agent
      .post("/api/auth/login")
      .set("Origin", process.env.CLIENT_ORIGIN)
      .send({
        email,
        password,
      });

    expect(response.status).toBe(200);

    const myResponse = await agent.get("/api/auth/me");
    expect(myResponse.status).toBe(200);
    expect(myResponse.body.email).toBe(email);

    const logoutResponse = await agent
      .post("/api/auth/logout")
      .set("Origin", process.env.CLIENT_ORIGIN);
    expect(logoutResponse.status).toBe(204);

    const afterLogoutResponse = await agent.get("/api/auth/me");

    expect(afterLogoutResponse.status).toBe(401);

    const cookies = logoutResponse.headers["set-cookie"];

    expect(cookies).toBeDefined();
    expect(cookies.some((cookie) => cookie.startsWith("connect.sid="))).toBe(
      true,
    );
    expect(
      cookies.some(
        (cookie) =>
          cookie.startsWith("connect.sid=") && cookie.includes("Expires="),
      ),
    ).toBe(true);
  });

  it("regenerates the session ID on login", async () => {
    const firstLogin = await agent
      .post("/api/auth/login")
      .set("Origin", process.env.CLIENT_ORIGIN)
      .send({ email, password });

    expect(firstLogin.status).toBe(200);

    const firstCookie = firstLogin.headers["set-cookie"][0].split(";")[0];

    const secondLogin = await agent
      .post("/api/auth/login")
      .set("Origin", process.env.CLIENT_ORIGIN)
      .send({ email, password });

    expect(secondLogin.status).toBe(200);

    const secondCookie = secondLogin.headers["set-cookie"][0].split(";")[0];

    expect(secondCookie).not.toBe(firstCookie);
  });
});
