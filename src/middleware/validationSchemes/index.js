const Joi = require("joi");

const schemaPOST = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pro"] } })
    .required(),
  phone: Joi.string().alphanum().min(5).max(10).required(),
  favorite: Joi.boolean().optional().default(false),
});

const schemaPUT = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pro"] },
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
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pro"] } })
    .required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const schemaAvatar = Joi.object({
  contentType: Joi.string().label("multipart/form-data").required(),
});
const schemaReVerify = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pro"] } })
    .required(),
});

module.exports = {
  schemaPOST,
  schemaPUT,
  schemaFavorite,
  schemaSignUp,
  schemaSingIn,
  schemaSubscription,
  schemaAvatar,
  schemaReVerify,
};
