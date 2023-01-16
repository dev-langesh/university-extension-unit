const { decodeToken } = require("../../middleware/decodeToken.middleware");
const {
  uploadCourseImage,
} = require("../../middleware/uploadCourseImage.middleware");
const {
  createCourse,
  getCourses,
  deleteCourse,
} = require("./course.controller");

const router = require("express").Router();

router.get("/", decodeToken, getCourses);
router.post("/", decodeToken, uploadCourseImage.single("image"), createCourse);
router.delete("/:id", decodeToken, deleteCourse);

module.exports = { CourseRouter: router };
