const { Router } = require("express");
const recordController = require("../controllers/recordController");
const requireAuth = require("../middleware/requireAuth");

const recordRouter = Router();

// middleware to protect routes from unauthorized users
recordRouter.use(requireAuth);

// all route must be on top, otherwise all gets interpreted as a bad id
recordRouter.get("/all", recordController.fetchRecords);
recordRouter.get("/:id", recordController.fetchRecord);
recordRouter.patch("/:id", recordController.updateRecord);
recordRouter.delete("/:id", recordController.deleteRecord);
recordRouter.post("/", recordController.createRecord);

// error handling middleware
// replaces all the throw errors in controller of not found, etc.
// bad id errors still handled by controllers
recordRouter.use((err, req, res, next) => {
  console.log("record router error");
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ err: err.message });
});

// implement later for client-side hydration?
// recordRouter.get("/", recordController.renderRecord);

module.exports = recordRouter;
