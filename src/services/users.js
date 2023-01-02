const bcrypt = require('bcrypt');
const { uid } = require('uid');
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');
const { verifyMailSend, resetMailSend } = require('./mailer');
const { generateToken } = require('../helpers/generateToken');
const User = require('../models/schemasMongoose/users');

const addNewUser = async newUser => {
  let { password, email, username } = newUser;
  email = email.toLowerCase();
  const user = new User({
    password,
    email,
    username,
    token: [],
  });

  try {
    let result = await user.save();
    const { token, longToken } = await generateToken(result._id);
    // result.token = token;
    result.token.push(token);

    result.longtoken = longToken;
    const response = await result.save();
    // return { ...response, token };
    return { ...response, token };
  } catch (error) {
    throw new Conflict('Email in use');
  }
};

const sendMailToResetPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw new NotFound(`User whith email ${email} did not find`);
  const resettoken = uid(32);
  user.resettoken = resettoken;
  try {
    await user.save();
    await resetMailSend({ email, resettoken });
    return {
      message: 'Verification email sent',
    };
  } catch (error) {
    throw new Error({ massage: 'Cannot generate user token' });
  }
};
const validateTokenToReset = async ({ token }) => {
  // (" 🚀~ file: users.js:41 ~ validateTokenToReset ~ token", token)
  const user = await User.findOne({ resettoken: token });
  if (!user) return { message: 'Token invalid' };;
  return { message: 'Token valid' };
};

const saveNewPassword = async ({ password, token }) => {
  const user = await User.findOne({ resettoken: token });
  if (!user) throw new NotFound('token is wrong');
  user.password = password;
  user.resettoken = '';

  try {
    await user.save();
    // await resetMailSend({ email });
    return {
      message: 'Password sucsess changed',
    };
  } catch (error) {
    throw new Error('Can not pass change');
  }
};

const authenticateUser = async ({ body }) => {
  let { password, email } = body;
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) throw new Unauthorized('mail or password is wrong');
  // check password!
  if (!(await bcrypt.compare(password, user.password)))
    throw new Unauthorized('mail or password is wrong');
  const { token, longToken } = await generateToken(user._id);

  user.token = [...user.token, token];
  // user.longtoken = longToken;
  try {
    await user.save();
    return { user, token };
  } catch (error) {
    throw new Error({ massage: 'Cannot generate user token' });
  }
};
const refreshToken = async ({ userId }) => {
  const user = await User.findById(userId);
  // chack user!
  if (!user) throw new Unauthorized('Not authorized');
  const { token, longToken } = await generateToken(user._id);
  user.token = [...user.token, token];

  user.longtoken = longToken;
  // generate and save JWT
  try {
    await user.save();

    return { ...user, token };
  } catch (error) {
    throw new Error({ massage: 'Cannot generate user token' });
  }
};

const singOut = async ({ userId }) => {
  const user = await User.findById(userId);
  if (!user) throw new Unauthorized('Not authorized');
  try {
    user.token = [];
    await user.save();
    return;
  } catch (error) {
    throw new Error({ massage: 'Cannot logout user' });
  }
};

const getUserData = async ({ userId }) => {
  const user = await User.findById(userId);
  if (!user) throw new Unauthorized('Not authorized');
  const { email, username, _id } = user;
  return { email, username, _id };
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
  sendMailToResetPassword,
  saveNewPassword,
  validateTokenToReset,
};
