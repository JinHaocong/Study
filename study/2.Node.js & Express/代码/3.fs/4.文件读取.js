// 导入 fs 模块
const fs = require('fs');

// 异步读取
fs.readFile('./test.txt', (err, data) => {
    if(err) throw err;
    console.log(data.toString());
});

// 同步读取
const data = fs.readFileSync('./test.txt',)
console.log(data.toString(),'data')
