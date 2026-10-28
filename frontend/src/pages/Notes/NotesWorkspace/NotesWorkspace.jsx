import "./NotesWorkspace.css";
import { useParams } from "react-router";
import NotesList from "../NotesList/NotesList";
import NotesEditor from "../NotesEditor/NotesEditor";
import { useState } from "react";

const NotesWorkspace = () => {
  const { id } = useParams();
  const [refresh, setRefresh] = useState(1);

  return (
    <div className={`notes-workspace ${id ? "notes-workspace--selected" : ""}`}>
      <div className="notes-workspace__list">
        <NotesList refresh={refresh} />
      </div>

      <div className="notes-workspace__editor">
        <NotesEditor key={id ?? "empty"} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default NotesWorkspace;
