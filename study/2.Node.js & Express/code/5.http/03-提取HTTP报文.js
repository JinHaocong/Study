// step 1. 导入 http 模块
const http = require('http');

// step 2. 创建服务对象
const server = http.createServer((request, response) => {
  // 获取请求的方法
  console.log(request.method);
  // 获取请求的 url
  console.log(request.url);// 只包含 url 中的路径与查询字符串
  // 获取 HTTP 协议的版本号
  console.log(request.httpVersion);
  // 获取 HTTP 的请求头
  console.log(request.headers);
  console.log(request.headers.host);
  response.end('http'); // 设置响应体
});

// step 3. 监听端口, 启动服务
server.listen(3300, () => {
  console.log('服务已经启动....', 'http://localhost:3300/');
});
