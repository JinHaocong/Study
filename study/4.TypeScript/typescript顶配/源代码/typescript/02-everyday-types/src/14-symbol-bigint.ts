const oneHundred: bigint = BigInt(100)
const anotherHundred: bigint = 100n
console.log(oneHundred)
console.log(anotherHundred)

// 原语 Symbol(),通过函数创建全局唯一引用：
const firstName = Symbol("name")
const secondName = Symbol("name")
console.log(firstName)
console.log(secondName)

// 永远不可能相等
// 报错 This comparison appears to be unintentional because the types typeof firstName and typeof secondName have no overlap.
// 此条件将始终返回 false ，因为类型 typeof firstName 和 typeof secondName 没有重叠
// if (firstName === secondName) {
//     // 这里的代码不可能执行
//     console.log('ok')
// }
