import { getDb } from "../database/connection.js";

export const filterByNewest = async (req, res) => {
  // let filteredData = notes;

  const db = await getDb();
  let filteredData = await db.all("SELECT * FROM notes");

  const { updatedAt } = req.params;

  filteredData = filteredData.sort((a, b) => b.updatedAt - a.updatedAt);

  res.json(filteredData);
};

export const filterByOldest = async (req, res) => {
  // let filteredData = notes;

  const db = await getDb();
  let filteredData = await db.all("SELECT * FROM notes");

  const { updatedAt } = req.params;

  filteredData = filteredData.sort((a, b) => a.updatedAt - b.updatedAt);

  res.json(filteredData);
};
