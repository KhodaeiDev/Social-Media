const express = require("express");
const controller = require("./page.controller");
const authMidlleware = require("../../middlewares/auth");
const accountVerify = require("../../middlewares/accountVerify");

const router = express.Router();

router.route("/:pageId").get(authMidlleware, controller.showProfileView);

module.exports = router;
