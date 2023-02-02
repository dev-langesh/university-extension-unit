const { createSurvey } = require("./survey.controller");

const router = require("express").Router();

router.post("/", createSurvey);

module.exports = { SurveyRouter: router };
