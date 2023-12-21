const fs = require('fs');

// sign 创建文件夹

fs.mkdir('./page', (err) => {
  if (err) throw err;
  console.log('创建成功');
});
// 递归异步创建
fs.mkdir('./1/2/3', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('递归创建成功');
});
// 递归同步创建文件夹
fs.mkdirSync('./x/y/z', { recursive: true });

// sign 读取文件夹

// 异步读取
fs.readdir('./test', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// 同步读取
const data = fs.readdirSync('./test');
console.log(data);

// sign 删除文件夹

// 异步删除文件夹
fs.rmdir('./page', (err) => {
  if (err) throw err;
  console.log('删除成功');
});
// 异步递归删除文件夹

// 不推荐使用
fs.rmdir('./1', { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('递归删除');
});

// 建议使用
fs.rm('./1', { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('递归删除');
});
// 同步递归删除文件夹
fs.rmdirSync('./x', { recursive: true });
