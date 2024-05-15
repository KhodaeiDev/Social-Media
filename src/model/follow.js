const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    follower: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    following: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Follows", schema);

module.exports = model;
