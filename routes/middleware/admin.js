const jwt = require("jsonwebtoken");
const { ADMIN_SCRECT_KEY_JWT } = require("../../config");

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, ADMIN_SCRECT_KEY_JWT);

  if (decodedData) {
    req.adminId = decodedData.adminId;
    next();
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};
