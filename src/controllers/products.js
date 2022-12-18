const { getProduct, getAllProduct } = require('../services/products');

const currentProducts = async (req, res) => {
  const {
    query: { product },
  } = req;

  if (product.length < 3) return res.status(200).json({ massege: 'product name min 3 symbol' });
  const response = await getProduct(product);
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
module.exports = {
  currentProducts,
  allProducts,
};
