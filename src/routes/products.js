const express = require('express');
const { tryWrapper } = require('../helpers');
const { currentProducts, allProducts, addPersonalProducts } = require('../controllers/products');
const { validatorBody } = require('../middleware/validationBody');
const { schemaNewProduct } = require('../models/schemasJoi');

const router = express.Router();

router.get('/', tryWrapper(allProducts));
//if query "product" exist then next()
router.get('/', tryWrapper(currentProducts));
router.post('/', validatorBody(schemaNewProduct), tryWrapper(addPersonalProducts));



module.exports = router;
