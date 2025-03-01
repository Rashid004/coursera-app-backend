const { Router } = require("express");
const { z } = require("zod");
const userRouter = Router();

const { userModel } = require("../db");

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

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Credential is Incorrect" });
  }

  res.json({ message: "signup endpoint" });
});

userRouter.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.json({ message: "signin endpoint" });
});

userRouter.get("/purchases", (req, res) => {
  res.json({ message: "purchases endpoint" });
});

module.exports = {
  userRouter: userRouter,
};
