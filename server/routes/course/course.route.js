const { decodeToken } = require("../../middleware/decodeToken.middleware");
const {
  uploadCourseImage,
} = require("../../middleware/uploadCourseImage.middleware");
const { createCourse, getCourses } = require("./course.controller");

const router = require("express").Router();

router.get("/", decodeToken, getCourses);
router.post("/", decodeToken, uploadCourseImage.single("image"), createCourse);

module.exports = { CourseRouter: router };
