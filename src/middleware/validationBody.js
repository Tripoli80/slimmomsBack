const { ValidationError } = require('../helpers/errors');
function validatorBody(schema) {
  return (req, res, next) => {
    const { body = {} } = req;
    const result = schema.validate(body);
    if (result.error) {
      const err = new ValidationError(result.error.details[0].message);
      next(err);
    }
    next();
  };
}
function validatorHeaders(schema) {
  return (req, res, next) => {
    const { headers = {} } = req;
    const type = { contentType: headers['content-type'] };
    const result = schema.validate(type);
    if (result.error) {
      const err = new ValidationError(result.error.details[0].message);
      next(err);
    }
    next();
  };
}

module.exports = { validatorBody, validatorHeaders };
