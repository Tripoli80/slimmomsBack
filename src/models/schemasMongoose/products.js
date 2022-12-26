const { Schema, model, SchemaTypes } = require('mongoose');
const product = new Schema(
  {
    categories: {
      ua: {
        type: String,
        default: 'some categories',
        index: true,
      },
      ru: {
        type: String,
        default: 'some categories',
        index: true,
      },
      en: {
        type: String,
        default: 'some categories',
        index: true,
      },
      deu: {
        type: String,
        default: 'some categories',
        index: true,
      },
    },
    weight: {
      type: Number,
      required: [true, 'weight is required'],
    },
    title: {
      ua: {
        type: String,
        default: 'some title',
        index: true,
      },
      ru: {
        type: String,
        default: 'some title',
        index: true,
      },
      en: {
        type: String,
        default: 'some title',
        index: true,
      },
      deu: {
        type: String,
        default: 'some title',
        index: true,
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

    owner: {
      $oid: {
        type: String,
        default: '639e4e34049fa5a8dc6d6d35',
      },
    },

  },
  {
    timestamps: true,
  }
);

const Product = model('product', product);

module.exports = Product;
