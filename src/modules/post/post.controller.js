const postModel = require("./../../model/post");
const { postCreateValidator } = require("./post.validator");

exports.showPostUploaderViews = async (req, res) => {
  return res.render("postUpload/index");
};

exports.createPost = async (req, res, next) => {
  try {
    const { description, hashtags } = req.body;
    const user = req.user;
    const tags = hashtags.split(",");

    if (!req.file) {
      req.flash("error", "media is a required");
      return res.render("postUpload/index");
    }

    await postCreateValidator.validate({ description }, { abortEarly: false });
    const mediaUrlPath = `/images/posts/${req.file.filename}`;

    const post = await postModel.create({
      media: {
        path: mediaUrlPath,
        filename: req.file.filename,
      },
      description,
      user: user._id,
      hashtags: tags,
    });

    req.flash("success", "Post created successfully");
    return res.redirect("/posts");
  } catch (err) {
    next(err);
  }
};
