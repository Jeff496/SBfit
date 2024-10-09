const asyncHandler = require("express-async-handler");
const Record = require("../models/record");
const mongoose = require("mongoose");

// render record page

// const renderRecord = (req, res) => {
//   res.render("record", { title: "record" });
// };

// retrieves all records
const fetchRecords = asyncHandler(async (req, res) => {
  const user_id = req.body.user_id;
  const records = await Record.find({ user_id });

  res.json({ records });
});

// retrieve a record by id
const fetchRecord = asyncHandler(async (req, res) => {
  const recordId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(recordId)) {
    throw new notFoundError("Bad id");
  }

  const record = await Record.findById(recordId);

  res.json({ record });
});

// create a record
const createRecord = asyncHandler(async (req, res) => {
  const { title, sets, reps, weight, user_id } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!weight) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const record = await Record.create({
    title,
    sets,
    reps,
    weight,
    user_id,
  });

  res.json({ record });
});

// update a record
const updateRecord = asyncHandler(async (req, res) => {
  const recordId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(recordId)) {
    throw new notFoundError("Bad id");
  }

  const { title, sets, reps } = req.body;
  const updated = await Record.findByIdAndUpdate(recordId, {
    ...req.body,
  });

  // to show updated record as a json
  const update = await Record.findById(recordId);

  res.json({ update });
});

// delete a record
const deleteRecord = asyncHandler(async (req, res) => {
  const recordId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(recordId)) {
    throw new notFoundError("Bad id");
  }

  const deleted = await Record.findByIdAndDelete({ _id: recordId });

  res.json({ deleted });
});

module.exports = {
  renderRecord,
  fetchRecords,
  fetchRecord,
  updateRecord,
  createRecord,
  deleteRecord,
};
