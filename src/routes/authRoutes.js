const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");
const { userSchemas } = require("../validators/schemas");
const router = express.Router();

router.post("/register", validateRequest(userSchemas.register), registerUser);
router.post("/login", validateRequest(userSchemas.login), loginUser);

router.post('/refresh-token', async (req, res, next) => {
  try {
    const refreshToken = req.body.token;

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });

    if (!refreshTokenDoc) {
      throw new AppError("Invalid refresh token", 403);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError("Invalid refresh token", 403);
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;