// load env vars
if (process.env.NODE_ENV != "prod") {
  require("dotenv").config();
}

// dependencies
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const recordRouter = require("./routes/recordRouter");
const homeRouter = require("./routes/homeRouter");
const aboutRouter = require("./routes/aboutRouter");
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

// connect to db
connectDb();

// routing
app.use("/record", recordRouter);
app.use("/", homeRouter);
app.use("/about", aboutRouter);

// error middleware
app.use((err, req, res, next) => {
  console.log("app-level error middleware");
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});

// server
app.listen(process.env.PORT);
