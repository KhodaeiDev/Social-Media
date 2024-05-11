const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    biography: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    private: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (err, next) {
  try {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
  } catch (err) {
    console.log(err);
  }
});

const model = mongoose.model("Users", schema);

module.exports = model;
