import express from "express";

import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getNotes,
} from "../controllers/notes.js";

const notesRouter = express.Router();

notesRouter.get("/", getNotes);

notesRouter.post("/", addNote);

notesRouter.get("/:id", getNoteById);

notesRouter.put("/:id", editNote);

notesRouter.delete("/:id", deleteNote);

export default notesRouter;
