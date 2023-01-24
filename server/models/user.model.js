const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    phone: { type: Number, requried: true, unique: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    code: Number,
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    collection: "User",
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
