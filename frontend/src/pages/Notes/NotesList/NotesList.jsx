import "./NotesList.css";
import Button from "../../../components/Button/Button";
import Search from "../Search/Search";
import NoteCard from "../NoteCard/NoteCard";

const notes = [
  {
    id: 1,
    content: `# Learning React Hooks

Today I learned how useEffect works.

## Things to remember
- Dependencies matter
- Avoid unnecessary renders`,
    is_favourite: true,
    tags: ["react", "learning"],
    updated_at: "2026-10-18T14:30:00Z",
  },
  {
    id: 2,
    content: `# Portfolio Ideas

Some features I want to add to my portfolio.

- Dark mode
- Responsive design
- Project screenshots`,
    is_favourite: false,
    tags: ["personal", "projects"],
    updated_at: "2026-10-17T10:15:00Z",
  },
  {
    id: 3,
    content: `Today I learned about PostgreSQL indexes.

Indexes can improve query performance, but they also have a cost.`,
    is_favourite: false,
    tags: ["sql", "learning"],
    updated_at: "2026-10-16T09:00:00Z",
  },
  {
    id: 4,
    content: "",
    is_favourite: false,
    tags: [],
    updated_at: "2026-10-15T16:45:00Z",
  },
];

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

      {notes.map(({ id, content, updated_at, is_favourite }) => (
        <NoteCard
          key={id}
          content={content}
          favorite={is_favourite}
          updated_at={updated_at}
        />
      ))}
    </div>
  );
};

export default NotesList;
