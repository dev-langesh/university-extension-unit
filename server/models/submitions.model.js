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
    comment: String,
    status: { type: String, default: "Pending" },
    url: String,
    marks: Number,
    submitted_at: String,
    file_name: String,
  },
  { collection: "submission", timestamps: true }
);

const model = mongoose.model("submission", schema);

module.exports = { Submit: model };
