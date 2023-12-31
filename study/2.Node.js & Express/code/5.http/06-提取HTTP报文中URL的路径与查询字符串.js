// step 导入 http 模块
const http = require('http');

// step 创建服务对象
const server = http.createServer((request, response) => {
  // 实例化 URL 的对象
  // let url = new URL('/search?a=100&b=200', 'http://127.0.0.1:9000');
  const url = new URL(request.url, 'http://127.0.0.1');
  // 输出路径
  console.log(url.pathname);
  // 输出 keyword 查询字符串
  console.log(url.searchParams.get('keyword'));
  response.end('url new');
});

// step 监听端口, 启动服务
server.listen(3300, () => {
  console.log('服务已经启动....', 'http://localhost:3300/');
});
