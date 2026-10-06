import pool from "../database/db.js";
import getNoteWithTags from "../utils/getNoteWithTags.js";
import addTagsToNote from "../utils/addTagsToNote.js";

export const getNotes = async (req, res) => {
  const { favorite, search, tag } = req.query;
  const userId = req.session.userId;

  const conditions = ["notes.user_id = $1"];
  const values = [userId];

  if (favorite !== undefined) {
    if (favorite !== "true" && favorite !== "false") {
      return res.status(400).json({ error: "Invalid favorite filter" });
    }

    values.push(favorite === "true");
    conditions.push(`notes.favorite = $${values.length}`);
  }

  if (search !== undefined) {
    if (search === "") {
      return res.status(400).json({ error: "Invalid search filter" });
    }

    values.push(`%${search}%`);

    conditions.push(`notes.content ILIKE $${values.length}`);
  }

  if (tag !== undefined) {
    if (tag.trim() === "") {
      return res.status(400).json({ error: "Invalid tag filter" });
    }

    values.push(tag);

    conditions.push(`
    EXISTS (
      SELECT 1
      FROM note_tags AS filter_note_tags
      JOIN tags AS filter_tags
        ON filter_tags.id = filter_note_tags.tag_id
      WHERE filter_note_tags.note_id = notes.id
        AND filter_tags.name = $${values.length}
    )
  `);
  }

  try {
    const result = await pool.query(
      `
    SELECT
      notes.id,
      notes.content,
      notes.created_at,
      notes.updated_at,
      notes.user_id,
      notes.favorite,
      COALESCE(
    ARRAY_AGG(tags.name) FILTER (WHERE tags.name IS NOT NULL),
    '{}'
  ) AS tags
    FROM notes
    LEFT JOIN note_tags ON note_tags.note_id = notes.id
    LEFT JOIN tags ON tags.id = note_tags.tag_id
    WHERE ${conditions.join(" AND ")}
    GROUP BY notes.id
    ORDER BY notes.updated_at DESC
  `,
      values,
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getNoteById = async (req, res) => {
  const id = req.params.id;
  const userId = req.session.userId;
  try {
    const note = await getNoteWithTags(pool, id, userId);

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
  const favorite = req.body.favorite;
  const userId = req.session.userId;

  if (
    typeof content !== "string" ||
    !Array.isArray(tags) ||
    typeof favorite !== "boolean"
  ) {
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
      `INSERT INTO notes (content, user_id, favorite)
       VALUES ($1, $2, $3)
       RETURNING id
   `,
      [content, userId, favorite],
    );

    const noteId = contentResult.rows[0].id;

    await addTagsToNote(client, noteId, uniqueTags);

    const note = await getNoteWithTags(client, noteId, userId);

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
  const favorite = req.body.favorite;
  const userId = req.session.userId;

  if (
    typeof content !== "string" ||
    !Array.isArray(tags) ||
    typeof favorite !== "boolean"
  ) {
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
          updated_at = NOW(),
          favorite = $3
      WHERE id = $2 AND user_id = $4
      RETURNING id
   `,
      [content, id, favorite, userId],
    );

    if (contentResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Note not found!" });
    }

    const noteId = contentResult.rows[0].id;

    await client.query("DELETE FROM note_tags WHERE note_id = $1", [id]);

    await addTagsToNote(client, noteId, uniqueTags);

    const note = await getNoteWithTags(client, noteId, userId);

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
  const userId = req.session.userId;

  try {
    const result = await pool.query(
      `DELETE FROM notes
       WHERE id = $1 AND user_id = $2`,
      [id, userId],
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
