const { getProfileDetails } = require("./user.controller");

const router = require("express").Router();

router.post("/profile", getProfileDetails);

module.exports = { userRouter: router };
