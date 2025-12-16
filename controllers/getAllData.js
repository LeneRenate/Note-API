// This one's good :)

import { notes } from "../data/data.js";
import { getDb } from "../database/connection.js";

export const getAllData = async (req, res) => {
  // let filteredData = notes;

  const db = await getDb();
  let filteredData = await db.all("SELECT * FROM notes");

  const { title, content, category, tags } = req.query;

  if (title) {
    filteredData = filteredData.filter((note) =>
      note.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // Must be fixed
  if (content) {
    filteredData = filteredData.filter((note) =>
      note.content.toLowerCase().includes(content.toLowerCase())
    );
  }

  // Assuming people will mix up category and tags
  if (category) {
    filteredData = filteredData.filter(
      (note) =>
        note.category.toLowerCase() === category.toLowerCase() ||
        note.tags.includes(category.toLowerCase())
    );
  }

  if (tags) {
    filteredData = filteredData.filter(
      (note) =>
        note.category.toLowerCase() === tags.toLowerCase() ||
        note.tags.includes(tags.toLowerCase())
    );
  }

  if (filteredData.length < 1) {
    res.status(404).json({ message: "no notes matches criteria" });
  } else {
    res.json(filteredData);
  }
};
