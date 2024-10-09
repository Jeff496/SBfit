// load env vars
if (process.env.NODE_ENV != "prod") {
  require("dotenv").config();
}

// dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const recordRouter = require("./routes/recordRouter");
const userRouter = require("./routes/userRouter");
const graphRouter = require("./routes/graphRouter");
const path = require("node:path");
const assetPath = path.join(__dirname, "public");

// initialize express app
const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetPath));

// express config
app.use(express.json());
app.use(cors()); // all origins for testing, fix for prod

// routing
app.use("/record", recordRouter);
app.use("/user", userRouter);
app.use("/graph", graphRouter);

// error middleware
app.use((err, req, res, next) => {
  console.log("app-level error middleware");
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});

// connect to db and listen for requests
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("connected to db");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
