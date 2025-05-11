const bcrypt = require("bcrypt");
const userModel = require("./../../model/user");
const { prifileUpdateValidator } = require("./user.validator");
const { uploadToLiara } = require("../../utils/uploadToLiara");

exports.showUserProfileEdit = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user._id });
  return res.render("users/edit", {
    user,
  });
};

exports.updatePrpfilePicture = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let { name, username, email, biography } = req.body;
    biography = biography.trim();

    //*validator
    const bodyValidate = await prifileUpdateValidator.validate(
      {
        name,
        username,
        email,
        biography,
      },
      { abortEarly: false }
    );

    if (req.file) {
      const filePath = req.file.path;
      const fileName = req.file.filename;
      const result = await uploadToLiara(filePath, fileName);

      await userModel.findOneAndUpdate(
        { _id: userId },
        {
          profilePicture: result.Location,
          name,
          email,
          username,
          biography,
        },
        { new: true }
      );

      req.flash("success", "Profile Picture Updated Successfully");
      return res.redirect(`/pages/${userId}`);
    }
    await userModel.findOneAndUpdate(
      { _id: userId },
      {
        name,
        email,
        username,
        biography,
      },
      { new: true }
    );
    req.flash("success", "User Information Updated Successfully");
    return res.redirect("/users/edit-profile");
  } catch (err) {
    next(err);
  }
};
