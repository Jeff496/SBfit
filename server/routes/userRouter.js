const { Router } = require("express");
const { loginUser, signupUser } = require("../controllers/userController");
const userRouter = new Router();

userRouter.post("/login", loginUser);

userRouter.post("/signuup", signupUser);

module.exports = userRouter;
