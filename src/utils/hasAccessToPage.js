const userModel = require("./../model/user");
const followModel = require("./../model/follow");

module.exports = async (userId, pageId, next) => {
  try {
    if (userId === pageId) return true;

    const page = await userModel.findOne({ _id: pageId });
    if (!page.private) return true;

    const follow = await followModel.findOne({
      follower: userId,
      following: pageId,
    });
    if (!follow) return false;

    return true;
  } catch (err) {
    next(err);
  }
};
