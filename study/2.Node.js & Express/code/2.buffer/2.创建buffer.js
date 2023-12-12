// 1. alloc (分配)
// 创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
const buf_1 = Buffer.alloc(10)
// 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf_1)

// 2. allocUnsafe 速度更快
// 创建了一个长度为 10 字节的 Buffer，buffer 中可能存在旧的数据, 可能会影响执行结果，所以叫unsafe
const buf_2 = Buffer.allocUnsafe(10)
console.log(buf_2)

// 3. from
// 通过字符串创建 Buffer
const buf_3 = Buffer.from('hello')

// 通过数组创建 Buffer
const buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf_3) // <Buffer 68 65 6c 6c 6f>
console.log(buf_4) // <Buffer 69 6c 6f 76 65 79 6f 75>

