exports.errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (error.statusCode === 404) {
    return res.status(error.statusCode).render("404err/index");
  }
  req.flash("error", error.message);
  return res.status(res.statusCode).redirect("back");
};
