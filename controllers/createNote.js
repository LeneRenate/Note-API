import { getDb } from "../database/connection.js";
import { noteSchema } from "../schemas/note.schema.js";

export const createNote = async (req, res) => {
  const { value } = noteSchema.validate(req.body);

  const { title, content, category, tags } = value;

  // Making sure the db gets all the info it needs (tags will be optional)
  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ message: "Title, content and category are required" });
  }

  const db = await getDb();
  const timestamp = Math.floor(Date.now() / 1000);
  const tagsJson = JSON.stringify(tags || []);

  const result = await db.run(
    "INSERT INTO notes (title, content, category, tags, updatedAt) VALUES (?, ?, ?, ?, ?)",
    title,
    content,
    category,
    tagsJson,
    timestamp
  );

  res
    .status(201)
    .json({ message: "Note created successfully", id: result.lastID });
};
