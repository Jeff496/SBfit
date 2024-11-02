const { passport } = require("../config/passportConfig");
const asyncHandler = require("express-async-handler");

// do this somewhere
// attach id to request body so record.user_id is filled

const authenticateScope = asyncHandler((req, res) => {
  res.send("/auth/google");
  passport.authenticate("google", {
    scope: ["profile", "email"],
  });
});

const authenticateCallback = passport.authenticate("google", {
  failureRedirect: "/user/login",
  successRedirect: "/",
});

module.exports = { authenticateScope, authenticateCallback };
