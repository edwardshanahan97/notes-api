import notes from "../database/notes.js";
import pool from "../database/db.js";
import getNoteWithTags from "../utils/getNoteWithTags.js";
const USER_ID = 1;

export const getNotes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes WHERE user_id = $1", [
      USER_ID,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getNoteById = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await getNoteWithTags(pool, id, USER_ID);

    if (!note) {
      return res.status(404).json({ error: "Note not found!" });
    }

    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const addNote = async (req, res) => {
  const content = req.body.content;
  const tags = req.body.tags;

  if (typeof content !== "string" || !Array.isArray(tags)) {
    return res.status(400).json({ error: "Invalid note data" });
  }

  if (tags.some((tag) => typeof tag !== "string" || tag.trim() === "")) {
    return res.status(400).json({ error: "Invalid tag data" });
  }

  const cleanTags = tags.map((tag) => tag.trim());
  const uniqueTags = [...new Set(cleanTags)];

  let client;

  try {
    client = await pool.connect();

    await client.query("BEGIN");

    const contentResult = await client.query(
      `INSERT INTO notes (content, user_id)
       VALUES ($1, $2)
       RETURNING id
   `,
      [content, USER_ID],
    );

    const noteId = contentResult.rows[0].id;

    for (const tag of uniqueTags) {
      const tagResult = await client.query(
        "SELECT id FROM tags WHERE name = $1",
        [tag],
      );

      let tagId;

      if (tagResult.rows.length > 0) {
        tagId = tagResult.rows[0].id;
      } else {
        const newTagResult = await client.query(
          "INSERT INTO tags (name) VALUES ($1) RETURNING id",
          [tag],
        );

        tagId = newTagResult.rows[0].id;
      }

      await client.query(
        "INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2)",
        [noteId, tagId],
      );
    }

    const note = await getNoteWithTags(client, noteId, USER_ID);

    await client.query("COMMIT");

    res.status(201).json(note);
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

export const editNote = async (req, res) => {
  const id = Number(req.params.id);
  const content = req.body.content;
  const tags = req.body.tags;

  if (typeof content !== "string" || !Array.isArray(tags)) {
    return res.status(400).json({ error: "Invalid note data" });
  }

  if (tags.some((tag) => typeof tag !== "string" || tag.trim() === "")) {
    return res.status(400).json({ error: "Invalid tag data" });
  }

  const cleanTags = tags.map((tag) => tag.trim());
  const uniqueTags = [...new Set(cleanTags)];

  let client;

  try {
    client = await pool.connect();

    await client.query("BEGIN");

    const contentResult = await client.query(
      `UPDATE notes 
      SET content = $1,
          updated_at = NOW()
      WHERE id = $2 AND user_id = $3
      RETURNING id
   `,
      [content, id, USER_ID],
    );

    if (contentResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Note not found!" });
    }

    const noteId = contentResult.rows[0].id;

    await client.query("DELETE FROM note_tags WHERE note_id = $1", [id]);

    for (const tag of uniqueTags) {
      const tagResult = await client.query(
        "SELECT id FROM tags WHERE name = $1",
        [tag],
      );

      let tagId;

      if (tagResult.rows.length > 0) {
        tagId = tagResult.rows[0].id;
      } else {
        const newTagResult = await client.query(
          "INSERT INTO tags (name) VALUES ($1) RETURNING id",
          [tag],
        );

        tagId = newTagResult.rows[0].id;
      }

      await client.query(
        "INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2)",
        [noteId, tagId],
      );
    }

    const note = await getNoteWithTags(client, noteId, USER_ID);

    await client.query("COMMIT");

    res.json(note);
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

export const deleteNote = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      `DELETE FROM notes
       WHERE id = $1 AND user_id = $2`,
      [id, USER_ID],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
