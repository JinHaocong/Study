const { expressjwt: jwt } = require('express-jwt');
const jwtConfig = require('../jwt_config');

function tokenAuthentication(req, res, next) {
  jwt({
    secret: jwtConfig.jwtSecretKey,
    algorithms: ['HS256'],
  }).unless({
    path: [
      /^\/api\//,
      /\/verifyAccountAndEmail/,
      /\/changePasswordInLogin/,
    ],
  })(req, res, (err) => {
    if (err) {
      // 抛出错误给全局错误信息处理
      return res.error('身份未验证', err, 401);
    }
    next();
  });
}

module.exports = tokenAuthentication;
