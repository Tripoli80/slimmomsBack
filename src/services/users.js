const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const { uid } = require('uid');
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');

const User = require('./schemas/users');
const { verifyMailSend } = require('./mailer');

const addNewUser = async newUser => {
  const { password, email, username, token = null } = newUser;
  // const verificationToken = uid(16);
  const user = new User({
    password,
    email,
    username,
    token,
  });
  console.log("🚀 ~ file: users.js:20 ~ addNewUser ~ user", user)

  try {
    const result = await user.save();
    // await verifyMailSend({ email, verificationToken });
    return result;
  } catch (error) {
    // await fs.unlink(pathName);
    console.log('🚀 ~ file: users.js ~ line 31 ~ addNewUser ~ error', error);
    throw new Conflict('Email in use');
  }
};

const authenticateUser = async ({ body }) => {
  const { password, email } = body;
  const user = await User.findOne({ email });
  // chack user!
  if (!user) throw new Unauthorized('mail or password is wrong');
  // if (!user.verify) throw new Unauthorized('Your mail address not verify');

  // check password!
  if (!(await bcrypt.compare(password, user.password)))
    throw new Unauthorized('mail or password is wrong');

  const secret = process.env.SECRET;
  const payload = { _id: user._id };
  const token = jwt.sign(payload, secret, { expiresIn: '24h' });
  user.token = token;
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
    await user.save();
    return;
  } catch (error) {
    throw new Error({ massage: 'Cannot logout user' });
  }
};

const getUserData = async ({ userId }) => {
  const user = await User.findById(userId);
  if (!user) throw new Unauthorized('Not authorized');
  const { email, subscription } = user;
  return { email, subscription };
};

const changeSubscription = async ({ userId, body }) => {
  const user = await User.findById(userId);
  // chack user!
  if (!user) throw new Unauthorized('Not authorized');

  try {
    user.subscription = body.subscription;
    const { email, subscription } = await user.save();
    return { email, subscription };
  } catch (error) {
    throw new Error({ massage: 'Cannot change subscription user' });
  }
};

const verifyUser = async ({ params }) => {
  const { verificationToken } = params;
  const user = await User.findOne({ verificationToken });
  if (!user || user.verify) throw new NotFound();
  user.verify = true;
  // user.verificationToken = "dscddscds";
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
  changeSubscription,
  verifyUser,
  reVerifyUser,
};
