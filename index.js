import express from "express";

let notes = [
  {
    id: 1,
    title: "Note 1",
    description: "This is a note 1",
    tag: "personal",
  },

  {
    id: 2,
    title: "Note 2",
    description: "This is a note 2",
    tag: "work",
  },

  {
    id: 3,
    title: "Note 3",
    description: "This is a note 3",
    tag: "personal",
  },

  {
    id: 4,
    title: "Note 4",
    description: "This is a note 4",
    tag: "work",
  },

  {
    id: 5,
    title: "Note 5",
    description: "This is a note 5",
    tag: "personal",
  },
];

const app = express();
app.use(express.json());

app.get("/notes", (req, res) => {
  let results = notes;
  const tag = req.query.tag;

  if (tag) {
    results = notes.filter((note) => note.tag === tag);
  }

  res.json(results);
});

let nextId = 6;

app.post("/notes", (req, res) => {
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
});

app.get("/notes/:id", (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found!" });
  }

  res.json(note);
});

app.put("/notes/:id", (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.title = req.body.title;
  note.description = req.body.description;
  note.tag = req.body.tag;
  res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes = notes.filter((n) => n.id !== note.id);
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(3000, () => console.log("Server is running"));
