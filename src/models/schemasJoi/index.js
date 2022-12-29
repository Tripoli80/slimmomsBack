const Joi = require('joi');

const schemaPOST = Joi.object({
  name: Joi.string().alphanum().min(3).max(254).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
  phone: Joi.string().alphanum().min(5).max(10).required(),
  favorite: Joi.boolean().optional().default(false),
});

const schemaPUT = Joi.object({
  name: Joi.string().alphanum().min(3).max(254),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
  phone: Joi.string().alphanum().min(3).max(10),
});

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaSignUp = Joi.object({
  username: Joi.string().min(3).max(254).required(),
  password: Joi.string().min(8).max(100).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
});
const schemaMailReset = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
});
const schemaReset = Joi.object({
  password: Joi.string().min(8).max(100).required(),
  token: Joi.string().required(),
});
const schemaCheckReset = Joi.object({
  token: Joi.string().required(),
});
const schemaSingIn = Joi.object({
  password: Joi.string().min(8).max(100).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
});

const schemaAvatar = Joi.object({
  contentType: Joi.string().label('multipart/form-data').required(),
});
const schemaReVerify = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
});

const schemaDiet = Joi.object({
  blood: Joi.number().integer().allow(1, 2, 3, 4).only().required(),
  height: Joi.number().integer().max(250).min(100).required(),
  age: Joi.number().integer().max(100).min(18).required(),
  cWeight: Joi.number().integer().max(500).min(20).required(),
  dWeight: Joi.number().integer().max(500).min(20).required(),
});
const schemaAddEatedProducts = Joi.object({
  product: Joi.string().required(),
  weight: Joi.number().integer().required(),
  date: Joi.date().required(),
});
const schemaGetEatedByDay = Joi.object({
  date: Joi.date().required(),
});
const schemaNewProduct = Joi.object({
  title: Joi.string().required(),
  categories: Joi.string().required(),
  weight: Joi.number().integer().required(),
  calories: Joi.number().integer().required(),
});

module.exports = {
  schemaReset,
  schemaMailReset,
  schemaNewProduct,
  schemaGetEatedByDay,
  schemaPOST,
  schemaAddEatedProducts,
  schemaDiet,
  schemaPUT,
  schemaFavorite,
  schemaSignUp,
  schemaSingIn,
  schemaAvatar,
  schemaReVerify,
  schemaCheckReset,
};
