const { getProduct, getAllProduct, addNewProduct } = require('../services/products');

const currentProducts = async (req, res) => {
  let {
    userId,
    query: { product },
  } = req;
  product = decodeURI(product);

  if (product.length < 3) return res.status(200).json({ massege: 'product name min 3 symbol' });
  const response = await getProduct(userId,product);
  return res.status(200).json(response);
};

const allProducts = async (req, res, next) => {
  const {
    query: { product },
  } = req;
  if (product !== undefined) return next();

  const response = await getAllProduct();
  return res.status(200).json(response);
};

const addPersonalProducts = async (req, res, next) => {
  const { userId, body } = req;
  const response = await addNewProduct({ userId, body });
  return res.status(201).json(response);
};

module.exports = {
  addPersonalProducts,
  currentProducts,
  allProducts,
};
