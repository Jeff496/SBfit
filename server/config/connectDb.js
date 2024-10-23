if (process.env.NODE_ENV != "prod") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectDb() {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDb;
