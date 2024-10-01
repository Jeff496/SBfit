// load env vars
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// dependencies
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const recordController = require("./controllers/recordController");

// initialize express app
const app = express();

// express config
app.use(express.json());

// connect to db
connectDb();

// routing
app.get("/record", recordController.fetchRecords);
app.get("/record/:id", recordController.fetchRecord);
app.post("/record", recordController.makeRecord);
app.put("/record/:id", recordController.updateRecord);
app.delete("/record/:id", recordController.deleteRecord);

// server
app.listen(process.env.PORT);
