const addTagsToNote = async (client, noteId, tags) => {
  for (const tag of tags) {
    const tagResult = await client.query(
      "SELECT id FROM tags WHERE name = $1",
      [tag],
    );

    let tagId;

    if (tagResult.rows.length > 0) {
      tagId = tagResult.rows[0].id;
    } else {
      const newTagResult = await client.query(
        "INSERT INTO tags (name) VALUES ($1) RETURNING id",
        [tag],
      );

      tagId = newTagResult.rows[0].id;
    }

    await client.query(
      "INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2)",
      [noteId, tagId],
    );
  }
};

export default addTagsToNote;
