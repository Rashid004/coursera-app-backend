const { Router } = require("express");

const userRouter = Router();

const { userModel } = require("../db");

userRouter.post("/signup", (req, res) => {
  res.json({ message: "signup endpoint" });
});

userRouter.post("/signin", (req, res) => {
  res.json({ message: "signin endpoint" });
});

userRouter.get("/purchases", (req, res) => {
  res.json({ message: "purchases endpoint" });
});

module.exports = {
  userRouter: userRouter,
};
