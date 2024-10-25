// load env vars
if (process.env.NODE_ENV != "prod") {
  require("dotenv").config();
}

// dependencies
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const sessionConfig = require("./config/sessionConfig");
const { passportConfig } = require("./config/passportConfig");
const recordRouter = require("./routes/recordRouter");
const userRouter = require("./routes/userRouter");
const graphRouter = require("./routes/graphRouter");
const googleAuthRouter = require("./routes/googleAuthRouter");

// initialize express app
const app = express();

// express config
app.use(express.json());
app.use(cors()); // all origins for testing, fix for prod

// other configs
app.use(sessionConfig);
app.use(...passportConfig);

// routing
app.use("/record", recordRouter);
app.use("/user", userRouter);
app.use("/userAnalytics", graphRouter);
app.use("/", googleAuthRouter);

// error middleware
app.use((err, req, res, next) => {
  console.log("app-level error middleware");
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});

// connect to db and listen for requests
try {
  connectDb();
  app.listen(process.env.PORT);
} catch (error) {
  console.log(error);
}
