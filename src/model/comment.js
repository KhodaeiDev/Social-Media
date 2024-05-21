const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // parent: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Comment",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
