function firstElement1(arr: any[]) {
    return 100
}

firstElement1(['a', 'b', 'c'])

// 泛型函数
function firstElement2<T>(arr: T[]): T | undefined {
    console.log(arr[0])
    return arr[0]
}

firstElement2(['a', 'b', 'c'])
firstElement2<string>(['a', 'b', 'c'])
firstElement2([1, 2, 3])
firstElement2<number>([1, 2, 3])
firstElement2([])
firstElement2<undefined>([])

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func)
}

const parsed = map(['1', '2', '3'], (n) => Number(n))
console.log(parsed)
