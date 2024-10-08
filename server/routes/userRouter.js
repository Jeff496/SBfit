const { Router } = require("express");
const { loginUser, signupUser } = require("../controllers/userController");
const userRouter = new Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);

userRouter.use((err, req, res, next) => {
  console.log("user router error");
  console.log(err.stack);
  res.status(err.statusCode || 500).json({ err: err.message });
});

module.exports = userRouter;
