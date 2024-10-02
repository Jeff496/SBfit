const { Router } = require("express");
const homeRouter = Router();
const homeController = require("../controllers/homeController");

homeRouter.get("/", homeController.renderHome);

module.exports = homeRouter;
