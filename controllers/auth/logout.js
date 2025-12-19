import { verifyAccessToken, verifyRefreshToken } from "../../auth/jwTokens.js";
import { removeSession } from "../../auth/sessionStore.js";

export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.headers["x-refreshtoken"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing X-Refresh Token header" });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const accessPayload = verifyAccessToken(accessToken);
    const refreshPayload = verifyRefreshToken(refreshToken);

    // Check that both tokens belong to the same session
    if (accessPayload.sid !== refreshPayload.sid) {
      return res.status(401).json({ message: "Token mismatch" });
    }

    // Remove from active sessions
    removeSession(accessPayload.sid);

    res.status(204).end();
  } catch (error) {
    return res.status(401).json({ message: "Invalid tokens" });
  }
};
