const notesData = [
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

export default notesData;
