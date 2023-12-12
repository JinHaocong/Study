const fs = require('fs')

// 异步追加
fs.appendFile('./test.txt', '则其善者而从之，其不善者而改之', err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('追加成功')
})

console.log(111)

// 同步追加
fs.appendFileSync('./data.txt', '\r\n温故而知新, 可以为师矣')
