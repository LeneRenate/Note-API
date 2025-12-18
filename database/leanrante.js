import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

async function newdata() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });
  const timestamp = Math.floor(new Date().getTime() / 1000);
  await db.run(
    "INSERT INTO notes (title, content, category, tags, updatedAt) VALUES (?, ?, ?, ?, ?)",
    "leanrte",
    "spennende actionthriller i sudan med lraennt-ate som hobbitrolle",
    "romantisk horror",
    JSON.stringify(["romance", "thriller"]),
    timestamp
  );
  await db.close();
  console.log("heygo");
}
await newdata();
