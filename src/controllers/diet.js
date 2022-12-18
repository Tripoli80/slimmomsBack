const { getDiet } = require('../services/diet');

const diet = async (req, res) => {
  const { body } = req;
  const response = await getDiet(body);
  return res.status(200).json(response);
};

module.exports = { diet };
