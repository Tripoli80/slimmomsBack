const express = require('express');
const {
  singUpUser,
  logInUser,
  logout,
  current,
  subscription,
  verify,
  reVerify,
} = require('../controllers/users');
// const upload = require('../middleware/multer');

const { tryWrapper } = require('../helpers');
const auth = require('../middleware/auth');
const { validatorBody, validatorHeaders } = require('../middleware/validationBody');
const {
  schemaSignUp,
  schemaSingIn,
  schemaSubscription,
  schemaReVerify,
} = require('../middleware/validationSchemes');
const ss = process.std;
const router = express.Router();

router.post('/signup', validatorBody(schemaSignUp), tryWrapper(singUpUser));
router.get('/login', validatorBody(schemaSingIn), tryWrapper(logInUser));
router.get('/logout', tryWrapper(auth), tryWrapper(logout));
router.get('/verify/:verificationToken', tryWrapper(verify));
router.post('/verify', validatorBody(schemaReVerify), tryWrapper(reVerify));
router.patch('/', tryWrapper(auth), validatorBody(schemaSubscription), tryWrapper(subscription));
// router.patch(
//   '/avatars',
//   tryWrapper(auth),
//   validatorHeaders(schemaAvatar),
//   upload.single('avatar'),
//   tryWrapper(resizeAvatars),
//   tryWrapper(avatar)
// );
router.get('/current', tryWrapper(auth), tryWrapper(current));

module.exports = router;
