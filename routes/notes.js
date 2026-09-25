import express from "express";
import notes from "../data/notes.js";
import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getNotes,
} from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);

router.post("/", addNote);

router.get("/:id", getNoteById);

router.put("/:id", editNote);

router.delete("/:id", deleteNote);

export default router;
