exports.errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  req.flash("error", error.message);
  return res.status(res.statusCode).redirect("back");
};
