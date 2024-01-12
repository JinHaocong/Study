// sign 条件类型


// sign
interface Animal {
    live(): void
}

interface Dog extends Animal {
    woof(): void
}

// type Example1 = number
type Example1 = Dog extends Animal ? number : string
const exp1: Example1 = 555

// error Type string is not assignable to type number
// const exp11: Example1 = '555'


// type Example2 = string
type Example2 = RegExp extends Animal ? number : string
const exp2: Example2 = '555'

// error Type number is not assignable to type string
// const exp22: Example2 = 555


// sign 传统函数重载定义
interface IdLabel {
    id: number
}

interface NameLabel {
    name: string
}

function createLabel101(id: number): IdLabel
function createLabel101(name: string): NameLabel
function createLabel101(nameOrId: string | number): IdLabel | NameLabel
function createLabel101(nameOrId: string | number): IdLabel | NameLabel {
    throw ''
}


// sign 条件类型定义
type NoS = number | string


type NameOrId<T extends NoS> = T extends number ? IdLabel : NameLabel

function createLabel<T extends NoS>(idOrName: T): NameOrId<T> {
    throw ''
}

// type a101 = NameLabel
let a101 = createLabel('typescript')

// type b101 = IdLabel
let b101 = createLabel(2.8)

// type c101 = NameLabel | IdLabel
let c101 = createLabel(Math.random() > 0.5 ? 'hello' : 42)
