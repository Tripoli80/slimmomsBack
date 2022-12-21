const { getDiet } = require('../services/diet');

const diet = async (req, res) => {
  const { body } = req;
  console.log("🚀 ~ file: diet.js:5 ~ diet ~ body", body)
  const response = await getDiet(body);
  return res.status(200).json(response);
};

module.exports = { diet };
