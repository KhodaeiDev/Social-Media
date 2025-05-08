const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const userModel = require("./../../model/user");
const resetPasswordModel = require("./../../model/resetPassword");
const {
  registerValidation,
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidationSchema,
} = require("./auth.validator");
const { generateAccessToken } = require("../../utils/auth");

exports.showRegisterViews = async (req, res) => {
  return res.render("auth/register");
};

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    await registerValidation.validate(
      { name, username, email, password },
      { abortEarly: true }
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

    res.cookie("access-token", accessToken, {
      maxAge: 3600000,
      httpOnly: true,
    });

    req.flash("success", "You Registered successfully");
    return res.redirect("/auth/login");
  } catch (err) {
    return next(err);
  }
};

exports.showLoginViews = async (req, res) => {
  return res.render("auth/login");
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await loginValidation.validate({ email, password }, { abortEarly: true });

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "User Not Found");
      return res.redirect("/auth/login");
    }

    const confirmPass = await bcrypt.compare(password, user.password);
    if (!confirmPass) {
      req.flash("error", "Invalid Email or Password");
      return res.redirect("/auth/login");
    }

    const pageId = user._id;

    const accessToken = generateAccessToken(user);

    res.cookie("access-token", accessToken, {
      maxAge: 3600000,
      httpOnly: true,
    });

    req.flash("success", "Your Logined Successfully");
    return res.redirect(`/pages/${pageId}`);
  } catch (err) {
    return next(err);
  }
};

exports.showForgetPasswordView = async (req, res) => {
  return res.render("auth/recovery");
};

exports.showResetPasswordView = async (req, res) => {
  return res.render("auth/reset-password");
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    await forgetPasswordValidation.validate({ email }, { abortEarly: true });

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Email not Found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const tokenExpireTime = Date.now() + 1000 * 60 * 10;

    await resetPasswordModel.create({
      user: user._id,
      token: resetToken,
      tokenExpireTime,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "socialmedia1381@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });

    transporter.sendMail({
      from: "socialmedia1381@gmail.com",
      to: email,
      subject: "Recovery Link For Reset Password ",
      html: `<h1>Reset Password Social Media Account</h1>
      <h3>Click on the link below to change your account password</h3>

      <h3><a href="http://localhost:${process.env.PORT}/auth/reset-password/${resetToken}">Reset Password</a></h3>
      
      <p>If this message is not for you, you do not need to do anything and do not share the link with others</p>
      `,
    });

    req.flash("success", "Recovery Email Sent successfully");
    return res.redirect("back");
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    await resetPasswordValidationSchema.validate(
      { token, password },
      { abortEarly: true }
    );

    const resetPassword = await resetPasswordModel.findOne({
      token,
      tokenExpireTime: { $gt: Date.now() },
    });

    if (!resetPassword) {
      req.flash(
        "error",
        "Invalid or expired token ! Please get A new Reset link"
      );
      return res.redirect("/auth/forget-password");
    }

    const user = await userModel.findOne({ _id: resetPassword.user });

    if (!user) {
      req.flash("error", "User Not Found");
      return res.redirect("back");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashedPassword,
      }
    );

    await resetPasswordModel.findOneAndDelete({ _id: resetPassword._id });

    req.flash("success", "Password reset successfully");
    return res.redirect("/auth/login");
  } catch (err) {
    next(err);
  }
};
