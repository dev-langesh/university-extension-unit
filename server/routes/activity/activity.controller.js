const { Activity } = require("../../models/activity.model");
const { Course } = require("../../models/course.model");

// POST /activity
async function createActivity(req, res) {
  try {
    const { title, due_date, course_id } = req.body;

    if (!course_id) throw new Error("Provide course id");

    const course = await Course.findById(course_id);

    if (!course) throw new Error("Invalid course id");

    const admin_id = req.id;

    if (req.userType === "student") throw new Error("You are not allowed");

    const activity = await Activity.create({
      course_id,
      admin_id,
      title,
      due_date,
    });

    res.json({ message: "Activity created", activity });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

// GET /activity
async function getActivities(req, res) {
  const course_id = String(req.query.course_id);

  const activities = await Activity.find({ course_id });

  res.json({ activities });
}

module.exports = { createActivity, getActivities };
