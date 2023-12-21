const ejs = require('ejs');
// 西游记
const xiYou = ['唐僧', '孙悟空', '猪八戒', '沙僧'];

// 原生 JS
// let str = '<ul>';

// xiYou.forEach(item => {
//   str += `<li>${item}</li>`;
// })

// //闭合 ul
// str += '</ul>';

// console.log(str);

// EJS 实现
const fs = require('fs');

const html = fs.readFileSync('./02_西游.ejs').toString();
const result = ejs.render(html, { xiYou });

console.log(result);
