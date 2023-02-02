const { Survey } = require("../../models/survey.model");
const { User } = require("../../models/user.model");

// POST /survey
async function createSurvey(req, res) {
  const { course_id, title } = req.body;

  const survey = await Survey.create({
    course_id,
    title,
  });

  res.json(survey);
}

// GET /survey/:course_id
async function getAllSurvey(req, res) {
  const { course_id } = req.params;

  console.log(course_id);

  const surveys = await Survey.find({ course_id });

  res.json(surveys);
}

// POST /survey/reply
async function reply(req, res) {
  const user = await User.findById(req.id);

  console.log(user);

  const survey = await Survey.findByIdAndUpdate(req.body.id, {
    $push: {
      answers: {
        name: user.username,
        student_id: user.student_id,
        answer: req.body.reply,
      },
    },
  });

  console.log(survey);

  res.json(survey);
}

module.exports = { createSurvey, getAllSurvey, reply };
