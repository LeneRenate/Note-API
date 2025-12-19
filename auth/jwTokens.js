import jwt from "jsonwebtoken";
import { isSessionActive } from "./sessionStore.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Generate time-limited access token
export function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15min" });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, ACCESS_SECRET);

    if (!isSessionActive(payload.sid)) {
      throw new Error("Session expired or invalidated");
    }
    return payload;
  } catch (error) {
    throw error;
  }
}

export function verifyRefreshToken(token) {
  try {
    const payload = jwt.verify(token, REFRESH_SECRET);

    if (!isSessionActive(payload.sid)) {
      throw new Error("Session expired or invalidated");
    }

    return payload;
  } catch (error) {
    throw error;
  }
}
