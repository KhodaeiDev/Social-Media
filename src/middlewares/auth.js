const jwt = require("jsonwebtoken");
const userModel = require("./../model/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies["access-token"];
    if (!token) {
      req.flash("error", "Please Login or Register First");
      return res.redirect("/auth/login");
    }

    const decode = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decode) {
      req.flash("error", "Please Login or Register First");
      return res.redirect("/auth/login");
    }

    const userId = decode.userId;
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      req.flash("error", "Please Login or Register First");
      return res.redirect("/auth/login");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
