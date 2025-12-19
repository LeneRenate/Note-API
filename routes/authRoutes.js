import express from "express";
import { login } from "../controllers/auth/login.js";
import { refresh } from "../controllers/auth/refresh.js";
import { logout } from "../controllers/auth/logout.js";
import { validate } from "../controllers/auth/validate.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/refresh", refresh);
authRouter.post("/logout", logout);
authRouter.get("/validate", requireAuth, validate);
