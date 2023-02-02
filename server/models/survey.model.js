const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  course_id: String,
  answers: [
    {
      name: String,
      student_id: String,
      answer: String,
    },
  ],
});

const Survey = mongoose.model("survey", schema);

module.exports = { Survey };
