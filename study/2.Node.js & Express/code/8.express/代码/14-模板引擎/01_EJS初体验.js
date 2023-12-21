// 1. 安装 EJS
// 2. 导入 EJS
const ejs = require('ejs');
const fs = require('fs');

// 字符串
const china = '中国';

const weather = '今天天气不错~';

// 声明变量
const str = fs.readFileSync('./01_html.html').toString();

// 使用 ejs 渲染
const result = ejs.render(str, {
  china,
  weather,
});

console.log(result);
