const http = require('http')
const fs = require('fs')
const path = require('path')

const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

// 方法判断
function validateRequest(request, response) {
  if (request.method !== 'GET') {
    response.statusCode = 405
    response.end('<h1>405 Method Not Allowed</h1>')
    return false
  }
  return true
}

// 错误处理
function handleErrors(err, response) {
  console.log(err)
  response.setHeader('content-type', 'text/html;charset=utf-8')
  switch (err.code) {
    case 'ENOENT':
      response.statusCode = 404
      response.end('<h1>404 Not Found</h1>')
      break
    case 'EPERM':
      response.statusCode = 403
      response.end('<h1>403 Forbidden</h1>')
      break
    default:
      response.statusCode = 500
      response.end('<h1>Internal Server Error</h1>')
      return
  }
}

// 处理读取文件
function processFileContent(filePath, response, data) {
  const ext = path.extname(filePath).slice(1)
  const type = mimeTypes[ext]
  if (type) {
    if (ext === 'html') response.setHeader('content-type', `${type};charset=utf-8`)
    else response.setHeader('content-type', type)
  } else {
    response.setHeader('content-type', 'application/octet-stream')
  }
  response.end(data)
}

// 创建服务
const server = http.createServer((request, response) => {
  if (!validateRequest(request, response)) return

  const { pathname } = new URL(request.url, 'http://127.0.0.1')
  console.log(__dirname)
  const root = path.resolve(__dirname, 'page')
  const filePath = path.join(root, pathname)

  fs.readFile(filePath, (err, data) => {
    if (err) handleErrors(err, response)
    else processFileContent(filePath, response, data)
  })
})

server.listen(3300, () => {
  console.log('Services has started....', 'http://localhost:3300')
})

