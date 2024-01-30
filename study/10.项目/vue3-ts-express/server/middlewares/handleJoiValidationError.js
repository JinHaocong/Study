const Joi = require('joi');

const handleJoiValidationError = (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.error('输入的数据不符合验证规则');
  next(err);
};

module.exports = handleJoiValidationError;
