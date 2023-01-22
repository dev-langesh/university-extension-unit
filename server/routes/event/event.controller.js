const { Event } = require("../../models/events.model");

// POST /event
async function createEvent(req, res) {
  const event = await Event.create({
    ...req.body,
    img: req.url,
  });

  console.log(event);

  res.json({ event });
}

// GET /event
async function getEvents(req, res) {
  const events = await Event.find({});

  res.json({ events });
}

module.exports = { createEvent, getEvents };
