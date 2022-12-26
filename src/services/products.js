const Product = require('../models/schemasMongoose/products');
// const model = {
//   title: {
//     ru: 'Гречка Yelli с белыми грибами',
//     ua: 'Гречка Yelli з білими грибами',
//     en: 'Yelli buckwheat with porcini mushrooms',
//     deu: 'Yelli-Buchweizen mit Steinpilzen',
//   },
//   _id: '5d51694802b2373622ff5553',
//   categories: [
//     {
//       ru: 'зерновые',
//       deu: 'Körner',
//       en: 'grains',
//       ua: 'зернові',
//     },
//   ],
//   weight: 100,
//   calories: 290,
//   groupBloodNotAllowed: [null, true, false, true, true],
//   __v: 0,
// };
const addNewProduct = async ({ userId, body }) => {
  let { title, categories, weight, calories } = body;
  const newProduct = new Product({
    categories: {
      ua: categories,
      ru: categories,
      en: categories,
      deu: categories,
    },
    weight: weight,
    title: {
      ua: title,
      ru: title,
      en: title,
      deu: title,
    },
    calories: calories,
    groupBloodNotAllowed: [null, false, false, false, false],
    owner: userId,
  });

  try {
    const result = await newProduct.save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getProduct = async (userId, str) => {
  const query = new RegExp('.*' + str + '.*', 'i');
  const products = await Product.find({
    $or: [
      { 'title.ua': { $regex: query }, $or: [{ owner: null }, { owner: userId }] },
      { 'title.ru': { $regex: query }, $or: [{ owner: null }, { owner: userId }] },
      { 'title.en': { $regex: query }, $or: [{ owner: null }, { owner: userId }] },
      { 'title.deu': { $regex: query }, $or: [{ owner: null }, { owner: userId }] },
    ],
  }).limit(8);

  return products;
};

const getAllProduct = async () => {
  const products = await Product.find({}, ['title', 'calories', 'categories']);
  return products;
};

module.exports = {
  addNewProduct,
  getProduct,
  getAllProduct,
};
