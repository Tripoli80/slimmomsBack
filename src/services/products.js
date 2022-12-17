const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const { uid } = require('uid');
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');

const Product = require('./schemas/products');
const { title } = require('process');
const { string } = require('joi');

const addNewProduct = async newProduct => {};

const getProduct = async str => {
  const query = new RegExp('.*' + str + '.*');
  const products = await Product.find({
    $or: [{ 'title.ua': { $regex: query } }, { 'title.ru': { $regex: query } }],
  });

  return products;
};

const getAllProduct = async () => {
  const products = await Product.find({}, ['title', 'calories', 'categories']);
  return products;
};

module.exports = {
  getProduct,
  getAllProduct,
};
