const validateNoteData = (content, tags, favorite) => {
  if (
    typeof content !== "string" ||
    !Array.isArray(tags) ||
    typeof favorite !== "boolean"
  ) {
    return false;
  }

  if (tags.some((tag) => typeof tag !== "string" || tag.trim() === "")) {
    return false;
  }

  return true;
};

export default validateNoteData;
