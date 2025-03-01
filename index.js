require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

console.log(process.env.DB_URL);
console.log(process.env.PORT);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
