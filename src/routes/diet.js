const express = require('express');
const { diet, createMyDietParams, findMyDiet } = require('../controllers/diet');
const { validatorBody } = require('../middleware/validationBody');
const { schemaDiet } = require('../models/schemasJoi');
const { tryWrapper } = require('../helpers');
const auth = require('../middleware/auth');

const router = express.Router();

// router.post('/', validatorBody(schemaDiet), tryWrapper(diet));
router.post('/', tryWrapper(auth), validatorBody(schemaDiet), tryWrapper(createMyDietParams));
// router.get('/:product', tryWrapper(currentProducts));

module.exports = router;
