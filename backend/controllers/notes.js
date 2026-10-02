import notes from "../database/notes.js";
import pool from "../database/db.js";
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
    const result = await pool.query(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [id, USER_ID],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found!" });
    }

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

let nextId = 6;

export const addNote = (req, res) => {
  if (!req.body || !req.body.title || !req.body.description || !req.body.tag) {
    return res
      .status(400)
      .json({ error: "Title, description and tag are required" });
  }

  const newNote = {
    id: nextId,
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
  };

  nextId++;
  notes.push(newNote);
  res.status(201).json(newNote);
};

export const editNote = (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.title = req.body.title;
  note.description = req.body.description;
  note.tag = req.body.tag;
  res.json(note);
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
