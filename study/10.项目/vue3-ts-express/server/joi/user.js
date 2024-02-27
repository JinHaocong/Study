const joi = require('joi');
const cnMessages = require('joi-messages-zh_cn');
const { loginLimit } = require('./login');

const zhCnFile = cnMessages['zh-cn'];

// string值只能为字符串
// alphanum值为a-z A-Z 0-9
// min是最小长度 max是最大长度
// required是必填项
// pattern是正则

const id = joi.required().messages({ ...zhCnFile });
const name = joi.string().required().messages({ ...zhCnFile });
const email = joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/).required().messages({ ...zhCnFile });
const oldPassword = joi.string().min(6).max(12)
  .required()
  .messages({ ...zhCnFile });
const newPassword = joi.string().min(6).max(12)
  .required()
  .messages({ ...zhCnFile });
const sex = joi.string();
const department = joi.string().messages({ ...zhCnFile });
const identity = joi.string().messages({ ...zhCnFile });

exports.passwordLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    id,
    oldPassword,
    newPassword,
  },
};

exports.nameLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    id,
    name,
  },
};

exports.emailLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    id,
    email,
  },
};

exports.forgetPasswordLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    id,
    newPassword,
  },
};

exports.addAdminLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    ...loginLimit.body,
    name,
    email,
    sex,
    department,
    identity,
  },
};

exports.updateAdminLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    identity,
    department,
    name,
    sex,
    email,
  },
};
