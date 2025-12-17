fetch("http://localhost:3000/api/notes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "leanrte",
    content: "spennende actionthriller i sudan med lraennt-ate som hobbitrolle",
    category: "romantisk horror",
    tags: ["romance", "thriller"],
  }),
});


-------------------------------------------

import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

const app = express();
app.use(express.json());

const db = await open({
  filename: path.join("database.db"),
  driver: sqlite3.Database,
});

------------------------------------------

app.post("/api/notes", async (req, res) => {
  const { title, content, category, tags } = req.body;

  const timestamp = Math.floor(Date.now() / 1000);

  await db.run(
    "INSERT INTO notes (title, content, category, tags, updatedAt) VALUES (?, ?, ?, ?, ?)",
    title,
    content,
    category,
    JSON.stringify(tags),
    timestamp
  );

  res.status(201).end();
});