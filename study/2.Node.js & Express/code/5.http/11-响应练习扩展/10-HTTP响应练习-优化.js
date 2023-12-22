// Import http module
const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve file
function serveFile(
  response,
  filePath,
  defaultContent = '<h1>404 Not Found</h1>'
) {
  try {
    const content = fs.readFileSync(filePath);
    response.end(content);
  } catch (error) {
    response.statusCode = 404;
    response.end(defaultContent);
  }
}

// Create the server object
const server = http.createServer((request, response) => {
  // Get the path of the request URL
  const { pathname } = new URL(request.url, 'http://127.0.0.1');

  const rootPath = path.resolve(__dirname);
  const defaultContent = '<h1>404 Not Found</h1>';

  if (pathname === '/') {
    serveFile(response, `${rootPath}/10-table.html`, defaultContent);
  } else if (pathname === '/index.css') {
    serveFile(response, `${rootPath}/index.css`, defaultContent);
  } else if (pathname === '/index.js') {
    serveFile(response, `${rootPath}/index.js`, defaultContent);
  } else {
    response.statusCode = 404;
    response.end(defaultContent);
  }
});

// Listen to the port and start the server
server.listen(3300, () => {
  console.log('Service has started....', 'http://localhost:3300');
});
