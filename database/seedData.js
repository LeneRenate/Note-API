import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { notes } from "../data/data.js";
import { time } from "node:console";

async function seedData() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });

  // Sjekk om databasen har innhold allerede, hvis den har det så fyller vi ikke den opp med fyll-innhold
  const result = await db.get("SELECT COUNT(*) as count FROM notes");
  if (result.count > 0) {
    console.log("database har allerede innhold, skipper fyll.");
    await db.close();
    return;
  }

  for (const note of notes) {
    const tagsJson = JSON.stringify(note.tags);
    const timestamp = Math.floor(new Date(note.updatedAt).getTime() / 1000);

    await db.run(
      "INSERT INTO notes (title, content, category, tags, updatedAt) VALUES (?, ?, ?, ?, ?)",
      note.title,
      note.content,
      note.category,
      tagsJson,
      timestamp
    );
  }
  await db.close();
  console.log(`la til ${notes.length} notater til databasen`);
}
await seedData();
