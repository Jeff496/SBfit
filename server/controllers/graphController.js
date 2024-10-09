const { asyncHandler } = require("express-async-handler");
const { Record } = require("../models/record");

const sendData = asyncHandler(async () => {
  const user_id = req.body.user_id;
  const records = await Record.find({ user_id });

  const response = fetch("pythonapi", records);

  res.json({ graph: response.data });
});

module.exports = {
  sendData,
};
