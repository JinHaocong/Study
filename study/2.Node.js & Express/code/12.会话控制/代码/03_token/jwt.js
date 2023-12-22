// 导入 jwt
const jwt = require('jsonwebtoken');

// 创建(生成) token
const token = jwt.sign(
  // 存储数据
  {
    username: 'admin',
  },
  // 加密字符串
  'admin',
  // 配置对象
  {
    expiresIn: 60, // 单位是秒
  }
);

console.log(token);

// 校验 token
jwt.verify(token, 'admin', (err, data) => {
  if (err) {
    console.log('校验失败~~');
    return;
  }
  console.log(data);
});
