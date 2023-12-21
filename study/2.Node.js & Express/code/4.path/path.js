const fs = require('fs');
const path = require('path');

// sign 写入文件
// fs.writeFileSync(__dirname + '/index.html','love')
// console.log(__dirname + '/index.html')

// sign resolve
const newPath = path.resolve(__dirname, 'index.html');
console.log(newPath);

// 获取路径分隔符
console.log(path.sep);
// 获取文件的绝对路径
console.log(__filename);
// 拼接绝对路径
console.log(path.resolve(__dirname, 'test'));
// 解析路径
const pathname = 'E:\\Study\\study\\2.Node.js & Express\\代码mine\\4.path\\path.js';
console.log(path.parse(pathname));
// 获取路径基础名称
console.log(path.basename(pathname));
// 获取路径的目录名
console.log(path.dirname(pathname));
// 获取路径的扩展名
console.log(path.extname(pathname));
