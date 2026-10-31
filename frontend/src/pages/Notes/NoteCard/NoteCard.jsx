import "./NoteCard.css";
import { Link } from "react-router";
import { Star } from "lucide-react";
import getNoteTitle from "../../../utils/getNoteTitle";
import getNotePreview from "../../../utils/getNotePreview";
import formatDate from "../../../utils/formatDate";

const NoteCard = ({
  id,
  content,
  favorite,
  updated_at,
  handleToggleFavorite,
}) => {
  const title = getNoteTitle(content);
  const preview = getNotePreview(content);
  const date = formatDate(updated_at);

  console.log(favorite);

  return (
    <div className="note-card">
      <button
        className="note-card__button"
        onClick={() => handleToggleFavorite(id)}
        aria-label="Toggle Favorite"
      >
        <Star fill={favorite ? "var(--color-primary)" : "none"} />
      </button>

      <Link to={`/notes/${id}`}>
        <div className="note-card__group">
          <h3 className="note-card__title">{title}</h3>
        </div>
        <p className="note-card__preview">{preview}</p>
        <span className="note-card__date"> {date}</span>
      </Link>
    </div>
  );
};

export default NoteCard;
