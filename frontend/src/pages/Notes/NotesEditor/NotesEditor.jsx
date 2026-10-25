import "./NotesEditor.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, Link } from "react-router";
import remarkGfm from "remark-gfm";
import { ArrowLeft, FilePenLine } from "lucide-react";
import notesData from "../../../data/notesData";
import Button from "../../../components/Button/Button";

const NotesEditor = () => {
  const { id } = useParams();
  const noteId = Number(id);
  const note = notesData.find((note) => noteId === note.id);
  const [content, setContent] = useState(note?.content ?? "");
  const [mode, setMode] = useState("edit");

  if (!id) {
    return (
      <div className="notes-editor">
        <div className="notes-editor__empty">
          <FilePenLine />

          <h2>Select a note to start editing</h2>

          <p>Choose a note from the list to get started.</p>
        </div>
      </div>
    );
  } else if (!note) {
    return <h2>Note not found</h2>;
  } else {
    return (
      <div className="notes-editor">
        <Link to="/notes">
          <ArrowLeft
            className="notes-editor__back"
            onClick={() => navigate("/notes")}
          />
        </Link>
        <div className="notes-editor__buttons">
          <Button
            text="Edit"
            className={`${mode === "edit" ? "button--primary" : "button--outline"} button--large`}
            type="button"
            onClick={() => setMode("edit")}
          />

          <Button
            text="Preview"
            className={`${mode === "preview" ? "button--primary" : "button--outline"} button--large`}
            type="button"
            onClick={() => setMode("preview")}
          />
        </div>
        {mode === "edit" && (
          <textarea
            onChange={(event) => setContent(event.target.value)}
            value={content}
          ></textarea>
        )}

        {mode === "preview" && (
          <div className="notes-editor__preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    );
  }
};

export default NotesEditor;
