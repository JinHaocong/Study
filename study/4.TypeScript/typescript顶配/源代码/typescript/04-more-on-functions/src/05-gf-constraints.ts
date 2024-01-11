// sign 泛型函数 限制条件

// 类型别名
type hasLength = {
    length: number
}

// 接口
interface HasLength {
    length: number
}

// 用接口也可以

function longest<Type extends hasLength>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a
    } else {
        return b
    }
}

const longerArray = longest([1, 2], [2, 3, 4])
console.log(longerArray)
const longerString = longest('haoCong', 'Jin')
console.log(longerString)
const test = longest({length: 10,}, {length: 50})
console.log(test)

// 报错 Argument of type number is not assignable to parameter of type hasLength 数字没有length属性
// const notOk = longest(10, 100)
