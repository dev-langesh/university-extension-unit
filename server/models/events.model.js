const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    date: String,
    desc: String,
    img: String,
  },
  { collection: "events" }
);

const model = mongoose.model("event", schema);

module.exports = { Event: model };
