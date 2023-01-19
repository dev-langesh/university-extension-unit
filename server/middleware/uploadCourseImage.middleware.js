const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "images", "course"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = file.originalname.split(".")[1];

    const fileName = `${uniqueSuffix}.${ext}`;

    req.url = `http://localhost:8000/images/course/${fileName}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = { uploadCourseImage: upload };
