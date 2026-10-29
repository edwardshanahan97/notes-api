import "./NotesEditor.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, FilePenLine } from "lucide-react";

import Button from "../../../components/Button/Button";

const NotesEditor = ({ setRefresh }) => {
  const { id } = useParams();
  const noteId = Number(id);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState("");
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [mode, setMode] = useState("edit");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${noteId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            content,
            tags: note.tags,
            favorite: note.favorite,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save note");
      }

      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${noteId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setRefresh((prev) => prev + 1);

      navigate("/notes");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:3000/api/notes/${noteId}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch note");
        }

        const data = await response.json();

        setNote(data);
        setContent(data.content ?? "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

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
  } else if (loading) {
    return <p>Loading note...</p>;
  } else if (error) {
    return <p role="alert">{error}</p>;
  } else if (!note) {
    return <h2>Note not found</h2>;
  } else {
    return (
      <div className="notes-editor">
        <Link to="/notes">
          <ArrowLeft className="notes-editor__back" />
        </Link>

        <div className="notes-editor__buttons">
          <Button
            text="Save Note"
            className={"button--outline button--large"}
            type="button"
            onClick={handleSave}
          />

          <Button
            text="Delete Note"
            className={"button--outline button--large"}
            type="button"
            onClick={handleDelete}
          />

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
