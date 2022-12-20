const DiaryEatProducts = require('./schemas/diaryEatProducts');
const Product = require('./schemas/products');
const User = require('./schemas/users');
const { isValidObjectId } = require('mongoose');
const { WrongParams } = require('../helpers/errors');

const addNewEat = async (data, owner) => {
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

const findEatedByDate = async (date, owner) => {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  let nextdate = new Date(date);
  nextdate.setDate(nextdate.getDate() + 1);
  nextdate.setHours(0, 0, 0, 0);
  const result = await DiaryEatProducts.find({
    date: {
      $gte: date,
      $lt: nextdate,
    },
    owner,
  });
  if (!result) {
    throw new WrongParams(`Not find by date ${date}`);
  }
  return result;
};


module.exports = { addNewEat, removeEatedById, findEatedByDate };
