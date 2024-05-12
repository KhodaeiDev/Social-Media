const yup = require("yup");

exports.registerValidation = yup.object({
  name: yup
    .string()
    .required("Name is Required Field")
    .min(3, "Name must be at least 3 characters long"),
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(24, "Must be a maximum of 24 characters")
    .required("Userame is Required Field"),
  email: yup
    .string()
    .email("must be a Valid Email")
    .required("Email is Required Field"),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters long")
    .required("Password is Required Field"),
});

exports.loginValidation = yup.object({
  email: yup
    .string()
    .email("must be a Valid Email")
    .required("Email is Required Field"),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters long")
    .required("Password is Required Field"),
});
