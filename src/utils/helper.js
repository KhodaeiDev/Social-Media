const userModel = require("./../model/user");

const getUserInfo = async (userId) => {
  const user = await userModel.findOne({ _id: userId });

  return user;
};

module.exports = { getUserInfo };
