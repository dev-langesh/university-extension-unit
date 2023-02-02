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

  const surveys = await Survey.find({ course_id });

  res.json(surveys);
}

// GET /survey/:survey_id/replies
async function getReplys(req, res) {
  const { survey_id } = req.params;

  const replys = await Survey.findById(survey_id).select("answers");

  res.json(replys);
}

// POST /survey/reply
async function reply(req, res) {
  const user = await User.findById(req.id);

  const survey = await Survey.findByIdAndUpdate(req.body.id, {
    $push: {
      answers: {
        name: user.username,
        student_id: user.student_id,
        answer: req.body.reply,
      },
    },
  });

  res.json(survey);
}

module.exports = { createSurvey, getAllSurvey, reply, getReplys };
