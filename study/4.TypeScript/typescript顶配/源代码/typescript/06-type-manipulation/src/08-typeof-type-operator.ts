// sign typeof 类型操作符

console.log(typeof 'Hello World')

let s = 'hello'
let n: typeof s
n = 'hello'

// error Type number is not assignable to type string
// n = 100

// sign 预定义类型 ReturnType<T>
// ReturnType 是一个内置的工具类型，用于获取函数类型的返回值类型。它接受一个函数类型作为参数，并返回该函数的返回值类型。

type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate>

function f() {
    return {
        x: 10,
        y: 3
    }
}

type P08 = ReturnType<typeof f>

const p081 = {
    x: 22,
    y: 66
}

// error  Type number is not assignable to type { x: number; y: number; }
// const p: P08 = 100

function msgBox() {
}

let shouldContinue: typeof msgBox

// error Type number is not assignable to type () => void
// shouldContinue = 100
