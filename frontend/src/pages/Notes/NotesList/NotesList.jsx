import "./NotesList.css";
import Button from "../../../components/Button/Button";
import Search from "../Search/Search";

const NotesList = () => {
  return (
    <div className="notes-list">
      <h1>All Notes</h1>

      <Button
        text="Add Note"
        className="button--primary button--large"
        type="button"
      />

      <Search />
    </div>
  );
};

export default NotesList;
