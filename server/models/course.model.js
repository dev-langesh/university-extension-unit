const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: String,
    sub_title: String,
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    students: [
      {
        student_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        email: String,
      },
    ],
    img: String,
    code: Number,
  },
  { collection: "course" }
);

const model = mongoose.model("course", schema);

module.exports = { Course: model };
