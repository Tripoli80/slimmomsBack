const Joi = require('joi');

const schemaPOST = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pro'] } })
    .required(),
  phone: Joi.string().alphanum().min(5).max(10).required(),
  favorite: Joi.boolean().optional().default(false),
});

const schemaPUT = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'pro'] },
  }),
  phone: Joi.string().alphanum().min(3).max(10),
});

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaSignUp = Joi.object({
  username: Joi.string().min(2).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pro'] } })
    .required(),
});
const schemaSingIn = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pro'] } })
    .required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});
const schemaAvatar = Joi.object({
  contentType: Joi.string().label('multipart/form-data').required(),
});
const schemaReVerify = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pro'] } })
    .required(),
});

const schemaDiet = Joi.object({
  blood: Joi.number().integer().allow(1, 2, 3, 4).only().required(),
  height: Joi.number().integer().max(225).min(50).required(),
  age: Joi.number().integer().max(110).min(1).required(),
  cWeight: Joi.number().integer().max(150).min(1).required(),
  dWeight: Joi.number().integer().max(150).min(1).required(),
});
const schemaAddEatedProducts = Joi.object({
  product: Joi.string().required(),
  weight: Joi.number().integer().required(),
  date: Joi.date().required(),
});
const schemaGetEatedByDay = Joi.object({
  date: Joi.date().required(),
});

module.exports = {
  schemaGetEatedByDay,
  schemaPOST,
  schemaAddEatedProducts,
  schemaDiet,
  schemaPUT,
  schemaFavorite,
  schemaSignUp,
  schemaSingIn,
  schemaSubscription,
  schemaAvatar,
  schemaReVerify,
};
