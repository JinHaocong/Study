// 导入 http 模块
const http = require('http')
const fs = require('fs')
const path = require('path')

// 创建服务对象
const server = http.createServer((request, response) => {
  const fullPath = path.resolve(__dirname, '10-table.html')
  // 读取文件内容
  const html = fs.readFileSync(fullPath)

  response.end(html) // 设置响应体
})

// 监听端口, 启动服务
server.listen(3300, () => {
  console.log('服务已经启动....', 'http://localhost:3300')
})

