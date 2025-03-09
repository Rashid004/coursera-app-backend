require("dotenv").config();
const jwt = require("jsonwebtoken");
const USER_SCRECT_KEY_JWT = process.env.USER_SECRET_KEY;
console.log(process.env.USER_SECRET_KEY);

const userMiddleware = (req, res, next) => {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, USER_SCRECT_KEY_JWT);

  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  userMiddleware,
};
