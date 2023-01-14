const jwt = require("jsonwebtoken");

function decodeToken(req, res, next) {
  const token = req.body.token;

  console.log(token);

  if (!token) {
    return res.status(400).json({ error: "Token is missing" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(400).json({ error: "Invalid token" });
  }

  req.user = decoded.id;
  req.userType = decoded.role;

  next();
}

module.exports = { decodeToken };
