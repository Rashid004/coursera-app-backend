const { Router } = require("express");
const adminRouter = Router();

const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("./middleware/admin");

const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ADMIN_SCRECT_KEY_JWT = process.env.ADMIN_SECRET_KEY;
console.log(process.env.ADMIN_SECRET_KEY);

adminRouter.post("/signup", async (req, res) => {
  const requireBody = z.object({
    email: z.string().min(3).max(100).regex(/[@]/).email(),
    password: z
      .string()
      .min(6)
      .max(30)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/[0-9]/)
      .regex(/[^a-zA-Z0-9]/),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  });

  const pasrsedBodyWithSuccess = requireBody.safeParse(req.body);

  if (!pasrsedBodyWithSuccess.success) {
    return res.json({
      message: pasrsedBodyWithSuccess.success,
      error: pasrsedBodyWithSuccess.error,
    });
  }

  const { email, password, firstName, lastName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Credential Incorrect" });
  }

  res.json({ message: "AdminSignup Succeed" });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email: email });

  const comparePassword = bcrypt.compare(password, admin.password);

  if (admin && comparePassword) {
    const token = jwt.sign({ id: admin._id }, ADMIN_SCRECT_KEY_JWT);
    return res.json({ token: token });
  } else {
    return res.status(403).json({ message: "Invalid Credential" });
  }

  res.json({ message: "Signin Succed" });
});
// Create Course
adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;
  try {
    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    });

    return res.json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Credential Invalid" });
  }
});

// Update an Course content
adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, price, imageUrl, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
      creatorId: adminId,
    }
  );
  res.json({ message: "Course updated", courseId: course._id });
});

// Get All Course
adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const course = await courseModel.find({
    creatorId: adminId,
  });
  res.json({ course: course });
});

module.exports = {
  adminRouter: adminRouter,
};
