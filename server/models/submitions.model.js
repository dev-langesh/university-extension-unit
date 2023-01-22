const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    activity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "activity",
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    comment: String,
    status: { type: String, default: "pending" },
    score: { type: Number, default: 0 },
    url: String,
    remarks: String,
    reviewed: Boolean,
    submitted_at: String,
    file_name: String,
  },
  { collection: "submission", timestamps: true }
);

const model = mongoose.model("submission", schema);

module.exports = { Submit: model };
