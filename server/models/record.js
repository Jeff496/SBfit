const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: Number,
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
