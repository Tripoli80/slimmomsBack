const { isValidObjectId } = require('mongoose');
const DiaryEatProducts = require('../models/schemasMongoose/diaryEatProducts');
const Product = require('../models/schemasMongoose/products');
const { WrongParams } = require('../helpers/errors');

const addNewEat = async (data, owner) => {
  const { product, weight, date } = data;
  if (!isValidObjectId(product)) {
    throw Error('Not valid id product');
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
    const productData = await Product.findById(result.product);
    let response = { _id: result._id, weight, owner, product: productData };
    response.intakeCalories = (productData.calories * result.weight) / 100;
    return response;
  } catch (error) {
    throw new Error(error);
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
  if (!Date.parse(date)) {
    throw new WrongParams(`Not correct date`);
  }

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

  const idsProducts = result.map(item => {
    return { _id: item.product };
  });
  if (idsProducts.length === 0 || !idsProducts) {
    return [];
  }
  const products = await Product.find({ $or: idsProducts });

  const response = result.map(item => {
    let prepareProduct = {};
    for (const product of products) {
      if (product._id.toString() === item.product.toString()) {
        const { _id, owner, weight } = item;
        prepareProduct = { _id, owner, weight };
        prepareProduct.intakeCalories = (product.calories * item.weight) / 100;
        prepareProduct.product = product;
        return prepareProduct;
      }
    }
  });
  if (!result) {
    throw new WrongParams(`Not find by date ${date}`);
  }
  return response;
};

module.exports = { addNewEat, removeEatedById, findEatedByDate };
