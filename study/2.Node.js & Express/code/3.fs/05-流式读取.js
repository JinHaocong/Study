const fs = require('fs')
//创建读取流对象
const rs = fs.createReadStream('./test.ppt');

//每次取出 64k 数据后执行一次 data 回调
rs.on('data', chunk => {
    console.log(chunk);
    console.log(chunk.length);
});

//读取完毕后, 执行 end 回调，可选
rs.on('end', () => {
    console.log('读取完成')
})
