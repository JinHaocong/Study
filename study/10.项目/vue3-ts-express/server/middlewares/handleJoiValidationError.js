const Joi = require('joi');

const handleJoiValidationError = (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.error(err.message);
  next(err);
};

module.exports = handleJoiValidationError;
