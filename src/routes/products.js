const express = require('express');
const { currentProducts, allProducts } = require('../controllers/products');

const { tryWrapper } = require('../helpers');
const router = express.Router();


router.get('/', tryWrapper(allProducts));
router.get('/', tryWrapper(currentProducts));

// router.get('/:product', tryWrapper(currentProducts));


module.exports = router;
