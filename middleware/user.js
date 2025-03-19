require("dotenv").config();
const jwt = require("jsonwebtoken");
const USER_SCRECT_KEY_JWT = process.env.USER_SECRET_KEY;
console.log(process.env.USER_SECRET_KEY);
console.log("JWT Secret Key:", USER_SCRECT_KEY_JWT);

const userMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decodedData = jwt.verify(token, USER_SCRECT_KEY_JWT);
    if (!decodedData || !decodedData.id) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.userId = decodedData.id;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  userMiddleware,
};
