const validateNoteData = (content, tags, favorite) => {
  if (
    typeof content !== "string" ||
    !Array.isArray(tags) ||
    typeof favorite !== "boolean"
  ) {
    return false;
  }

  if (content.length > 3000 || tags.length > 20) {
    return false;
  }

  if (
    tags.some(
      (tag) => typeof tag !== "string" || tag.trim() === "" || tag.length > 50,
    )
  ) {
    return false;
  }

  return true;
};

export default validateNoteData;
