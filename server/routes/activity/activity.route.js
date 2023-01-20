const {
  createActivity,
  getActivities,
  deleteActivity,
  getStatus,
} = require("./activity.controller");
const { decodeToken } = require("../../middleware/decodeToken.middleware");

const router = require("express").Router();

router.get("/", getActivities);
router.get("/:id/status", getStatus);
router.post("/", decodeToken, createActivity);
router.delete("/:id", deleteActivity);

module.exports = { ActivityRouter: router };
