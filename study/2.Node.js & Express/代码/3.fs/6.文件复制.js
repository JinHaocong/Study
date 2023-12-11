const fs = require('fs');
const process = require('process');

// sign 方式一 readFile
fs.readFile('./test.ppt',(err, data) => {
    if(err) throw err;
    fs.writeFile('./test.ppt',data,(err, data) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(process.memoryUsage()) // rss
        console.log('写入成功')
    })
})

// sign 流式操作 占用内存较小
const rs = fs.createReadStream('./test.ppt')
const ws = fs.createWriteStream('./test2.ppt')
rs.on('data', chunk => {
    ws.write(chunk)
})

rs.on('end', () => {
    console.log(process.memoryUsage())
    console.log('写入成功')
})

// 快捷方式
rs.pipe(ws)
