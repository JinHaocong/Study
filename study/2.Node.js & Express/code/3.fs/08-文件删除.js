const fs = require('fs');

// sign unlink
fs.unlink('./test.txt', err => {
    if(err) throw err;
    console.log('删除成功');
});
fs.unlinkSync('./test2.txt');


// sign rm
fs.rm('/test.txt',err => {
    if(err) throw err;
    console.log('删除成功');
})
fs.rmSync('./test.txt');
