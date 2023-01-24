const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.model");

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

module.exports = { getProfileDetails };
