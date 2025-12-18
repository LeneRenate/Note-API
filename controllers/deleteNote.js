import { getDb } from "../database/connection.js";

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  const db = await getDb();
  const result = await db.run("DELETE FROM notes WHERE id=?", id);

  // Check for note
  if (result.changes === 0) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(204).end();
};
