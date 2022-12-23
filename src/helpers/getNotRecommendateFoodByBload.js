const Product = require('../models/schemasMongoose/products');

// products = aggregat разом з match шукає в базі даних (похоже до find)
// group = з результату match сортує по категоріям дані (схоже на ruducer)

const getProducts = async blood => {
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

  if (!key) {
    return []
  }
  const products = await Product.aggregate([
    { $match: key },
    {
      $group: { _id: '$categories', count: { $sum: 1 } },
    },
  ]);
  return products;
};

module.exports = { getProducts };
