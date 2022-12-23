const { getDiet, getPersonalDiet } = require('../services/diet');
const DiaryEatProducts = require('../models/schemasMongoose/diaryEatProducts');
// const User = require('../services/schemas/users');

const diet = async (req, res) => {
  const { body } = req;
  const response = await getDiet(body);
  return res.status(200).json(response);
};

const createMyDietParams = async (req, res) => {
  const { body, userId } = req;
  console.log("🚀 ~ file: diet.js:13 ~ createMyDietParams ~ userId", userId)
  console.log("🚀 ~ file: diet.js:13 ~ createMyDietParams ~ body", body)
  const response = await getPersonalDiet(body, userId);

  res.status(201).json(response);
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
