import "./NotesList.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Button from "../../../components/Button/Button";
import Search from "../Search/Search";
import NoteCard from "../NoteCard/NoteCard";

const NotesList = ({ refresh }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { tag } = useParams();
  const isFavorites = location.pathname === "/favorites";
  const isTags = location.pathname === `/tags/${tag}`;

  console.log(search);

  const params = new URLSearchParams();

  if (isFavorites) {
    params.set("favorite", "true");
  }

  if (isTags) {
    params.set("tag", tag);
  }

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const query = params.toString() ? `?${params.toString()}` : "";

  const handleAddNote = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes`, {
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

  const handleToggleFavorite = async (noteId) => {
    const note = notes.find((note) => note.id === noteId);

    try {
      if (!note) {
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/notes/${noteId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            content: note.content,
            tags: note.tags,
            favorite: !note.favorite,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update favourite");
      }

      if (isFavorites) {
        setNotes((prev) => prev.filter((item) => item.id !== noteId));
      } else {
        setNotes((prev) =>
          prev.map((item) =>
            item.id === noteId ? { ...item, favorite: !note.favorite } : item,
          ),
        );
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:3000/api/notes${query}`,
          {
            credentials: "include",
          },
        );

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
  }, [refresh, query]);

  return (
    <div className="notes-list">
      <h1>
        {isFavorites ? "Favorites" : isTags ? `Tags: ${tag}` : "All Notes"}
      </h1>

      <Button
        text="Add Note"
        className="button--primary button--large"
        type="button"
        onClick={handleAddNote}
      />

      <Search setSearch={setSearch} />

      {loading ? (
        <p>Loading notes...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : notes.length === 0 ? (
        <div className="notes-list__empty">
          <h2>
            {isFavorites
              ? "No favorite notes yet"
              : isTags
                ? "No notes with this tag"
                : "No notes yet"}
          </h2>

          <p className="lead">
            {isFavorites
              ? "Star a note to see it here."
              : isTags
                ? `No notes are tagged "${tag}" yet.`
                : "Create your first note to get started."}
          </p>
        </div>
      ) : (
        notes.map(({ id, content, updated_at, favorite }) => (
          <NoteCard
            key={id}
            id={id}
            content={content}
            favorite={favorite}
            updated_at={updated_at}
            handleToggleFavorite={handleToggleFavorite}
          />
        ))
      )}
    </div>
  );
};

export default NotesList;
