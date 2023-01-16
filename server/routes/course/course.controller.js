const multer = require("multer");
const { Course } = require("../../models/course.model");

async function createCourse(req, res) {
  try {
    const { title, sub_title } = req.body;

    if (req.userType === "student") throw new Error("You are  not allowed");

    if (!req.file) throw new Error("Provide course image");

    const course = await Course.create({
      title: title,
      sub_title: sub_title,
      admin: req.id,
      img: req.url,
    });

    res.json({ message: "Course created", course });
  } catch (err) {
    if (err) res.status(400).json({ error: err.message });
  }
}

async function getCourses(req, res) {
  const courses = await Course.find({ admin: req.id });

  res.json(courses);
}

module.exports = { createCourse, getCourses };
