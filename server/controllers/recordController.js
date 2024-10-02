const asyncHandler = require("express-async-handler");
const Record = require("../models/record");
const notFoundError = require("../errors/errors.js");

// render record page

const renderRecord = (req, res) => {
  res.render("record", { title: "record" });
};

// retrieves all records
const fetchRecords = asyncHandler(async (req, res) => {
  const records = await Record.find();

  res.json({ records });
});

// retrieve a record by id
const fetchRecord = asyncHandler(async (req, res) => {
  const recordId = req.params.id;
  const record = await Record.findById(recordId);

  if (!record) {
    throw new notFoundError("Record to retrieve not found");
  }

  res.json({ record });
});

// create a record
const createRecord = asyncHandler(async (req, res) => {
  const { name, sets, reps } = req.body;
  const record = await Record.create({
    name,
    sets,
    reps,
  });

  res.json({ record });
});

// update a record
const updateRecord = asyncHandler(async (req, res) => {
  const recordId = req.params.id;
  const { name, sets, reps } = req.body;
  const updated = await Record.findByIdAndUpdate(recordId, {
    name,
    sets,
    reps,
  });

  if (!updated) {
    throw new notFoundError("Record to update not found");
  }

  // to show updated record as a json
  const record = await Record.findById(recordId);

  res.json({ record });
});

// delete a record
const deleteRecord = asyncHandler(async (req, res) => {
  const recordId = req.params.id;
  const deleted = await Record.findByIdAndDelete({ _id: recordId });

  if (!deleted) {
    throw new notFoundError("Record to delete not found");
  }

  res.json({ success: "successfully deleted" });
});

module.exports = {
  renderRecord,
  fetchRecords,
  fetchRecord,
  updateRecord,
  createRecord,
  deleteRecord,
};
