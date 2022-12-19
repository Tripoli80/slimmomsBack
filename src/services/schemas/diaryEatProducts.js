const { Schema, model, SchemaTypes } = require('mongoose');
const diaryEatProducts = new Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    product: {
      type: SchemaTypes.ObjectId,
      ref: 'product',
    },
    weight: {
      type: Number,
      required: [true, 'weight is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  {
    timestamps: true,
  }
);

const DiaryEatProducts = model('diaryeat', diaryEatProducts);

module.exports = DiaryEatProducts;
