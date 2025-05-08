const express = require("express");
const controller = require("./post.controller");
const authMidlleware = require("./../../middlewares/auth");

const { multerStorage } = require("../../middlewares/uploader");

const upload = multerStorage(
  "public/images/posts",
  /jpg|png|jpeg|webp|mp4|mvk/
);

const router = express.Router();

router
  .route("/")
  .get(authMidlleware, controller.showPostUploaderViews)
  .post(authMidlleware, upload.single("media"), controller.createPost);

router.route("/like").post(authMidlleware, controller.likePost);
router.route("/dislike").post(authMidlleware, controller.disLikePost);

router.route("/save").post(authMidlleware, controller.save);
router.route("/unsave").post(authMidlleware, controller.unSave);

router.route("/saves").get(authMidlleware, controller.showSaveViews);

router.route("/:postId/remove").post(authMidlleware, controller.removePost);

router.route("/new-comment").post(authMidlleware, controller.newComment);

module.exports = router;
