const jwt = require('jsonwebtoken');

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
    await jwt.verify(token, 'jhc');
    next();
  } catch (err) {
    return res.json({
      code: 403,
      msg: 'token验证失败',
      data: err,
    });
  }
};
