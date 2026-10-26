import "./NotesList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import Search from "../Search/Search";
import NoteCard from "../NoteCard/NoteCard";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: "",
          tags: [],
          favorite: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const note = await response.json();

      setNotes((prev) => [note, ...prev]);

      navigate(`/notes/${note.id}`);
    } catch (error) {
      console.error("Request Failed: " + error);

      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notes", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();

        setNotes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-list">
      <h1>All Notes</h1>

      <Button
        text="Add Note"
        className="button--primary button--large"
        type="button"
        onClick={handleAddNote}
      />

      <Search />

      {loading ? (
        <p>Loading notes...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : notes.length === 0 ? (
        <div className="notes-list__empty">
          <h2>No notes yet</h2>
          <p className="lead">Create your first note to get started.</p>
        </div>
      ) : (
        notes.map(({ id, content, updated_at, favorite }) => (
          <NoteCard
            key={id}
            id={id}
            content={content}
            favorite={favorite}
            updated_at={updated_at}
          />
        ))
      )}
    </div>
  );
};

export default NotesList;
