const {
  register,
  login,
  sendCode,
  changePassword,
} = require("./auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-code", sendCode);
router.put("/change-password", changePassword);

module.exports = { AuthRouter: router };
