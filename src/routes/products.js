const express = require('express');
const { currentProducts } = require('../controllers/products');

const { tryWrapper } = require('../helpers');
const router = express.Router();
router.get('/', () => {
  console.log('first');
});

router.get('/:product', tryWrapper(currentProducts));

module.exports = router;
