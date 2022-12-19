const { addNewEat, removeEatedById } = require('../services/dailyproducts');

const addProductToDiary = async (req, res) => {
  const { body, userId } = req;
  const addedProduct = await addNewEat(body, userId);
  return res.status(201).json(addedProduct);
};

const removeEated = async (req, res) => {
  const {
    params: { eatedId },
    userId,
  } = req;
  const remmovedEated = await removeEatedById(eatedId, userId);
  return res.status(200).json(remmovedEated);
};

module.exports = { addProductToDiary, removeEated };
