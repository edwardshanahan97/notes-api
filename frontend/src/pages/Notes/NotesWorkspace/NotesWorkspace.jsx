import "./NotesWorkspace.css";
import { useLocation, useParams } from "react-router";
import NotesList from "../NotesList/NotesList";
import NotesEditor from "../NotesEditor/NotesEditor";
import { useState } from "react";
import TagsList from "../TagsList/TagsList";

const NotesWorkspace = () => {
  const { id, tag } = useParams();
  const [refresh, setRefresh] = useState(1);
  const location = useLocation().pathname;

  console.log(location);

  return (
    <div className={`notes-workspace ${id ? "notes-workspace--selected" : ""}`}>
      <div className="notes-workspace__list">
        {(location === "/notes" || location === "/favorites" || id || tag) && (
          <NotesList refresh={refresh} />
        )}

        {location === "/tags" && <TagsList refresh={refresh} />}
      </div>

      <div className="notes-workspace__editor">
        <NotesEditor key={id ?? "empty"} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default NotesWorkspace;
