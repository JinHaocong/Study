const fs = require('fs');

//异步获取状态
fs.stat('./test.txt', (err, data) => {
    if(err) throw err;
    console.log(data);
});
//同步获取状态
let data = fs.statSync('./test.txt');
console.log(data);
console.log(data.isFile());
console.log(data.isDirectory());
