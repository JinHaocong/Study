// sign 在条件类型中进行推理


// sign
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never

// type Num = number
type Num121 = GetReturnType<() => number>
let num: Num121 = 100

// type Str = string
type Str121 = GetReturnType<(x: string) => string>
let str: Str121 = ''

// type Books = boolean[]
type Books = GetReturnType<(a: boolean, b: boolean) => boolean[]>
let books: Books = [true, false]

// type Never = never
type Never = GetReturnType<string>
let nev: Never = 'error' as never


// sign
function stringOrNum(x: string): number
function stringOrNum(x: number): string
function stringOrNum(x: string | number): string | number
function stringOrNum(x: string | number): string | number {
    return Math.random() > 0.5 ? 'hello' : 23
}

// type T1 = string | number
type T1 = ReturnType<typeof stringOrNum>

// error Type boolean is not assignable to type string | number
// 只解析最后一个重载签名
// const t1: T1 = true


type ExtractType<T> = T extends { type: infer R } ? R : never;

// 使用示例
type ExtractedString = ExtractType<{ type: "string" }>;  // R 将被推断为 "string"
type ExtractedNumber = ExtractType<{ type: "number" }>;  // R 将被推断为 "number"
type ExtractedBoolean = ExtractType<{ type: "boolean" }>;  // R 将被推断为 "boolean"

// 不满足条件的情况
type ExtractedNonMatchingType = ExtractType<{ name: "John" }>;  // R 将被推断为 never
