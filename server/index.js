const express = require("express");
const cors = require("cors");
const { AuthRouter } = require("./routes/auth/auth.route");
const { connectDb } = require("./utils/connectDb");
const { userRouter } = require("./routes/user/user.route");
const { CourseRouter } = require("./routes/course/course.route");
const { ActivityRouter } = require("./routes/activity/activity.route");
const { SubmitRouter } = require("./routes/submit/submit.route");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 9000;

connectDb();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serving images
app.use(express.static("public"));

// routes
app.use("/auth", AuthRouter);
app.use("/user", userRouter);
app.use("/course", CourseRouter);
app.use("/activity", ActivityRouter);
app.use("/submit", SubmitRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(PORT, () => {
  console.log(`server is ready at ${PORT}`);
});
