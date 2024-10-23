const { Router } = require("express");
const {
  authenticateScope,
  authenticateCallback,
} = require("../controllers/googleAuthController");
const googleAuthRouter = new Router();

googleAuthRouter.get("/auth/google", authenticateScope);
googleAuthRouter.get("/auth/google/callback", authenticateCallback);

googleAuthRouter.use((err, req, res, next) => {
  console.log("googleAuthRouter error: ", err);
});

module.exports = googleAuthRouter;
