import "./NotesEditior.css";
import { FilePenLine } from "lucide-react";

const NotesEditor = () => {
  return (
    <div className="notes-editor">
      <div className="notes-editor__empty">
        <FilePenLine />

        <h2>Select a note to start editing</h2>

        <p>Choose a note from the list to get started.</p>
      </div>
    </div>
  );
};

export default NotesEditor;
