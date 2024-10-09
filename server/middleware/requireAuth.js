const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ err: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const returnedToken = jwt.verify(token, process.env.SECRET); // can destructure for id
    const id = returnedToken.id;
    req.body.user_id = await User.findOne({ _id: id }).select("_id"); // gives an object that holds _id
    req.body.user_id = req.body.user_id._id.toString(); // get ._id from object and turn to string
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: err.message });
  }
};

module.exports = requireAuth;
