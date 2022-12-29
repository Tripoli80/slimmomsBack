const jwt = require('jsonwebtoken');

const { Unauthorized } = require('http-errors');
const User = require('../models/schemasMongoose/users');
const  removeExpToken = require('../helpers/removeExperiedToken');
// const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  const secret = process.env.SECRET;

  const { authorization = 0 } = req.headers;

  if (!authorization) return next(new Unauthorized('Not authorized'));
  const [typeToken, token] = authorization.split(' ');
  if (typeToken !== 'Bearer') return next(new Unauthorized(`Type authorization not "Bearer"`));
  try {
    const result  = jwt.verify(token, secret);
    const { _id } = result;
    
    const user = await User.findById(_id);
    if (!user) return next(new Unauthorized('Not authorized'));
    const allToken = [...user.token];
    const tokenIncludet = allToken.includes(token);
    const longtokenIncludes = user.longtoken == token;
    if (!tokenIncludet && !longtokenIncludes) return next(new Unauthorized('Not authorized'));
    req.userId = _id;
    return next();
  } catch (error) {    
    const res =await removeExpToken(token)
    if (error.name) return next(new Unauthorized(error.name));
    return next(error);
  }
};
module.exports = auth;
