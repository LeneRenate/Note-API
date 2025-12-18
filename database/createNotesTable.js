import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

async function createNotesTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT NOT NULL,
    updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    )

    `);
  await db.close();
  console.log("notes database created");
}

await createNotesTable();
