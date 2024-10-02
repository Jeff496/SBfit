const Record = require("../models/record");

// retrieves all records
const fetchRecords = async (req, res) => {
  const records = await Record.find();

  res.json({ records });
};

// retrieve a record by id
const fetchRecord = async (req, res) => {
  const recordId = req.params.id;
  const record = await Record.findById(recordId);

  res.json({ record });
};

// create a record
const createRecord = async (req, res) => {
  const { name, sets, reps } = req.body;
  const record = await Record.create({
    name,
    sets,
    reps,
  });

  res.json({ record });
};

// update a record
const updateRecord = async (req, res) => {
  const recordId = req.params.id;
  const { name, sets, reps } = req.body;
  await Record.findByIdAndUpdate(recordId, {
    name,
    sets,
    reps,
  });
  const record = await Record.findById(recordId);

  res.json({ record });
};

// delete a record
const deleteRecord = async (req, res) => {
  const recordId = req.params.id;
  await Record.deleteOne({ _id: recordId });

  res.json({ success: "successfully deleted" });
};

module.exports = {
  fetchRecords,
  fetchRecord,
  updateRecord,
  createRecord,
  deleteRecord,
};
