const asyncHandler = require("express-async-handler");

const sendData = asyncHandler(async (req, res) => {
  const records = req.body;

  if (!records || records.length === 0) {
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

  // retrieve data as binary data
  const arrayBuffer = await response.arrayBuffer();
  // buffer object
  const imageBuffer = Buffer.from(arrayBuffer);

  res.set("Content-Type", "image/png").send(imageBuffer);
});

module.exports = {
  sendData,
};
