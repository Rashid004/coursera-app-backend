const { Router } = require("express");
const adminRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");
const { ADMIN_SCRECT_KEY_JWT } = require("../config");

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
    res.json({
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
    res.status(403).json({ message: "Credential Incorrect" });
  }

  res.json({ message: "AdminSignup Succeed" });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email: email });

  const comparePassword = bcrypt.compare(password, admin.password);

  if (admin && comparePassword) {
    const token = jwt.sign({ id: admin._id }, ADMIN_SCRECT_KEY_JWT);

    res.json({ token: token });
  } else {
    res.status(403).json({ message: "Invalid Credential" });
  }

  res.json({ message: "Signin Succed" });
});
adminRouter.post("/", (req, res) => {
  res.json({ message: "course endpoint" });
});
adminRouter.put("/", (req, res) => {
  res.json({ message: "course endpoint" });
});
adminRouter.get("/bulk", (req, res) => {
  res.json({ message: "course endpoint" });
});

module.exports = {
  adminRouter: adminRouter,
};
