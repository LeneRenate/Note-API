import Joi from "joi";
import getDb from "../../database/connection.js";
import { v4 as uuidv4 } from "uuid";
import { addSession } from "../../auth/sessionStore.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../auth/jwTokens.js";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const login = async (req, res) => {
  const { value, error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(422).json({ message: error.message });
  }

  const { username, password } = value;

  const db = await getDb();
  const user = await db.get(
    "SELECT FROM users WHERE username = ? AND password = ?",
    username,
    password
  );

  if (!user) {
    return res.status(401).json({ message: "login failed" });
  }

  // Generate session ID
  const sid = uuidv4();

  addSession(sid);

  // Create token payload
  const payload = {
    userId: user.id,
    username: user.username,
    sid: sid,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.status(200).json({ accessToken, refreshToken });
};
