import pool from "../db/db.js";
const notes = await pool.query("SELECT * FROM notes");

export const getNotes = (req, res) => {
  res.json(notes.rows);
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

export const getNoteById = (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found!" });
  }

  res.json(note);
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
