const {
  createActivity,
  getActivities,
  deleteActivity,
  getStatus,
  getActivity,
} = require("./activity.controller");
const { decodeToken } = require("../../middleware/decodeToken.middleware");
const {
  uploadMaterial,
} = require("../../middleware/uploadMaterials.middleware");

const router = require("express").Router();

router.get("/", getActivities);
router.get("/:id", getActivity);
router.get("/:id/status", getStatus);
router.post(
  "/",
  decodeToken,
  uploadMaterial.single("material"),
  createActivity
);
router.delete("/:id", deleteActivity);

module.exports = { ActivityRouter: router };
