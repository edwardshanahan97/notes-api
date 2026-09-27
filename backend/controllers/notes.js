import pool from "../db/db.js";

export const getNotes = async (req, res) => {
  const results = await pool.query("SELECT * FROM notes");
  res.json(results.rows);
};

export const addNote = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const tag = req.body.tag;

  if (!req.body || typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({ error: "Title and content must be strings" });
  }

  const result = await pool.query(
    "INSERT  INTO  notes (title, content) VALUES ($1, $2) RETURNING *",
    [title, content],
  );

  const resultTag = await pool.query(
    "SELECT id, name FROM tags WHERE name = $1",
    [tag],
  );

  let tagId;

  if (resultTag.rows.length === 0) {
    const newTag = await pool.query(
      "INSERT INTO tags (name) VALUES ($1) RETURNING *",
      [tag],
    );

    tagId = newTag.rows[0].id;
  } else {
    tagId = resultTag.rows[0].id;
  }

  const noteId = result.rows[0].id;

  await pool.query("INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2)", [
    noteId,
    tagId,
  ]);

  res.status(201).json(result.rows[0]);
};

export const getNoteById = async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    "SELECT title, content, id FROM notes WHERE id = $1",
    [id],
  );

  const resultTag = await pool.query(
    "SELECT tags.name FROM note_tags JOIN tags ON note_tags.tag_id = tags.id WHERE note_tags.note_id = $1",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Note not found!" });
  }

  res.json({
    note: result.rows[0],
    tags: resultTag.rows,
  });
};

export const editNote = async (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const content = req.body.content;
  const tag = req.body.tag;

  if (!req.body || typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({ error: "Title and content must be strings" });
  }

  const result = await pool.query(
    "UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
    [title, content, id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(result.rows[0]);
};

export const deleteNote = async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    "DELETE FROM notes WHERE id = $1 RETURNING *",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.status(204).end();
};
