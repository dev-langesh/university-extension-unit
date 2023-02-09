const { Activity } = require("../../models/activity.model");
const { Course } = require("../../models/course.model");

// POST /activity
async function createActivity(req, res) {
  try {
    const { title, due_date, course_id } = req.body;

    console.log(req.file);

    if (!course_id) throw new Error("Proporcione la identificación del curso");

    const course = await Course.findById(course_id);

    if (!course) throw new Error("ID de curso no válido");

    const admin_id = req.id;

    if (req.userType === "student") throw new Error("No se te permite");

    const activity = await Activity.create({
      course_id,
      admin_id,
      title,
      due_date,
      students: course.students,
      material: req.url,
      material_name: req.file.originalname,
    });

    res.json({ message: "Activity created", activity });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

// GET /activity
async function getActivities(req, res) {
  try {
    const course_id = String(req.query.course_id);

    const activities = await Activity.find({ course_id });

    res.json({ activities });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

// GET /activity/:id
async function getActivity(req, res) {
  try {
    const activity_id = req.params.id;

    const activities = await Activity.findById(activity_id);

    res.json({ activities });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

// DELETE /activity/:id
async function deleteActivity(req, res) {
  try {
    const activity_id = req.params.id;

    const activities = await Activity.findByIdAndDelete(activity_id);

    res.json({ message: "activity deleted", activities });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

// GET /activity/:id/status
async function getStatus(req, res) {
  try {
    const activity_id = req.params.id;

    const data = await Activity.findById(activity_id);

    if (!data) {
      throw new Error("Registro no encontrado");
    }

    const students = data.students;

    console.log(students);

    const completed = students.filter((student) => {
      return student.status === "completed";
    });

    const pending = students.filter((student) => {
      return student.status === "pending";
    });

    res.json({ completed, pending });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

module.exports = {
  createActivity,
  getActivities,
  deleteActivity,
  getStatus,
  getActivity,
};
