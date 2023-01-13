const { register, login } = require("./auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = { AuthRouter: router };
