// sign 分布式条件类型


// sign 分布式
// ToArray 返回字符串数组或数值数组
// ToArray 条件类型是分布式的 这意味着当你将一个联合类型传递给 ToArray 时，它会将联合类型的每个成员都应用条件类型，并返回一个包含这些成员的数组。例如：
type ToArray<Type> = Type extends any ? Type[] : never

type StrArrOrNumArr131 = string[] | number[]
type StrArrOrNumArr132 = (string | number)[]
type StrArrOrNumArr133 = ToArray<string | number>

// string[] | number[]
let sean131: StrArrOrNumArr133 = [1, 2, 3]
let sean132: StrArrOrNumArr133 = ['a', 'b', 'c']

// error (string | number)[] is not assignable to type StrArrOrNumArr133
// let sean133: StrArrOrNumArr133 = [1, 'b', 'c']


// sign 非分布式
// 在 TypeScript 中，元组类型的比较是不分布的（non-distributive），因此这个条件判断只有在 Type 确切为 any 时才为真。
// ToArrayNonDist 返回一个包含联合类型的数组。
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never

// (string | number)[]
type StrArrOrNumArr = ToArrayNonDist<string | number>
let sean134: StrArrOrNumArr = [1, 2, 3]
let sean135: StrArrOrNumArr = ['a', 'b', 'c']
let sean136: StrArrOrNumArr = [1, 'b', 'c']

