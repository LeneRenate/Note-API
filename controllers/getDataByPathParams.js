// This one's good :)

import { notes } from "../data/data.js";
import { getDb } from "../database/connection.js";

export const getDataByPathParams = async (req, res) => {
  // let filteredData = notes;

  const db = await getDb();
  let filteredData = await db.all("SELECT * FROM notes");

  const { field, term } = req.params;

  const allowedFields = ["category"];

  if (allowedFields.includes(field.toLowerCase())) {
    filteredData = filteredData.filter(
      (note) => note[field].toLowerCase() === term.toLowerCase()
    );
    return res.json(filteredData);
  } else {
    return res.status(400).json({
      message: "Search field not allowed. Please use only `category` ",
    });
  }
};
