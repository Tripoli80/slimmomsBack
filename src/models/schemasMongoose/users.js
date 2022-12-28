const bcrypt = require('bcrypt');
const { array } = require('joi');

const { Schema, model } = require('mongoose');
const user = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,

      // select: false,
      // required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: Array,
      default: [],
    },
    longtoken: {
      type: String,
      default: null,
    },
    resettoken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

user.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) next();
  const hash = await bcrypt.hash(user.password, await bcrypt.genSalt());
  user.password = hash;
  next();
});
const User = model('user', user);
module.exports = User;
