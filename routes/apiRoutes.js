import express from "express";
import { getAllData } from "../controllers/getAllData.js";
import { getDataByPathParams } from "../controllers/getDataByPathParams.js";
import { createNote } from "../controllers/createNote.js";
import { updateNote } from "../controllers/updateNote.js";
import { deleteNote } from "../controllers/deleteNote.js";

export const apiRouter = express.Router();

apiRouter.get("/", getAllData);
apiRouter.get("/:field/:term", getDataByPathParams);

apiRouter.post("/notes", createNote);
apiRouter.patch("/notes", updateNote);
apiRouter.delete("/notes", deleteNote);
