// sign 泛型函数 类型推断
function firstElement3(arr: any[]) {
    return 100
}

firstElement3(['a', 'b', 'c'])

// 泛型函数
function firstElement4<T>(arr: T[]): T | undefined {
    console.log(arr[0])
    return arr[0]
}

firstElement4(['a', 'b', 'c'])
// firstElement4<string>(['a', 'b', 'c'])
firstElement4([1, 2, 3])
// firstElement4<number>([1, 2, 3])
firstElement4([])

// firstElement4<undefined>([])

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func)
}

const parsed = map(['1', '2', '3'], (n) => Number(n))
console.log(parsed)
