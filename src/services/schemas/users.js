const bcrypt = require("bcrypt");

const { Schema, model } = require("mongoose");
const user = new Schema({
  username: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  token: {
    type: String,
    default: null,
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
