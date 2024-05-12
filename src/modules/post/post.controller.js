const postModel = require("./../../model/post");
const { postCreateValidator } = require("./post.validator");

exports.showPostUploaderViews = async (req, res) => {
  return res.render("postUpload/index");
};

exports.createPost = async (req, res, next) => {
  //
};
