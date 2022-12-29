const jwt = require('jsonwebtoken');

const generateToken = async _id => {
  const secret = process.env.SECRET;
  const payload = { _id };
  const token = jwt.sign(payload, secret, { expiresIn: '23h' });
  const longToken = jwt.sign(payload, secret);
  return { token, longToken };
};

module.exports = { generateToken };
