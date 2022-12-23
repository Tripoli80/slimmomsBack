const Product = require('../models/schemasMongoose/products');

const getDiet = async data => {
  const { blood, height, age, cWeight, dWeight } = data;
  const dailyCalorie = Math.round(
    10 * cWeight + 6.25 * height - 5 * age - 161 - 10 * (cWeight - dWeight)
  );
  let key;
  switch (blood.toString()) {
    case '1':
      key = { 'groupBloodNotAllowed.1': true };
      break;
    case '2':
      key = { 'groupBloodNotAllowed.2': true };
      break;
    case '3':
      key = { 'groupBloodNotAllowed.3': true };
      break;
    case '4':
      key = { 'groupBloodNotAllowed.4': true };
      break;
    default:
      console.log(`Sorry, we are out of ${blood}  ${typeof blood}.`);
  }

  // products = aggregat разом з match шукає в базі даних (похоже до find)
  // group = з результату match сортує по категоріям дані (схоже на ruducer)

  // const products = await Product.find(key).limit(20);
  if (!key) {
    return {
      dailyCalorie,
      products: [],
    };
  }

  const products = await Product.aggregate([
    { $match: key },
    {
      $group: { _id: '$categories', count: { $sum: 1 } },
    },
  ]);
  return {
    dailyCalorie,
    products,
  };
};

module.exports = { getDiet };
