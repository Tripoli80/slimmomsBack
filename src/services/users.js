const bcrypt = require('bcrypt');
const { uid } = require('uid');
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');
const { verifyMailSend } = require('./mailer');
const { generateToken } = require('../helpers/generateToken');
const User = require('../models/schemasMongoose/users');

const addNewUser = async newUser => {
  const { password, email, username, token = null } = newUser;
  // const verificationToken = uid(16);
  const user = new User({
    password,
    email,
    username,
    token,
  });
  console.log('🚀 ~ file: users.js:20 ~ addNewUser ~ user', user);

  try {
    const result = await user.save();
    return result;
  } catch (error) {
    throw new Conflict('Email in use');
  }
};

const authenticateUser = async ({ body }) => {
  const { password, email } = body;
  const user = await User.findOne({ email });
  if (!user) throw new Unauthorized('mail or password is wrong');
  // check password!
  if (!(await bcrypt.compare(password, user.password)))
    throw new Unauthorized('mail or password is wrong');
  const { token, longToken } = await generateToken(user._id);
  user.token = token;
  user.longtoken = longToken;

  try {
    await user.save();
    return user;
  } catch (error) {
    throw new Error({ massage: 'Cannot generate user token' });
  }
};
const refreshToken = async ({ userId }) => {
  const user = await User.findById(userId);
  // chack user!
  if (!user) throw new Unauthorized('Not authorized');
  const { token, longToken } = await generateToken(user._id);
  user.token = token;
  user.longtoken = longToken;
  // generate and save JWT
  try {
    await user.save();
    return user;
  } catch (error) {
    throw new Error({ massage: 'Cannot generate user token' });
  }
};

const singOut = async ({ userId }) => {
  const user = await User.findById(userId);
  if (!user) throw new Unauthorized('Not authorized');
  try {
    user.token = null;
    user.longtoken = null;
    await user.save();
    return;
  } catch (error) {
    throw new Error({ massage: 'Cannot logout user' });
  }
};

const getUserData = async ({ userId }) => {
  const user = await User.findById(userId);
  if (!user) throw new Unauthorized('Not authorized');
  const { email, subscription, _id } = user;
  return { email, subscription, _id };
};

const verifyUser = async ({ params }) => {
  const { verificationToken } = params;
  const user = await User.findOne({ verificationToken });
  if (!user || user.verify) throw new NotFound();
  user.verify = true;
  try {
    await user.save();
    return {
      message: 'Verification successful',
    };
  } catch (error) {
    throw new Error('Cannot save verify user ');
  }
};

const reVerifyUser = async ({ body }) => {
  const { email } = body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFound();
  if (user.verify) throw new BadRequest('Verification has already been passed');
  const verificationToken = uid(16);
  user.verificationToken = verificationToken;
  try {
    await user.save();
    await verifyMailSend({ email, verificationToken });
    return {
      message: 'Verification email sent',
    };
  } catch (error) {
    throw new Error('Cannot save verify user ');
  }
};

module.exports = {
  addNewUser,
  authenticateUser,
  singOut,
  getUserData,
  verifyUser,
  reVerifyUser,
  refreshToken,
};
