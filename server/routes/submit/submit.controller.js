const { format } = require("date-fns");
const { Activity } = require("../../models/activity.model");
const { Submit } = require("../../models/submitions.model");
const { User } = require("../../models/user.model");

// GET /submit/?student_id=""&activity_id=""
async function getSubmittedWork(req, res) {
  try {
    const student_id = req.query.student_id;
    const activity_id = req.query.activity_id;

    const work = await Submit.findOne({ student_id, activity_id });

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
    const status = "completed";

    const data = {
      activity_id,
      student_id,
      url,
      submitted_at,
      status,
      comment,
      file_name: req.file.originalname,
    };

    const work = await Submit.findOne({ student_id, activity_id });

    if (work) {
      throw new Error("Already submitted");
    }

    const submission = await Submit.create(data);

    await Activity.updateOne(
      {
        _id: activity_id,
        "students.student_id": student_id,
      },
      {
        $set: {
          "students.$.status": "completed",
        },
      }
    );

    res.json({ message: "Marked as completed", submission });
  } catch (err) {
    console.log(err);
    if (err) res.json({ error: "Something went wrong" });
  }
}

// PUT /submit/?student_id=""&activity_id=""
async function provideMarks(req, res) {
  try {
    const { student_id, activity_id, marks, remarks } = req.query;

    const work = await Submit.findOneAndUpdate(
      { student_id, activity_id },
      { $set: { score: marks, remarks, reviewed: true } }
    );

    console.log(work);

    if (!work) {
      throw new Error("Record not found");
    }

    return res.json({ work });
  } catch (err) {
    if (err) res.json({ error: err });
  }
}

module.exports = { submitWork, getSubmittedWork, provideMarks };
