const {
  addNewUser,
  authenticateUser,
  singOut,
  getUserData,
  changeSubscription,
  verifyUser,
  reVerifyUser,
} = require('../services/users');

const singUpUser = async (req, res) => {
  const { email, username } = await addNewUser(req.body);
  return res.status(201).json({ user: { email, username } });
};

const logInUser = async (req, res) => {
  const { token, email, subscription } = await authenticateUser(req);
  res.status(200);
  return res.json({
    token,
    user: { email, subscription },
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

const subscription = async (req, res) => {
  const response = await changeSubscription(req);
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

module.exports = {
  singUpUser,
  logInUser,
  logout,
  current,
  subscription,
  verify,
  reVerify,
};
