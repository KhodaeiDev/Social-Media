const { errorResponse, successResponse } = require("../../utils/responses");
const userModel = require("./../../model/user");
const refreshTokenModel = require("./../../model/RefreshToken");
const { registerValidation } = require("./auth.validator");
const { generateAccessToken } = require("../../utils/auth");

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

    const accessToken = generateAccessToken(user);
    const refreshToken = await refreshTokenModel.createToken(user);

    res.cookie("access-token", accessToken, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.cookie("refresh-token", refreshToken, {
      maxAge: 900000,
      httpOnly: true,
    });

    req.flash("success", "You Registered successfully");
    return res.redirect("/auth/register");
  } catch (err) {
    return next(err);
  }
};
