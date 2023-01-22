const router = require("express").Router();
const { decodeToken } = require("../../middleware/decodeToken.middleware");
const { uploadWork } = require("../../middleware/uploadWork.middleware");
const {
  submitWork,
  getSubmittedWork,
  provideMarks,
} = require("./submit.controller");

router.get("/", getSubmittedWork);
router.post("/", decodeToken, uploadWork.single("work"), submitWork);
router.put("/", provideMarks);

module.exports = { SubmitRouter: router };
