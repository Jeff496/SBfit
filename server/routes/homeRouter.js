const { Router } = require("express");
const homeRouter = Router();
const homeController = require("../controllers/homeController");

homeRouter.use((req, res, next) => {
  console.log("router-level middleware, passed through home route");
  next();
});

homeRouter.get("/", homeController.renderHome);

module.exports = homeRouter;
