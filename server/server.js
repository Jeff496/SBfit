// load env vars
if (process.env.NODE_ENV != "prod") {
  require("dotenv").config();
}

// dependencies
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const recordRouter = require("./routes/recordRouter");

// initialize express app
const app = express();

// express config
app.use(express.json());

// connect to db
connectDb();

// routing
app.use("/record", recordRouter);

// error middleware

app.use((err, req, res, next) => {
  console.log("app-level error middleware");
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});

// server
app.listen(process.env.PORT);
