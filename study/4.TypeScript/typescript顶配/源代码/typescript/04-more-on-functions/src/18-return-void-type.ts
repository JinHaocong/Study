// sign 函数void返回类型


// sign 一个具有void返回类型的上下文函数类型函数，在实现时可以返回任意值，但这个值会被忽略
// 使用 type 定义 voidFunc
type voidFunc = () => void

interface VoidFunc {
    (): void
}

const f1: voidFunc = () => {
    return true
}

const f2: voidFunc = () => true

const f3: voidFunc = function () {
    return true
}

const c1: VoidFunc = () => {
    return true
}

const c2: VoidFunc = () => true

const c3: VoidFunc = function () {
    return true
}


const v1: void = f1()
console.log(v1)
const v2 = f2()
console.log(v2)
const v3 = f3()
console.log(v3)
console.log('--------------------------------------------')
const g1: void = c1()
console.log(g1)
const g2 = c2()
console.log(g2)
const g3 = c3()
console.log(g3)


// sign 当一个字面定义的函数定义有一个void返回类型时，该函数必须不返回任何东西
// 使用函数声明定义
// error Type boolean is not assignable to type void
// function f4(): void {
//     return true
// }

// error  Type boolean is not assignable to type void
// const f5 = function (): void {
//     return true
// }
