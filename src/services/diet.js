const Product = require('../models/schemasMongoose/products');

const getDiet = async data => {
  const { blood, height, age, cWeight, dWeight } = data;
  const dailyCalorie = Math.round(
    10 * cWeight + 6.25 * height - 5 * age - 161 - 10 * (cWeight - dWeight)
  );
  let key;
  switch (blood) {
    case 1:
      key = { 'groupBloodNotAllowed.1': true };
      break;
    case 2:
      key = { 'groupBloodNotAllowed.2': true };
      break;
    case 3:
      key = { 'groupBloodNotAllowed.3': true };
      break;
    case 4:
      key = { 'groupBloodNotAllowed.4': true };
      break;
  }

  const products = await Product.find(key).limit(10);
  return {
    dailyCalorie,
    products,
  };
};

module.exports = { getDiet };
