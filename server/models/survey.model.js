const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  course_id: String,
  questions: [
    {
      question_text: String,
    },
  ],
  answers: [
    {
      name: String,
      sid: String,
      student_id: String,
      replies: [{}],
    },
  ],
});

const Survey = mongoose.model("survey", schema);

module.exports = { Survey };
