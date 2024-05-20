const express = require("express");
const controller = require("./home.controller");
const authMidlleware = require("./../../middlewares/auth");

const router = express.Router();

router.route("/").get(authMidlleware, controller.showHomeViews);

module.exports = router;
