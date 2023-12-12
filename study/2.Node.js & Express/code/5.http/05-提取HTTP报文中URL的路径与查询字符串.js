// step 导入 http 模块
const http = require('http')
// step 1. 导入 url 模块
const url = require('url')

// step 创建服务对象
const server = http.createServer((request, response) => {
  // 2. 解析 request.url
  // console.log(request.url);
  const res = url.parse(request.url, true)
  // 路径
  const pathname = res.pathname
  // 查询字符串
  const keyword = res.query.keyword
  console.log(pathname, keyword)

  response.end('url')
})

// step 监听端口, 启动服务
server.listen(3300, () => {
  console.log('服务已经启动....', 'http://localhost:3300/')
})
