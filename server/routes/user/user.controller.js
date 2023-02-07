const jwt = require("jsonwebtoken");
const xl = require("excel4node");
const fs = require("node:fs");
const { User } = require("../../models/user.model");
const { Course } = require("../../models/course.model");
const path = require("node:path");

async function getProfileDetails(req, res) {
  try {
    if (!req.body.token) {
      throw new Error("Falta la ficha");
    }

    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Simbolo no valido");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    res.json({
      username: user.username,
      email: user.email,
      userType: user.userType,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
}

// GET /user/student-details
async function getDetailsInExcel(req, res) {
  const { course_id } = req.params;

  const course = await Course.findById(course_id);

  // Create a new instance of a Workbook class
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet("Sheet 1");

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      color: "#FF0800",
      size: 12,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  const participants = course.students;

  const studentDetails = await User.find({
    email: { $in: participants.map((p) => p.email) },
  }).select("-password");

  const columns = [
    "Nombre",
    "Apellido",
    "Cedula",
    "Email",
    "Telefono",
    "Carrera",
    "Semestre",
  ];

  columns.forEach((val, i) => {
    ws.cell(1, i + 1)
      .string(val)
      .style(style);
  });

  studentDetails.forEach((student, r_no) => {
    const studentCol = [];
    studentCol.push(
      student.username,
      student.surname,
      student.student_id,
      student.email,
      student.phone,
      student.career,
      student.career
    );

    let c_no = 1;

    studentCol.forEach((val) => {
      if (typeof val === "number") {
        ws.cell(r_no + 2, c_no).number(val);
      } else {
        ws.cell(r_no + 2, c_no).string(val);
      }
      c_no++;
    });
  });

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "studentDetails",
    `${course.title}.xlsx`
  );

  const isExists = fs.existsSync(filePath);

  if (isExists) {
    fs.rmSync(filePath);
  }

  wb.write(filePath);

  res.json({ success: "true", filename: `${course.title}.xlsx` });
}

module.exports = { getProfileDetails, getDetailsInExcel };
