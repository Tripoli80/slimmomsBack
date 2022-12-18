const jwt = require('jsonwebtoken');

const { Unauthorized } = require('http-errors');
const User = require('../services/schemas/users');
// const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  const secret = process.env.SECRET;

  const { authorization = 0 } = req.headers;

  if (!authorization) return next(new Unauthorized('Not authorized'));
  const [typeToken, token] = authorization.split(' ');
  if (typeToken !== 'Bearer') return next(new Unauthorized(`Type authorization not "Bearer"`));
  try {
    const { _id } = jwt.verify(token, secret);
    console.log("first")
    const user = await User.findById(_id);
    if (!user || user.token != token) return next(new Unauthorized('Not authorized'));
    // if (!user.verify) throw new Unauthorized('Your mail address not verify');

    req.userId = _id;
    return next();
  } catch (error) {
    if (error.name) return next(new Unauthorized(error.name));
    return next(error);
  }
};
module.exports = auth;
