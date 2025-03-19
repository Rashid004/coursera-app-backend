const { Router } = require("express");

const courseRouter = Router();
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase/:courseId", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).json({ message: "Course id is required" });
    }
    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    await purchaseModel.create({
      userId,
      courseId,
    });

    res.json({ message: "You have successfully bought the course" });
  } catch (error) {
    console.error("Error purchasing course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

courseRouter.get("/preview", async (req, res) => {
  try {
    console.log("Fetching courses...");
    const course = await courseModel.find({});
    console.log("Courses fetched:", course);
    return res.json({ course });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  courseRouter: courseRouter,
};
