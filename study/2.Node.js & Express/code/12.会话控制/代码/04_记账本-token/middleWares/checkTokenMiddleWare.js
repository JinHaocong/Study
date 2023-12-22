const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

module.exports = async (req, res, next) => {
  try {
    const token = req.get('token');
    if (!token) {
      return res.json({
        code: 401,
        msg: 'Invalid token',
        data: null,
      });
    }
    // 保存信息
    req.user = await jwt.verify(token, secret)._doc;
    next();
  } catch (err) {
    return res.json({
      code: 403,
      msg: 'token验证失败',
      data: err,
    });
  }
};
