const path = require('path');
// 导入 express
const express = require('express');

// 创建应用对象
const app = express();

// sign 中间件和路由匹配自上而下匹配

// 静态资源中间件设置
app.use(express.static(path.resolve(__dirname, './public')));

// 创建路由
app.get('/', (req, res) => {
  res.end('我是首页');
});

// 监听端口, 启动服务
app.listen(3000, () => {
  console.log(
    '服务已经启动, 端口 3000 正在监听中....',
    'http://localhost:3000'
  );
});
