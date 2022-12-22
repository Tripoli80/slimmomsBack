const { Schema, model, SchemaTypes } = require('mongoose');
const diet = new Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    cWaigth: {
      type: Number,
      required: [true, 'weight is required'],
    },
    dWaigth: {
      type: Number,
      required: [true, 'weight is required'],
    },
    haight: {
      type: Number,
      required: [true, 'weight is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },

    blod: {
      type: Number,
      required: [true, 'blod is required'],
    },
    answer: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const PersonalDiet = model('diaryeat', diet);

module.exports = PersonalDiet;
