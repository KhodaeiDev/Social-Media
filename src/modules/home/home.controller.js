const { getUserInfo } = require("../../utils/helper");

exports.showHomeViews = async (req, res) => {
  const user = await getUserInfo(req.user._id);
  return res.render("index", {
    user,
  });
};
