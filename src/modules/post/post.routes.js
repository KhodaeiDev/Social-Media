const express = require("express");
const controller = require("./post.controller");

const router = express.Router();

router
  .route("/")
  .get(controller.showPostUploaderViews)
  .post(controller.createPost);

module.exports = router;
