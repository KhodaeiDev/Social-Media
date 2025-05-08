const express = require("express");
const controller = require("./page.controller");
const authMidlleware = require("../../middlewares/auth");

const router = express.Router();

router.route("/:pageId").get(authMidlleware, controller.showProfileView);
router.route("/:pageId/follow").post(authMidlleware, controller.follow);
router.route("/:pageId/unfollow").post(authMidlleware, controller.unfollow);

module.exports = router;
