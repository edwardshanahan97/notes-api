const getNoteWithTags = async (client, id, userId) => {
  const noteResult = await client.query(
    `
    SELECT
      notes.id,
      notes.content,
      notes.created_at,
      notes.updated_at,
      notes.user_id,
      COALESCE(
    ARRAY_AGG(tags.name) FILTER (WHERE tags.name IS NOT NULL),
    '{}'
  ) AS tags
    FROM notes
    LEFT JOIN note_tags ON note_tags.note_id = notes.id
    LEFT JOIN tags ON tags.id = note_tags.tag_id
    WHERE notes.id = $1 AND notes.user_id = $2
    GROUP BY notes.id
  `,
    [id, userId],
  );

  return noteResult.rows[0];
};

export default getNoteWithTags;
