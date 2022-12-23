const express = require('express');
const { diet, createMyDietParams, findMyDiet, findMyDiets } = require('../controllers/diet');
const { validatorBody } = require('../middleware/validationBody');
const { schemaDiet } = require('../models/schemasJoi');
const { tryWrapper } = require('../helpers');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', validatorBody(schemaDiet), tryWrapper(diet));

router.post(
  '/personal',
  tryWrapper(auth),
  validatorBody(schemaDiet),
  tryWrapper(createMyDietParams)
);
router.get('/', tryWrapper(auth), tryWrapper(findMyDiet));
router.get('/all', tryWrapper(auth), tryWrapper(findMyDiets));

module.exports = router;
