const { Survey } = require("../../models/survey.model");
const { User } = require("../../models/user.model");

// POST /survey
async function createSurvey(req, res) {
  const survey = await Survey.create(req.body);

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

  const replies = await Survey.findById(survey_id).lean();

  const data = replies.answers.map((reply) => {
    return {
      ...reply,
      replies: reply.replies.map((r) => {
        const qids = Object.keys(r);

        let data = [];

        for (let qid of qids) {
          const question = replies.questions.find((q) => {
            return q._id == qid;
          });

          data.push({
            question: question.question_text,
            answer: r[qid],
          });
        }

        return data;
      }),
    };
  });

  res.json(data);
}

// GET /survey/:survey_id/reply
async function getReply(req, res) {
  const { survey_id } = req.params;

  const reply = await Survey.find({
    _id: survey_id,
  });

  res.json(reply);
}

// POST /survey/reply
async function reply(req, res) {
  const user = await User.findById(req.id);

  console.log(req.body);
  console.log(user);

  const survey = await Survey.findByIdAndUpdate(req.body.id, {
    $push: {
      answers: {
        sid: req.id,
        name: user.username,
        student_id: user.student_id,
        replies: req.body.replies,
      },
    },
  });

  res.json(survey);
}

module.exports = { createSurvey, getAllSurvey, reply, getReplys, getReply };
