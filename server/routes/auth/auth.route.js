const {
  register,
  login,
  sendCode,
  changePassword,
  verifyCode,
} = require("./auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.put("/send-code", sendCode);
router.put("/change-password", changePassword);
router.put("/verify-code", verifyCode);

module.exports = { AuthRouter: router };
