const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.model");

async function getProfileDetails(req, res) {
  try {
    if (!req.body.token) {
      throw new Error("token is missing");
    }

    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
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
