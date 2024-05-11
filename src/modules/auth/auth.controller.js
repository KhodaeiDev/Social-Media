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
      return errorResponse(res, 400, "the Username Or Email existed");
    }

    const isFirstUser = (await userModel.countDocuments()) === 0;

    const user = await userModel.create({
      name,
      username,
      email,
      role: isFirstUser ? "ADMIN" : "USER",
      password,
    });

    return successResponse(res, "201", {
      message: "User Registerd Successfully",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (err) {
    return next(err);
  }
};
