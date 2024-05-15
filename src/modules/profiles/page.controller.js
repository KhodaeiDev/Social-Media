const hasAccessToPage = require("./../../utils/hasAccessToPage");
const followModel = require("./../../model/follow");
const userModel = require("./../../model/user");

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
      pageId,
    });
  }

  return res.render("pages/index", {
    followed: Boolean(follow),
    pageId,
  });
};

exports.follow = async (req, res, next) => {
  try {
    const user = req.user;
    const { pageId } = req.params;

    const hasPages = await userModel.findOne({ _id: pageId });
    if (!hasPages) {
      req.flash("error", "Page not found");
      return res.redirect(`/pages/${pageId}`);
    }

    if (user._id.toString() === pageId) {
      req.flash("error", "You dont follow yourself Page");
      return res.redirect(`/pages/${pageId}`);
    }

    const alreadyFollow = await followModel.findOne({
      follower: user._id,
      following: pageId,
    });
    if (alreadyFollow) {
      req.flash("error", "Page Already followed");
      return res.redirect(`/pages/${pageId}`);
    }

    await followModel.create({
      follower: user._id,
      following: pageId,
    });
    req.flash("success", "Page Followed successfully");
    return res.redirect(`/pages/${pageId}`);
  } catch (err) {
    next(err);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const user = req.user;
    const { pageId } = req.params;

    const hasPages = await userModel.findOne({ _id: pageId });
    if (!hasPages) {
      req.flash("error", "Page not found");
      return res.redirect(`/pages/${pageId}`);
    }

    if (user._id.toString() === pageId) {
      req.flash("error", "You dont unfollow yourself Page");
      return res.redirect(`/pages/${pageId}`);
    }

    const alreadyUnfollow = await followModel.findOneAndDelete({
      follower: user._id,
      following: pageId,
    });
    if (!alreadyUnfollow) {
      req.flash("error", "You didnt follow This pages");
      return res.redirect(`/pages/${pageId}`);
    }

    req.flash("success", "Page UnFollowed successfully");
    return res.redirect(`/pages/${pageId}`);
  } catch (err) {
    next(err);
  }
};
