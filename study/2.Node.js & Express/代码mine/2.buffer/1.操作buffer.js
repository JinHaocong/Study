let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4.toString()) // iloveyou

let buf_3 = Buffer.from('hello');
console.log(buf_3[0].toString(2)) // 01101000

buf_3[0] = 95
console.log(buf_3.toString())

// 如果修改的数值超过 255 ，则超过 8 位数据会被舍弃
buf_3[0] = 361 // 0001 0110 1001 => 0110 1001
console.log(buf_3)
console.log(buf_3[0].toString(2))

let buf = Buffer.from('你好')
console.log(buf)
