const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expire: {
    type: Date,
    required: true,
  },
});

schema.statics.createToken = async (user) => {
  const expireInDays = +process.env.REFRESH_TOKEN_EXPIRE;
  const refreshToken = uuidv4();
  const refreshTokenDocument = new model({
    token: refreshToken,
    user: user._id,
    expire: new Date(Date.now() + expireInDays * 24 * 60 * 60 * 1000),
  });

  await refreshTokenDocument.save();

  return refreshToken;
};

schema.statics.verifyToken = async (token) => {
  const refreshTokenDocument = await model.findOne({ token });

  if (refreshTokenDocument && refreshTokenDocument.expire >= Date.now()) {
    return refreshTokenDocument.user;
  } else {
    return null;
  }
};

const model = mongoose.model("RefreshToken", schema);

module.exports = model;
