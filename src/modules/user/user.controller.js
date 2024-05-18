const userModel = require("./../../model/user");

exports.showUserProfileEdit = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user._id });
  return res.render("users/edit", {
    user,
  });
};
