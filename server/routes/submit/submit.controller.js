const { format } = require("date-fns");
const { Submit } = require("../../models/submitions.model");

// POST /submit
async function submitWork(req, res) {
  try {
    const { activity_id } = req.body;
    const student_id = req.id;
    const url = req.file;
    const submitted_at = format(new Date(), "yyyy-MM-dd");
    const status = "completed";

    const data = {
      activity_id,
      student_id,
      url,
      submitted_at,
      status,
    };

    const submission = await Submit.create(data);

    res.json({ message: "Marked as completed", submission });
  } catch (err) {
    console.log(err);
    if (err) res.status(400).json({ error: "Something went wrong" });
  }
}

module.exports = { submitWork };
