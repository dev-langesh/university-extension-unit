const router = require("express").Router();
const { decodeToken } = require("../../middleware/decodeToken.middleware");
const { uploadWork } = require("../../middleware/uploadWork.middleware");
const { submitWork } = require("./submit.controller");

router.post("/", decodeToken, uploadWork.single("work"), submitWork);

module.exports = { SubmitRouter: router };
