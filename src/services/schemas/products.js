const bcrypt = require('bcrypt');

const { Schema, model } = require('mongoose');
const product = new Schema({
  categories: {
    type: Array,
    required: [true, 'categories is required'],
  },
  weight: {
    type: Number,
    required: [true, 'weight is required'],
  },
  title: {
    ua: {
      type: String,
      default: 'some title',
    },
    ru: {
      type: String,
      default: 'some title',
    },
  },
  calories: {
    type: Number,
    required: [true, 'calories is required'],
  },
  groupBloodNotAllowed: [
    {
      type: Boolean,
      default: false,
    },
    {
      type: Boolean,
      default: false,
    },
    {
      type: Boolean,
      default: false,
    },
    {
      type: Boolean,
      default: false,
    },
    {
      type: Boolean,
      default: false,
    },
  ],
});

const Product = model('product', product);

module.exports = Product;
