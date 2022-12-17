const bcrypt = require("bcrypt");

const { Schema, model } = require("mongoose");
const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  verify: {
    type: Boolean,
    default: false,
  },
});

user.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) next();
  const hash = await bcrypt.hash(user.password, await bcrypt.genSalt());
  user.password = hash;

  next();
});
const User = model("user", user);

module.exports = User;
