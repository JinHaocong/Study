## 2022-10-17

### 目标

知道什么是Node.js

- 知道Node.js可以做什么
- 说出Node.js中的JavaScript的组成部分
- 使用fs模块进行文件的读写操作
- 使用path模块进行路径处理
- 使用http模块写一个基本的web服务器

## 浏览器中的JavaScript运行环境

浏览器中的JavaScript组成部分

- JS核心语法
- WebAPI

不同了浏览器使用不同的JavaScript解析引擎

- Chrome v8 性能最好
- Firefox OdinMonkey (奥丁猴)
- Safri JSCore
- IE Chakra(查克拉)

## 为什么JavaScript可以操作浏览器的DOM,BOM

因为浏览器内置了这些API，函数

## 浏览器中的JavaScript运行环境

每一个浏览器都是一个运行环境

## 什么是Node.js

Node.js是一个基于Chrome V8引擎的JavaScript运行环境

简单地说就是一个运行环境，一个后端的运行环境

有一些内置API

## Node.js可以做什么

- Express框架快速构建web应用
- Electron框架构建跨平台桌面应用
- restify框架构建API接口项目
- 读写操作数据库

## fs文件系统模块

- fs.readFile()，读取指定文件的内容
- fs.writeFile()，指定文件写入内容

先进行导入

```js
const fs = require('fs')
```

### fs读取文件内容

```js
fs.readFile(path[,options],callback)
```

- path 必选参数 表示文件的路径
- 可选参数，以什么编码格式读取文件
- callback 必选参数，读取完成后执行的回调函数

```js
const fs = require("fs");
fs.readFile("./files/1.txt", "utf8", (err, dataStr) => {
  console.log(err);
  console.log("------");
  console.log(dataStr);
});

```

### 判断文件是否被读取成功

可以判断err对象是否为null，null为读取成功

```js
const fs = require('fs')
fs.readFile('./files/1.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log('读取文件失败',err.message);
    }
    console.log('读取文件成功',data);
})
```

### fs向指定文件写入内容

```js
fs.writeFile(file,data[,options],callback)
```

- file 必选参数，需要制定一个文件路径的字符串
- data 必选参数，写入内容
- 可选参数，以什么格式写入内容，默认为utf8
- callback 必选参数，完成写入后的回调函数

```js
const fs = require("fs");
fs.writeFile("./files/2.txt", "嘻嘻嘻xxx dawd ", (err) => {
  console.log(err);
});
```

### 判断文件是否写入成功

```js
const fs = require("fs");
fs.writeFile("./files/2.txt", "嘻嘻嘻xxx dawd ", (err) => {
  if (err) {
    return console.log("文件写入失败", err.message);
  }
  console.log("写入成功");
});
```

### 成绩整理案例

```js
const fs = require("fs");
fs.readFile("../test/grade.txt", "utf8", (err, data) => {
  if (err) {
    return console.log("读取文件失败", err.message);
  }

  const oldArr = data.split(" ");
  const newArr = [];
  oldArr.forEach((item) => newArr.push(item.replace("=", "：")));
  const newStr = newArr.join("\r\n");
  console.log(newStr);
    fs.writeFile("../test/grade.txt", newStr, (err) => {
      if (err) {
        return console.log("文件写入失败", err.message);
      }
      console.log("写入成功");
    });
});
```

### fs模块动态路径拼接问题

出现路径拼接问题，是应为写的是相对路径，可以使用完整的绝对路径解决

注意Node.js中 一个\ 是转义  \\才是路径

```js
const fs = require("fs");
fs.readFile(
  "E:\\VS Code\\code\\Node.js\\day1\\code\\files\\1.txt",
  "utf8",
  (err, data) => {
    if (err) {
      return console.log("读取文件失败", err.message);
    }
    console.log("读取文件成功", data);
  }
);
```

使用绝对路径不利于维护

```js
__dirname//显示当前目录所处路径
```

```js
const fs = require("fs");
fs.readFile(__dirname + "/files/1.txt", "utf8", (err, data) => {
  if (err) {
    return console.log("读取文件失败", err.message);
  }
  console.log("读取文件成功", data);
});
```

## path路径模块

### path.join()路径拼接

导入 

```js
const path = require('path')
```

注意特殊情况 ../ 会抵消前面的一层路径

