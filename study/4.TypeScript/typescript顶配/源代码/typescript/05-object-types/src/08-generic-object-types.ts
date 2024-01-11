// sign 泛型对象类型


// sign any
interface Box1 {
    contents: any
}

let box: Box1 = {
    contents: 'hello'
}


// sign unknown
interface Box2 {
    contents: unknown
}

let x: Box2 = {
    contents: 'hello world'
}

// error  x.contents is of type unknown
// console.log(x.contents.toLowerCase())

if (typeof x.contents === 'string') {
    console.log(x.contents.toLowerCase())
}

console.log((x.contents as string).toLowerCase())

// sign 重载方法来定义
interface NumberBox {
    contents: number
}

interface StringBox {
    contents: string
}

interface BooleanBox {
    contents: boolean
}

function setContents(box: StringBox, newContents: string): void
function setContents(box: NumberBox, newContents: number): void
function setContents(box: BooleanBox, newContents: boolean): void
function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents
}

// sign 泛型来定义
interface Box3<T> {
    contents: T
}

function setContents2<T>(box: Box3<T>, newContents: T) {
    box.contents = newContents
}


let boxA: Box3<number> = {
    contents: 100
}

setContents2(boxA, 50)

// sign 报错
interface StringBox {
    contents: string
}

let boxB: StringBox = {
    contents: '100',
    // error Type number is not assignable to type string
    // contents: 100,
}


// sign 贼鸡儿绕

// step 定义泛型接口 Box4<T>
interface Box4<T> {
    contents: T
}

//step 定义 Apple 接口：
interface Apple {
    test: string
}

// step 创建类型别名 AppleBox：
type AppleBox = Box4<Apple>
// step 创建 Apple 类型的对象 a：
let a: Apple = {
    test: 'jhc'
}
// step 创建 AppleBox 类型的对象 ab：
let ab: AppleBox = {
    contents: a,
}


// sign 类型别名 泛型
type Box5<Type> = {
    contents: Type
}

// sign 通用辅助类型

// Type 或者 null
type OrNull<Type> = Type | null

// 类型 Type 或者一个包含 Type 元素的数组 Type[]
type OneOrMany<Type> = Type | Type[]

// 类型 Type 或者一个包含 Type 元素的数组 Type[]，或者是 null 它使用了之前定义的 OrNull 和 OneOrMany 类型别名，将它们组合在一起。
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>

// 一个字符串或者一个包含字符串元素的数组，或者是 null。
type OneOrManyOrNullString = OneOrManyOrNull<string>
