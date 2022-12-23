const { Schema, model, SchemaTypes } = require('mongoose');
const diet = new Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    cWeight: {
      type: Number,
      required: [true, 'cWaigth is required'],
    },
    dWeight: {
      type: Number,
      required: [true, 'dWaigth is required'],
    },
    height: {
      type: Number,
      required: [true, 'haight is required'],
    },
    age: {
      type: Number,
      required: [true, 'age is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },

    blood: {
      type: Number,
      required: [true, 'blood is required'],
    },
    answer: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const PersonalDiet = model('personaldiet', diet);

module.exports = PersonalDiet;
