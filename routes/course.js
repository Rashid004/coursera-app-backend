const { Router } = require("express");

const courseRouter = Router();
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({ message: "You have successfully bought the course" });
});

courseRouter.get("/preview", async (req, res) => {
  const course = await courseModel.find({});

  res.json({ course });
});

module.exports = {
  courseRouter: courseRouter,
};