```js
const path = require("path");
const myPath = path.join(__dirname, "/filex/1.txt");
const pathStr = path.join("/a", "/b/c", "../", "./d", "/e");// a/b/d/e
const pathStr2 = path.join("/a", "/b/c", "../../", "./d", "/e");// a/d/e
console.log(pathStr);
console.log(pathStr2);
console.log(myPath);
```

### path.basename()从路径字符串中解析出文件名

语法格式

```js
path.basename(path[,ext])
```

- path 必选参数，文件路径
- 可选参数，移除扩展名

```js
const path = require("path");
const myPath = "/a/b/v/c/index.html";

const fileName = path.basename(myPath);
console.log(fileName);

const nameWithoutExt = path.basename(myPath, '.html')
console.log(nameWithoutExt);
```

### path.extname()获取文件拓展名

```js
path.extname(path)
```

```js
const path = require("path");
const myPath = '/a/v/s/dw/index.html'
const extName = path.extname(myPath)
console.log(extName);
```

## 时钟案例

```js
const fs = require("fs");
const path = require("path");

const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

fs.readFile(path.join(__dirname, "../test/index.html"), "utf8", (err, data) => {
  if (err) {
    return console.log("读取失败", err);
  }
  resolveCss(data);
  resolveJS(data);
});

function resolveCss(htmlStr) {
  const newCss = regStyle
    .exec(htmlStr)[0]
    .replace("<style>", "")
    .replace("</style>", "");
  fs.writeFile(path.join(__dirname, "/clock/index.css"), newCss, (err) => {
    if (err) {
      return console.log("写入CSS失败", err.message);
    }
    console.log("写入CSS成功");
  });
}

function resolveJS(htmlStr) {
  const newScript = regScript
    .exec(htmlStr)[0]
    .replace("<script>", "")
    .replace("</script>", "");
  fs.writeFile(path.join(__dirname, "/clock/index.js"), newScript, (err) => {
    if (err) {
      return console.log("写入JS失败", err.message);
    }
    console.log("写入JS成功");
  });
}
```

注意fs.writeFile()方法只能创建文件，不能创建路径

重复调用fs.writeFile()写入同一个文件时，新内容会覆盖旧内容

## http模块

### 回顾；什么是客户端，什么是服务器

```js
const http = require('http')
```

### 创建web服务器基本步骤

- 导入http模块
- 创建web服务器实例
- 为服务器绑定request事件，监听客户端请求
- 启动服务器

```js
const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Someone visit our web server");
});

server.listen(80, () => {
  console.log("Server running at http://127.0.0.1:80");
});

```

### req请求对象

req包含了与客户端相关的数据和属性

- req.url客户端请求的url地址
- req.method客户端请求的类型

### res响应对象

- res.end()向客户端发送指定内容，并结束这次请求

### 解决中文乱码问题

```js
const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  const str = `您请求的url地址是${req.url},method类型是${req.method}`;
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.end(str);
});
server.listen(5050, () => {
  console.log("Server is running at http://127.0.0.1:5050");
});
```

使用res.setHeader设置编码格式

```js
  res.setHeader("Content-Type", "text/html;charset=utf-8");
```

### 根据不同的url响应不同的html内容

```js
const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  const url = req.url;
  let content = "<h1>404 not found</h1>";
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页</h1>";
  } else if (url === "/about.html") {
    content = "<h1>关于我们</h1>";
  }
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.end(content);
});
server.listen(5050, () => {
  console.log("Server running at http://127.0.0.1");
});
```

## 案例创建服务器将时钟案例展示出来

```js
const fs = require("fs");
const path = require("path");
const http = require("http");

const server = http.createServer();
server.on("request", (req, res) => {
  const url = req.url;
  //   const myPath = path.join(__dirname, url);
  let myPath = "";
  if (url === "/") {
    myPath = path.join(__dirname, "/clock/index.html");
  } else {
    myPath = path.join(__dirname, "./clock", url);
  }

  fs.readFile(myPath, "utf8", (err, data) => {
    if (err) {
      return res.end("<h1>404 not found</h1>");
    }
    res.end(data);
  });
});

server.listen(5050, () => {
  console.log("Server running at http://127.0.0.1");
});

```

## 模块化

就是遵守固定的规则，把一个大文件拆成独立并相互依赖的多个小模块

### Node.js的模块化

根据来源不同分成三大类

- 内置模块
- 自定义模块
- 第三方模块，使用前先下载

### 加载模块

使用require()方法进行加载模块

