import "./NoteCard.css";
import { Star } from "lucide-react";
import getNoteTitle from "../../../utils/getNoteTitle";
import getNotePreview from "../../../utils/getNotePreview";
import formatDate from "../../../utils/formatDate";

const NoteCard = ({ content, favorite, updated_at }) => {
  const title = getNoteTitle(content);
  const preview = getNotePreview(content);
  const date = formatDate(updated_at);

  return (
    <div className="note-card">
      <div className="note-card__group">
        <h3 className="note-card__title">{title}</h3>

        <Star />
      </div>
      <p className="note-card__preview">{preview}</p>
      <span className="note-card__date"> {date}</span>
    </div>
  );
};

export default NoteCard;
