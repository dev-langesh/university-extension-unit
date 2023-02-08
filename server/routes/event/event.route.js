const { getEvents, createEvent, deleteEvent } = require("./event.controller");
const {
  uploadMaterial,
} = require("../../middleware/uploadMaterials.middleware");

const router = require("express").Router();

router.get("/", getEvents);
router.post("/", uploadMaterial.single("image"), createEvent);
router.delete("/:id", deleteEvent);

module.exports = { EventRouter: router };
