const path = require('path')
// 导入 express
const express = require('express')

// 创建应用对象
const app = express()

const guard = (req, res, next) => {
  // 检测请求头中的 referer 是否为 127.0.0.1
  // 获取 referer
  const referer = req.get('referer')
  if (referer) {
    // 实例化
    const url = new URL(referer)
    // 获取 hostname
    const hostname = url.hostname
    console.log(hostname)
    // 判断
    if (hostname !== '127.0.0.1') {
      // 响应 404
      res.status(404).send('<h1>404 Not Found</h1>')
      return
    }
  }
  next()
}

// 声明中间件
app.use(guard)

// 静态资源中间件设置
app.use(express.static(path.resolve(__dirname, 'public')))

// 监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口 3000 正在监听中....', 'http://127.0.0.1:3000')
  console.log('服务已经启动, 端口 3000 正在监听中....', 'http://localhost:3000')
})
