const { createSurvey, getAllSurvey, reply } = require("./survey.controller");
const { decodeToken } = require("../../middleware/decodeToken.middleware");

const router = require("express").Router();

router.get("/:course_id", getAllSurvey);
router.post("/", createSurvey);
router.post("/reply", decodeToken, reply);

module.exports = { SurveyRouter: router };
