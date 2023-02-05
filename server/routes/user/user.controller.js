const jwt = require("jsonwebtoken");
const xl = require("excel4node");
const fs = require("node:fs");
const { User } = require("../../models/user.model");
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

async function getDetailsInExcel(req, res) {
  // Create a new instance of a Workbook class
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet("Sheet 1");
  var ws2 = wb.addWorksheet("Sheet 2");

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      color: "#FF0800",
      size: 12,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  const studentDetails = await User.find({ userType: "student" });

  const columns = ["Name", "ID", "Email"];

  columns.forEach((val, i) => {
    ws.cell(1, i + 1)
      .string(val)
      .style(style);
  });

  studentDetails.forEach((student, r_no) => {
    const studentCol = [];
    studentCol.push(
      student.username,
      student.student_id,
      student.email,
      student.career
    );

    let c_no = 1;

    studentCol.forEach((val) => {
      ws.cell(r_no + 2, c_no).string(val);
      c_no++;
    });
  });

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "studentDetails",
    "student-details.xlsx"
  );

  const isExists = fs.existsSync(filePath);

  if (isExists) {
    fs.rmSync(filePath);
  }

  wb.write(filePath);

  res.json({ success: "true" });
}

module.exports = { getProfileDetails, getDetailsInExcel };
