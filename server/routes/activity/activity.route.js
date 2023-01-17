const {
  createActivity,
  getActivities,
  deleteActivity,
} = require("./activity.controller");
const { decodeToken } = require("../../middleware/decodeToken.middleware");

const router = require("express").Router();

router.get("/", getActivities);
router.post("/", decodeToken, createActivity);
router.delete("/:id", deleteActivity);

module.exports = { ActivityRouter: router };
