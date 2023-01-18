const { format } = require("date-fns");
const { Submit } = require("../../models/submitions.model");

// GET /submit/
async function getSubmittedWork(req, res) {
  try {
    const student_id = req.id;

    const work = await Submit.findOne({ student_id });

    if (!work) {
      throw new Error("Record not found");
    }

    return res.json({ work });
  } catch (err) {
    if (err) res.json({ error: err });
  }
}

// POST /submit
async function submitWork(req, res) {
  try {
    const { activity_id, comment } = req.body;
    const student_id = req.id;
    const url = req.url;
    const submitted_at = format(new Date(), "yyyy-MM-dd");
    const status = "Completed";

    console.log(req.file);

    const data = {
      activity_id,
      student_id,
      url,
      submitted_at,
      status,
      comment,
      file_name: req.file.originalname,
    };

    const work = await Submit.findOne({ student_id });

    if (work) {
      throw new Error("Already submitted");
    }

    const submission = await Submit.create(data);

    console.log(submission);

    res.json({ message: "Marked as completed", submission });
  } catch (err) {
    console.log(err);
    if (err) res.json({ error: "Something went wrong" });
  }
}

module.exports = { submitWork, getSubmittedWork };
