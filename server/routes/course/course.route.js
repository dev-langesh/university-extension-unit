const { decodeToken } = require("../../middleware/decodeToken.middleware");
const {
  uploadCourseImage,
} = require("../../middleware/uploadCourseImage.middleware");
const {
  createCourse,
  getCourses,
  deleteCourse,
  registerInCourse,
  getRegisteredCourses,
  getParticipants,
} = require("./course.controller");

const router = require("express").Router();

router.get("/", decodeToken, getCourses);
router.get("/get-registered", decodeToken, getRegisteredCourses);
router.get("/:id/participants", getParticipants);
router.post("/", decodeToken, uploadCourseImage.single("image"), createCourse);
router.post("/register", decodeToken, registerInCourse);
router.delete("/:id", decodeToken, deleteCourse);

module.exports = { CourseRouter: router };
