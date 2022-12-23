const express = require('express');
const { tryWrapper } = require('../helpers');
const { currentProducts, allProducts } = require('../controllers/products');

const router = express.Router();

router.get('/', tryWrapper(allProducts));
//if query "product" exist then next()
router.get('/', tryWrapper(currentProducts));


module.exports = router;
