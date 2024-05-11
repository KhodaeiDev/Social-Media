const { errorResponse, successResponse } = require("../../utils/responses");
const userModel = require("./../../model/user");
const { registerValidation } = require("./auth.validator");

exports.showRegisterViews = async (req, res) => {
  return res.render("auth/register");
};

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    await registerValidation.validate(
      { name, username, email, password },
      { abortEarly: false }
    );

    const isUserExist = await userModel
      .findOne({ $or: [{ username }, { email }] })
      .lean();

    if (isUserExist) {
      req.flash("error", "the Username Or Email existed");
      return res.redirect("/auth/register");
    }

    const isFirstUser = (await userModel.countDocuments()) === 0;

    const user = await userModel.create({
      name,
      username,
      email,
      role: isFirstUser ? "ADMIN" : "USER",
      password,
    });

    req.flash("success", "You Registered successfully");
    return res.redirect("/auth/register");
  } catch (err) {
    return next(err);
  }
};
