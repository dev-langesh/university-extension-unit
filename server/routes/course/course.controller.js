const multer = require("multer");
const { Course } = require("../../models/course.model");
const { User } = require("../../models/user.model");

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

// POST /course/register
async function registerInCourse(req, res) {
  try {
    const student_id = req.id;
    const { course_code } = req.body;
    console.log(req.body);

    const course = await Course.findOne({ code: course_code });
    console.log(course);

    if (!course) {
      throw new Error("Course Not Found");
    }

    const course_id = course._id;

    const student = await User.findById(student_id);

    if (!student) {
      throw new Error("Student not found");
    }

    course.students.forEach((std) => {
      if (std.email === student.email) {
        throw new Error("Already Registered");
      }
    });

    await User.findByIdAndUpdate(student_id, {
      $push: { courses: [course_id] },
    });
    await Course.findByIdAndUpdate(course_id, {
      $push: { students: [{ student_id: student._id, email: student.email }] },
    });

    res.json({ message: "Registration success" });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

// GET /course/get-registered
async function getRegisteredCourses(req, res) {
  try {
    const user = await User.findById(req.id);

    const regCourses = user.courses;

    const courses = await Course.find({ _id: { $in: regCourses } });

    res.json(courses);
  } catch (err) {
    if (err) res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createCourse,
  getCourses,
  deleteCourse,
  registerInCourse,
  getRegisteredCourses,
};
