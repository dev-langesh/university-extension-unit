const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: String,
    sub_title: String,
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    students: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    img: String,
  },
  { collection: "courses" }
);

const model = mongoose.model("course", schema);

module.exports = { Course: model };
