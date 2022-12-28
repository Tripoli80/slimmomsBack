const jwt = require('jsonwebtoken');
const User = require('../models/schemasMongoose/users');

async function removeExpToken(token) {
  const { _id } = jwt.decode(token);
  const user = await User.findById(_id);
  const tokens = [...user.token];
  const clenerTokens = tokens.filter(el => el !== token);
  user.token = [...clenerTokens];
  await user.save();
  return { tokens, clenerTokens };
}

module.exports = removeExpToken;
