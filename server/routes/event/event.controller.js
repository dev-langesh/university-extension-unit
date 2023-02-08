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

// DELETE /event
async function deleteEvent(req, res) {
  await Event.findByIdAndDelete(req.params.id);

  return res.json({});
}

module.exports = { createEvent, getEvents, deleteEvent };
