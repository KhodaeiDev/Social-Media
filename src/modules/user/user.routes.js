const express = require("express");
const controller = require("./user.controller");
const auth = require("./../../middlewares/auth");
const { multerStorage } = require("./../../middlewares/uploader");

const router = express.Router();
const uploader = multerStorage("public/images/profiles");

router
  .route("/edit-profile")
  .get(auth, controller.showUserProfileEdit)
  .post(auth, uploader.single("profile"), controller.updatePrpfilePicture);

module.exports = router;
