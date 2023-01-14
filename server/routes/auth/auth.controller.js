const bcrypt = require("bcrypt");
const { User } = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../../lib/sendMail");

// POST /auth/register
async function register(req, res) {
  const body = req.body;

  if (!body.password || !body.email) {
    return res.json({ error: "Fill all the fields" });
  }

  try {
    const isUserExists = await User.findOne({ email: body.email });

    if (isUserExists) return res.json({ error: "User already exists" });

    const hashedPass = await bcrypt.hash(body.password, 16);

    body.password = hashedPass;

    const code = Math.floor(Math.random() * 10000);

    body.code = code;

    const user = await User.create(body);

    return res.json({ message: "User registered" });
  } catch (err) {
    if (err)
      return res.json({ error: "Invalid credentials", stack: err.stack });
  }
}

// POST /auth/login
async function login(req, res) {
  const body = req.body;

  if (!body.password || !body.email) {
    return res.json({ error: "Fill all the fields" });
  }

  try {
    const user = await User.findOne({ email: body.email });

    if (!user) return res.json({ error: "User doesn't exists" });

    const correctPassword = await bcrypt.compare(body.password, user.password);

    if (!correctPassword) {
      throw new Error("");
    }

    const token = jwt.sign(
      { id: user._id, role: user.userType },
      process.env.JWT_SECRET
    );

    return res.json({
      message: "login success",
      token,
      userType: user.userType,
    });
  } catch (err) {
    if (err)
      return res.json({ error: "Invalid credentials", stack: err.stack });
  }

  res.send("login");
}

// PUT /auth/send-code
async function sendCode(req, res) {
  try {
    const email = req.body.email;

    if (!email) {
      throw new Error("Email is required");
    }

    const code = Math.floor(Math.random() * 10000);

    const user = await User.findOneAndUpdate({ email }, { $set: { code } });

    if (!user) {
      throw new Error("Invalid email");
    }

    await sendMail({
      to: email,
      subject: "Password reset OTP",
      text: `Your confirmation code is ${code}`,
    });

    return res.json({ message: "Code sent successfully" });
  } catch (err) {
    return res.json({ error: err.message, stack: err.stack });
  }
}

// PUT /auth/change-password
async function changePassword(req, res) {
  try {
    const code = req.body.code;
    const password = req.body.password;
    const email = req.body.email;

    if (!code || !password || !email) {
      throw new Error("Fill all the fields");
    }

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      throw new Error("Invalid email");
    }

    if (user.code != code) {
      throw new Error("Invalid code");
    }

    const hashedPass = await bcrypt.hash(password, 16);

    await User.findOneAndUpdate({ email }, { $set: { password: hashedPass } });

    const token = jwt.sign(
      { id: user._id, role: user.userType },
      process.env.JWT_SECRET
    );

    return res.json({
      message: "Password changed",
      token,
      userType: user.userType,
    });
  } catch (err) {
    return res.json({ error: err.message, stack: err.stack });
  }
}

// PUT /auth/verify-code
async function verifyCode(req, res) {
  try {
    const code = req.body.code;
    const email = req.body.email;

    if (!code || !email) {
      throw new Error("Fill all the fields");
    }

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      throw new Error("Invalid email");
    }

    if (user.code != code) {
      throw new Error("Invalid code");
    }

    const token = jwt.sign(
      { id: user._id, role: user.userType },
      process.env.JWT_SECRET
    );

    return res.json({
      message: "Code Verified",
      token,
      userType: user.userType,
    });
  } catch (err) {
    return res.json({ error: err.message, stack: err.stack });
  }
}

module.exports = { register, login, changePassword, sendCode, verifyCode };
