import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import pool from "../database/db.js";

describe("Notes CRUD API", () => {
  const agent = request.agent(app);
  const email = "note-test@test.com";
  const password = "passwordtest1234";

  let userId;

  beforeAll(async () => {
    if (process.env.DB_NAME !== "notes_test_db") {
      throw new Error("Refusing to modify a non-test database");
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      const oldUserId = existingUser.rows[0].id;

      await pool.query("DELETE FROM notes WHERE user_id = $1", [oldUserId]);

      await pool.query("DELETE FROM users WHERE id = $1", [oldUserId]);
    }

    const response = await request(app).post("/api/auth/register").send({
      name: "Notes Test User",
      email,
      password,
    });

    expect(response.status).toBe(201);

    userId = response.body.id;

    const loginResponse = await agent
      .post("/api/auth/login")
      .send({ email, password });

    expect(loginResponse.status).toBe(200);
  });

  beforeEach(async () => {
    if (process.env.DB_NAME !== "notes_test_db") {
      throw new Error("Refusing to clean a non-test database");
    }

    await pool.query("DELETE FROM notes WHERE user_id = $1", [userId]);
  });

  describe("creates a note successfully", () => {
    const content = "# this is a test note";
    const tags = ["test"];
    const favorite = false;

    it("send note", async () => {
      const response = await agent
        .post("/api/notes/")
        .send({ content, tags, favorite });

      expect(response.status).toBe(201);

      expect(response.body.content).toBe("# this is a test note");
      expect(response.body.tags).toEqual(["test"]);
      expect(response.body.favorite).toBe(false);
    });
  });

  it("get note by id", async () => {
    const content = "# this is a test note 2";
    const tags = ["testing"];
    const favorite = false;
    const response = await agent
      .post("/api/notes/")
      .send({ content, tags, favorite });

    expect(response.status).toBe(201);

    const noteId = response.body.id;

    const noteResponse = await agent.get(`/api/notes/${noteId}`);

    expect(noteResponse.status).toBe(200);

    expect(noteResponse.body.content).toBe(content);
    expect(noteResponse.body.tags).toEqual(tags);
    expect(noteResponse.body.favorite).toBe(favorite);
    expect(noteResponse.body.id).toBe(noteId);
  });

  it("get all notes", async () => {
    const noteA = { content: "# note a", tags: ["note a"], favorite: false };
    const noteB = { content: "# note b", tags: ["note b"], favorite: true };

    const responseA = await agent.post("/api/notes").send(noteA);
    const responseB = await agent.post("/api/notes").send(noteB);

    expect(responseA.status).toBe(201);
    expect(responseB.status).toBe(201);

    const notes = await agent.get("/api/notes");

    expect(notes.status).toBe(200);
    expect(Array.isArray(notes.body)).toBe(true);
    expect(notes.body).toHaveLength(2);
  });

  it("edit note", async () => {
    const content = "# this is a edit test";
    const tags = ["edit"];
    const favorite = false;
    const response = await agent
      .post("/api/notes/")
      .send({ content, tags, favorite });

    expect(response.status).toBe(201);

    const noteId = response.body.id;
    const editContent = "Edited";
    const editTags = ["edited"];
    const editFavorite = true;
    const editNote = await agent
      .put(`/api/notes/${noteId}`)
      .send({ content: editContent, tags: editTags, favorite: editFavorite });

    expect(editNote.status).toBe(200);
    expect(editNote.body.content).toEqual(editContent);
    expect(editNote.body.tags).toEqual(editTags);
    expect(editNote.body.favorite).toBe(editFavorite);

    const updatedResponse = await agent.get(`/api/notes/${noteId}`);

    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body.content).toBe(editContent);
    expect(updatedResponse.body.tags).toEqual(editTags);
    expect(updatedResponse.body.favorite).toBe(editFavorite);
  });
});
