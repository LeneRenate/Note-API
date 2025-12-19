import express from "express";
import { getAllData } from "../controllers/getAllData.js";
import { getDataByPathParams } from "../controllers/getDataByPathParams.js";
import { createNote } from "../controllers/createNote.js";
import { updateNote } from "../controllers/updateNote.js";
import { deleteNote } from "../controllers/deleteNote.js";
import { filterByNewest, filterByOldest } from "../controllers/filterByDate.js";
import { requireAuth } from "../middleware/auth.js";

export const apiRouter = express.Router();

apiRouter.get("/", getAllData);
apiRouter.get("/:field/:term", getDataByPathParams);

// Protect by autherization
apiRouter.post("/notes", requireAuth, createNote);
apiRouter.patch("/notes/:id", requireAuth, updateNote);
apiRouter.delete("/notes/:id", requireAuth, deleteNote);

apiRouter.get("/newest", filterByNewest);
apiRouter.get("/oldest", filterByOldest);
