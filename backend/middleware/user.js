const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyauth = (req, res, next) => {
  const token = req.cookies['active-cookie'];
  if (!token) {
    return res.status(401).send("Unauthorized! Token is missing.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid or expired token");
    }

    req.user = user; 
    next(); 
  });
};

module.exports = verifyauth; 
