const express = require("express");
const controller = require("./post.controller");
const authMidlleware = require("./../../middlewares/auth");
const accountVerify = require("./../../middlewares/accountVerify");
const { multerStorage } = require("../../middlewares/uploader");

const upload = multerStorage(
  "public/images/posts",
  /jpg|png|jpeg|webp|mp4|mvk/
);

const router = express.Router();

router
  .route("/")
  .get(authMidlleware, accountVerify, controller.showPostUploaderViews)
  .post(authMidlleware, upload.single("media"), controller.createPost);

module.exports = router;
