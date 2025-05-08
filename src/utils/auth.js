const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { generateAccessToken };
