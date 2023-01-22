const { Event } = require("../../models/events.model");

// POST /event
async function createEvent(req, res) {
  const event = Event.create({
    ...req.body,
    img: req.url,
  });

  res.json({ event });
}

// GET /event
async function getEvents(req, res) {
  const events = Event.find({});

  res.json(events);
}

module.exports = { createEvent, getEvents };
