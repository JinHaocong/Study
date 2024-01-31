const cnMessages = require('joi-messages-zh_cn');
const Joi = require('joi');

const zhCnFile = cnMessages['zh-cn'];

// string值只能为字符串
// alphanum值为a-z A-Z 0-9
// min是最小长度 max是最大长度
// required是必填项
// pattern是正则 .pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)

// 账号的验证
const account = Joi.string().alphanum().min(5).max(12)
  .required()
  .messages({ ...zhCnFile });
// 密码的验证
const password = Joi.string().min(6).max(12)
  .required()
  .messages({ ...zhCnFile });

exports.loginLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    account,
    password,
  },
};
