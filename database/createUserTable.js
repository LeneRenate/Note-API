import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

async function createUserTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });

  await db.exec(
    `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL)`
  );

  // adding test user
  await db.run(
    "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
    "testuser",
    "password123"
  );

  await db.close();
  console.log("user database created, with test user");
}

await createUserTable();
