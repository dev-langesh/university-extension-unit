const { createActivity } = require("./activity.controller");
const { decodeToken } = require("../../middleware/decodeToken.middleware");

const router = require("express").Router();

router.post("/", decodeToken, createActivity);

module.exports = { ActivityRouter: router };
