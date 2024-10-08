const User = require("../models/user");

const loginUser = async (req, res) => {
  res.json({ mssg: "user login" });
};

const signupUser = async (req, res) => {
  res.json({ mssg: "user signup" });
};

module.exports = { loginUser, signupUser };
