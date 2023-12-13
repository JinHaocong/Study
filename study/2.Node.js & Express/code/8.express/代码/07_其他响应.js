const path = require('path')
// 导入 express
const express = require('express')

// 创建应用对象
const app = express()

// 创建路由
app.get('/other', (req, res) => {
  // sign 跳转响应
  res.redirect('https://www.google.com/')
  // sign 下载响应
  res.download(path.resolve(__dirname, 'package.json'))
  // sign JSON 响应
  res.json({
    name: '金昊聪',
    id: '1'
  })
  // sign 响应文件内容
  res.sendFile(path.resolve(__dirname, 'test.html'))
})

// 监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口 3000 正在监听中....', 'http://localhost:3000')
})
