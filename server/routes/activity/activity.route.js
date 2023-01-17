const { createActivity, getActivities } = require("./activity.controller");
const { decodeToken } = require("../../middleware/decodeToken.middleware");

const router = require("express").Router();

router.post("/", decodeToken, createActivity);
router.get("/", getActivities);

module.exports = { ActivityRouter: router };
