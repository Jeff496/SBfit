const session = require("express-session");

const sessionConfig = session({
  secret: "temp",
  resave: false,
  saveUninitialized: true,
});

module.exports = sessionConfig;
