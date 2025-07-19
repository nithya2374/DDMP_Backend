const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/token", refreshToken);
router.post("/logout", logoutUser);

module.exports = router;
