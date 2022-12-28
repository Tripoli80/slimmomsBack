const queryString = require('query-string');
const axios = require('axios');
const User = require('../models/schemasMongoose/users');
const { generateToken } = require('../helpers/generateToken');
const URL = require('url').URL;

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.SERVER_URL}/api/users/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`);
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_SECRET_KEY,
      redirect_uri: `${process.env.SERVER_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  console.log(userData.data);

  let newUser = await User.findOne({ email: userData.data.email });
  if (!newUser) {
    newUser = await User.create({
      username: userData.data.name,
      email: userData.data.email,
    });
  }

  const { token, longToken } = await generateToken(newUser._id);
  newUser.token = token;
  newUser.longtoken = longToken;

  await newUser.save();

  return res.redirect(
    `${process.env.FRONTEND_URL}/google-registration?token=${token}&longtoken=${newUser.longtoken}&email=${newUser.email}&username=${newUser.username}`
  );
};
