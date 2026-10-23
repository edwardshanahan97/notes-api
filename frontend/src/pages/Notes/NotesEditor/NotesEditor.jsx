import "./NotesEditor.css";
import notesData from "../../../data/notesData";
import { useParams } from "react-router";
import { FilePenLine } from "lucide-react";

const NotesEditor = () => {
  const { id } = useParams();

  const noteId = Number(id);

  const note = notesData.find((note) => noteId === note.id);

  console.log(note);

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
    return <div className="notes-editor">{note.content}</div>;
  }
};

export default NotesEditor;
