const multer = require("multer");
const { Course } = require("../../models/course.model");

async function createCourse(req, res) {
  try {
    if (req.userType === "student") throw new Error("You are  not allowed");

    console.log(req.file);

    res.json({});
  } catch (err) {
    if (err) res.status(400).json({ error: err.message });
  }
}

async function getCourses(req, res) {
  const courses = await Course.find({});
}

module.exports = { createCourse, getCourses };
