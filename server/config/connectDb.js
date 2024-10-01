// load env vars
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected");
  } catch (err) {
    console.log("error: ", err);
  }
}

module.exports = connectDb;
