const hasAccessToPage = require("./../../utils/hasAccessToPage");
const followModel = require("./../../model/follow");
const { boolean } = require("yup");

exports.showProfileView = async (req, res) => {
  const user = req.user;
  const { pageId } = req.params;
  const hasAccess = await hasAccessToPage(user._id, pageId);

  const follow = await followModel.findOne({
    follower: user._id,
    following: pageId,
  });

  if (!hasAccess) {
    req.flash("error", "follow page to show content");
    return res.render("pages/index", {
      followed: Boolean(follow),
    });
  }

  return res.render("pages/index", {
    followed: Boolean(follow),
  });
};
