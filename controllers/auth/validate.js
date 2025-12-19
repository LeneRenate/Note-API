export const validate = async (req, res) => {
  const { userId, username } = req.user;

  res.status(200).json({
    user: { userId, username },
  });
};
