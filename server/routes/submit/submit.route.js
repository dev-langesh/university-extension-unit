const router = require("express").Router();
const { decodeToken } = require("../../middleware/decodeToken.middleware");
const { uploadWork } = require("../../middleware/uploadWork.middleware");
const { submitWork, getSubmittedWork } = require("./submit.controller");

router.get("/", decodeToken, getSubmittedWork);
router.post("/", decodeToken, uploadWork.single("work"), submitWork);

module.exports = { SubmitRouter: router };
