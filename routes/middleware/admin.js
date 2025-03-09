require("dotenv").config();
const jwt = require("jsonwebtoken");
const ADMIN_SCRECT_KEY_JWT = process.env.ADMIN_SECRET_KEY;
console.log(process.env.ADMIN_SECRET_KEY);

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, ADMIN_SCRECT_KEY_JWT);

  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  adminMiddleware,
};
