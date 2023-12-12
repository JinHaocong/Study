const http = require('http')

// This function handles routing
function routeRequest(request) {
  const { method } = request
  const { pathname } = new URL(request.url, 'http://127.0.0.1')

  if (method === 'GET' && pathname === '/login') {
    return renderLoginPage()
  } else if (method === 'GET' && pathname === '/reg') {
    return renderRegisterPage()
  } else {
    return renderNotFoundPage()
  }
}

// Functions for handling different page rendering
function renderLoginPage() {
  return '登录页面'
}

function renderRegisterPage() {
  return '注册页面'
}

function renderNotFoundPage() {
  return 'Not Found'
}

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'text/html;charset=utf-8')
  const pageContent = routeRequest(request)
  response.end(pageContent)
})

const PORT = 3300
server.listen(PORT, () => {
  console.log(`服务已经启动.. 端口 ${PORT} 监听中....`, `http://localhost:${PORT}/`)
})
