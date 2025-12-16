import express from "express";
import { getAllData } from "../controller/getAllData";
import { getDataByPathParams } from "../controller/getDataByPathParams";

export const apiRouter = express.Router();

apiRouter.get("/", getAllData);

apiRouter.get("/:field/:term", getDataByPathParams);
