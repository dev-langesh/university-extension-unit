const jwt = require("jsonwebtoken");

function decodeToken(req, res, next) {
  try {
    const bearerToken =
      req.headers["authorization"] || req.headers["Authorization"];

    const token = bearerToken.split(" ")[1];

    if (!token) {
      return res.status(400).json({ error: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.id;
    req.userType = decoded.role;
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }

  next();
}

module.exports = { decodeToken };
