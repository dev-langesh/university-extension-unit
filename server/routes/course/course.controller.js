const multer = require("multer");
const { Course } = require("../../models/course.model");

// GET /course
async function getCourses(req, res) {
  const courses = await Course.find({ admin: req.id });

  res.json(courses);
}

// POST /course
async function createCourse(req, res) {
  try {
    const { title, sub_title } = req.body;

    if (req.userType === "student") throw new Error("You are  not allowed");

    if (!req.file) throw new Error("Provide course image");

    const code = Math.floor(Math.random() * (10 ** 1 - 10 ** 9)) + 10 ** 9;

    const course = await Course.create({
      title: title,
      sub_title: sub_title,
      admin: req.id,
      img: req.url,
      code,
    });

    res.json({ message: "Course created", course });
  } catch (err) {
    if (err) res.status(400).json({ error: err.message });
  }
}

// DELETE /course/:id
async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Provide course id");
    }

    if (req.userType === "student") throw new Error("You are  not allowed");

    const course = await Course.findByIdAndDelete(id);

    res.json({ message: "course deleted", course });
  } catch (err) {
    if (err) res.status(400).json({ error: err.message });
  }
}

module.exports = { createCourse, getCourses, deleteCourse };
