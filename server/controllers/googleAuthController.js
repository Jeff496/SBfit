const { passport } = require("../config/passportConfig");

// do this somewhere
// attach id to request body so record.user_id is filled

const authenticateScope = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const authenticateCallback = passport.authenticate("google", {
  failureRedirect: "/user/login",
  successRedirect: "/",
});

module.exports = { authenticateScope, authenticateCallback };
