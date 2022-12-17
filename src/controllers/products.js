const { getProduct, getAllProduct } = require('../services/products');

const currentProducts = async (req, res) => {
  const {
    params: { product },
} = req;
console.log("🚀 ~ file: products.js:6 ~ currentProducts ~ product", product)
  const response = await getProduct(product);
  return res.status(200).json(response);
};

const allProducts = async (req, res) => {
 
  const response = await getAllProduct();
  return res.status(200).json(response);
};
module.exports = {
  currentProducts,
  allProducts,
};
