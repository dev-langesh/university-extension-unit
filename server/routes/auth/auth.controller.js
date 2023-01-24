const bcrypt = require("bcrypt");
const { User } = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../../lib/sendMail");
const { adminData } = require("../../data/adminData");

// POST /auth/register
async function register(req, res) {
  const body = req.body;

  if (!body.password || !body.email) {
    return res.json({ error: "Rellena todos los campos" });
  }

  try {
    const isUserExists = await User.findOne({ email: body.email });

    if (isUserExists) return res.json({ error: "El usuario ya existe" });

    const hashedPass = await bcrypt.hash(body.password, 16);

    body.password = hashedPass;

    const code = Math.floor(Math.random() * 10000);

    body.code = code;

    const user = await User.create(body);

    const token = jwt.sign(
      { id: user._id, role: user.userType },
      process.env.JWT_SECRET
    );

    return res.json({ message: "User registered", token });
  } catch (err) {
    if (err)
      return res.json({ error: "Credenciales no válidas", stack: err.stack });
  }
}

// POST /auth/login
async function login(req, res) {
  const body = req.body;

  if (!body.password || !body.email) {
    return res.json({ error: "Rellena todos los campos" });
  }

  try {
    const user = await User.findOne({ email: body.email });

    if (!user) return res.json({ error: "El usuario no existe" });

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
      return res.json({ error: "Credenciales no válidas", stack: err.stack });
  }

  res.send("login");
}

// PUT /auth/send-code
async function sendCode(req, res) {
  try {
    const email = req.body.email;

    if (!email) {
      throw new Error("correo electronico es requerido");
    }

    const code = Math.floor(Math.random() * 10000);

    const user = await User.findOneAndUpdate({ email }, { $set: { code } });

    if (!user) {
      throw new Error("Email inválido");
    }

    await sendMail({
      to: email,
      subject: "Restablecimiento de contraseña OTP",
      text: `Su código de confirmación es ${code}`,
    });

    return res.json({ message: "Código enviado con éxito" });
  } catch (err) {
    return res.json({ error: err.message, stack: err.stack });
  }
}

// PUT /auth/change-password
async function changePassword(req, res) {
  try {
    const code = req.body.code.trim();
    const password = req.body.password;
    const email = req.body.email;

    if (!code || !password || !email) {
      throw new Error("Rellena todos los campos");
    }

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      throw new Error("Email inválido");
    }

    if (user.code != code) {
      throw new Error("Codigo invalido");
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
      throw new Error("Rellena todos los campos");
    }

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      throw new Error("Email inválido");
    }

    if (user.code != code) {
      throw new Error("Codigo invalido");
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
