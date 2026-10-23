import "./NotesList.css";
import Button from "../../../components/Button/Button";
import Search from "../Search/Search";
import NoteCard from "../NoteCard/NoteCard";
import notesData from "../../../data/notesData";

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

      {notesData.map(({ id, content, updated_at, is_favourite }) => (
        <NoteCard
          key={id}
          id={id}
          content={content}
          favorite={is_favourite}
          updated_at={updated_at}
        />
      ))}
    </div>
  );
};

export default NotesList;
