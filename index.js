import express from "express";

const notes = [
  {
    id: 1,
    title: "Note 1",
    description: "This is a note 1",
  },

  {
    id: 2,
    title: "Note 2",
    description: "This is a note 2",
  },

  {
    id: 3,
    title: "Note 3",
    description: "This is a note 3",
  },

  {
    id: 4,
    title: "Note 4",
    description: "This is a note 4",
  },

  {
    id: 5,
    title: "Note 5",
    description: "This is a note 5",
  },
];

const app = express();

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found!" });
  }

  res.json(note);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(3000, () => console.log("Server is running"));
