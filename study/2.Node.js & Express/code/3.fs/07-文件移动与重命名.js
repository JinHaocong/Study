const fs = require('fs')

// sign 重命名
fs.rename('./test.txt', './fuck.txt', err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('操作成功')
})

// sign 移动
fs.rename('./test.txt', './test/test.txt', err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('操作成功')
})
