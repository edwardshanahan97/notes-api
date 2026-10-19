const getNotePreview = (content = "") => {
  if (!content.trim()) return "";

  const lines = content.split("\n");

  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line.trim()));

  if (titleIndex !== -1) {
    lines.splice(titleIndex, 1);
  } else {
    const firstLineIndex = lines.findIndex((line) => line.trim());

    if (firstLineIndex !== -1) {
      lines.splice(firstLineIndex, 1);
    }
  }

  return lines
    .join(" ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_~`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export default getNotePreview;
