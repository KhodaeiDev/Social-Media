const bcrypt = require("bcrypt");
const userModel = require("./../../model/user");
const { prifileUpdateValidator } = require("./user.validator");

exports.showUserProfileEdit = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user._id });
  return res.render("users/edit", {
    user,
  });
};

exports.updatePrpfilePicture = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, username, email, password } = req.body;

    //*validator
    const bodyValidate = await prifileUpdateValidator.validate(
      {
        name,
        username,
        email,
        password,
      },
      { abortEarly: false }
    );

    if (!password) {
      req.flash("error", "Please Enter Your password");
      return res.redirect("/users/edit-profile");
    }
    const user = await userModel.findOne({ _id: userId });

    const confirmPassword = await bcrypt.compare(password, user.password);

    if (!confirmPassword) {
      req.flash("error", "Password is Incorrect");
      return res.redirect("/users/edit-profile");
    }

    if (req.file) {
      const { filename } = req.file;
      const filePath = `/images/profiles/${filename}`;

      await userModel.findOneAndUpdate(
        { _id: userId },
        {
          profilePicture: filePath,
          name,
          email,
          username,
        },
        { new: true }
      );

      req.flash("success", "Profile Picture Updated Successfully");
      return res.redirect("/users/edit-profile");
    }
    await userModel.findOneAndUpdate(
      { _id: userId },
      {
        name,
        email,
        username,
      },
      { new: true }
    );
    req.flash("success", "User Information Updated Successfully");
    return res.redirect("/users/edit-profile");
  } catch (err) {
    next(err);
  }
};
