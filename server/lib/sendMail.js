const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function sendMail({ to, subject, text }) {
  var mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  const promise = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject("Can't send mail");
      } else {
        console.log("Email Sent: " + info.response);
        resolve("Email Sent");
      }
    });
  });

  return promise;
}

module.exports = { sendMail };
