const fs = require('fs');

// sign 相对路径
fs.writeFileSync('./index.html', 'love');
fs.writeFileSync('../index.html', 'love');

// sign 绝对路径
fs.writeFileSync('C:\\Users\\jinha\\Desktop\\Study\\study\\2.Node.js & Express\\代码\\3.fs\\index.html', 'love');
