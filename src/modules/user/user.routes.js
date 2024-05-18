const express = require("express");
const controller = require("./user.controller");
const auth = require("./../../middlewares/auth");

const router = express.Router();

router.route("/edit-profile").get(auth, controller.showUserProfileEdit);

module.exports = router;
