import "./NotesWorkspace.css";
import { useParams } from "react-router";
import NotesList from "../NotesList/NotesList";
import NotesEditor from "../NotesEditor/NotesEditor";

const NotesWorkspace = () => {
  const { id } = useParams();
  return (
    <div className={`notes-workspace ${id ? "notes-workspace--selected" : ""}`}>
      <div className="notes-workspace__list">
        <NotesList />
      </div>

      <div className="notes-workspace__editor">
        <NotesEditor />
      </div>
    </div>
  );
};

export default NotesWorkspace;
