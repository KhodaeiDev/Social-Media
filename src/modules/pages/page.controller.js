const followModel = require("./../../model/follow");
const userModel = require("./../../model/user");
const postModel = require("./../../model/post");
const likeModel = require("./../../model/like");
const saveModal = require("./../../model/save");
const commentModel = require("./../../model/comment");

exports.showProfileView = async (req, res) => {
  const user = req.user;
  const { pageId } = req.params;

  //? Page owner
  const pageOwner = String(user._id) === pageId;

  //? Determine the type Of Follow and Unfollow button
  const follow = await followModel.findOne({
    follower: user._id,
    following: pageId,
  });

  //* Page and user Information
  const page = await userModel.findOne({ _id: pageId });

  //? User Posts
  const posts = await postModel
    .find({ user: pageId })
    .sort({ _id: -1 })
    .populate("user", "name username profilePicture")
    .lean();

  //* User Likes & Saves
  const likes = await likeModel.find({ user: user._id });
  const saves = await saveModal.find({ user: user._id });

  //* Is Liked
  posts.forEach((post) => {
    if (likes.length) {
      likes.forEach((like) => {
        if (like.post._id.toString() === post._id.toString()) {
          post.isLiked = true;
        }
      });
    }
  });

  //* Is Saved
  posts.forEach((post) => {
    if (saves.length) {
      saves.forEach((save) => {
        if (save.post.toString() === post._id.toString()) {
          post.isSaved = true;
        }
      });
    }
  });

  //* comment

  const comments = await commentModel
    .find({})
    // .sort({ _id: -1 })
    .populate("user")
    .lean();

  //?Page Followers
  let followers = await followModel
    .find({ following: pageId })
    .populate("follower", "username name _id profilePicture");
  followers = followers.map((item) => item.follower);

  //?Page Followings
  let followings = await followModel
    .find({ follower: pageId })
    .populate("following", "username name _id profilePicture");
  followings = followings.map((item) => item.following);

  //*Page Render
  return res.render("pages/index", {
    user,
    followed: Boolean(follow),
    pageId,
    followers,
    followings,
    hasAccess: true,
    page,
    posts,
    pageOwner,
    comments,
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
