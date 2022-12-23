const { getDiet, getPersonalDiet, getLastDiet, getLastDiets } = require('../services/diet');
const DiaryEatProducts = require('../models/schemasMongoose/diaryEatProducts');
// const User = require('../services/schemas/users');

const diet = async (req, res) => {
  const { body } = req;
  const response = await getDiet(body);
  return res.status(200).json(response);
};

const createMyDietParams = async (req, res) => {
  const { body, userId } = req;
  console.log('🚀 ~ file: diet.js:13 ~ createMyDietParams ~ userId', userId);
  console.log('🚀 ~ file: diet.js:13 ~ createMyDietParams ~ body', body);
  const response = await getPersonalDiet(body, userId);

  res.status(201).json(response);
};

const findMyDiet = async (req, res) => {
  const { userId } = req;
  const myDiet = await getLastDiet(userId);
  res.status(200).json(myDiet[0]);
};
const findMyDiets = async (req, res) => {
  const { userId } = req;
  const myDiets = await getLastDiets(userId);
  res.status(200).json(myDiets);
};
module.exports = { diet, createMyDietParams, findMyDiet, findMyDiets };
