const asyncHandler = require("express-async-handler");
const Record = require("../models/record");

const sendData = asyncHandler(async (req, res) => {
  const user_id = req.body.user_id;
  const records = await Record.find({ user_id });

  if (!records) {
    return res
      .status(404)
      .json({ message: "No workouts found for this user." });
  }

  const response = await fetch("http://127.0.0.1:5000/pythonAPI/graph", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(records),
  });

  if (!response.ok) {
    return res.status(response.status).json({ message: response.statusText });
  }

  const json = await response.json();

  res.json({ json });
});

module.exports = {
  sendData,
};
