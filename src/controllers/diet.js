const { getGuestDiet, createPersonalDiet, getLastDiet, getLastDiets } = require('../services/diet');

const guestDiet = async (req, res, next) => {
  const { body } = req;
  if (req.headers.authorization) { 
    return next()
    
  }
  const response = await getGuestDiet(body);
  return res.status(200).json(response);
};

const createMyDiet = async (req, res) => {
  const { body, userId } = req;

  const response = await createPersonalDiet(body, userId);

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
module.exports = { guestDiet, createMyDiet, findMyDiet, findMyDiets };
