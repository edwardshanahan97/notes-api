import { useEffect, useState } from "react";
import { Link } from "react-router";

const TagsList = ({ refresh }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:3000/api/notes", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const notes = await response.json();

        const getTags = notes.flatMap((note) => note.tags);

        const uniqueTags = new Set(getTags);

        setTags([...uniqueTags]);

        console.log(tags);
      } catch (error) {
        console.log(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [refresh]);

  return (
    <div className="tags-list">
      {loading ? (
        <p>Loading tags...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : tags.length === 0 ? (
        <div className="notes-list__empty">
          <h2>No tags yet"</h2>
          <p className="lead">Add tags to your notes to see them here.</p>
        </div>
      ) : (
        <div>
          <h2>Tags</h2>

          {tags.map((tag) => (
            <Link to={`/tags/${tag}`} key={tag}>
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsList;
