import pool from "../db/db.js";

export const getNotes = async (req, res) => {
  const results = await pool.query("SELECT * FROM notes");
  res.json(results.rows);
};

export const addNote = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const tag = req.body.tag;

  if (!req.body || !title || !content || !tag) {
    return res
      .status(400)
      .json({ error: "Title, content and tag are required" });
  }

  const result = await pool.query(
    "INSERT  INTO  notes (title, content, tag) VALUES ($1, $2, $3) RETURNING *",
    [title, content, tag],
  );

  res.status(201).json(result.rows);
};

export const getNoteById = async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    "SELECT title, content, id, tag FROM notes WHERE id = $1",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Note not found!" });
  }

  res.json(result.rows[0]);
};

export const editNote = async (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const content = req.body.content;
  const tag = req.body.tag;

  if (!req.body || !title || !content || !tag) {
    return res
      .status(400)
      .json({ error: "Title, content and tag are required" });
  }

  const result = await pool.query(
    "UPDATE notes SET title = $1, content = $2, tag = $3 WHERE id = $4 RETURNING *",
    [title, content, tag, id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(result.rows[0]);
};

export const deleteNote = (req, res) => {
  const noteIndex = notes.findIndex(
    (note) => note.id === Number(req.params.id),
  );

  if (noteIndex < 0) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes.splice(noteIndex, 1);

  res.status(204).end();
};
