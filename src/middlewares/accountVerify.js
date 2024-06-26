module.exports = async (req, res, next) => {
  try {
    const isVerify = req.user.isVerified;
    if (!isVerify) {
      req.flash("verifyMessage", "You need to verify your account");
      return res.render("posts/upload");
    }
    next();
  } catch (err) {
    next(err);
  }
};
