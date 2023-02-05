const { getProfileDetails, getDetailsInExcel } = require("./user.controller");

const router = require("express").Router();

router.post("/profile", getProfileDetails);
router.get("/student-details", getDetailsInExcel);

module.exports = { userRouter: router };
