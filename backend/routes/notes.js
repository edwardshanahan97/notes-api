import express from "express";

import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getNotes,
} from "../controllers/notes.js";

import requireAuth from "../middleware/requireAuth.js";

const notesRouter = express.Router();

notesRouter.use(requireAuth);

notesRouter.get("/", getNotes);

notesRouter.post("/", addNote);

notesRouter.get("/:id", getNoteById);

notesRouter.put("/:id", editNote);

notesRouter.delete("/:id", deleteNote);

export default notesRouter;
