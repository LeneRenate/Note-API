// This one's good :)

import { notes } from "../data/data.js";

export const getDataByPathParams = (req, res) => {
  let filteredData = notes;

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
