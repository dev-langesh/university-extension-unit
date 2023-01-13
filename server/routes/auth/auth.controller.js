const bcrypt = require("bcrypt");
const { User } = require("../../models/user.model");
const jwt = require("jsonwebtoken");

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

    const user = await User.create(body);

    const token = jwt.sign(
      { id: user._id, role: body.userType },
      process.env.JWT_SECRET
    );

    return res.json({ message: "User registered", token });
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
      { id: user._id, role: body.userType },
      process.env.JWT_SECRET
    );

    return res.json({
      message: "login success",
      token,
      userType: body.userType,
    });
  } catch (err) {
    if (err)
      return res.json({ error: "Invalid credentials", stack: err.stack });
  }

  res.send("login");
}

module.exports = { register, login };
