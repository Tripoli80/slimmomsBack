const express = require('express');
const { diet, createMyDietParams, findMyDiet } = require('../controllers/diet');
const { validatorBody } = require('../middleware/validationBody');
const { schemaDiet } = require('../middleware/validationSchemes');
const { tryWrapper } = require('../helpers');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', validatorBody(schemaDiet), tryWrapper(diet));
router.post('/:id', tryWrapper(auth), validatorBody(schemaDiet), tryWrapper(createMyDietParams));
// router.get('/:product', tryWrapper(currentProducts));

module.exports = router;
