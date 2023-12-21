const circularJson = require('circular-json');
// 导入 express
const express = require('express');

// 创建应用对象
const app = express();

// 创建路由
app.get('/home', (req, res) => {
  res.end('hello express');
});

// 首页路由
app.get('/', (req, res) => {
  const reqJson = circularJson.stringify(req, null, 2);
  res.end(`<pre>${reqJson}</pre>`);
});

// post
app.post('/login', (req, res) => {
  res.end('login login');
});

// 匹配所有的方法
app.all('/test', (req, res) => {
  res.end('test test');
});

// 404 响应
app.all('*', (req, res) => {
  res.end('404 not Found');
});

// 监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口 3000 正在监听中....', 'http://127.0.0.1:3000');
});
