const { getProfileDetails, getDetailsInExcel } = require("./user.controller");

const router = require("express").Router();

router.post("/profile", getProfileDetails);
router.get("/student-details/:course_id", getDetailsInExcel);

module.exports = { userRouter: router };
