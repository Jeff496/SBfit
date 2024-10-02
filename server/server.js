// load env vars
if (process.env.NODE_ENV != "production") {
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

// server
app.listen(process.env.PORT);
