const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  due_date: String,
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  admin_id: {
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
      status: {
        type: String,
        default: "pending",
      },
    },
  ],
});

const model = mongoose.model("activity", schema);

module.exports = { Activity: model };
