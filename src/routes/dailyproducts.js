const express = require('express');
const { validatorBody } = require('../middleware/validationBody');
const { tryWrapper } = require('../helpers');
const { addProductToDiary, removeEated, findByDate } = require('../controllers/dailyproducts');
const { schemaAddEatedProducts, schemaGetEatedByDay } = require('../middleware/validationSchemes');

const router = express.Router();

router.post('/addeated', validatorBody(schemaAddEatedProducts), tryWrapper(addProductToDiary));
router.delete('/:eatedId', tryWrapper(removeEated));
router.get('/', validatorBody(schemaGetEatedByDay), tryWrapper(findByDate));

module.exports = router;
