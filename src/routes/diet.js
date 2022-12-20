const express = require('express');
const { diet } = require('../controllers/diet');
const { validatorBody } = require('../middleware/validationBody');
const { schemaDiet } = require('../models/schemasJoi');
const { tryWrapper } = require('../helpers');

const router = express.Router();

router.post('/', validatorBody(schemaDiet), tryWrapper(diet));

// router.get('/:product', tryWrapper(currentProducts));

module.exports = router;
