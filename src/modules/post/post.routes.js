const express = require("express");
const controller = require("./post.controller");
const authMidlleware = require("./../../middlewares/auth");
const accountVerify = require("./../../middlewares/accountVerify");

const router = express.Router();

router
  .route("/")
  .get(authMidlleware, accountVerify, controller.showPostUploaderViews)
  .post(authMidlleware, controller.createPost);

module.exports = router;
