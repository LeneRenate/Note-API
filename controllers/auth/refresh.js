import {
  generateAccessToken,
  verifyRefreshToken,
} from "../../auth/jwTokens.js";

export const refresh = async (req, res) => {
  const refreshToken = req.headers["x-refreshtoken"];

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing X-RefreshToken header" });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      username: payload.username,
      sid: payload.sid,
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};
