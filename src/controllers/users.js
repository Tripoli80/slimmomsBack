const {
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
} = require('../services/users');

const singUpUser = async (req, res) => {
  const { email, username, longtoken, token } = await addNewUser(req.body);
  return res.status(201).json({ user: { email, username }, longtoken, token });
};
const resetMailPassword = async (req, res) => {
  const response = await sendMailToResetPassword(req.body);
  return res.status(200).json(response);
};

const checkTokenToReset = async (req, res) => {
  const response = await validateTokenToReset(req.body);
  return res.status(202).json(response);
};
const resetPassword = async (req, res) => {
  const response = await saveNewPassword(req.body);
  return res.status(200).json(response);
};

const logInUser = async (req, res) => {
  const { token, longtoken, email, username } = await authenticateUser(req);
  res.status(200);
  return res.json({
    token,
    longtoken,
    user: { username, email },
  });
};

const logout = async (req, res) => {
  await singOut(req);
  return res.status(204).json();
};

const current = async (req, res) => {
  const response = await getUserData(req);
  return res.status(200).json(response);
};

const verify = async (req, res) => {
  const response = await verifyUser(req);
  return res.status(200).json(response);
};

const reVerify = async (req, res) => {
  const response = await reVerifyUser(req);
  return res.status(200).json(response);
};

const relogIn = async (req, res) => {
  const { token, longtoken, email, username } = await refreshToken(req);
  res.status(200);
  return res.json({
    token,
    longtoken,
    user: { username, email },
  });
};

module.exports = {
  singUpUser,
  logInUser,
  logout,
  current,
  verify,
  reVerify,
  resetMailPassword,
  relogIn,
  resetPassword,
  checkTokenToReset,
};
