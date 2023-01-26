const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "public", "work"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = file.originalname.split(".")[1];

    const fileName = `${uniqueSuffix}.${ext}`;

    req.url = `${process.env.DEPLOY_URL}/work/${fileName}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = { uploadWork: upload };
