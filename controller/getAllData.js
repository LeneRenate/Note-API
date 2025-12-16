import { notes } from "../data/data";

export const getAllData = (req, res) => {
  let filteredData = notes;

  const { title, content, category, tags } = req.query;

  if (title) {
    filteredData = filteredData.filter(
      (note) => note.title.toLowerCase() === title.toLowerCase()
    );
  }

  // Must be fixed
  if (content) {
    filteredData = filteredData.filter(
      (note) => note.content.toLowerCase() === content.toLowerCase()
    );
  }

  // Not sure of...
  if (category || tags) {
    filteredData = filteredData.filter(
      (note) =>
        note.category.toLowerCase() === category.toLowerCase() ||
        note.category.toLowerCase() === tags.toLowerCase() ||
        note.tags.includes(category.toLowerCase()) ||
        note.tags.includes(tags.toLowerCase())
    );
  }
};
