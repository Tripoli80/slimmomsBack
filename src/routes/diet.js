const express = require('express');
const { diet } = require('../controllers/diet');
const { validatorBody } = require('../middleware/validationBody');
const { schemaDiet } = require('../middleware/validationSchemes');
const { tryWrapper } = require('../helpers');

const router = express.Router();

router.get('/', validatorBody(schemaDiet), tryWrapper(diet));

// router.get('/:product', tryWrapper(currentProducts));

module.exports = router;
