const { Router } = require("express");
const recordController = require("../controllers/recordController");
const recordRouter = Router();

recordRouter.use((res, req, next) => {
  // console.log("router-level middleware, passed through record route");
  next();
});

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
