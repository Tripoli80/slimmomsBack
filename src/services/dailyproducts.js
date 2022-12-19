const DiaryEatProducts = require('./schemas/diaryEatProducts');
const Product = require('./schemas/products');
const User = require('./schemas/users');
const { isValidObjectId } = require('mongoose');
const { WrongParams } = require('../helpers/errors');

const addNewEat = async (data, owner) => {
  // console.log("🚀 ~ file: dailyproducts.js:6 ~ addNewEat ~ data", data)
  const { product, weight, date } = data;
  if (!isValidObjectId(product)) {
    throw Error('Not valid id owner');
  }

  const productExist = await Product.findById(product);
  if (!productExist) {
    throw new WrongParams(`Not find product whits id  ${product}`);
  }
  const itemEat = new DiaryEatProducts({
    owner,
    product,
    weight,
    date,
  });

  try {
    const result = await itemEat.save();
    return result;
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

const removeEatedById = async (_id, owner) => {
  const result = await DiaryEatProducts.findOneAndRemove({
    _id,
    owner,
  });
  if (!result) {
    throw new WrongParams(`Not find in eated list whith id  ${_id}`);
  }
  return result;
};

// const findEatedByDate = async (date, owner) => {
//   const result = await DiaryEatProducts.find({
//     date,
//     owner,
//   });
//   if (!result) {
//     throw new WrongParams(`Not find in eated list whith id  ${_id}`);
//   }
//   return result;
// };
module.exports = { addNewEat, removeEatedById };
