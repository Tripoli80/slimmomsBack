const express = require('express');
const { validatorBody } = require('../middleware/validationBody');
const { tryWrapper } = require('../helpers');
const { addProductToDiary, removeEated, findByDate } = require('../controllers/dailyproducts');
const { schemaAddEatedProducts, schemaGetEatedByDay } = require('../models/schemasJoi/');

const router = express.Router();

router.post('/addeated', validatorBody(schemaAddEatedProducts), tryWrapper(addProductToDiary));
router.delete('/:eatedId', tryWrapper(removeEated));
// router.post('/', validatorBody(schemaGetEatedByDay), tryWrapper(findByDate));
router.get('/', tryWrapper(findByDate));


module.exports = router;
