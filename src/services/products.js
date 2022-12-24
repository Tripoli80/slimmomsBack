const Product = require('../models/schemasMongoose/products');

const addNewProduct = async newProduct => {};

const getProduct = async str => {
  const query = new RegExp('.*' + str + '.*', 'i');
  const products = await Product.find({
    $or: [
      { 'title.ua': { $regex: query } },
      { 'title.ru': { $regex: query } },
      { 'title.en': { $regex: query } },
      { 'title.deu': { $regex: query } },
    ],
  }).limit(10);
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
