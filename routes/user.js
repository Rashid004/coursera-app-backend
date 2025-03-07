const { Router } = require("express");
const { z } = require("zod");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel } = require("../db");
require("dotenv").config();

userRouter.post("/signup", async (req, res) => {
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

  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    res.json({ message: "Email is already in use" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(email, hashedPassword, firstName, lastName);

  try {
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Credential is Incorrect" });
  }

  res.json({ message: "signup Succeed" });
});

// Sign in routes
userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = userModel.findOne({ email: email });
  const passwordMatch = bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    const token = jwt.sign({ id: user._id }, process.env.SCRECT_KEY_JWT);
    res.json({ token });
  } else {
    res.status(403).json({ message: "Invalid Credential" });
  }

  res.json({ message: "signin endpoint" });
});

userRouter.get("/purchases", (req, res) => {
  res.json({ message: "purchases endpoint" });
});

module.exports = {
  userRouter: userRouter,
};
