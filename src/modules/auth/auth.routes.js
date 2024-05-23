const express = require("express");
const controller = require("./auth.controller");

const router = express.Router();

router
  .route("/register")
  .get(controller.showRegisterViews)
  .post(controller.register);
router.route("/login").get(controller.showLoginViews).post(controller.login);

router.route("/refresh", controller.refreshToken);

module.exports = router;
