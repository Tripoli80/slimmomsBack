const express = require('express');
const { googleRedirect, googleAuth } = require('../controllers/googleAuth');
const {
  singUpUser,
  logInUser,
  logout,
  current,
  verify,
  reVerify,
  relogIn,
  resetMailPassword,
  resetPassword,
  checkTokenToReset,
} = require('../controllers/users');

// const upload = require('../middleware/multer');

const { tryWrapper } = require('../helpers');
const auth = require('../middleware/auth');
const { validatorBody, validatorHeaders } = require('../middleware/validationBody');
const {
  schemaSignUp,
  schemaSingIn,
  schemaReset,
  schemaReVerify,
  schemaMailReset,
  schemaCheckReset,
} = require('../models/schemasJoi');
const ss = process.std;
const router = express.Router();

router.post('/signup', validatorBody(schemaSignUp), tryWrapper(singUpUser));
router.post('/mailtoreset', validatorBody(schemaMailReset), tryWrapper(resetMailPassword));
router.post('/checktoreset', validatorBody(schemaCheckReset), tryWrapper(checkTokenToReset));
router.post('/reset', validatorBody(schemaReset), tryWrapper(resetPassword));

router.post('/login', validatorBody(schemaSingIn), tryWrapper(logInUser));
router.get('/logout', tryWrapper(auth), tryWrapper(logout));
// router.get('/verify/:verificationToken', tryWrapper(verify));
// router.post('/verify', validatorBody(schemaReVerify), tryWrapper(reVerify));
// router.post('/verify', validatorBody(schemaReVerify), tryWrapper(reVerify));
router.get('/current', tryWrapper(auth), tryWrapper(current));
router.post('/refresh', tryWrapper(auth), tryWrapper(relogIn));
router.get('/google', tryWrapper(googleAuth));
router.get('/google-redirect', tryWrapper(googleRedirect));

module.exports = router;
