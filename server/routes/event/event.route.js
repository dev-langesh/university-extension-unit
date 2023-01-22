const { getEvents, createEvent } = require("./event.controller");
const {
  uploadMaterial,
} = require("../../middleware/uploadMaterials.middleware");

const router = require("express").Router();

router.get("/", getEvents);
router.post("/", uploadMaterial.single("image"), createEvent);

module.exports = { EventRouter: router };
