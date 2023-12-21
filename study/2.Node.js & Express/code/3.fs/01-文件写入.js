// 引入fs对象
const fs = require('fs');

// 异步写入文件
fs.writeFile('./test.txt', '三人行则，必有我师焉', (err) => {
  // 如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
  if (err) {
    console.log(err);
    return;
  }
  console.log('写入成功');
});

console.log(1 + 1);

// 同步写入文件
fs.writeFileSync('./data.txt', 'test');
console.log(111);
