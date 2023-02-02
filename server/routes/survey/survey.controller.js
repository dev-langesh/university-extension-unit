const { Survey } = require("../../models/survey.model");

// POST /survey
async function createSurvey(req, res) {
  const { course_id, title } = req.body;

  const survey = await Survey.create({
    course_id,
    title,
  });

  console.log(req.body);

  res.json(survey);
}

module.exports = { createSurvey };
