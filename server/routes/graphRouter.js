const { Router } = require("express");
const graphController = require("../controllers/graphController");
const requireAuth = require("../middleware/requireAuth");

const graphRouter = Router();

// graphRouter.use(requireAuth);

graphRouter.post("/", graphController.sendData);

graphRouter.use((err, req, res, next) => {
  console.log("graph router error");
  console.log(err.stack);
  res.status(err.statusCode | 500).json({ err: err.message });
});

module.exports = graphRouter;
