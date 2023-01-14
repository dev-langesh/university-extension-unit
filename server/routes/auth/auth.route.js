const { register, login, sendCode } = require("./auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-code", sendCode);

module.exports = { AuthRouter: router };
