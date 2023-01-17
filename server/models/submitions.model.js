const mongoose = require("mongoose");

const schema = mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  activity_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "activity",
  },
  status: String,
  url: String,
});
