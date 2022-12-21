const Product = require('../models/schemasMongoose/products');

const addNewProduct = async newProduct => {};

const getProduct = async str => {
  const query = new RegExp('.*' + str + '.*');
  const products = await Product.find({
    $or: [{ 'title.ua': { $regex: query } }, { 'title.ru': { $regex: query } }],
  });

  return products;
};

const getAllProduct = async () => {
  const products = await Product.find({}, ['title', 'calories', 'categories']);
  return products;
};

module.exports = {
  getProduct,
  getAllProduct,
};
