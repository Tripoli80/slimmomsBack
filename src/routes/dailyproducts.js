const express = require('express');
const { validatorBody } = require('../middleware/validationBody');
const { tryWrapper } = require('../helpers');
const { addProductToDiary, removeEated } = require('../controllers/dailyproducts');
const { schemaAddEatedProducts } = require('../middleware/validationSchemes');

const router = express.Router();

router.post('/addeated', validatorBody(schemaAddEatedProducts), tryWrapper(addProductToDiary));
router.delete('/:eatedId', tryWrapper(removeEated));

// router.get('/:product', tryWrapper(currentProducts));

module.exports = router;
