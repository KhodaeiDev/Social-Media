const yup = require("yup");

exports.postCreateValidator = yup.object({
  description: yup
    .string()
    .max(2200, "Description can not more than 2200 chars"),
});
