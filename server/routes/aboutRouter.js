const { Router } = require("express");
const aboutRouter = Router();
const aboutController = require("../controllers/aboutController");

aboutRouter.use((req, res, next) => {
  console.log("router-level middleware, passed through about route");
  next();
});

aboutRouter.get("/", aboutController.renderAbout);

module.exports = aboutRouter;
