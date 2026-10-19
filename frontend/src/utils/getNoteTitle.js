const getNoteTitle = (content = "") => {
  const lines = content.split("\n");

  const heading = lines.find((line) => /^#\s+/.test(line.trim()));

  if (heading) {
    return heading.trim().replace(/^#\s+/, "").trim();
  }

  const firstLine = lines.find((line) => line.trim() !== "");

  if (firstLine) {
    return firstLine
      .trim()
      .replace(/^#{1,6}\s+/, "")
      .trim();
  }

  return "Untitled Note";
};

export default getNoteTitle;
