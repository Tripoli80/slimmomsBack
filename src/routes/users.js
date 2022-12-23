const express = require('express');
const {
  singUpUser,
  logInUser,
  logout,
  current,
  verify,
  reVerify,
  relogIn,
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
} = require('../models/schemasJoi');
const ss = process.std;
const router = express.Router();

router.post('/signup', validatorBody(schemaSignUp), tryWrapper(singUpUser));

router.post('/login', validatorBody(schemaSingIn), tryWrapper(logInUser));
router.get('/logout', tryWrapper(auth), tryWrapper(logout));
router.get('/verify/:verificationToken', tryWrapper(verify));
router.post('/verify', validatorBody(schemaReVerify), tryWrapper(reVerify)); 
router.get('/current', tryWrapper(auth), tryWrapper(current));
router.post('/refresh', tryWrapper(auth), tryWrapper(relogIn));

module.exports = router;
