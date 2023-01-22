const { getEvents, createEvent } = require("./event.controller");

const router = require("express").Router();

router.get("/", getEvents);
router.post("/", createEvent);

module.exports = { EventRouter: router };
