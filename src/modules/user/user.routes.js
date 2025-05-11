const express = require("express");
const controller = require("./user.controller");
const auth = require("./../../middlewares/auth");
const upload = require("./../../utils/uploadToLiara");

const router = express.Router();

router
  .route("/edit-profile")
  .get(auth, controller.showUserProfileEdit)
  .post(auth, upload.single("profile"), controller.updatePrpfilePicture);

module.exports = router;
