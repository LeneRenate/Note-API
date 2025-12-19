import { getDb } from "../database/connection.js";
import { noteSchema } from "../schemas/note.schema.js";

export const updateNote = async (req, res) => {
  const { id } = req.params;

  const { value, error } = noteSchema.validate(req.body);

  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }

  const { title, content, category, tags } = value;

  const db = await getDb();

  // Check for note
  const note = await db.get("SELECT FROM notes WHERE id=?", id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  // To update only provided fields
  const updatedTitle = title || note.title;
  const updatedContent = content || note.content;
  const updatedCategory = category || note.category;
  const updatedTags = tags ? JSON.stringify(tags) : note.tags;
  const timestamp = Math.floor(Date.now() / 1000);

  await db.run(
    "UPDATE notes SET title = ?, content = ?, category = ?, tags = ?, updatedAt = ? WHERE id = ?",
    updatedTitle,
    updatedContent,
    updatedCategory,
    updatedTags,
    timestamp,
    id
  );

  res.json({ message: "Note updated successfully" });
};
