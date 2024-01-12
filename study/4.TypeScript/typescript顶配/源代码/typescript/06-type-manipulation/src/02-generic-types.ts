// sign 泛型类型

function identity<T>(arg: T): T {
    return arg
}


// 泛型名字不一定就是T，位置和个数相同就行
let myIdentity021: <T>(arg: T) => T = identity
let myIdentity022: <Input>(arg: Input) => Input = identity


// 字面量定义类型
let myIdentity023: { <T>(arg: T): T } = identity


// 将字面量抽离成泛型接口 写法一
interface GenericIdentityFn1 {
    <T>(arg: T): T
}

let myIdentity024: GenericIdentityFn1 = identity


// 将字面量抽离成泛型接口 写法二 更严谨
interface GenericIdentityFn2<T> {
    (arg: T): T
}

let myIdentity025: GenericIdentityFn2<string> = identity
