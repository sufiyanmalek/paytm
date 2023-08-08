// Authenticate user
export const authController = async (req, res) => {
  try {
    res.status(200).json({
      auth: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
