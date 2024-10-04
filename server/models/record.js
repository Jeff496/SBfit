const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
