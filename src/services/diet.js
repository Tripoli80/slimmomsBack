const { getProducts } = require('../helpers/getNotRecommendateFoodByBload');
const PersonalDiet = require('../models/schemasMongoose/personalDiet');

const getDiet = async data => {
  const { blood, height, age, cWeight, dWeight } = data;
  const dailyCalorie = Math.round(
    10 * cWeight + 6.25 * height - 5 * age - 161 - 10 * (cWeight - dWeight)
  );
  const products = await getProducts(blood);
  return {
    dailyCalorie,
    products,
  };
};

const getPersonalDiet = async (data, owner) => {
  const { blood, height, age, cWeight, dWeight } = data;
  const dailyCalorie = Math.round(
    10 * cWeight + 6.25 * height - 5 * age - 161 - 10 * (cWeight - dWeight)
  );
  const products = await getProducts(blood);
  const answer = { dailyCalorie, products };
  const date = new Date();
  const personalDiet = new PersonalDiet({
    owner,
    blood,
    height,
    age,
    cWeight,
    dWeight,
    answer,
    date,
  });

  try {
    await personalDiet.save();

    return answer;
  } catch (error) {
    throw new Error('can not Save');
  }
};
const getLastDiet = async owner => {
  const diet = await PersonalDiet.find({ owner }).sort({ _id: -1 }).limit(1);
  return diet;
};
const getLastDiets = async owner => {
  const diet = await PersonalDiet.find({ owner }).sort({ _id: -1 });
  return diet;
};
module.exports = { getDiet, getPersonalDiet, getLastDiet, getLastDiets };
