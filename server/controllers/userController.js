const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  const token = createToken(user._id);

  res.status(200).json({ email, token });
});

const signupUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.signup(email, password);

  const token = createToken(user._id);

  res.status(200).json({ email, token });
});

module.exports = { loginUser, signupUser };
