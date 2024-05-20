const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    post: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Save", schema);

module.exports = model;
