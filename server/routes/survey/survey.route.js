const {
  createSurvey,
  getAllSurvey,
  reply,
  getReplys,
  getReply,
} = require("./survey.controller");
const { decodeToken } = require("../../middleware/decodeToken.middleware");

const router = require("express").Router();

router.get("/:course_id", getAllSurvey);
router.post("/", createSurvey);
router.get("/:survey_id/reply", getReply);
router.get("/:survey_id/replies", getReplys);
router.post("/reply", decodeToken, reply);

module.exports = { SurveyRouter: router };
