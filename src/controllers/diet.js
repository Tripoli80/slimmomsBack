const { getDiet } = require('../services/diet');
const DiaryEatProducts = require('../models/schemasMongoose/diaryEatProducts');
// const User = require('../services/schemas/users');

const diet = async (req, res) => {
  const { body } = req;
  console.log('🚀 ~ file: diet.js:5 ~ diet ~ body', body);
  const response = await getDiet(body);
  return res.status(200).json(response);
};

const createMyDietParams = async (req, res) => {
  const { _id } = req.user;
  const result = await DiaryEatProducts.create({ ...req.body, owner: _id });

  res.status(201).json({ status: 'success', code: 201, data: { result } });
};

const findMyDiet = async (req, res) => {
  const { _id } = req.user;

  const myDiet = await DiaryEatProducts.find({ owner: _id }).populate('owner');

  res.json({
    status: 'success',
    code: 200,
    data: { result: myDiet },
  });
};

module.exports = { diet, createMyDietParams, findMyDiet };
